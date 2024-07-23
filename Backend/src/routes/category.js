import express from "express";
import {
  saveCategory,
  listCategories
} from "../controllers/categoryController.js";
import apiKeyMiddleware from "../middleware/verify-api_key.js";

const router = express.Router();

router.get("/categories", apiKeyMiddleware, listCategories);
router.post("/category/save", apiKeyMiddleware, saveCategory);

export default router;
