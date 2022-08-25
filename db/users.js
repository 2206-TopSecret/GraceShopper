const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({
  email,
  password,
  first_name,
  last_name,
  username,
  user_active,
  admin_active,
}) {
  console.log("Starting to create user! db/users.js");
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users
        (
          email,
          password,
          first_name,
          last_name,
          username,
          user_active,
          admin_active
        )
        VALUES($1, $2, $3, $4, $5, $6, $7) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `,
      [
        email,
        hashedPassword,
        first_name,
        last_name,
        username,
        user_active,
        admin_active,
      ]
    );

    console.log("User created: ..");
    console.log(user);
    console.log("Finished Creating user! users.js");
    return user;
  } catch (error) {
    console.error("Error Creating User! users.js");
    throw error;
  }
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);

  if (isValid) {
    try {
      const { rows: [user] } = await client.query(
        `
      SELECT id, username, admin_active, first_name, last_name, email
      FROM users
      WHERE username=$1 AND password=$2;
      `,
        [username, hashedPassword]
      );
      return user;
    } catch (error) {
      alert(error);
    }
  }
}

async function changeUserPassword(username, password, id, fields = {}) {
  console.log(id, "INSIDE OF DB START")
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(password, hashedPassword)
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if(isValid) {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return user;
  } 
    } catch (error) {
      console.error("Error Creating User! users.js");
      throw error
    }
    }

async function getUserById(user_Id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT id, username, admin_active    
    FROM users
    WHERE id=${user_Id};
    `);
    return user;
  } catch (error) {
    console.error("Error getting user by id! db/users.js");
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
      `,
      [username]
    );
    return user;
  } catch (error) {
    console.error("Error getting user by username! db/users.js");
    throw error;
  }
}

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT *
        FROM users;
        `
  );
  return rows;
}

async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUserUsername(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUserEmail(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    throw error;
  }
}


async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE email=$1;
      `,
      [email]
    );

    return user;
  } catch (error) {
    console.error('Error getting user by email! users.js');
    throw error;
  }
}

async function deleteUser(user_id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
        DELETE FROM users
        WHERE id=${user_id}
        RETURNING *;
        `);
    return user;
  } catch (error) {
    console.error('Error Deleting User! db/users.js');
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
  updateUser,
  updateUserUsername,
  updateUserEmail,
  getUserByEmail,
  deleteUser,
  changeUserPassword,
};
