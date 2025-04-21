import axios from 'axios'
import captainModel from '../models/caption.models.js';

async function getAddressCoordinates(address) {
    const apiKey = process.env.GOOGLE_MAP_API; 
    if (!apiKey) {
        throw new Error('Missing Google Maps API key in environment variables.');
    }

 const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
  
 try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
        const location = response.data.results[ 0 ].geometry.location;
        return {
            ltd: location.lat,
            lng: location.lng
        };
    } else {
        throw new Error('Unable to fetch coordinates');
    }
} catch (error) {
    console.error(error);
    throw error;
}
}


async function getDistanceTime(origin, destination) {
    if (!origin || !destination) {
        throw new Error("Origin or destination not found");
    }

    const apiKey = process.env.GOOGLE_MAP_API;
    if (!apiKey) {
        throw new Error("Missing Google Maps API key in environment variables.");
    }
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    console.log("Google API Key:", apiKey);

    try {
        const response = await axios.get(url);
        console.log("Google Distance Matrix API Response:", response.data); // Debugging log

        if (response.data.status === "OK") {
            const result = response.data.rows[0].elements[0];

            if (result.status === "ZERO_RESULTS" || result.status === "NOT_FOUND") {
                throw new Error("No routes found between origin and destination.");
            }

            return {
                distance: result.distance?.text || "Distance not available",
                duration: result.duration?.text || "Duration not available"
            };
        } else {
            throw new Error(`Google API Error: ${response.data.status}`);
        }
    } catch (err) {
        console.error("Error fetching distance and time:", err.message);
        throw err;
    }
}


async function getAutoCompleteSuggestions(input) {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
         } 
        else {
            return[]
         }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

 async function captaindetails (ltd, lng, radius)  {

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [29.039674,78.758316], radius / 6371 ]
            }
        }
    });

    return captains;


}

export { getAddressCoordinates, captaindetails ,getAutoCompleteSuggestions,getDistanceTime};
