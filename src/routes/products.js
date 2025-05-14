import express from 'express';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get product by ID route
router.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const product = await Product.findById(id);
    console.log('Found product:', product);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products by category route
router.get('/category/:cname', async (req, res) => {
  try {
    const { cname } = req.params;
    const products = await Product.find({ category: cname });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;