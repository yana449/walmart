const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

//Get all Method
router.get("/info", (req, res) => {
  res.send(
    "This API will help to find the route to a product from your current location point."
  );
});

router.get("/getProduct", productController.getProduct);
router.get("/getPath", productController.findShortestPath);
router.get("/getAllProducts", productController.getAllProducts);
router.post("/addEdge", productController.addPath);
router.post("/addProduct", productController.addProduct);

module.exports = router;
