const express = require("express");
const cors = require("cors");

const { customerRouter, productRouter, orderRouter } = require("./routes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  })
);

app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

const PORT = 8000;

app.listen(PORT, () => console.log(`server running at ${PORT}`));
