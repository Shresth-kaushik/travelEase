const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // Sign the JWT and send it to the client
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // Sign the JWT and send it to the client
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server error');
  }
};
