import { cartModel } from "./models/cartModel.js";
import { productModel } from "./models/productModel.js";

export const getAll = async () => {
  try {
    const carts = await cartModel.find();
    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (cartId) => {
  try {
    const cart = await cartModel.findById(cartId).populate("items.product");
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const create = async () => {
  try {
    const newCart = await cartModel.create({ products: [] });
    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (cartId, productId) => {
  try {
    const product = await productModel.findById(productId);
    const cart = await cartModel.findById(cartId);
    const prodInCart = cart.items.find(
      (item) => item.product._id.toString() === product._id.toString()
    );

    if (prodInCart) prodInCart.quantity++;
    else
      cart.items.push({
        product,
        quantity: 1,
      });

    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartItems = async (cartId, items) => {
  try {
    const cart = await cartModel.findById(cartId);
    cart.items = items;
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductQuantity = async (cartId, productId, quantity) => {
  try {
    const cart = await cartModel.findById(cartId);
    const prodInCart = cart.items.find(
      (item) => item.product._id.toString() === productId
    );

    if (prodInCart) prodInCart.quantity = quantity;
    else throw new Error("Product not found in cart");
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const removeProducts = async (cartId) => {
  try {
    const cart = await cartModel.findByIdAndUpdate(
      cartId,
      { items: [] },
      { new: true }
    );
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const removeProductFromCart = async (cartId, productId) => {
  try {
    const cart = await cartModel.findById(cartId);
    cart.items = cart.items.filter(
      (item) => item.product._id.toString() !== productId
    );
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};
