import { ProductModel } from "../models/product.model.js";

export default class ProductDAO {
  async getProducts() {
    return await ProductModel.find();
  }

  async getProductById(id) {
    return await ProductModel.findById(id);
  }

  async createProduct(productData) {
    return await ProductModel.create(productData);
  }

  async updateProduct(id, productData) {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}
