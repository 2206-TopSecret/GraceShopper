const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const {createUser, getUser, getUserById, getUserByUsername, getAllUsers, updateUser} = require("../db");
const { requireUser } = require("./utils")

router.get('/', async (req, res) => {

  const users = await getAllUsers();

  res.send({
      users
  });
});

router.post("/register", async (req, res, next) => {
  const { username, password, first_name, last_name, email } = req.body;
  
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
      username,
      password,
      first_name,
      last_name,
      email,
    })
    
    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      JWT_SECRET,
      {
        expiresIn: "1y",
      }
      )

  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign(user, JWT_SECRET)
      res.send({ message: "you're logged in!", token: `${token}` });
    } else {
      next({ 
        name: 'IncorrectCredentialsError', 
        message: 'Username or password is incorrect'
      });
    }
  } catch(error) {
    next(error);
  }
});

router.patch('/:userId', async (req, res, next) => {
  const { username, password, email } = req.body

  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if(!user.active && (user.id == userId)) {
      const updatedUser = updateUser(userId, { username: username, password: password, email: email, })
      
      res.send({ user: updatedUser })
    } else {
      next(!user.active ? { 
        name: "UnauthorizedUserError",
        message: "You cannot update a user which is not yours."
      } : {
        name: "UserAlreadyActivated",
        message: "That user has already been activated."
      });
    }


  } catch ({ name, message }) {
    next({ name, message })
  }
});

module.exports = router;
