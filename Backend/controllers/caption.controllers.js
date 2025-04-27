import captainModel from "../models/caption.models.js";
import captainService from "../services/caption.service.js";
import Black from "../models/BlacklistToken.models.js";
import { validationResult } from "express-validator";

const registerCaptain = async (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainModel.create({
    fullname,
    email,
    password: hashedPassword,
    vehicle,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({ token, captain });
};

// const loginCaptain = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { email, password } = req.body;
//   const captain = await captainModel.findOne({ email }).select("+password");
//   if (!captain) 
//     {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }
//   const isPasswordValid = await captain.comparePassword(password);
//   if (!isPasswordValid) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }
//   const token = captain.generateAuthToken();
//   res.cookie("token", token);
//   res.status(200).json({ token, captain });
// };


const loginCaptain = async (req, res) => {
  try {
    // Validate request inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find captain by email
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Validate password
    const isPasswordValid = await captain.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const payload = { _id: captain._id, role: 'captain' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set token in HTTP-only cookie (recommended for security)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // cookie will be secure in production
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      captain: {
        _id: captain._id,
        fullname: captain.fullname,
        email: captain.email,
        phone: captain.phone,
        // Add more fields if needed
      },
      token,
    });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
const captainProfile = async (req, res) => {
  res.status(200).json({ captain: req.captain });
};

const logoutCaptain = async (req, res) => {
  res.clearCookie("token");
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  await Black.create({ token });
  res.status(200).json({ message: "Logout successfully" });
};
export { registerCaptain, loginCaptain, captainProfile, logoutCaptain };
