import express from 'express';
import { body } from 'express-validator';
import {verifyToken} from '../middlewares/auth.middlewares.js';
import {registerUser,loginuser,getUserProfile,logout} from '../controllers/user.controllers.js';

const router = express.Router();

// express-validator is middleware that wraps around the express app and checks the request for any errors
// if there are any errors, it will return a 400 status code with the error message
router.post('/register', [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullName').isLength({ min: 5 }).withMessage('Full Name must be at least 5 characters long'),
    // body('fullname.lastName').isLength({ min: 5 }).withMessage('Last Name must be at least 5 characters long'),  // Add validation for last name if needed
], registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],loginuser)

// verifyToken is a middleware that checks if the user is authenticated
// If the user is authenticated, it will return the user profile
router.get('/profile',verifyToken,getUserProfile)
router.get('/logout',verifyToken,logout)

export default router;
