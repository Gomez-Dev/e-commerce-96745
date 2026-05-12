import { Router } from "express";
import CartDAO from "../dao/cart.dao.js";

const router = Router();

const cartDAO = new CartDAO();

// Crear carrito
router.post("/", async (req, res) => {
  try {
    const newCart = await cartDAO.createCart();

    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear carrito",
    });
  }
});

// Obtener carrito por ID
router.get("/:cid", async (req, res) => {
  try {
    const cart = await cartDAO.getCartById(req.params.cid);

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener carrito",
    });
  }
});

// Agregar producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const updatedCart = await cartDAO.addProductToCart(
      req.params.cid,
      req.params.pid,
    );

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      error: "Error al agregar producto",
    });
  }
});

// Eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const updatedCart = await cartDAO.removeProductFromCart(
      req.params.cid,
      req.params.pid,
    );

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar producto del carrito",
    });
  }
});

// Actualizar cantidad de producto
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { quantity } = req.body;

    const updatedCart = await cartDAO.updateProductQuantity(
      req.params.cid,
      req.params.pid,
      quantity,
    );

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar cantidad",
    });
  }
});

// Actualizar cantidad de producto
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { quantity } = req.body;

    const updatedCart = await cartDAO.updateProductQuantity(
      req.params.cid,
      req.params.pid,
      quantity,
    );

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar cantidad",
    });
  }
});

// Vaciar carrito
router.delete("/:cid", async (req, res) => {
  try {
    const updatedCart = await cartDAO.clearCart(req.params.cid);

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      error: "Error al vaciar carrito",
    });
  }
});

export default router;
