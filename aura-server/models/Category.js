import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  count: Number,
  gender_target: String,
  parent: String,
  product_type: String,
  slug: String
});

const Category = mongoose.model('Category', categorySchema);
export default Category;  // Using ES Module export syntax
