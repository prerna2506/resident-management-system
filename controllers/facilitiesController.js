import { db } from '../models/db.js';

export const getFacilities = (req, res) => {
  res.json(db.facilities);
};

export const getBookings = (req, res) => {
  res.json(db.bookings);
};

export const createBooking = (req, res) => {
  const newBooking = {
    id: Date.now(),
    facility: req.body.facility,
    date: req.body.date,
    time: req.body.time,
    status: 'Confirmed',
    icon: '✅'
  };
  db.bookings.unshift(newBooking);
  res.status(201).json(newBooking);
};
