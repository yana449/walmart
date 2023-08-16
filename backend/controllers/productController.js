const Product = require("../model/product");
const doesProductAlreadyExist = async (productName) => {
  const products = await Product.find({ name: productName });
  return products.length !== 0;
};

const findNeighbours = async (productId) => {
  const product = await Product.findById(productId);
  return [...product.neighbours];
};

const unionOfNeighbours = (array1, array2) => {
  const combinedArray = array1.concat(array2);
  const unionArray = Array.from(new Set(combinedArray));
  return unionArray;
};

// add all the neighbours (existing + new neighbours) in the currentProduct
const addNeighboursToProduct = async (product, neighbourProductIds) => {
  const allNeighbours = unionOfNeighbours(
    product.neighbours,
    neighbourProductIds
  );
  console.log(allNeighbours);
  product.neighbours = allNeighbours;
  await product.save();
};

// add the product id to the neighbour products so that we can reach from neighbourProduct to current product
const addProductIdToNeighbours = (productId, neighbourProductIds) => {
  console.log(neighbourProductIds);
  neighbourProductIds.forEach(async (neighbourProductId) => {
    const product = await Product.findById(neighbourProductId);
    if (product) {
      if (product.neighbours.includes(productId)) {
        console.log("product already connected for the id", neighbourProductId);
      } else {
        const updateProduct = await Product.findByIdAndUpdate(
          neighbourProductId,
          {
            $push: {
              neighbours: productId,
            },
          },
          {
            new: true,
          }
        );
        if (updateProduct) {
          console.log("update the edge for product", updateProduct._id);
        } else {
          console.log("no product is found for id : ", neighbourProductId);
        }
      }
    } else {
      console.log("No product found for neighbourId");
    }
  });
};

const addNewProductToPath = async (productName, neighbourProductIds) => {
  // create a new product using productName and its neighbourProduct
  const newProduct = new Product({
    name: productName,
    neighbours: neighbourProductIds,
  });
  await newProduct.save();
  console.log("Product saved successfully", newProduct.name);
  // for each neighbourProductId add a new neighbour with id productName
  if (neighbourProductIds) {
    addProductIdToNeighbours(newProduct._id, neighbourProductIds);
  }
};

const addExistingProductToPath = async (name, neighbourProductIds) => {
  const existingProduct = await Product.findOne({ name: name });
  //   console.log(existingProduct);
  if (neighbourProductIds) {
    addProductIdToNeighbours(existingProduct._id, neighbourProductIds);
    await addNeighboursToProduct(existingProduct, neighbourProductIds);
  }
};

const addPath = async (req, res) => {
  const { name, neighbours } = req.body;
  const isExistingProduct = await doesProductAlreadyExist(name);
  if (isExistingProduct) {
    addExistingProductToPath(name, neighbours);
    return res.send("Product is added to the Store Path");
  }
  addNewProductToPath(name, neighbours);
  return res.send("Product is added to the Store Path");
};

const getProduct = async (req, res) => {
  const product = await Product.findOne({ name: req.body.name });
  return res.send(product);
};

const shortestPathAlgorithm = async (source, destination) => {
  const visited = new Set();
  const queue = [[source, [source]]];
  while (queue.length > 0) {
    const [currentVertex, path] = queue.shift();
    if (currentVertex === destination) {
      return path;
    }
    visited.add(currentVertex);
    const neighbours = await findNeighbours(currentVertex);
    for (const neighbour of neighbours) {
      if (!visited.has(neighbour)) {
        queue.push([neighbour, [...path, neighbour]]);
      }
    }
  }
  return null;
};

const getPathFromIds = async (ids) => {
  const path = [];
  for (const id of ids) {
    const product = await Product.findById(id);
    path.push(product.name);
  }
  console.log(path);
  return path;
};

const findShortestPath = async (req, res) => {
  const { source, destination } = req.body;
  //   console.log(source, destination);
  const idsPath = await shortestPathAlgorithm(source, destination);
  if (!idsPath) {
    return res.send("No path found for given options");
  }
  const path = await getPathFromIds(idsPath);
  return res.send(path);
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  return res.send(products);
};

const addProduct = async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
  });
  const product = await newProduct.save();
  return res.send(product);
};

module.exports = {
  addPath,
  getProduct,
  findShortestPath,
  getAllProducts,
  addProduct,
};
