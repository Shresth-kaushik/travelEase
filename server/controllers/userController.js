// Create a new trip
exports.createTrip = async (req, res) => {
    try {
      const { name, description, startDate, endDate, price, availableSlots, image } = req.body;
      const organizerId = req.user.id;
  
      // Validate input
      if (!name || !description || !startDate || !endDate || !price || !availableSlots || !image) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Validate that startDate is before endDate
      if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ message: 'Start date must be before end date' });
      }
  
      // Ensure price and availableSlots are positive
      if (price <= 0 || availableSlots <= 0) {
        return res.status(400).json({ message: 'Price and available slots must be positive numbers' });
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
  
      // Validate that startDate is before endDate
      if (startDate && new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ message: 'Start date must be before end date' });
      }
  
      // Ensure price and availableSlots are positive
      if (price && (price <= 0)) {
        return res.status(400).json({ message: 'Price must be a positive number' });
      }
      if (availableSlots && (availableSlots <= 0)) {
        return res.status(400).json({ message: 'Available slots must be a positive number' });
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
  