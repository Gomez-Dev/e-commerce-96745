import { Router } from "express";
import ProductDAO from "../dao/product.dao.js";

const router = Router();

const productDAO = new ProductDAO();

// GET producto por ID
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;

    // Filtro
    const filter = {};

    if (query) {
      filter.category = query;
    }

    // Orden
    const options = {
      limit,
      page,
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    };

    const result = await productDAO.getProducts(filter, options);

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: null,
      nextLink: null,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener productos",
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
