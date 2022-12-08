const db = require("../db/connection");

module.exports = {
  create: (req, res) => {
    const { name, categoryId, price, description } = req.body;
    db.query(
      "INSERT INTO product (product_name, category_id, price, description) VALUES (?, ?, ?, ?)",
      [name, categoryId, price, description],
      (error, result) => {
        error &&
          res.status(500).json({
            success: false,
            message: "Error in inserting product into database",
            error,
          });
        res.status(201).json({
          success: true,
          message: "Product created successfully",
          result,
        });
      }
    );
  },

  getAllProducts: (req, res) => {
    let query =
      "SELECT p.product_id as id, p.product_name as name, c.category_name as category, p.price as price, p.description as description FROM product p, category c WHERE p.category_id = c.category_id";

    if (req.query.price) {
      query += ` AND p.price BETWEEN ${req.query.price[0]} AND ${req.query.price[1]}`;
    }

    if (req.query.categories && req.query.categories.length > 0) {
      query += ` AND c.category_name IN (`;
      for (let i = 0; i < req.query.categories.length; i++) {
        query += `'${req.query.categories[i]}',`;
      }

      query = query.slice(0, -1);
      query += ");";
    }

    db.query(query, (error, result) => {
      error &&
        res.status(500).json({
          success: false,
          message: "Error in fetching products from database",
          error,
        });
      res.status(201).json({
        success: true,
        result,
      });
    });
  },

  getAllCategories: (req, res) => {
    db.query(
      "SELECT category_id as id, category_name as name FROM category",
      (error, result) => {
        error &&
          res.status(500).json({
            success: false,
            message: "Error in fetching products from database",
            error,
          });
        res.status(201).json({
          success: true,
          result,
        });
      }
    );
  },
};
