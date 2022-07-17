const express = require("express");
const router = express.Router();

const {
  getBrands,
  getSingleBrand,
  newBrand,
  updateBrand,
  deleteBrand,
  getBrandBySlug
} = require("../controller/brandController.js");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/admin/brands").get(getBrands);

router .route("/admin/brand/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateBrand)
       .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBrand);

router.route("/brand/:id").get(getSingleBrand);

router
  .route("/admin/brands/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newBrand);


module.exports = router;
