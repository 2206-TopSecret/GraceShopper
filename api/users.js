const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const {
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
} = require("../db");
const { requireUser } = require("./utils");

router.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users,
  });
});

router.get("/:userId/:username/:password", async (req, res) => {
  const {username, password} = req.params

  const user = await getUser({username, password});

  res.send({
    user
  })
})

router.post("/register", async (req, res, next) => {
  const {
    email,
    password,
    first_name,
    last_name,
    username,
    user_active,
    admin_active,
  } = req.body;

  try {
    if (username) {
      const _user = await getUserByUsername(username);

      if (_user) {
        res.status(401);
        next({
          error: "USERNAME ALREADY EXISTS",
          message: `User ${username} is already taken.`,
          name: "UserAlreadyExists",
        });
      }
    }

    const user = await createUser({
      email,
      password,
      first_name,
      last_name,
      username,
      user_active,
      admin_active,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      JWT_SECRET,
      {
        expiresIn: "1y",
      }
    );
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({username, password});
    if (user) {
      delete user.password
      const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1y' });
      res.send({ message: "you're logged in!", id: user.id, token: token, user: user });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:userId/:username", async (req, res, next) => {
  const { username } = req.params;

  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    const existingUsername = await getUserByUsername(username);

    if (!user.active && user.id == userId && !existingUsername) {
      const updatedUser = updateUserUsername(userId, {
        username: username,
      });

      res.send({ user: updatedUser });
    } else {
      next(
        !user.active
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot update a user which is not yours.",
            }
          : {
              name: "UserAlreadyActivated",
              message: "That user has already been activated.",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.patch("/:userId/:email", async (req, res, next) => {
  const { email } = req.params;

  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    const existingEmail = await getUserByEmail(email);

    if (!user.active && user.id == userId && !existingEmail) {
      const updatedUser = updateUserEmail(userId, {
        email: email,
      });

      res.send({ user: updatedUser });
    } else {
      next(
        !user.active
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot update a user which is not yours.",
            }
          : {
              name: "UserAlreadyActivated",
              message: "That user has already been activated.",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.patch("/updatePassword/:username", async (req, res, next) => {
  const { username, password, id, newPassword } = req.body
  const SALT_COUNT = 10;
  const newHashedPassword = await bcrypt.hash(newPassword, SALT_COUNT);

  try {
    const updatedPassword = await changeUserPassword(username, password, id, {password: newHashedPassword})
    res.send(updatedPassword)
  } catch (error) {
    next (error)
  }
});

router.patch("/admin/updateUser/:userId", async (req, res, next) => {
  const { username, email, password, first_name, last_name, admin_active, user_active } = req.body;

  try {
    const { userId } = req.params;
    const existingEmail = await getUserByEmail(email)
    const existingUsername = await getUserByUsername(username)

    if (!existingUsername && !existingEmail) {
      const updatedUser = updateUser(userId, {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
        email: email,
        user_active: user_active,
        admin_active: admin_active,
      });

      res.send({ message: `User ${first_name} is updated!`, user: updatedUser });
    } else {
      next()
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.delete("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
      const deletedUser = await deleteUser(userId);
      res.send({
        message: "User has been deleted!",
        deletedUser: deletedUser,
      });
  } catch (error) {
    next(error);
  }
});

router.delete("/admin/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await getUserById(userId);
    if (user.admin_active === true){
      res.send({
        name: "CannotDeleteAdmin",
        message: "You cannot delete a user who is also an administrator.",
      })
    }
    if(!user.admin_active) {
      const deletedUser = await deleteUser(userId);
      res.send({
        message: "User has been deleted!",
        deletedUser: deletedUser,
      });
    }

  } catch (error) {
    next(error);
  }
});

module.exports = router;