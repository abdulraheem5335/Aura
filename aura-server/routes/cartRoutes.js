import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Get cart by user ID or session ID
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let cart;

    // Check if identifier is a valid MongoDB ObjectId (user ID)
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      cart = await Cart.findOne({ user: identifier });
    } else {
      // Otherwise, treat as session ID
      cart = await Cart.findOne({ session_id: identifier });
    }

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new cart
router.post('/', async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add item to cart
router.post('/:id/items', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items.push(req.body);
    cart.updated_at = Date.now();

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update item quantity in cart
router.put('/:cartId/items/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const { quantity } = req.body;
    if (quantity && quantity > 0) {
      item.quantity = quantity;
    } else if (quantity === 0) {
      cart.items.pull(req.params.itemId);
    }

    cart.updated_at = Date.now();
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/:cartId/items/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items.pull(req.params.itemId);
    cart.updated_at = Date.now();

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Clear cart
router.delete('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.updated_at = Date.now();

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
