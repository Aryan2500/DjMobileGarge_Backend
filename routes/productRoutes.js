const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const checkToken = require("../middleware/auth/checkTokenmiddleware")


/**
 * GET All The Products
 */
router.get('/' , productController.listAllProducts)


/**
 * Create New Product
 */
router.post("/", checkToken , productController.createNewProduct);

/**
 * File Upload
 */
router.post("/media-upload", checkToken , productController.uploadsFile);

/**
 * Update Product
 */
router.put("/:id",checkToken, productController.productUpdate);

/**
 * Delete Product
 */
router.delete("/:id", checkToken ,productController.productDelete)
module.exports = router;
