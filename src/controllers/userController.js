import UserDao from "../daos/mongodb/userDao.js";
import session from "express-session";

const userDao = new UserDao();

export const registerUser = async (req, res) => {
  try {
    const newUser = await userDao.registerUser(req.body);
    console.log(req.body);
    if (newUser) res.redirect("/users/login");
    else res.redirect("/users/errorRegister");
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { first_name, last_name, email, isGithub, age, password } = req.body;
    const user = await userDao.loginUser(req.body);

    if (user) {
      // req.session.email = email;
      // req.session.password = password;
      // req.session.isGithub = isGithub;
      // req.session.last_name = last_name;
      // req.session.first_name = first_name;
      // req.session.age = age;

      res.render("profile", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        isGithub: isGithub,
        age: age,
      });
    } else res.redirect("/users/errorLogin");
  } catch (error) {
    console.log(error);
  }
};

// const users = [
//   { username: "admin", password: 1234, admin: true },
//   { username: "user0", password: "qwerty", admin: false },
//   { username: "user1", password: 1234, admin: false },
//   { username: "user2", password: 1234, admin: false },
// ];

export const login = (req, res) => {
  const { username, password } = req.body;
  const index = users.findIndex(
    (user) => user.username === username && user.password === password
  );
  if (index < 0) res.json({ error: "User not found" });
  else {
    const user = user[index];
    req.session.info = {
      loggedIn: true,
      count: 1,
      admin: user.admin,
      username: user.username,
    };
    res.json({ msg: `Bienvenido ${user.username}` });
  }
};

export const visit = (req, res) => {
  req.session.info.count++;
  res.json({
    msg: `${req.session.info.username} visited this may times ${req.session.info.count}`,
  });
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.json({ msg: "Logout OK" });
    else res.json({ msg: err });
  });
};

export const infoSession = (req, res) => {
  res.json({
    session: req.session,
    sessionId: req.sessionId,
    cookies: req.cookies,
  });
};

// PASSPORT

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      msg: "Register ok",
      session: req.session,
    });
  } catch (error) {
    next(error.message);
  }
};

export const loginResponse = async (req, res, next) => {
  try {
    const user = await userDao.getById(req.session.passport.user);
    res.json({
      msg: "Login ok",
      user,
    });
  } catch (error) {
    next(error.message);
  }
};

export const githubResponse = async (req, res, next) => {
  try {
    // console.log(req.user)
    const { first_name, last_name, email, isGithub, age } = req.user;
    // res.json({
    //   msg: "Register/Login Github OK with" + `${" " + first_name}`,
    //   session: req.session,
    //   userData: {
    //     first_name,
    //     last_name,
    //     email,
    //     isGithub: true,
    //   },
    // }),
    console.log(req.user);
    res.render("profile", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      isGithub: isGithub,
      age: age,
    });
    return;
  } catch (error) {
    next(error.message);
  }
};

export const addProdToUserCart = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { idProd } = req.params;
    const { quantity } = req.params;
    const newProdToUserCart = await userService.addProdToUserCart(
      _id,
      idProd,
      Number(quantity)
    );
    if (!newProdToUserCart)
      createResponse(res, 404, "Error add product to user cart");
    createResponse(res, 200, newProdToUserCart);
  } catch (error) {
    next(error.message);
  }
};
