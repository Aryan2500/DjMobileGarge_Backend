const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const checkToken = require("../middleware/auth/checkTokenmiddleware")
const CheckUserType = require("../middleware/auth/checUserMiddleware");
/**
 * GET All The Products
 */
router.get('/' , productController.listAllProducts)


module.exports = router;
