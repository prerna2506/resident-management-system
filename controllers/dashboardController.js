import { db } from '../models/db.js';

export const getAnnouncements = (req, res) => {
  res.json(db.announcements);
};

export const getDues = (req, res) => {
  res.json(db.dues);
};
