const Brand = require("../models/brand");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");
const slugify = require("slugify");
const Product = require('../models/product')


//Get all brands    => api/v1/brands
exports.getBrands = catchAsyncErrors(async (req, res, next) => {
  const brands = await Brand.find();

  const brandsCount = brands.length;

  res.status(200).json({
    success: true,
    brandsCount,
    brands,
  });
});

//get single brand  =>    api/v1/brand/:id
exports.getSingleBrand = catchAsyncErrors(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHandler("Không tìm thấy thương hiệu", 404));
  }

  res.status(200).json({
    success: true,
    brand,
  });
});

//Create new brand    => api/v1/admin/brand/new
exports.newBrand = catchAsyncErrors(async (req, res, next) => {
  const image = req.body.image;

  
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "brands",
  });

  const imageLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  // const imageLink = {
  //   public_id: "/brands/simple_logo_x2friw",
  //   url: "https://res.cloudinary.com/thanhscloud/image/upload/v1646921489/brands/simple_logo_x2friw.jpg"
  // };

  req.body.image = imageLink;

  req.body.user = req.user.id;
  req.body.slug = slugify(req.body.name);

  const brand = await Brand.create(req.body);

  res.status(201).json({
    success: true,
    brand,
  });
});

//Update brand    =>    api/v1/admin/brand/:id  //kiểu put
exports.updateBrand = catchAsyncErrors(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHandler("Thương hiệu không tồn tại", 404));
  }

  const image = req.body.image;

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "brands",
  });

  const imageLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.image = imageLink;
  req.body.slug = slugify(req.body.name);

  brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    brand,
  });
});

//Delete brand    =>    /api/v1/admin/brand/:id   //delete
exports.deleteBrand = catchAsyncErrors(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHandler("Không tồn tại thương hiệu", 404));
  }

  await brand.remove();

  res.status(200).json({
    success: true,
    message: "Đã xóa thành công thương hiệu",
  });
});
