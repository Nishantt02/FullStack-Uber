import { createrides, getfare } from "../services/rides.service.js";
import { captaindetails } from "../services/map.service.js";
import { getAddressCoordinates } from "../services/map.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { validationResult } from "express-validator";
import Rides from "../models/rides.models.js";
import { getconfirmedRides } from "../services/rides.service.js";
import { startride } from "../services/rides.service.js";
import { endRide } from "../services/rides.service.js";

const registerRides = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId, origin, destination, vehicleType } = req.body;

    try {
        const rides = await createrides({ User: req.user._id, origin, destination, vehicleType });
        res.status(201).json(rides);
        const pickupCoordinates = await getAddressCoordinates(origin);
        // console.log(pickupCoordinates);


        const captainsInRadius = await captaindetails(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        // console.log("captainradius ",captainsInRadius)

        // ride.otp = ""

        const rideWithUser = await Rides.findOne({ _id: rides._id }).populate('user');

        captainsInRadius.map(captain => {

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })
         console.log(rideWithUser)


    
     } 
    catch (error) {
        console.error(error); // Added logging for debugging
        //  res.status(500).json({ message: error.message });
    }
};

const fare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;
    if (!origin || !destination) {
        return res.status(400).json({ message: "Origin and destination are required" });
    }

    try {
        const estimatedFare = await getfare(origin, destination);
        return res.status(200).json(estimatedFare);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await getconfirmedRides({ rideId, captain: req.captain });
        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: rideId
        });

        res.status(200).json(ride);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const startingride=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startride({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const endingRide=async(req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {rideId} = req.query;
    
    if(!rideId){
        return res.status(400).json({message:"Ride ID is required"});
    }
    try{

        const ride=await endRide({rideId,captain:req.captain})
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-ended',
            data:ride
        })
        return res.status(200).json(ride);

    }
    catch(err){
        return res.status(500).json({message:err.message});
    }

}

export { registerRides, fare,confirmRide,startingride,endingRide };

