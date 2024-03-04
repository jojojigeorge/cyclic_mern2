import mongoose from "mongoose"

const orderSchema =new mongoose.Schema({
    products:[{
        type:mongoose.ObjectId,
        ref:'Product'
    }],
    payment:{},

    buyer:{
        type:mongoose.ObjectId,
        ref:'users'
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing","Order placed","Shipping","Deliverd","Cancel"]
    }

},{timestamps:true})

export default mongoose.model('Order',orderSchema)