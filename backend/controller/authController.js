const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//Register a user => /api/v1/user
exports.registerUser = catchAsyncErrors(async (req, res, next)=>{
    // console.log('body', req.body)
    let result;
    if (req.body.avatar != "") {

        result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            width: 400,
            crop: "scale",
        });
        // console.log('id', result.public_id)
    } else {
        result = {
            public_id: 'default_avatar_lsrhca',
            secure_url: 'https://res.cloudinary.com/thanhscloud/image/upload/v1646554056/avatars/default_avatar_lsrhca.png'
        }
    }

    const { name, email, password} = req.body
    const user =  await User.create({
        name, 
        email,
        password, 
        avatar: {
            
            public_id: result.public_id,
            url: result.secure_url
            
        }
    })
    
    sendToken(user, 200, res);

})

//Login USer => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password} = req.body;

    //Check if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Vui lòng nhập email và mật khẩu!', 400))
    }

    //Finding user in database
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Email hoặc mật khẩu không đúng!',401))
    }

    //Check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Mật khẩu không đúng! Vui lòng nhập lại mật khẩu.',401))
    }

    sendToken(user, 200, res);
})

//Forgot Password => /api/v1/password/forgot
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email});
    
    if(!user){
        return next(new ErrorHandler('Không tìm thấy người dùng với email này!',404))
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false})

    //Create reset password url  
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it. `
    
    try{

        await sendEmail({
            email: user.email,
            subject: 'Peri Cosmetic Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email} `
        })
    }catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500))

    }
})

//Reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //Hash URL token   
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: { $gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired',400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400));
    }

    //Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
})

//Get currently loggod in user details => /api/v1/me 
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

//Update / Change password => /api/v1/password/update 
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect',400))
    }

    user.password = req.body.password;
    await user.save();
    
    sendToken(user, 200, res)
})

//Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //Update avatar: 
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);
    
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 400,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: result.public_id,
          url: result.secure_url,
        };
    }
    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false 
    })

    res.status(200).json({
        success: true
    })
})

// Logout user => /api/v1/logout 
exports.logout = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true 
    })

    res.status(200).json({
        success: true, 
        message: 'Logged out'
    })
})

// Admin Routers

//Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
})

//Update user profile => /api/v1/admin/user/:id 
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    //Update avatar: TODO
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false 
    })

    res.status(200).json({
        success: true
    })
})

//Delete user  => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    //Remove avatar from cloudinary - TODO
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();

    res.status(200).json({
        success:true,
        user
    })
})

