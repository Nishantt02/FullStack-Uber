import { getAddressCoordinates ,getDistanceTime,getAutoCompleteSuggestions,captaindetails} from "../services/map.service.js";
import { validationResult } from "express-validator";

const getCoordinate = async (req, res) => {

    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    const { address } = req.query; // Extract address from query parameters

    if (!address) {
        return res.status(400).json({ message: "Address is required" }); // Handle missing address case
    }

    try {
        const coordinates = await getAddressCoordinates(address); // Fetch coordinates
        res.status(200).json(coordinates); // Send response
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




const getdistance = async (req, res) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract query params
        const { origin, destination } = req.query;


        if (!origin || !destination) {
            return res.status(400).json({ message: "Origin and destination are required." });
        }

        console.log("Origin:", origin);
        console.log("Destination:", destination);

        // Get distance & time
        const distanceTime = await getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);
    } catch (err) {
        console.error("Error in getdistance:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};



 const getCompleteSuggestions = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        if(!input){
            return res.status(400).json({message:"error"})
        }
        const suggestions = await getAutoCompleteSuggestions(input);
        console.log("Suggestions:", suggestions);
        
        res.status(200).json({suggestions});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { getCoordinate,getdistance,getCompleteSuggestions };
