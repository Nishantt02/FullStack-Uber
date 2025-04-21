
import { Router } from "express";
import { body, query } from "express-validator";
import { verifyToken,verifycaptain } from "../middlewares/auth.middlewares.js";
import { registerRides} from "../controllers/rides.controllers.js";
import { confirmRide } from "../controllers/rides.controllers.js";
import { fare } from "../controllers/rides.controllers.js";
import { startingride } from "../controllers/rides.controllers.js";
import { endingRide } from "../controllers/rides.controllers.js";

const router = Router();

router.post(
    '/create',
    verifyToken,
    [
        body('origin').isString().isLength({ min: 3 }).withMessage('Invalid origin address'),
        body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
        body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type')
    ],
    registerRides
);

router.get('/get-fare',
    verifyToken,[
        query('origin').isString().isLength({min:3}).withMessage("Inavlid pickup point"),
        query('destination').isString().isLength({min:3}).withMessage("Inavlid destination point")
    ],
    fare
);

router.post('/confirm',
      verifycaptain,
    
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmRide
)

router.get('/start-ride',
    verifycaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 3, max: 6 }).withMessage('Invalid OTP'),
    startingride
)

router.post('/end-ride',
    verifycaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    endingRide
)
export default router;
