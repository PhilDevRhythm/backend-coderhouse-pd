import { Router } from "express";
import {
  loginUser,
  registerUser,
  registerResponse,
  removeOld,
  removeById,
  resetPass,
  updatePass,
  updateRole,
  loginResponse,
  githubResponse,
  addProdToUserCart,
} from "../controllers/userController.js";
import passport from "passport";
import { checkAuth } from "../middlewares/checkAuth.js";
import validateLogin from "../middlewares/validateLogin.js";
import { create } from "../controllers/cartController.js";

import { isAuth } from "../utils.js";

const router = Router();

router.post("/register", registerUser);
// router.post("/login", loginUser);

// RUTA LOCAL
router.post(
  "/users/registerps",
  passport.authenticate("register"),
  registerResponse
);
// router.post("/login", passport.authenticate("login"), loginResponse);
router.get("/private", (req, res) => res.send("route private"));

// RUTA PASSPORT-GITHUB
router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/profile-github"
  // passport.authenticate("github", { scope: ["user:email"] }),
  // githubResponse,
  // validateLogin
);

// SESSION LOGIN

import {
  login,
  logout,
  visit,
  infoSession,
} from "../controllers/userController.js";

router.post("/login", loginUser);
router.get("/info", validateLogin, infoSession);
router.get("/admin-dashboard", validateLogin, visit);
router.post("/logout", logout);
router.post("/add/:idProd/quantity/:quantity", checkAuth, addProdToUserCart);

// USER reset password
router
  .post("/reset-pass", resetPass)
  .put("/new-pass", updatePass)
  .put("/premium/:uid", updateRole)

  // DELETE FUNCTIONS

  .delete("/", isAuth, removeOld)
  .delete("/:uid", isAuth, removeById);

export default router;
