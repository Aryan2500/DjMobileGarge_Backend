const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const checkToken = require("../middleware/auth/checkTokenmiddleware")
const CheckUserType = require("../middleware/auth/checUserMiddleware");
/**
 * GET All The Products
 */
router.get('/' , productController.listAllProducts)


/**
 * Create New Product
 */
router.post("/", checkToken ,CheckUserType.UserIsAdmin, productController.createNewProduct);

/**
 * File Upload
 */
router.post("/media-upload", checkToken ,CheckUserType.UserIsAdmin, productController.uploadsFile);

/**
 * Update Product
 */
router.put("/:id",checkToken, CheckUserType.UserIsAdmin,productController.productUpdate);

/**
 * Delete Product
 */
router.delete("/:id", checkToken ,CheckUserType.UserIsAdmin, productController.productDelete)


module.exports = router;
