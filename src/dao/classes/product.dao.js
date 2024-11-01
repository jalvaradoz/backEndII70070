import productModel from "../models/product.model.js"

export default class ProductDAO {
    async getProducts() {
        try {
            return await productModel.find()
        } catch (error) {
            console.log(error);
            throw new Error("Error fetching products")
        }
    }

    async getProductById(id) {
        try {
            return await productModel.findById(id)
        } catch (error) {
            console.log(error)
            throw new Error("Error fetching product")
        }
    }

    async createProduct(productData) {
        try {
            const newProduct = new productModel(productData)
            return await newProduct.save()
        } catch (error) {
            console.log(error)
            throw new Error("Error creating product")
        }
    }

    async updateProduct(id, productData) {
        try {
            return await productModel.findByIdAndUpdate(id, productData, { new: true })
        } catch (error) {
            console.log(error)
            throw new Error("Error updating product")
        }
    }

    async deleteProduct(id) {
        try {
            return await productModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
            throw new Error("Error deleting product")
        }
    }
}
