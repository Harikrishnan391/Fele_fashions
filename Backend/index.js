import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import categoryRoutes from "./src/routes/category.js";
import ProductRoutes from "./src/routes/product.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;

//database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Mongo db is connected");
  } catch (error) {
    console.log("Mongodb database is connection failed", error);
  }
};

app.use("/api/product", categoryRoutes);
app.use("/api/product", ProductRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`App is running on to he port ${port}`);
});
