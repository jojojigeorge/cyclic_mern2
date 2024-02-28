import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import dotenv from 'dotenv'
import braintree from "braintree";

dotenv.config()

// import * as fs from 'fs'
// import {readFileSync} from 'fs'


// braintree payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MARCHANT_KEY,
    publicKey:process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

// braintree gateway api
export const BraintreeTokenController=async(req,res)=>{
    try {
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err)
            }else{
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// braintree payment
export const BraintreePaymentController=async(req,res)=>{
    try {
        const {cart,nonce}=req.body
        let total=0
        cart.map(i=>{total+=i.price})
        let newTransaction=gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
            
        },
        function(error,result){
            if(result){
                const order=new orderModel({
                    product:cart,
                    payment:result,
                    buyer:req.user._id
                }).save()
                res.json({ok:true})
            }else{
                res.status(500).send(error)
            }
        }
        )
    } catch (error) {
        console.log(error)
    }
}

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;
    // console.log(photo)
    // console.log('inside router',req.fields)
    if (!name || !description || !price || !category || !quantity || !shipping) {
      res.status(500).send({ success: false, message: "Please enter required field" });
    }
    if (photo && photo.size > 1000000) {
      res.status(500).send({ success: false, message: "Error in uploaded photo" });
    }
    const newProduct = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }
    await newProduct.save();
    res.status(200).send({ success: true, message: "New product added", newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in creating new product", error });
  }
};

// get all product
export const getAllProduct = async (req, res) => {
  try {
    const allproduct = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 });

    res.status(200).send({ success: true, message: "All product fetched", counTotal: allproduct.length, allproduct });
  } catch (error) {
    res.status(500).send({ success: false, message: "error in get all product" });
  }
};

// get single product details
export const getProductDetails = async (req, res) => {
  console.log(req.params);
  try {
    // const singleproduct=await productModel.findOne({slug:req.params.slug}).select("-photo")
    const singleproduct = await productModel.findOne({ slug: req.params.slug }).populate("category").select("-photo");
    res.status(200).send({ success: true, message: "single product details fetched", singleproduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error in get single product", error });
  }
};

// search  product details [header]
export const productSearch = async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  try {
    const searchresult = await productModel.find({ $or: [{ name: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }] }).select("-photo");
    // const singleproduct=await productModel.findOne({slug:req.params.slug}).populate('category').select("-photo")
    res.status(200).send({ success: true, message: "search product details fetched", searchresult });
    // res.json(searchresult)
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error search product", error });
  }
};

// search  similar product
export const getSimilarProducts = async (req, res) => {
  const { pid, category } = req.params;
  try {
    const similarproducts = await productModel
      .find({ category: category, _id: { $ne: pid } })
      .select("-photo")
      .limit(4)
      .populate("category");
    res.status(200).send({ success: true, message: "similar product  fetched", similarproducts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error similar search product", error });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({ success: true, message: "product deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error in delete product", error });
  }
};

// get product photo
export const getProductPhoto = async (req, res) => {
  try {
    const productphoto = await productModel.findById(req.params.id).select("photo");
    if (productphoto) {
      res.set("Content-type", productphoto.photo.contentType);
      res.status(200).send(productphoto.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error in get photo", error });
  }
};

// product list per page
export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const count = await productModel.find({});
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({ success: true, message: "fetch product data per page", countTotal: count.length, products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error in list product page", error });
  }
};

// filter product by price and category
export const filterProductByPriceCategory = async (req, res) => {
  try {
    // console.log('req.body',req.body,'req.fields',req.fields)
    const { selectedcat, radio } = req.body;
    // console.log(req.body)
    let args = {};
    if (selectedcat.length > 0) args.category = selectedcat;
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args).select("-photo");
    res.status(200).send({ success: true, message: "filtered successfully", products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error filter by price and category", error });
  }
};

// update product details
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;
    if (!name || !description || !price || !category || !quantity || !shipping) {
      res.status(500).send({ success: false, message: "Please enter required field" });
    }
    if (photo && photo.size > 1000000) {
      res.status(500).send({ success: false, message: "Error in uploaded photo" });
    }
    const newProduct = await productModel.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(name) }, { new: true });
    // const newProduct=new productModel({...req.fields,slug:slugify(name)})
    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }
    await newProduct.save();
    res.status(200).send({ success: true, message: " product updateted", newProduct });
  } catch (error) {
    console.log(error);
    // res.status(500).send({success:false,message:"Error in updating product",error})
  }
};

