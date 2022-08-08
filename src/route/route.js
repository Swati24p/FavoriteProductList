const express = require("express")
const router = express.Router();
const {createUser,userlogin} = require("../controller/userController.js")
const middleware = require("../middleware/auth.js")
const {createProduct, getAllProduct, getFavProduct} = require("../controller/productController.js")


// register, login & authenticate user
router.post("/register", createUser)
router.post("/login", userlogin)

//Product( FEATURE-2 )
router.post("/product/:userId",createProduct)
router.get("/products/all", getAllProduct)
router.get("/product/:userId/favorite",getFavProduct)


module.exports = router;