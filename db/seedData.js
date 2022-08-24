const { createUser } = require('./users');
const { createProduct } = require('./products');
const { createCart } = require('./carts');
const { createAddress } = require('./addresses');
const { createOrder } = require('./orders');
const client = require('./client');
async function dropTables() {
  try {
    console.log('Starting To Drop Tables...');
    await client.query(`
    
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS addresses;
    DROP TABLE IF EXISTS cart_products;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS product_sizes;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);
    console.log('Finished dropping tables!');
  } catch (error) {
    console.error('Error dropping tables!');
    throw error;
  }
}
async function createTables() {
  try {
    console.log('Starting to build tables...');
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR (255) UNIQUE NOT NULL,
      password VARCHAR (255) NOT NULL,
      first_name VARCHAR (255) NOT NULL,
      last_name VARCHAR (255) NOT NULL,
      username VARCHAR (255) UNIQUE NOT NULL,
      user_active BOOLEAN DEFAULT true,
      admin_active BOOLEAN DEFAULT false
 );`);
    await client.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      gender VARCHAR (255) NOT NULL,
      category VARCHAR (255) NOT NULL,
      product_name VARCHAR (255) NOT NULL,
      description VARCHAR (255) NOT NULL,
      size VARCHAR (255) NOT NULL,
      price MONEY NOT NULL,
      availability BOOLEAN DEFAULT true,
      quantity_instock SMALLINT
  );`);

    await client.query(` 
    CREATE TABLE carts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      purchased BOOLEAN DEFAULT false
  );`);

    await client.query(`  
    CREATE TABLE cart_products (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      cart_id INTEGER REFERENCES carts(id),
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      price MONEY NOT NULL
  );`);
  
    await client.query(`  
  CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    phone_number VARCHAR (10),
    street01 VARCHAR (255) NOT NULL,
    street02 VARCHAR (255),
    city VARCHAR (255),
    state VARCHAR (2),
    zipcode VARCHAR (10)
  );`);
  
//     await client.query(`  
// CREATE TABLE orders (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER REFERENCES users(id),
//   product_id INTEGER REFERENCES products(id),
//   cart_productid INTEGER REFERENCES cart_products(id),
//   cart_id INTEGER REFERENCES carts(id),
//   address_id INTEGER REFERENCES addresses(id),
//   shipped BOOLEAN DEFAULT false,
//   product_name VARCHAR(255) REFERENCES products(product_name),
//   quantity INTEGER REFERENCES cart_products(quantity),
//   price MONEY REFERENCES cart_products(price)
//   );`);

    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables!');
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log('Starting to create users...');
    const usersToCreate = [
      {
        email: 'aliataha2206@gmail.com',
        password: 'zuzu',
        first_name: 'Alia',
        last_name: 'Taha',
        username: 'aliataha',
        user_active: true,
        admin_active: true,
      },
      {
        email: 'tannermonaco2206@gmail.com',
        password: '418argyle',
        first_name: 'Tanner',
        last_name: 'Monaco',
        username: 'tannerazm',
        user_active: true,
        admin_active: true,
      },
      {
        email: 'lucasmaul2206@gmail.com',
        password: 'starfox',
        first_name: 'Lucas',
        last_name: 'Maul',
        username: 'lmaul',
        user_active: true,
        admin_active: true,
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users seedData.js!');
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log('Starting to create products...');
    const productsToCreate = [
      {
        gender: 'Mens',
        category: 'Short_Sleeve',
        product_name: 'Short Sleeve',
        description: 'Fly Away Top',
        size: 'Small',
        price: 30.01,
        availability: true,
        quantity_instock: 11,
      },
      {
        gender: 'Womens',
        category: 'Long_Sleeve',
        product_name: 'Long Sleeve',
        description: 'Seamless Tiny Top',
        size: 'Medium',
        price: 45.0,
        availability: true,
        quantity_instock: 23,
      },
      {
        gender: 'Mens',
        category: 'Sweater',
        product_name: 'Sweater',
        description: 'Long Sleeve Oversized Sweater',
        size: 'Large',
        price: 50.0,
        availability: true,
        quantity_instock: 6,
      },
      {
        gender: 'Womens',
        category: 'Hoodie',
        product_name: 'Hoodie',
        description: 'Stone Washed Hoodie Sweatshirt',
        size: 'Extra_Large',
        price: 75.0,
        availability: true,
        quantity_instock: 9,
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log('Products Created:');
    console.log(products);
    console.log('Finished Creating Products! db/seedData.js');
  } catch (error) {
    console.error('Error Creating Products! db/seedData.js');
    throw error;
  }
}

async function createInitialCarts() {
  try {
    console.log('Starting to Create Initial Carts...');
    const cartsToCreate = [
      {
        cart_id: 1,
        user_id: 3,
        purchased: false,
      },
      {
        cart_id: 2,
        user_id: 1,
        purchased: false,
      },
      {
        cart_id: 3,
        user_id: 2,
        purchased: true,
      },
    ];
    const carts = await Promise.all(cartsToCreate.map(createCart));

    console.log('Carts Created:');
    console.log(carts);
    console.log('Finished Creating Carts!');
  } catch (error) {
    console.error('Error Creating Initial Carts! db/seedData.js');
    throw error;
  }
}

async function createInitialAddresses() {
  try {
    console.log('Starting to Create Initial Addresses...');
    const addressesToCreate = [
      {
        user_id: 1,
        phone_number: 1112223333,
        street01: '1111 Apple Lane',
        street02: 'Suite 1',
        city: 'Dallas',
        state: 'TX',
        zipcode: 11111,
      },
      {
        user_id: 2,
        phone_number: 2223334444,
        street01: '2222 Banana Lane',
        street02: 'Suite 2',
        city: 'Austin',
        state: 'TX',
        zipcode: 22222,
      },
      {
        user_id: 3,
        phone_number: 3334445555,
        street01: '333 Orange Lane',
        street02: 'Suite 3',
        city: 'Houston',
        state: 'TX',
        zipcode: 33333,
      },
    ];
    const addresses = await Promise.all(addressesToCreate.map(createAddress));

    console.log('Addresses Created:');
    console.log(addresses);
    console.log('Finished Creating Addresses!');
  } catch (error) {
    console.error('Error Creating Initial Addresses! db/seedData.js');
    throw error;
  }
}

// async function createInitialOrders() {
//   try {
//     console.log('Starting to Create Initial Orders...');
//     const ordersToCreate = [
//       {
//         cart_id: 1,
//         address_id: 1,
//         shipped: false,
//       },
//       {
//         cart_id: 2,
//         address_id: 2,
//         shipped: false,
//       },
//       {
//         cart_id: 2,
//         address_id: 3,
//         shipped: true,
//       },
//     ];
//     const orders = await Promise.all(ordersToCreate.map(createOrder));

//     console.log('Orders Created:');
//     console.log(orders);
//     console.log('Finished Creating Orders!');
//   } catch (error) {
//     console.error('Error Creating Initial Orders! db/seedData.js');
//     throw error;
//   }
// }

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialCarts();
    await createInitialAddresses();
    // await createInitialOrders();
    console.log("Finished rebuild DB!")
  } catch (error) {
    console.error('Error during rebuild DB!!');
    throw error;
  }
}
module.exports = {
  rebuildDB,
  dropTables,
  createTables,
  createInitialUsers,
  createInitialProducts,
  createInitialCarts,
  createInitialAddresses,
  // createInitialOrders,
};
