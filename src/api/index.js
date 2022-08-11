const BASE = 'localhost:3000'

export async function registerPerson(username, password) {
    try {
      const response = await fetch(`${BASE}/register`, {
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
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      return result;
    } catch (error) {
      throw error;
    }
  }