const express = require("express");
const { createCart, getCurrentCart } = require("../db");
const router = express.Router();

router.get("/:cartId", async (req, res) => {
    try {
      const { cartId } = req.params
      const carts = await getCurrentCart(cartId)
  
      res.send({
        carts,
      });
    } catch (error) {
      throw error;
    }
  });

router.post("/", async (req, res, next) => {
  const { user_id, purchased } = req.body;
  try {
    const newCart = await createCart({
        user_id, purchased
    });
    res.send({ message: "New Cart Created!", newCart: newCart });
  } catch (error) {
    next({ message: "CARTS ERROR" });
  }
});

module.exports = router;
