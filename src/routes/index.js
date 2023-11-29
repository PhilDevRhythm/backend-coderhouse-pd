import { Router } from "express";
import userRouter from "./userRouter.js";
import prodRouter from "./prodRouter.js";
import viewsRouter from "./viewsRouter.js";
import cartRouter from "./cartRouter.js";
import ticketRouter from "./ticketRouter.js";

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  initRoutes() {
    this.router.use("/users", userRouter);
    this.router.use("/products", prodRouter);
    this.router.use("/views", viewsRouter);
    this.router.use("/cart", cartRouter);
    this.router.use("/ticket", ticketRouter);
  }

  getRouter() {
    return this.router;
  }
}
