import { Router } from "express";
import * as controller from "../controllers/cartController.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.post("/products/:productId", controller.addProductToCart);
router.put("/:cartId", controller.updateCartItems);
router.put("/:cartId/products/:productId", controller.updateProductQuantity);
router.delete("/:cartId", controller.removeProducts);
router.delete("/:cartId/products/:productId", controller.removeProductFromCart);

// import {
//   getCarts,
//   getCartById,
//   saveProdtoCart,
//   createCart,
//   deleteCart,
// } from "../managers/cartManager.js";
// import { getProductById } from "../managers/prodManager.js";
// const router = Router();

// // GET CARTS
// router.get("/", async (req, res) => {
//   try {
//     const cartGroup = await getCarts();
//     if (cartGroup) {
//       res.status(200).json(cartGroup);
//     } else {
//       res.json("There are no Carts available");
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // GET CART by ID

// router.get("/:cartId", async (req, res) => {
//   try {
//     const { cartId } = req.params;
//     const cart = await getCartById(Number(cartId));
//     if (cart) {
//       res.status(200).json(cart);
//     } else {
//       res.status(400).send({ msg: `Cart id ${cid} does not exist` });
//     }
//   } catch (error) {
//     res.status(500).send({ msg: error.message });
//   }
// });

// // CREATE CART
// router.post("/", async (req, res) => {
//   try {
//     const newCart = await createCart();
//     res.status(200).json(newCart);
//   } catch (error) {}
// });

// // CREAR OBJETO EN CART
// router.post("/:idCart/product/:idProduct", async (req, res) => {
//   try {
//     const { CartId, ProductId } = req.params;
//     const cart = await getCartById(CartId);
//     const product = await getProductById(ProductId);
//     saveProdtoCart(cart, product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // REMOVER OBJETO EN CART

// router.delete("/:idCart/product/:idProduct", async (req, res) => {
//   try {
//   } catch (error) {}
// });

// // ACTUALIZAR UN SOLO OBJETO DEL CART Y SOLO LA CANTIDAD

// router.put("/:idCart", async (req, res) => {
//   try {
//   } catch (error) {}
// });

// // ELIMINAR TODOS LOS PRODUCTOS DEL CART

// router.delete("/:idCart", async (req, res) => {
//   try {
//   } catch (error) {}
// });

// // REMOVER CART

// router.delete("/:cartId", async (req, res) => {
//   try {
//     const { cartId } = req.params;
//     if (cartId) {
//       await deleteCart(Number(cartId));
//       res
//         .status(200)
//         .json({ message: `Cart ${Number(cartId)} deleted successfully` });
//     } else {
//       res.status(404).json({ message: "Cart wasn´t found" });
//     }
//   } catch (error) {
//     error.message = "error on code";
//   }
// });

export default router;
