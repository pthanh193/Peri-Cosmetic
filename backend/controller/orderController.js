const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { 
        orderItems,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id          
    })

    res.status(200).json({
        success: true, 
        order
    })
})

//Get sigle order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order) {
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

//Get logged in user orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    
    const orders = await Order.find({ user: req.user.id});
   
    res.status(200).json({
        success: true,
        orders
    })
})

//---------------ADMIN------------------

//Get all orders => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//Upddate / Process order - ADMIN => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);


   order.orderItems.forEach(async item => {
       await updateStock(item.product, item.quantity)
   })

   order.orderStatus = req.body.status;

   if(order.orderStatus === 'Giao hàng thành công'){
    //return next(new ErrorHandler('You have already delivered this order',400))
    order.deliveredAt = Date.now();
    }

   await order.save()

    res.status(200).json({
        success: true,
    })
})

//Cancel order
exports.cancelOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    order.orderStatus = "Đã hủy";
    order.deliveredAt = Date.now();

    order.orderItems.forEach(async item => {
    await cancelStock(item.product, item.quantity)
    })
   await order.save()

    res.status(200).json({
        success: true,
    })
})

async function updateStock (id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;

    await product.save({validateBeforeSave: false})
    }

async function cancelStock (id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock + quantity;

    await product.save({validateBeforeSave: false})
}


//Delete order=> /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order) {
        return next(new ErrorHandler('Không tồn tại đơn hàng', 404))
    }

    await order.remove();

    res.status(200).json({
        success: true,
    })
})