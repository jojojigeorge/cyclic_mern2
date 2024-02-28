import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { category } = req.body;
    console.log(category)
    if (!category) {
      return req.status(401).send({ message: "please enter category " });
    }
    const existingCategory = await categoryModel.findOne({ category });
    if (existingCategory) {
      return req.status(200).send({ message: "category  alredy exisiting", success: true });
    } else {
      const newCategory = await new categoryModel({
        category,
        slug: slugify(category),
      }).save();
      res.status(201).send({ success: true, message: "new category created", newCategory });
    }
  } catch (error) {
    res.status(501).send({
      success: false,
      message: "something is wrong in creating category",
      error,
    });
  }
};


export const updateCategory = async(req,res) => {
  try {
    const { category } = req.body
    const { id } = req.params
    const newcategory=await categoryModel.findByIdAndUpdate(id,{category,slug:slugify(category)},{new:true})
    res.status(200).send({success:true,message:'category name updated',newcategory})
  } catch (error) {
    console.log(error)
    res.status(500).send({success:false,message:'error in updating category name'})
  }
}

export const delteCategory=async(req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({success:true,message:'delete category'})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:'error in delete category',error})
    }
}


// get all category
export const getAllCategory=async(req,res)=>{
    try {
        const allcategory=await categoryModel.find({})
        // console.log(allcategory)
    res.status(200).send({success:true,message:'fetch all category',allcategory})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:'error in fetch all category',error})
    }
}

// get single category
export const getSingleCategory=async(req,res)=>{
    try {
        const {id}=req.params
        const singlecategory=await categoryModel.findById(id)
        res.status(200).send({success:true,message:'fetch single category',singlecategory})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:'error in get single category',error})
    }
}
