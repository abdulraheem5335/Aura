import express from 'express';
import User from '../models/User.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add all frontend origins
  methods: ['GET', 'POST'],
  credentials: false
}));
router.use(bodyParser.json());

// Error handler for JSON parsing
router.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next();
});

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users - Create a new user
router.post('/', async (req, res) => {
  try {
    console.log('Received body:', req.body);
    
    const { name, email, password, phone } = req.body;
    
    // Validate the data
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Valid name is required' });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ message: 'Valid email is required' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'Valid password is required' });
    }

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone ? phone.trim() : null,
      role: 'customer'
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      userId: savedUser._id
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: error.code === 11000 ? 'Email already exists' : 'Error creating user'
    });
  }
});

export default router;
