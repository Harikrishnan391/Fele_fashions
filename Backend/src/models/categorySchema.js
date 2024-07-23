import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
