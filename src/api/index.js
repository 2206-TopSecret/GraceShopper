const BASE = "https://top-secret-shirts-la.herokuapp.com";

// USERS API CALLS BELOW

export async function getAllUsers() {
  try {
    const response = await fetch(`${BASE}/api/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getUser(id, username, password) {
  try {
    const response = await fetch(`${BASE}/api/users/${id}/${username}/${password}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function registerPerson(
  username,
  password,
  email,
  first_name,
  last_name
) {
  try {
    const response = await fetch(`${BASE}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        first_name: first_name,
        last_name: last_name,
        user_active: true,
        admin_active: false,
      }),
    });
    const result = await response.json();
    if (result.error) {
      throw result;
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export async function loginPerson(username, password) {
  try {
    const response = await fetch(`${BASE}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    if (result.error) {
      throw result;
    }
    const token = result.token;
    const id = result.id;
    const admin = result.user.admin_active;
    const email = result.user.email;
    const first_name = result.user.first_name;
    const last_name = result.user.last_name;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("id", id);
      localStorage.setItem("admin", admin);
      localStorage.setItem("email", email);
      localStorage.setItem("first_name", first_name);
      localStorage.setItem("last_name", last_name);
      return result;
    }
  } catch (error) {
    throw error;
  }
}

export async function updatePersonUsername(
  token,
  username,
  newUsername,
  id
) {
  try {
    const response = await fetch(`${BASE}/api/users/${id}/${username}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: newUsername
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}


export async function updatePersonEmail(
  token,
  email,
  newEmail,
  id
) {
  try {
    const response = await fetch(`${BASE}/api/users/${id}/${email}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: newEmail,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updatePersonPassword(
  token,
  username,
  password,
  id,
  newPassword
) {
  try {
    const response = await fetch(`${BASE}/api/users/updatePassword/${username}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        id: id,
        newPassword: newPassword
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error
  }
}

export async function adminUpdatePerson(
  id,
  firstName,
  lastName,
  username,
  password,
  email,
  userActive,
  adminActive
) {
  try {
    const response = await fetch(`${BASE}/api/users/admin/updateUser/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
        email: email,
        user_active: userActive,
        admin_active: adminActive,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`${BASE}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function adminDeleteUser(userId) {
  try {
    const response = await fetch(`${BASE}/api/users/admin/${userId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

// USERS API CALLS ABOVE

// PRODUCTS API CALLS BELOW

export async function getTheProductById(productId) {
  try {
    const response = await fetch(`${BASE}/api/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE}/api/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getAllProductsByCategory(category) {
  try {
    const response = await fetch(`${BASE}/api/products/category/${category}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getAllProductsByPrice(price) {
  try {
    const response = await fetch(`${BASE}/api/products/price/${price}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProductBySize(size) {
  try {
    const response = await fetch(`${BASE}/api/products/size/${size}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createProduct(
  gender,
  category,
  product_name,
  description,
  size,
  price,
  quantity_instock
) {
  try {
    const response = await fetch(`${BASE}/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gender: gender,
        category: category,
        product_name: product_name,
        description: description,
        size: size,
        price: price,
        availability: true,
        quantity_instock: quantity_instock,
      }),
    });
    const result = await response.json();
    if (result.error) {
      throw result;
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(
  productId,
  gender,
  category,
  product_name,
  description,
  size,
  price,
  availability,
  quantity_instock
) {
  try {
    const response = await fetch(`${BASE}/api/products/${productId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        gender: gender,
        category: category,
        product_name: product_name,
        description: description,
        size: size,
        price: price,
        availability: availability,
        quantity_instock: quantity_instock,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${BASE}/api/products/admin/${productId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

// PRODUCTS API CALLS ABOVE

// CART_PRODUCTS API CALLS BELOW

export async function getAllCartProducts() {
  try {
    const response = await fetch(`${BASE}/api/cart_products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getAllCartProductsByCartId(cartId) {
  try {
    const response = await fetch(`${BASE}/api/cart_products/${cartId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createCartProducts(
  user_id,
  cart_id,
  product_id,
  quantity,
  price
) {
  try {
    const response = await fetch(`${BASE}/api/cart_products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        cart_id: cart_id,
        product_id: product_id,
        quantity: quantity,
        price: price,
      }),
    });
    const result = await response.json();
    if (result.error) {
      throw result;
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export async function attachCartProductsToCart(cartId) {
  try {
    const response = await fetch(`${BASE}/api/cart_products/${cartId}`, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cart_products_id: cartId
      })
    });
    const result = await response.json();
    return result
  } catch(error) {
    throw error
  }
}

export async function updateCartProducts(
  cartProductId,
  quantityNum
) {
  try {
    const response = await fetch(`${BASE}/api/cart_products/update`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantityNum,
        cartProductId: cartProductId
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteCartProducts (cartProductId) {
  try {
    const response = await fetch (`${BASE}/api/cart_products/delete/${cartProductId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

// CART_PRODUCTS API CALLS ABOVE

// CARTS API CALLS BELOW

export async function createCart(
  user_id,
  purchased
) {
  try {
    const response = await fetch(`${BASE}/api/carts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        purchased: purchased
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

// CARTS API CALLS ABOVE