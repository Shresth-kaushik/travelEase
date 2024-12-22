const Booking = require('../models/Booking');
const Trip = require('../models/Trip');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { tripId, quantity } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!tripId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid input, tripId and quantity are required and quantity must be greater than 0' });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Check if there are enough available slots
    if (trip.availableSlots < quantity) {
      return res.status(400).json({ message: 'Not enough available slots' });
    }

    // Create the booking
    const booking = new Booking({
      user: userId,
      trip: tripId,
      quantity,
      totalAmount: trip.price * quantity,
    });

    await booking.save();

    // Update trip availability
    trip.availableSlots -= quantity;
    await trip.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error('Booking creation error:', err.message);
    res.status(500).send('Server error');
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('trip');
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }
    res.json(bookings);
  } catch (err) {
    console.error('Get bookings error:', err.message);
    res.status(500).send('Server error');
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure the user is authorized to cancel the booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Prevent cancellation of already cancelled bookings
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Update trip's available slots
    const trip = await Trip.findById(booking.trip);
    trip.availableSlots += booking.quantity;
    await trip.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (err) {
    console.error('Cancel booking error:', err.message);
    res.status(500).send('Server error');
  }
};
