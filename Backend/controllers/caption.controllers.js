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

const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) 
    {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await captain.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = captain.generateAuthToken();
  res.cookie("captain_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "Strict",
});

  res.status(200).json({ token, captain });
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
