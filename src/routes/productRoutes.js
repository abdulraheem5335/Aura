import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products by category - MOVED BEFORE THE ID ROUTE
router.get('/category/:category', async (req, res) => {
  try {
    // Create a case-insensitive regex for better matching
    const categoryRegex = new RegExp(`^${req.params.category}$`, 'i');
    const products = await Product.find({ category: categoryRegex });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products by price range - ALSO BEFORE THE ID ROUTE
router.get('/price/:min/:max', async (req, res) => {
  try {
    const { min, max } = req.params;
    const products = await Product.find({ 
      price_from: { $gte: Number(min), $lte: Number(max) } 
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID - NOW COMES AFTER THE SPECIFIC ROUTES
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
