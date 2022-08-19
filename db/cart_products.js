const client = require('./client');

async function assignProductToCartProducts({
  user_id,
  cart_id,
  product_id,
  quantity,
  price,
}) {
  try {
    const {
      rows: [cart_product],
    } = await client.query(
      `
          INSERT INTO cart_products(
            user_id
            cart_id
            product_id
            quantity
            price
            ) 
          VALUES($1, $2, $3, $4, $5) 
          ON CONFLICT (user_id, product_id) DO NOTHING
          RETURNING *;
        `,
      [user_id, cart_id, product_id, quantity, price]
    );

    return cart_product;
  } catch (error) {
    console.error('Error Adding cart_product to Cart!');
    throw error;
  }
}

async function editCartProductQuantity({ id, quantity }) {
  try {
    const result = await client.query(
      `
          UPDATE cart_products
          SET quantity = $1
          WHERE id= $2
        `,
      [id, quantity]
    );
    return result;
  } catch (error) {
    console.error('Error Editing Cart Product Quantity!');
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
  } catch (error) {
    console.error('Error Removing cart_product from Cart! db/products.js');
    throw error;
  }
}

async function attachCartProductsToCart(carts) {
  const cartsToReturn = [...carts];
  const binds = carts.map((_, index) => `$${index + 1}`).join(', ');
  const cart_ids = carts.map((cart) => cart.id);
  if (!cart_ids?.length) return [];

  try {
    const { rows: products } = await client.query(
      `
        SELECT 
          products.id,
          products.gender,
          products.category,
          products.product_name,
          products.description,
          cart_products.id,
          cart_products.quantity,
          cart_products.price
        AS 
          "cart_products_id",
          cart_products.cart_id
        FROM 
          products 
        JOIN 
          cart_products
        ON 
          cart_products.product_id 
        WHERE 
          cart_products.cart_id 
        IN 
          (${binds});

      `,
      cart_ids
    );

    for (const cart of cartsToReturn) {
      const productsToAdd = products.filter(
        (product) => product.cart_id === cart.id
      );
      cart.products = productsToAdd;
    }
    return cartsToReturn;
  } catch (error) {
    console.error('Error Attaching Cart Products To Cart!!!');
    throw error;
  }
}

module.exports = {
  assignProductToCartProducts,
  editCartProductQuantity,
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
