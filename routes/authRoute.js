import express from "express";
import registerController, { allOrderController, forgotPasswordController, loginController, testController, updateOrderstatusController, updateUserDetailsController, userOrderController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router =express.Router()

// change status of order
router.put("/update-orderstatus/:orderId",requireSignIn,isAdmin,updateOrderstatusController) 


// all orders in admin page
router.get('/all-order',requireSignIn,isAdmin,allOrderController)

// get all order in user page
router.get('/user-order',requireSignIn,userOrderController)

// routing for register user
router.post('/register',registerController)

// routing for login user
router.post('/login',loginController)

// forgot password
router.post('/forgot-password',forgotPasswordController)

// protected routes user
router.get('/user-auth',requireSignIn,(req,res)=>{res.status(200).send({ok:true})})

// protected routes admin role
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{res.status(200).send({ok:true})})

// routing for test
router.get('/test',requireSignIn,isAdmin,testController)

// update user details
router.put("/profile",requireSignIn,updateUserDetailsController)

export default router