import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import { CartModel } from "../models/cart.model.js";

const router = Router();

// Vista realtime
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

// Vista productos
router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find().lean();

    res.render("home", {
      products,
    });
  } catch (error) {
    res.status(500).send("Error al cargar productos");
  }
});

// Vista detalle producto
router.get("/products/:pid", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).lean();

    res.render("productDetail", {
      product,
    });
  } catch (error) {
    res.status(500).send("Error al cargar producto");
  }
});

// Vista carrito
router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cid)
      .populate("products.product")
      .lean();

    res.render("cart", {
      cart,
    });
  } catch (error) {
    res.status(500).send("Error al cargar carrito");
  }
});

export default router;
