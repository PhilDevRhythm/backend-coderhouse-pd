import { userModel } from "./models/userModel.js";
import { createHash, isValidPassword } from "../../utils.js";
import CartDaoMongoDB from "./cartDao.js";
import MongoDao from "./mongoDao.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../../../src/services/emailServices.js";

const cartDao = new CartDaoMongoDB();

export default class UserDao extends MongoDao {
  constructor() {
    super(userModel);
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.getByEmail({ email });
      console.log("existUser::", existUser);
      // console.log(existUser.password);
      if (!existUser) {
        const cart = await cartDao.newCart();
        if (email === "admin@tech.cl" && password === "AdM1nDeM0") {
          return await userModel.create({
            ...user,
            password: createHash(password),
            cartId: cart._id,
            role: "admin",
          });
        }
        return await userModel.create({
          ...user,
          password: createHash(password),
          cartId: cart._id,
        });
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (userExist) {
        // console.log(user.password);
        // console.log(user);
        // console.log(userExist);
        const psswdValid = isValidPassword(userExist, password);
        if (!psswdValid) return false;
        else {
          // userModel.update(userExist, { last_connection: Date.now() });
          return userExist;
        }
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const userExist = await userModel.findById(id);
      if (userExist) return userExist;
      else return false;
    } catch (error) {
      console.log(error);
      // throw new Error(error)
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await userModel.findOne({ email });
      // console.log(userExist);
      if (userExist) return userExist;
      else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async removeOld() {
    try {
      // const filter = {last_connection: {$lte: '2023-11-20'}}
      const filter = {
        $and: [
          { role: { $ne: "admin" } },
          {
            last_connection: {
              $lte: new Date(new Date().setDate(new Date().getDate() - 2)),
            },
          },
        ],
      };
      // const filter = {last_connection: {$lte: new Date(ISODate().getTime() - 1000 * 60 * 15)}}
      const mailDel = await this.find(filter);
      for (let index = 0; index < mailDel.length; index++) {
        await sendMail(mailDel[index], "userDeleted");
      }
      const delUsers = await this.deleteMany(filter);
      if (!delUsers) return false;
      else return delUsers;
    } catch (error) {
      console.log(error);
    }
  }

  async removeById(uid) {
    try {
      const userExists = await this.getById(uid);
      if (!userExists) return false;
      else {
        const response = await this.delete(uid);
        if (!response) return false;
        else {
          await sendMail(userExists, "userDeleted");
          return response;
        }
      }
    } catch (error) {
      throw new Error(error.stack);
    }
  }
}
