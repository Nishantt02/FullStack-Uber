import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectdb=async(res,req)=>{

    try {
        await mongoose.connect(process.env.mongodb_URI, {
            autoIndex: false, // 🚀 Add this line
          });
        const connecting=await mongoose.connect(process.env.mongodb_URI)
        console.log(" connected database ")
    } catch (error) {
       console.log(error.message) 
    }
}

export default connectdb

// here is the code to connect to mongoose