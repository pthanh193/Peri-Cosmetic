const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên loại sản phẩm"],
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    index: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
