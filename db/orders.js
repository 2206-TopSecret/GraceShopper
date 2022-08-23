const client = require('./client');

async function createOrder({ cart_id, address_id, shipped }) {
  console.log('Starting to create Order.. db/order.js');
  try {
    const {
      rows: [order],
    } = await client.query(
      `
              INSERT INTO orders
              (cart_id, address_id, shipped) 
              VALUES($1, $2, $3)
              RETURNING *;
            `,
      [cart_id, address_id, shipped]
    );
    console.log('Order created..');
    console.log(order);
    console.log('Finished Creating Order! order.js');
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOrder(id) {
  console.log('Starting to get order by order id... orders.js');
  try {
    const {
      rows: [order],
    } = await client.query(
      `
          SELECT *   
          FROM orders
          WHERE id=${id}
          `,
      [id]
    );
    console.log('Finished Getting Order By Order Id! orders.js');
    return order;
  } catch (error) {
    console.error('Error Getting Order By Order Id! orders.js');
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows } = await client.query(`
          SELECT *
          FROM orders
          `);
    console.log('Finished Getting Order! Orders.js');
    return rows;
  } catch (error) {
    console.error('Error Getting order! orders.js');
    throw error;
  }
}

async function getOrderByUserId(user_id) {
  console.log('Starting to get order by id... orders.js');
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      SELECT *   
      FROM orders
      WHERE user_id=$1;
      `,
      [user_id]
    );
    console.log('Finished Getting Order By User Id! orders.js');
    return order;
  } catch (error) {
    console.error('Error Getting Order By User Id! orders.js');
    throw error;
  }
}

async function updateOrder(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [order],
    } = await client.query(
      `
          UPDATE orders
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
      Object.values(fields)
    );
    console.log('Finished Updating Order! orders.js');
    return order;
  } catch (error) {
    console.error('Error Updating Order! orders.js');
    throw error;
  }
}

async function attachCartToOrder(carts) {
  const cartsToReturn = [...carts];
  const binds = carts.map((_, index) => `$${index + 1}`).join(', ');
  const cartsIds = carts.map((cart) => cart.id);
  if (!cartsIds?.length) return [];
  try {
    const { rows: orders } = await client.query(
      `
          SELECT orders.*
          FROM carts 
          JOIN orders ON orders.cart_id = carts.id
          WHERE orders.cart_id IN (${binds});
        `,
      cartsIds
    );
    for (const cart of cartsToReturn) {
      const ordersToAdd = orders.filter((order) => order.cart_id === cart.id);
      cart.order = ordersToAdd;
    }
    console.log('Finished attaching order to cart..orders.js');
    return orders;
  } catch (error) {
    console.error('Error attaching order to cart... orders.js');
    throw error;
  }
}

module.exports = {
  createOrder,
  getOrder,
  getAllOrders,
  getOrderByUserId,
  updateOrder,
  attachCartToOrder,
};
