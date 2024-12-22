const Trip = require('../models/Trip');

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    const { name, description, startDate, endDate, price, availableSlots, image } = req.body;
    const organizerId = req.user.id;

    // Validate input
    if (!name || !description || !startDate || !endDate || !price || !availableSlots || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new trip
    const trip = new Trip({
      name,
      description,
      startDate,
      endDate,
      price,
      availableSlots,
      image,
      organizer: organizerId,
    });

    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    console.error('Create trip error:', err.message);
    res.status(500).send('Server error');
  }
};

// Get all trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ startDate: 1 });
    res.json(trips);
  } catch (err) {
    console.error('Get trips error:', err.message);
    res.status(500).send('Server error');
  }
};

// Get a trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (err) {
    console.error('Get trip by ID error:', err.message);
    res.status(500).send('Server error');
  }
};

// Update a trip
exports.updateTrip = async (req, res) => {
  try {
    const { name, description, startDate, endDate, price, availableSlots, image } = req.body;

    let trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check if the user is the organizer
    if (trip.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update trip details
    trip.name = name || trip.name;
    trip.description = description || trip.description;
    trip.startDate = startDate || trip.startDate;
    trip.endDate = endDate || trip.endDate;
    trip.price = price || trip.price;
    trip.availableSlots = availableSlots || trip.availableSlots;
    trip.image = image || trip.image;

    await trip.save();
    res.json(trip);
  } catch (err) {
    console.error('Update trip error:', err.message);
    res.status(500).send('Server error');
  }
};

// Delete a trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check if the user is the organizer
    if (trip.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await trip.remove();
    res.json({ message: 'Trip removed successfully' });
  } catch (err) {
    console.error('Delete trip error:', err.message);
    res.status(500).send('Server error');
  }
};
