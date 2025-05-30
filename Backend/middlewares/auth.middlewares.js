import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import Black from "../models/BlacklistToken.models.js";
import captainModel from "../models/caption.models.js";

// This middleware is used to verify the token of the user
// The token can be sent in the header or in the cookie
const verifyToken = async (req, res, next) => {
  // check the token in cookie and header both
  const token = req.cookies.user_token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const isBlacklisted = await Black.findOne({ token: token });

  if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    // decoded the token and get the user id for authentaion
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};



const verifycaptain = async (req, res, next) => {
  const token = req.cookies.captain_token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }
  console.log("recieved token")
  // const isBlacklisted = await Black.findOne({ token: token });
  // if (isBlacklisted) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token", decoded) 
    const captain = await captainModel.findById(decoded._id); // Corrected model usage
    if (!captain) {
      return res.status(401).json({ message: 'Captain not found' });
    }
    console.log("found captain",captain)
    req.captain = captain;
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export { verifyToken, verifycaptain };
