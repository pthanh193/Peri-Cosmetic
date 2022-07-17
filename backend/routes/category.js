const express = require("express");
const router = express.Router();

const {
  getCategories,
  getSingleCategory,
  newCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController.js");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/categories").get(getCategories);
router.route("/category/:id").get(getSingleCategory);

router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

router
  .route("/admin/categories/new").post(isAuthenticatedUser, authorizeRoles("admin"), newCategory);

module.exports = router;
