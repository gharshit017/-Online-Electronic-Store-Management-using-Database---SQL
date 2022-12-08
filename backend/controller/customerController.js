const bcrypt = require("bcrypt");
const db = require("../db/connection");

module.exports = {
  register: (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query(
      "INSERT INTO customer (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (error, result) => {
        error &&
          res.status(500).json({
            success: false,
            message: "Error in inserting customer into database",
            error,
          });
        res.status(201).json({
          success: true,
          message: "Customer created successfully",
          result,
        });
      }
    );
  },

  login: (req, res) => {
    const { email, password } = req.body;

    db.query(
      "SELECT customer_id as id, name, email, password FROM customer WHERE email=?",
      [email],
      (error, result) => {
        error &&
          res.status(500).json({
            success: false,
            message: "Error in inserting customer into database",
            error,
          });

        const customer = result[0];
        const dbPassword = customer.password;

        if (!bcrypt.compareSync(password, dbPassword)) {
          res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({
          success: true,
          message: "Customer logged in successfully",
          customer,
        });
      }
    );
  },
};
