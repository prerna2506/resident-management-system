import express from 'express';
import { getAnnouncements, getDues } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/announcements', getAnnouncements);
router.get('/dues', getDues);

export default router;
