import { userModel } from "./models/userModel.js";
import { createHash, isValidPassword } from "../../utils.js";
import MongoDao from "./mongoDao.js";

export default class UserDao extends MongoDao {
  async registerUser(user) {
    try {
      const { email, password } = user;
      const existUser = await userModel.findOne({ email });
      console.log("existUser::", existUser);
      // console.log(existUser.password);
      if (!existUser) {
        if (email === "admin@tech.cl" && password === "AdM1nDeM0") {
          return await userModel.create({
            ...user,
            password: createHash(password),
            role: "admin",
          });
        }
        return await userModel.create({
          ...user,
          password: createHash(password),
        });
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        // console.log(user.password);
        // console.log(user);
        console.log(userExist);
        return isValidPassword(userExist, password) ? userExist : false;
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
      throw new Error(error);
    }
  }

  async addProdToUserCart(userId, prodId, quantity) {
    try {
      const user = await userModel.findById(userId);
      if (!user) return false;
      user.cart.push({
        _id: prodId,
        quantity,
      });
      user.save();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
