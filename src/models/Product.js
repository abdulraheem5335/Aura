import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  url: String,
  images: [String],
  price_from: Number,
  variants: [{
    size: String,
    sku: String,
    price: Number,
    available: Boolean
  }],
  category: String
});

const Product = mongoose.model('Product', productSchema);
export default Product;  // Using ES Module export syntax
