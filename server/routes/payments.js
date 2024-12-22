const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const { authenticateToken } = require('../middleware/auth');

dotenv.config(); // Load environment variables from .env file

const router = express.Router();

// Initialize Razorpay with key_id and key_secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new payment order
router.post('/create-order', authenticateToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ message: 'Error creating payment order' });
  }
});

// Verify payment signature
router.post('/verify', authenticateToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingDetails
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Create booking records
      const bookingPromises = bookingDetails.map(async (detail) => {
        const booking = new Booking({
          user: req.user.id,
          trip: detail.tripId,
          quantity: detail.quantity,
          totalAmount: detail.amount,
          status: 'confirmed',
          paymentId: razorpay_payment_id
        });
        return booking.save();
      });

      const bookings = await Promise.all(bookingPromises);

      // Create payment record
      const payment = new Payment({
        user: req.user.id,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        amount: bookingDetails.reduce((total, item) => total + item.amount, 0),
        status: 'completed',
        paymentMethod: 'razorpay', // Add this line
        booking: bookings[0]._id // Add this line, assuming one booking per payment
      });
      await payment.save();

      res.json({
        message: "Payment verified successfully",
        bookings
      });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
});

// Calculate refund amount
router.get('/calculate-refund/:bookingId', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate('trip');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const tripStartDate = new Date(booking.trip.startDate);
    const today = new Date();
    const daysUntilTrip = Math.ceil((tripStartDate - today) / (1000 * 60 * 60 * 24));

    let refundPercentage = 0;
    if (daysUntilTrip >= 15) {
      refundPercentage = 100;
    } else if (daysUntilTrip >= 7) {
      refundPercentage = 50;
    }

    const refundAmount = (booking.totalAmount * refundPercentage) / 100;

    res.json({
      refundAmount,
      refundPercentage
    });
  } catch (error) {
    console.error('Error calculating refund:', error);
    res.status(500).json({ message: 'Error calculating refund' });
  }
});

module.exports = router;
