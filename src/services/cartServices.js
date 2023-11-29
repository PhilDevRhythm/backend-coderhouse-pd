import ProductDaoMongoDB from "../daos/mongodb/productDao.js";
import * as cartDao from "../daos/mongodb/cartDao.js";

const productDao = new ProductDaoMongoDB();

export const getAll = async () => {
  try {
    const response = await cartDao.getAll();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (cartId) => {
  try {
    const cart = await cartDao.getById(cartId);
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const create = async () => {
  try {
    const newCart = await cartDao.create();
    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (cartId, productId) => {
  try {
    const cart = await cartDao.getById(cartId);
    const product = await productDao.getById(productId);

    if (!product) throw new Error("Product not found");
    if (!cart) throw new Error("Cart not found");

    const newCart = await cartDao.addProductToCart(cartId, productId);
    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const removeProductFromCart = async (cartId, productId) => {
  try {
    const cart = await cartDao.getById(cartId);
    const product = await productDao.getById(productId);

    if (!product) throw new Error("Product not found");
    if (!cart) throw new Error("Cart not found");

    const updatedCart = await cartDao.removeProductFromCart(cartId, productId);
    return updatedCart;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartItems = async (cartId, items) => {
  try {
    const products = await productDao.getAll();
    const prodsIds = products.map((product) => product._id.toString());
    const itemsIds = items.map((item) => item.product.toString());
    const productsExist = itemsIds.every((id) => prodsIds.includes(id));
    if (!productsExist) throw new Error("Product not found");

    const itemsFormat = items.every(
      (item) => item.product && item.quantity >= 0
    );
    if (!itemsFormat) throw new Error("Invalid items format");

    const updatedCart = await cartDao.updateCartItems(cartId, items);
    return updatedCart;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductQuantity = async (cartId, productId, quantity) => {
  try {
    const cart = await cartDao.getById(cartId);
    const product = await productDao.getById(productId);

    if (!product) throw new Error("Product not found");
    if (!cart) throw new Error("Cart not found");

    const updatedCart = await cartDao.updateProductQuantity(
      cartId,
      productId,
      quantity
    );
    return updatedCart;
  } catch (error) {
    console.log(error);
  }
};

export const removeProducts = async (cartId) => {
  try {
    const cart = await cartDao.getById(cartId);

    if (!cart) throw new Error("Cart not found");

    const updatedCart = await cartDao.removeProducts(cartId);
    return updatedCart;
  } catch (error) {
    console.log(error);
  }
};
