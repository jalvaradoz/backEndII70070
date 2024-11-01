import ProductDAO from "../dao/classes/product.dao.js"
import ProductDTO from "../dao/dto/product.dto.js"

const productDAO = new ProductDAO()

export const getProducts = async (req, res) => {
    try {
        const products = await productDAO.getProducts()
        res.send({ status: "success", result: products.map(product => new ProductDTO(product)) })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: "error", error })
    }
};

export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productDAO.getProductById(pid)
        if (!product) {
            return res.status(404).send({ status: "error", error: "Product not found" });
        }
        res.send({ status: "success", result: new ProductDTO(product) })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error })
    }
};

export const createProduct = async (req, res) => {
    try {
        const productData = req.body
        const newProduct = await productDAO.createProduct(productData)
        res.status(201).send({ status: "success", result: new ProductDTO(newProduct) })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: "error", error })
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const productData = req.body
        const updatedProduct = await productDAO.updateProduct(pid, productData)
        if (!updatedProduct) {
            return res.status(404).send({ status: "error", error: "Product not found" })
        }
        res.send({ status: "success", result: new ProductDTO(updatedProduct) })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: "error", error })
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const deletedProduct = await productDAO.deleteProduct(pid)
        if (!deletedProduct) {
            return res.status(404).send({ status: "error", error: "Product not found" })
        }
        res.send({ status: "success", message: "Product deleted successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: "error", error })
    }
};
