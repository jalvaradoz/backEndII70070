import { Router } from 'express'
import { authToken } from '../utils.js'
import { authorizeRole } from '../middlewares/authorizeRole.js'
import CartController from '../controllers/cart.controller.js'

const cartRouter = Router()

// to create a cart
cartRouter.post('/carts', CartController.createCart)
// to get the cart by id 
cartRouter.get('/carts/:cid', CartController.getCart)
// to add products to the cart
cartRouter.post('/carts/:cid/products/:pid', authToken, authorizeRole('user'), CartController.addProduct)
//delete a product by id on the cart
cartRouter.delete('/carts/:cid/products/:pid', authToken, CartController.removeProduct)
//delete a cart on the DB
cartRouter.delete('/carts/:cid', authToken, CartController.clearCart)
// purchase the cart
cartRouter.post('/carts/:cid/purchase', authToken, CartController.purchaseCart)

export default cartRouter
