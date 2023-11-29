import * as service from "../services/cartServices.js";

export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await service.getById(id);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: `${id} ` + "Cart not found Controller" });
    }
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const cart = await service.create();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {

    
    const { cartId, productId } = req.params;
    const cart = await service.addProductToCart(cartId, productId);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (req, res, next) => {
  try {
    const { cartId, productId } = req.params;
    const cart = await service.removeProductFromCart(cartId, productId);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCartItems = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { items } = req.body;
    const cart = await service.updateCartItems(id, items);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { id, productId } = req.params;
    const { quantity } = req.body;
    const cart = await service.updateProductQuantity(
      id,
      productId,
      Number(quantity)
    );

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeProducts = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const cart = await service.removeProducts(cartId);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};