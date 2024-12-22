const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  cancellationDate: { type: Date },
  paymentId: { type: String, required: true },
  refundAmount: { type: Number },
  refundPercentage: { type: Number }
});

export default mongoose.model('Booking', bookingSchema);

