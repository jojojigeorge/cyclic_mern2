import mongoose from "mongoose"

const orderSchema =new mongoose.Schema({
    product:[{
        type:mongoose.ObjectId,
        ref:'Product'
    }],
    payment:{},

    product:[{
        type:mongoose.ObjectId,
        ref:'users'
    }],
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing","Shipping","Deliverd","Cancel"]
    }

},{timestamps:true})

export default mongoose.model('Order',orderSchema)