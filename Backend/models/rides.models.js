// import mongoose from "mongoose";
// import captainModel from "../models/caption.models.js";
// import User from "./user.models.js";


// const rideSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   captain: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: " captainMode",
//   },
//   origin: {
//     type: String,
//     required: true,
//   },
//   destination: {
//     type: String,
//     required: true,
//   },
  
//   fare: {
//     type: Number,
//     required: true,
//   },

//   status: {
//     type: String,
//     enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
//     default: "pending",
//   },

//   duration: {
//     type: Number,
//     duration:0,
//   },

//   distance: {
//     type: Number,
    
//   }, 

//   paymentID: {
//     type: String,
//   },
//   orderId: {
//     type: String,
//   },
//   signature: {
//     type: String,
//   },

//   otp: {
//     type: String,
//     select: false,
//     required: true,
//   },
// });

// const Rides=mongoose.model("Rides",rideSchema)
// export default Rides;

import mongoose from "mongoose";


const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  
  fare: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },

  duration: {
    type: Number,
    duration:0,
  },

  distance: {
    type: Number,
    
  }, 

  paymentID: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },

  otp: {
    type: String,
    select: false,
    required: true,
  },
});

const Rides=mongoose.model("ride",rideSchema)
export default Rides;
