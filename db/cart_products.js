const client = require("./client");

// ON CONFLICT (user_id, product_id) DO NOTHING - After VALUES in following assignProductToCartProducts function
async function assignProductToCartProducts({
  user_id,
  cart_id,
  product_id,
  quantity,
  price,
}) {
  try {
    const {
      rows: cart_product,
    } = await client.query(
      `
      INSERT INTO cart_products(
        user_id,
        cart_id,
        product_id,
        quantity,
        price
        ) 
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
        `,
      [user_id, cart_id, product_id, quantity, price]
    );
    return cart_product;
  } catch (error) {
    console.error("Error Adding product to cart_product!");
    throw error;
  }
}


async function getAllCartProducts() {
  try {
    const { rows: cart_products } = await client.query(`
        SELECT *
        FROM cart_products
        `);
    console.log("Finished Getting Cart_Products! db/cart_products.js");
    return cart_products;
  } catch (error) {
    console.error("Error Getting Cart_Products! db/cart_products.js");
    throw error;
  }
}

async function getCartProductById(cartProductId) {
  try {
    const { rows: cart_products } = await client.query(`
        SELECT *
        FROM cart_products
        WHERE id=$1;
        `, [cartProductId]);
    console.log("Finished Getting Cart_Products! db/cart_products.js");
    return cart_products;
  } catch (error) {
    console.error(error);
  }
}

async function getAllCartProductsByCartId(cartId) {
  try {
    const { rows: cart_productsbyid } = await client.query(`
        SELECT *
        FROM cart_products
        WHERE cart_id=${cartId};
        `);
    console.log("Finished Getting Cart_Products! db/cart_products.js");
    return cart_productsbyid;
  } catch (error) {
    console.error("Error Getting Cart_Products! db/cart_products.js");
    throw error;
  }
}

async function updateCartProductQuantity(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: cartProduct,
    } = await client.query(
      `
        UPDATE cart_products
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );
    console.log('Finished Updating Cart Products! db/cart_products.js');
    return cartProduct;
  } catch (error) {
    console.error('Error Updating Cart Products! db/products.js');
    throw error;
  }
}

async function deleteProductFromCart(id) {
  try {
    await client.query(
      `
          DELETE FROM cart_products
          WHERE id=${id}
          `
    );
    console.log('Finished Removing Cart_Product From Cart! db/cart_products.js')
  } catch (error) {
    console.error("Error Removing cart_product from Cart! db/products.js");
    throw error;
  }
}

async function attachCartProductsToCart(carts) {
  const cartsToReturn = [...carts];
  const binds = carts.map((_, index) => `$${index + 1}`).join(", ");
  const cart_ids = carts.map((cart) => cart.id);
  if (!cart_ids?.length) return [];

  try {
    const { rows: products } = await client.query(
      `
        SELECT products.id,
        products.gender,
        products.category,
        products.product_name,
        products.description,
        cart_products.id,


        `
    );
  } catch (error) {
    console.error("Error Attaching Cart Products To Cart!!!");
    throw error;
  }
}

module.exports = {
  assignProductToCartProducts,
  getCartProductById,
  getAllCartProducts,
  getAllCartProductsByCartId,
  updateCartProductQuantity,
  deleteProductFromCart,
  attachCartProductsToCart,
};

/*
// **moving to different file
async function getAllCartsByUser({ user_id }) {
  try {
    const { rows: carts } = await client.query(
      `
        SELECT carts.*,
        FROM carts
        carts.user_id = $1;
      `,
      [user_id]
    );

    return attachCartProducts(carts);
  } catch (error) {
    console.error('Error getting cart history by user id!');
    throw error;
  }
}
*/
