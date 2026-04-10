import { db } from '../models/db.js';

export const getComplaints = (req, res) => {
  res.json(db.complaints);
};

export const createComplaint = (req, res) => {
  const newComplaint = {
    id: Date.now(),
    category: req.body.category || 'Unknown',
    urgency: req.body.urgency || 'Standard',
    subject: req.body.subject,
    description: req.body.description,
    status: 'OPEN',
    date: new Date().toLocaleDateString()
  };
  db.complaints.unshift(newComplaint);
  res.status(201).json(newComplaint);
};
