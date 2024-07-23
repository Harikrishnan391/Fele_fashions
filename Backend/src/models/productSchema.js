import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
