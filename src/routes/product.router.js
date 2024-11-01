import { Router } from 'express'
import { authToken } from '../utils.js'
import { authorizeRole } from '../middlewares/authorizeRole.js'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'

const productRouter = Router()

productRouter.get('/products', getProducts)
productRouter.get('/products/:pid', getProductById)

productRouter.post('/newProduct', authToken, authorizeRole('admin'), createProduct)
productRouter.put('/products/update/:pid', authToken, authorizeRole('admin'), updateProduct)
productRouter.delete('/products/delete/:pid', authToken, authorizeRole('admin'), deleteProduct)

export default productRouter