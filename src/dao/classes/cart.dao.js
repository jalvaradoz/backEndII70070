import cartModel from "../models/cart.model.js"

class CartDAO {
    async createCart() {
        const newCart = await cartModel.create({ products: [] })
        return newCart
    }

    async getCartById(cartId) {
        return await cartModel.findById(cartId).populate('products.product')
    }

    async addProductToCart(cartId, pid, quantity) {
        const cart = await this.getCartById(cartId);

        if (!cart) {
            throw new Error('Cart not found')
        }

        const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid)

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
            console.log(`Updated product quantity: ${cart.products[productIndex].quantity}`)
        } else {
            cart.products.push({ product: pid, quantity })
            console.log(`Added new product with quantity: ${quantity}`)
        }

        await cart.save()
        return cart
    }

    async removeProductFromCart(cartId, pid) {
        const cart = await this.getCartById(cartId)

        if (!cart) {
            throw new Error('Cart not found')
        }

        console.log('Current products in cart before removal:', cart.products)

        const initialLength = cart.products.length

        cart.products = cart.products.filter(p => p.product._id.toString() !== pid)

        const removedCount = initialLength - cart.products.length

        if (removedCount > 0) {
            console.log(`Removed product with ID ${pid}. Total products removed: ${removedCount}`)
        } else {
            console.log(`No product with ID ${pid} found in cart. No products removed.`)
        }

        await cart.save()
        return cart
    }

    async clearCart(cid) {
        const cart = await this.getCartById(cid)
        cart.products = []
        await cart.save()
        return cart
    }
}

export default new CartDAO()
