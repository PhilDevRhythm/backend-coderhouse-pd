import Services from "./classServices.js";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import "dotenv/config";
import UserDaoMongo from "../daos/mongodb/userDao.js";
const userDao = new UserDaoMongo();

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  #generateToken(user) {
    const payload = {
      userId: user.id,
    };
    return sign(payload, SECRET_KEY, { expiresIn: "10m" });
  }

  async register(user) {
    try {
      return await userDao.register(user);
    } catch (error) {
      console.log(error);
    }
  }
  async removeOld(user) {
    try {
      return await userDao.removeOld(user);
    } catch (error) {
      console.log(error);
    }
  }
  async getByEmail(user) {
    try {
      return await userDao.getByEmail(user);
    } catch (error) {
      console.log(error);
    }
  }
  async remove(user) {
    try {
      return await userDao.removeById(user);
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {
    try {
      const userExist = await userDao.login(user);
      if (userExist) return this.#generateToken(userExist);
      else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async addProdToUserCart(userId, prodId, quantity) {
    try {
      const existProd = await prodDao.getById(prodId);
      if (!existProd) return false;
      return userDao.addProdToUserCart(userId, prodId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
}
