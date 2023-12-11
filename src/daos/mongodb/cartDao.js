import { cartModel } from "./models/cartModel.js";
import { productModel } from "./models/productModel.js";

export default class CartDaoMongoDB {
  /* -------------------------- crear nuevo carrito -------------------------- */
  async newCart() {
    try {
      const response = await cartModel.create({ products: [] });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getCarts() {
    try {
      const response = await cartModel.find();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getCartById(cartId) {
    try {
      const response = await cartModel
        .findById(cartId)
        .populate("products.prodId");
      return response.toObject();
    } catch (error) {
      console.log(error);
    }
  }
  async updateCart(cartId, prodId) {
    try {
      const findCart = await this.getCartById(cartId);
      if (findCart) {
        const findProd = await productModel.findById(prodId);
        if (findProd) {
          const findProdInCart = await cartModel.findOne({
            _id: cartId,
            "products.prodId": prodId,
          });
          if (!!findProdInCart) {
            const response = await cartModel.findOneAndUpdate(
              { _id: cartId, "products.prodId": prodId },
              { $inc: { "products.$.quantity": 1 } },
              { new: true }
            );
            return response;
          } else {
            const response = await cartModel.findOneAndUpdate(
              { _id: cartId },
              { $push: { products: { prodId: prodId, quantity: 1 } } },
              { new: true }
            );
            return response;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateProdQty(cartId, prodId, quantity) {
    try {
      const response = await cartModel.findOneAndUpdate(
        { _id: cartId, "products.prodId": prodId },
        { "products.$.quantity": quantity },
        { new: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async replaceCart(cartId, products) {
    try {
      const response = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { products: products },
        { new: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async removeCart(cartId) {
    try {
      const response = await cartModel.findByIdAndDelete(cartId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async emptyCart(cartId) {
    try {
      const response = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { products: [] },
        { new: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async removeProd(cartId, prodId) {
    try {
      const response = await CartModel.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { prodId: prodId } } },
        { new: true }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  
}
