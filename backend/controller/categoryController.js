const Category = require("../models/category");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const slugify = require("slugify");

//Get all categories    => api/v1/categories
exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  const categoriesCount = categories.length;

  res.status(200).json({
    success: true,
    categoriesCount,
    categories,
  });
});

//get single product  =>    api/v1/category/:id
exports.getSingleCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Không tìm thấy loại sản phẩm", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

//Create new category    => api/v1/admin/category/new
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.slug = slugify(req.body.name);

  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

//Update category    =>    api/v1/admin/category/:id  //kiểu put
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  req.body.slug = slugify(req.body.name);

  if (!category) {
    return next(new ErrorHandler("Loại sản phẩm không tồn tại", 404));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

//Delete category    =>    /api/v1/admin/category/:id   //delete
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Không tồn tại loại sản phẩm", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Đã xóa thành công loại sản phẩm",
  });
});
