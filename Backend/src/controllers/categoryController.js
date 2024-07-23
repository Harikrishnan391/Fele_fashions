import Category from "../models/categorySchema.js";

export const saveCategory = async (req, res) => {
  try {
    const { categoryId, categoryName } = req.body;
    const newCategory = new Category({
      categoryId,
      categoryName,
    });

    await newCategory.save();

    res.json({ message: "Category saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

/**
 * Retrieves a list of categories along with the total count.
 * It performs the following operations:
 * 1. Counts the total number of categories.
 * 2. Retrieves the category documents with the `_id` field excluded
 * 
 * @param {Object} req - The request object, typically containing request headers, parameters, and body.
 * @param {Object} res - The response object, used to send the JSON response back to the client.
 * @returns {Object} - A JSON object containing the total count of categories and the list of categories.
 *
 * @throws {Error} - Returns a 500 status with an error message if an issue occurs during aggregation.
 */

export const listCategories = async (req, res) => {
  try {
    const result = await Category.aggregate([
      {
        $facet: {
          count: [{ $count: "totalCategories" }],
          categories: [{ $project: { _id: 0 } }],
        },
      },
    ]);

    const count = result[0]?.count[0]?.totalCategories || 0;

    const categories = result[0]?.categories || [];

    const data = {
      totalCategories: count,
      categories,
    };

    return res.status(200).json(data);
  } catch (error) {
    console.error(`Error fetching categories: ${error.message}`);
    return res.status(500).json({ message: "Error fetching categories" });
  }
};
