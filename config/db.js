import mongoose from "mongoose"
import colors from "colors"

const connectDB =async ()=>{
    try {
        const dbname="Homeshoppy"
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connection to MongoDB ${conn.connection.host}`.blue)
        
    } catch (error) {
        console.log(`error in mongodb ${error}`.red)
    }
}       
export default  connectDB