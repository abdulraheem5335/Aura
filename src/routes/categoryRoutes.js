import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get categories by gender target (MOVED BEFORE THE ID ROUTE)
router.get('/gender/:gender', async (req, res) => {
  try {
    // Create a case-insensitive regex for the gender parameter
    const genderRegex = new RegExp(`^${req.params.gender}$`, 'i');
    const categories = await Category.find({ gender_target: genderRegex });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get category by ID (NOW COMES AFTER THE SPECIFIC ROUTE)
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
