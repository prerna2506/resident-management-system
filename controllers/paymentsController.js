import { db } from '../models/db.js';

export const getPaymentsHistory = (req, res) => {
  res.json(db.payments);
};
