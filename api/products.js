const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductByCategory } = require("../db");
const { requireUser, requireAdmin } = require("./utils");

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send({
    products,
  });
});

router.get("/admin/:category", async (req, res) => {
  const { category } = req.params
  const products = await getProductByCategory(category);

  res.send({
    products,
  });
});

router.post("/", async (req, res, next) => {
  const {
    gender,
    category,
    product_name,
    description,
    size,
    price,
    availability,
    quantity_instock,
  } = req.body;
  
  try {
    const newProduct = await createProduct({
      gender,
      category,
      product_name,
      description,
      size,
      price,
      availability,
      quantity_instock
  });
      res.send({ message: "New Product Created!", newProduct: newProduct });
  } catch (error) {
    next({error});
  }
});

router.patch("/:productId", async (req, res, next) => {
  const {
    gender,
    category,
    product_name,
    description,
    size,
    price,
    availability,
    quantity_instock,
  } = req.body;
  const { productId } = req.params;
  const productToUpdate = await getProductById(productId);
  
  try {
    if (productToUpdate) {
    const updatedProduct = await updateProduct(productId, {
      gender: gender,
      category: category,
      product_name: product_name,
      description: description,
      size: size,
      price: price,
      availability: availability,
      quantity_instock: quantity_instock
    }
    );
    res.send({ message: "Product Has Been Updated!", updatedProduct: updatedProduct });
  } else {
    res.status(401);
        next({
          error: "PRODUCT ID DOESN'T EXIST",
          message: `Product ID of ${productId} doesn't exist.`,
          name: "NoProductWithThatID",
        });
  }
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
      const deletedProduct = await deleteProduct(productId);
      res.send({message: "Product has been deleted!", deletedProduct: deletedProduct});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
