import express from 'express';
import { getPaymentsHistory } from '../controllers/paymentsController.js';

const router = express.Router();

router.get('/history', getPaymentsHistory);

export default router;
