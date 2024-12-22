const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  razorpayPaymentId: { type: String, required: true },
  razorpayOrderId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true }
});

export default mongoose.model('Payment', paymentSchema);

