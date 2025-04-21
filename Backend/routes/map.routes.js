import express from 'express';
import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middlewares.js';
import { query } from 'express-validator';
import { getCoordinate, getdistance, getCompleteSuggestions } from '../controllers/map.controllers.js';

const router = Router();


router.get('/get-coordinate',
    query('address').isString().isLength({ min: 3 }),
    verifyToken,
    getCoordinate
);

router.get('/get-distance-time', [
    query('origin').trim().notEmpty().withMessage("Origin is required").isString().isLength({ min: 3 }).withMessage("Origin must be at least 3 characters"),
    query('destination').trim().notEmpty().withMessage("Destination is required").isString().isLength({ min: 3 }).withMessage("Destination must be at least 3 characters"),
    verifyToken,
    getdistance
]);

router.get('/get-suggestions', [
    query('input').isString().isLength({ min: 3 }),
    verifyToken,
    getCompleteSuggestions
]);

export default router;
