require("dotenv").config();
require("./db");
const cors = require('cors')
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors())
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
