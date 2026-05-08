import { Router } from "express";
import ProductDAO from "../dao/product.dao.js";

const router = Router();

const productDAO = new ProductDAO();

// GET todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await productDAO.getProducts();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener productos",
    });
  }
});

// GET producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const product = await productDAO.getProductById(req.params.pid);

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar producto",
    });
  }
});

// POST crear producto
router.post("/", async (req, res) => {
  try {
    const newProduct = await productDAO.createProduct(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear producto",
    });
  }
});

// PUT actualizar producto
router.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = await productDAO.updateProduct(
      req.params.pid,
      req.body,
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar producto",
    });
  }
});

// DELETE eliminar producto
router.delete("/:pid", async (req, res) => {
  try {
    await productDAO.deleteProduct(req.params.pid);

    res.json({
      message: "Producto eliminado",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar producto",
    });
  }
});

export default router;
