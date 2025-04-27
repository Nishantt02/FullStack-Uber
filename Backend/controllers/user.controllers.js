import User from "../models/user.models.js";
import { validationResult } from "express-validator";
import { cookie } from "express-validator";
import CreateUser from "../services/user.services.js";
import Black from "../models/BlacklistToken.models.js";
// import verifyToken from "../middlewares/auth.middlewares.js";

// Register User Controller
// This controller is responsible for registering a new user
const registerUser = async (req, res) => {
    // Check if there are any validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Destructure the incoming user data from the request body
        console.log(req.body)
        const { fullName, email, password } = req.body;
        const isUserAlready = await User.findOne({ email });

        if (isUserAlready) {
            return res.status(400).json({ message: 'User already exist' });
        }

        // Hash the password using the static method from the User model
         const hashedPassword = await User.hashPassword(password);

        // Call the CreateUser service to create a new user
        const user = await CreateUser({ fullName, email, password: hashedPassword });

        // Generate authentication token for the user
        const token = await user.generateAuthToken(); // Make sure to await this if it's async

        // Respond with the token and user data
        res.status(201).json({ token, user });
    } 
    catch (error) {
        // If there's an error, respond with a 500 status and error message
        res.status(500).json({ error: error.message });
    }
};

// loginuser

const loginuser=async(req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
   
    try{
        const{email,password}=req.body

        //used to find the user by email exsist in database or not and include password
        const user=await User.findOne({email}).select('+password')
        if(!user){
            return res.status(401).json({message:'Invalid email or password'})
        }
        // used to match the password or compare the password 
        const ismatch=await user.comparePassword(password)
        if(!ismatch){
            return res.status(401).json({message:'Invalid email or password'})
        }

        const token=await user.generateAuthToken()
        res.cookie("user_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict",
        });
        
        res.status(200).json({token,user})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
};

const getUserProfile=async(req,res)=>{

    res.status(200).json({user:req.user})
    // on the basis of the token we get the user profile
}

const logout=async(req,res)=>{
    // token cookie is removed from the browser and added to the blacklist
    res.clearCookie('token');
    // recieve the token from two places either from the cookie or from the header
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];
    // send it to the blacklist model to prevent access 
    await Black.create({token})
    res.status(200).json({message:'Logout successfull'})
}
export  {registerUser ,loginuser,getUserProfile,logout}


