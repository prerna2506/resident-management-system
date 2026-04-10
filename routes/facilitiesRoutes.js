import express from 'express';
import { getFacilities, getBookings, createBooking } from '../controllers/facilitiesController.js';

const router = express.Router();

router.get('/', getFacilities);
router.get('/bookings', getBookings);
router.post('/bookings', createBooking);

export default router;
