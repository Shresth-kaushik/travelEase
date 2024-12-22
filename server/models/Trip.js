const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  availableSlots: { type: Number, required: true },
  cancellationPolicy: { type: String, required: true },
  image: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organizerName: { type: String, required: true }
});

module.exports = mongoose.model('Trip', tripSchema);
