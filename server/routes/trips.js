const express = require('express');
const Trip = require('../models/Trip');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { organizer } = req.query;
    const query = organizer ? { organizer } : {};
    const trips = await Trip.find(query).sort({ startDate: 1 });
    res.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: 'Error fetching trips', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip details', error: error.message });
  }
});

router.post('/', authenticateToken, authorizeRole(['organizer']), async (req, res) => {
  try {
    const { name, description, startDate, endDate, price, availableSlots, cancellationPolicy, image } = req.body;
    const trip = new Trip({
      name,
      description,
      startDate,
      endDate,
      price,
      availableSlots,
      cancellationPolicy,
      image,
      organizer: req.user.id
    });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create trip', error: error.message });
  }
});

router.put('/:id', authenticateToken, authorizeRole(['organizer']), async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user.id },
      req.body,
      { new: true }
    );
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found or you are not authorized to edit this trip' });
    }
    res.json(trip);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update trip', error: error.message });
  }
});

router.delete('/:id', authenticateToken, authorizeRole(['organizer']), async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, organizer: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found or you are not authorized to delete this trip' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete trip', error: error.message });
  }
});

module.exports = router;
