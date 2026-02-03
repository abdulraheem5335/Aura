import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ order_number: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ created_at: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      items,
      total_amount,
      payment_method,
      user // optional
    } = req.body;

    if (
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !shipping_address ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !total_amount ||
      !payment_method
    ) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    // Generate a unique order number (e.g., ORD-YYYYMMDD-XXXX)
    const date = new Date();
    const dateStr = date.getFullYear().toString() +
                   (date.getMonth() + 1).toString().padStart(2, '0') +
                   date.getDate().toString().padStart(2, '0');
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${dateStr}-${randomPart}`;

    const orderData = {
      order_number: orderNumber,
      items,
      total_amount,
      shipping_address,
      payment_method,
      ...(user ? { user } : {}),
      customer_name,
      customer_email,
      customer_phone
    };

    const order = new Order(orderData);

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order creation error:", error); // Add this line
    res.status(400).json({ message: error.message });
  }
});

// Update order status
router.patch('/:orderNumber', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status field is required' });
    }
    
    const order = await Order.findOne({ order_number: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = status;
    order.updated_at = Date.now();
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel an order
router.post('/:orderNumber/cancel', async (req, res) => {
  try {
    const order = await Order.findOne({ order_number: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Only allow cancellation of pending or processing orders
    if (order.status !== 'pending' && order.status !== 'processing') {
      return res.status(400).json({ 
        message: `Cannot cancel order in ${order.status} status`
      });
    }
    
    order.status = 'cancelled';
    order.updated_at = Date.now();
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
