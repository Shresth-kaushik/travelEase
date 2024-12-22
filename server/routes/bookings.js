const express = require('express');
const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('trip');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (trip.availableSlots <= 0) {
      return res.status(400).json({ message: 'No available slots for this trip' });
    }
    const booking = new Booking({
      user: req.user.id,
      trip: tripId
    });
    await booking.save();
    trip.availableSlots -= 1;
    await trip.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Booking failed', error: error.message });
  }
});

router.post('/cancel/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const trip = await Trip.findById(booking.trip);
    const today = new Date();
    const tripStartDate = new Date(trip.startDate);
    const daysDifference = Math.ceil((tripStartDate - today) / (1000 * 60 * 60 * 24));

    let refundPercentage = 0;
    if (daysDifference >= 15) {
      refundPercentage = 100;
    } else if (daysDifference >= 7) {
      refundPercentage = 50;
    }

    booking.status = 'cancelled';
    booking.cancellationDate = today;
    booking.refundPercentage = refundPercentage;
    await booking.save();

    trip.availableSlots += 1;
    await trip.save();

    res.json({ message: 'Booking cancelled successfully', refundPercentage });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
});

module.exports = router;
