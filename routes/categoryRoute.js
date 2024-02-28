import  express  from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createCategoryController, delteCategory, getAllCategory, getSingleCategory, updateCategory } from "../controllers/categoryController.js"

const router=express.Router()

// router for create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

// router for update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategory)

// router for delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,delteCategory)

// get all category
router.get('/all-category',getAllCategory)

// get single category
router.get('/single-category/:id',getSingleCategory)


export default router
