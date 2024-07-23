import Category from "../models/categorySchema.js";
import Product from "../models/productSchema.js";

/**
 * Saves a new product to the database.
 * @param {Object} req - The request object containing the product details in the body.
 * @param {Object} res - The response object used to send a success or error response back to the client.
 * @returns {Object} - A JSON object with a success message if the product is saved successfully.
 *
 * @throws {Error} - Returns a 500 status with a failure message if an error occurs during the save operation.
 */

export const saveProduct = async (req, res) => {
  try {
    const { productName, price, productImage, brand, categoryId } = req.body;

    const lastProduct = await Product.findOne().sort({ productId: -1 });

    const newProductId = lastProduct ? lastProduct.productId + 1 : 1;

    const newProduct = new Product({
      productId: newProductId,
      productName,
      price,
      productImage,
      brand,
      categoryId,
    });

    await newProduct.save();

    res.status(200).json({ message: "product saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "failed to save product " });
  }
};


/**
 * Retrieves products for a specific category.
 * @param {Object} req - The request object, which contains query parameters.
 * @param {Object} res - The response object used to send the JSON response back to the client.
 * @returns {Object} - A JSON object containing the category ID and the list of products. If no category is found, returns an object with an empty products array.
 *
 * @throws {Error} - Returns a 500 status with an error message if an issue occurs during aggregation.
 */

export const listProductByCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const categoryNum = parseInt(categoryId);

    const data = await Category.aggregate([
      { $match: { categoryId: categoryNum } },
      {
        $lookup: {
          from: "products",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "products",
        },
      },
      {
        $project: {
          _id: 0,
          "products._id": 0,
          "products.categoryId": 0,
        },
      },
    ]);

    return res
      .status(200)
      .json(data[0] || { categoryId: categoryNum, products: [] });
  } catch (error) {
    console.error(`Error fetching category products: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Error fetching category products" });
  }
};
