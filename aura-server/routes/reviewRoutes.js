import express from 'express';
import Review from '../models/review.js';

const router = express.Router();

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reviews by product ID
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product_id: req.params.productId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reviews by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  try {
    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      product_id: req.body.product_id,
      user: req.body.user
    });
    
    if (existingReview) {
      return res.status(400).json({ 
        message: 'You have already reviewed this product'
      });
    }
    
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a review
router.put('/:id', async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Optional: Verify user ownership of review
    // if (review.user.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: 'Not authorized to update this review' });
    // }
    
    if (rating) review.rating = rating;
    if (title !== undefined) review.title = title;
    if (comment) review.comment = comment;
    
    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Optional: Verify user ownership of review
    // if (review.user.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: 'Not authorized to delete this review' });
    // }
    
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
