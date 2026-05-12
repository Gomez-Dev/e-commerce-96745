import { CartModel } from "../models/cart.model.js";

export default class CartDAO {
  // Crear carrito
  async createCart() {
    return await CartModel.create({
      products: [],
    });
  }

  // Actualizar cantidad de producto
  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    const product = cart.products.find(
      (item) =>
        item.product._id?.toString() === productId ||
        item.product.toString() === productId,
    );

    if (!product) {
      throw new Error("Producto no encontrado en carrito");
    }

    product.quantity = quantity;

    await cart.save();

    return await CartModel.findById(cartId).populate("products.product");
  }

  // Obtener carrito por ID
  async getCartById(id) {
    return await CartModel.findById(id).populate("products.product");
  }

  // Agregar producto al carrito
  async addProductToCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    // Buscar si ya existe
    const existingProduct = cart.products.find(
      (item) =>
        item.product._id?.toString() === productId ||
        item.product.toString() === productId,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    return await CartModel.findById(cartId).populate("products.product");
  }

  // Eliminar producto del carrito
  async removeProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    cart.products = cart.products.filter(
      (item) =>
        item.product._id?.toString() !== productId &&
        item.product.toString() !== productId,
    );

    await cart.save();

    return await CartModel.findById(cartId).populate("products.product");
  }

  // Vaciar carrito
  async clearCart(cartId) {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    cart.products = [];

    await cart.save();

    return cart;
  }

  // Actualizar cantidad de producto
  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    const product = cart.products.find(
      (item) =>
        item.product._id?.toString() === productId ||
        item.product.toString() === productId,
    );

    if (!product) {
      throw new Error("Producto no encontrado en carrito");
    }

    product.quantity = quantity;

    await cart.save();

    return await CartModel.findById(cartId).populate("products.product");
  }
}
