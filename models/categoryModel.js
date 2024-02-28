import mongoos from "mongoose"

const categorySchema =new mongoos.Schema({
    category:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }

},{timestamps:true})

export default mongoos.model('Category',categorySchema)