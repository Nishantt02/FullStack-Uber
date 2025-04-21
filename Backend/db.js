import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectdb=async(res,req)=>{

    try {
        const connecting=await mongoose.connect(process.env.mongodb_URI)
        console.log(" connected database ")
    } catch (error) {
       console.log(error.message) 
    }
}

export default connectdb

// here is the code to connect to mongoose