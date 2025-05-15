import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true // Should be required
  },
  title: {
    type: String, 
    required: true // Should be required
  },
  size: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: {
    type: String
  }
});

const orderSchema = new mongoose.Schema({
  order_number: {
    type: String,
    required: true, // Should be required
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: null
  },
  // Add customer fields for guest checkout
  customer_name: {
    type: String,
    required: true
  },
  customer_email: {
    type: String,
    required: true
  },
  customer_phone: {
    type: String,
    required: true
  },
  items: [orderItemSchema],
  total_amount: {
    type: Number,
    required: true
  },
  shipping_address: {
    street: String,
    city: String,
    state: { type: String, required: false },
    postal_code: String,
    country: String
  },
  payment_method: {
    type: String,
    enum: ['credit_card', 'debit_card', 'cash_on_delivery'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
