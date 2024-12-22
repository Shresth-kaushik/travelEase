const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const tripRoutes = require('./routes/trips');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payments');
const userRoutes = require('./routes/users');
const { authenticateToken } = require('./middleware/auth');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
app.use('/api/trips', tripRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', authenticateToken, bookingRoutes);
app.use('/api/payments', authenticateToken, paymentRoutes);
app.use('/api/users', authenticateToken, userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
