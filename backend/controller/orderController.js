const db = require("../db/connection");

module.exports = {
  create: (req, res) => {
    const { customerId, totalAmount, cart } = req.body;
    db.query(
      `INSERT INTO order_ (customer_id, total_amount) VALUES (?, ?);`,
      [customerId, totalAmount],
      (error, result) => {
        error &&
          res.status(500).json({
            success: false,
            message: "Error in placing order",
            error,
          });

        const orderId = result.insertId;

        const cartArr = Object.keys(cart);

        for (let i = 0; i < cartArr.length; i++) {
          db.query(
            "INSERT INTO order_item_detail (order_id, product_id, quantity) VALUES (?, ?, ?);",
            [orderId, cartArr[i], cart[cartArr[i]].quantity],
            (error) => {
              error &&
                res.status(500).json({
                  success: false,
                  message: "Error in placing order",
                  error,
                });
            }
          );
        }

        res.status(201).json({
          success: true,
          message: "Order placed successfully",
          result,
        });
      }
    );
  },

};
