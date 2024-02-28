import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable';
import { BraintreePaymentController, BraintreeTokenController, createProductController, deleteProduct, filterProductByPriceCategory, getAllProduct, getProductDetails, getProductPhoto, getSimilarProducts, productListController, productSearch, updateProductController } from "../controllers/ProductController.js";

const router=express.Router()
// payment routes token
router.get("/braintree/token",BraintreeTokenController)

// payment 
router.post("/braintree/payment",requireSignIn,BraintreePaymentController)

// create new product
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)

// updating product 
router.put("/update-product/:id",requireSignIn,isAdmin,formidable(),updateProductController)

// get all product 
router.get("/get-allproduct",getAllProduct)

// get single product details
router.get("/get-productdetails/:slug",getProductDetails)

// delete product
router.delete("/delete/:id",requireSignIn,isAdmin,deleteProduct)

// get photo product
router.get("/getproduct-photo/:id",getProductPhoto)

// filter product by price and category
router.post("/filter-product",filterProductByPriceCategory)

// product per page
router.get("/product-list/:page",productListController)

// search product
router.get("/search/:keyword",productSearch)

// similar product
router.get("/similar-product/:pid/:category",getSimilarProducts)




export default router