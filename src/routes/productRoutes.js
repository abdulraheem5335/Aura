import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Add a helper middleware to clean up any accidentally empty image URLs
router.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (req.body.images && Array.isArray(req.body.images)) {
      req.body.images = req.body.images.filter(img => img !== '');
    }
  }
  next();
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products by category slug
router.get('/category/:slug', async (req, res) => {
  try {
    const categoryMap = {
      'men-sale': 'Men Sale',
      'diners-men-polo': 'Diners Men Polo',
      'men-unstiched-fabric-sale': 'Men Unstitched Fabric Sale',
      'diners-men-accessories': 'Diners Men Accessories',
      'fragrance-women': 'Fragrance Women',
      'women-sale': 'Women Sale',
      'sale-women': 'Sale Women'
    };

    const categoryName = categoryMap[req.params.slug];

    if (!categoryName) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await Product.find({ category: categoryName });
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

router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new route for cleaning up all product images in one go
router.post('/cleanup-images', async (req, res) => {
  try {
    const products = await Product.find({});
    let updatedCount = 0;
    
    for (const product of products) {
      const hasEmptyImages = product.images.some(img => img === '');
      
      if (hasEmptyImages) {
        const filteredImages = product.images.filter(img => img !== '');
        await Product.updateOne(
          { _id: product._id },
          { $set: { images: filteredImages } }
        );
        updatedCount++;
      }
    }
    
    res.json({ message: `Updated ${updatedCount} products`, success: true });
  } catch (error) {
    console.error('Error cleaning up images:', error);
    res.status(500).json({ message: error.message, success: false });
  }
});

export default router;
