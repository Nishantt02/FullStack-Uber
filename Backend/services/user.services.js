import User from "../models/user.models.js";

// Create User Service
// This service is responsible for creating a new user in the database
const CreateUser = async ({ fullName, email, password }) => {

    // Check for missing required fields
    if (!fullName || !email || !password) {
        throw new Error("All fields are required");
    }

    // Create a new user document asynchronously
    const user = await User.create({
        fullName,
        email,
        password
    });

    // Return the created user
    return user;
};

export default CreateUser;
