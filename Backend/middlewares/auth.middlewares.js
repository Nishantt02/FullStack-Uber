import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import Black from "../models/BlacklistToken.models.js";
import captainModel from "../models/caption.models.js";

// This middleware is used to verify the token of the user
// The token can be sent in the header or in the cookie
// const verifyToken = async (req, res, next) => {
//   // check the token in cookie and header both
//   const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

//   if (!token) {
//     return res.status(401).json({ message: "Access Denied" });
//   }

//   const isBlacklisted = await Black.findOne({ token: token });

//   if (isBlacklisted) {
//       return res.status(401).json({ message: 'Unauthorized' });
//   }
//   try {
//     // decoded the token and get the user id for authentaion
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }
//     req.user = user;
//     return next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }

    console.log("Received token:", token);

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // 🚨 Check if the token role is 'user' 🚨
    if (decoded.role !== 'user') {
      return res.status(403).json({ message: 'Unauthorized: Not a User' });
    }

    // Find the user using ID
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    console.log("Found user:", user);

    req.user = user;
    return next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};


// const verifycaptain = async (req, res, next) => {
//   const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
//   if (!token) {
//     return res.status(401).json({ message: 'Access Denied' });
//   }
//   console.log("recieved token")
//   // const isBlacklisted = await Black.findOne({ token: token });
//   // if (isBlacklisted) {
//   //   return res.status(401).json({ message: 'Unauthorized' });
//   // }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("decoded token", decoded) 
//     const captain = await captainModel.findById(decoded._id); // Corrected model usage
//     if (!captain) {
//       return res.status(401).json({ message: 'Captain not found' });
//     }
//     console.log("found captain",captain)
//     req.captain = captain;
//     return next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// }

const verifycaptain = async (req, res, next) => {
  try {
    // Extract token from header or cookies
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }

    console.log("Received token:", token);

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // 🚨 Check if the token role is 'captain' 🚨
    if (decoded.role !== 'captain') {
      return res.status(403).json({ message: 'Unauthorized: Not a Captain' });
    }

    // Find the Captain using ID
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: 'Captain not found' });
    }

    console.log("Found captain:", captain);

    // Attach captain data to request
    req.captain = captain;
    return next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};


export { verifyToken, verifycaptain };
