import CartDAO from '../dao/classes/cart.dao.js'
import CartDTO from '../dao/dto/cart.dto.js'
import ticketModel from '../dao/models/ticket.model.js'
import productModel from '../dao/models/product.model.js'
import { v4 as uuidv4 } from 'uuid'
import EmailDAO from '../dao/classes/email.dao.js'
import EmailDTO from '../dao/dto/email.dto.js'

const mailService = new EmailDAO()

class CartController {
    async createCart(req, res) {
        const cart = await CartDAO.createCart()
        res.status(201).json(new CartDTO(cart))
    }

    async getCart(req, res) {
        const { cid } = req.params
        const cart = await CartDAO.getCartById(cid)
        if (!cart) return res.status(404).send('Cart not found')
        res.json(new CartDTO(cart))
    }

    async addProduct(req, res) {
        const { cid, pid } = req.params
        const { quantity } = req.body

        console.log(`Adding product: ${pid} to cart: ${cid} with quantity: ${quantity}`)

        const cart = await CartDAO.addProductToCart(cid, pid, quantity)
        res.json(new CartDTO(cart))
    }

    async removeProduct(req, res) {
        const { cid, pid } = req.params
        const cart = await CartDAO.removeProductFromCart(cid, pid)
        res.json(new CartDTO(cart))
    }

    async clearCart(req, res) {
        const { cid } = req.params
        const cart = await CartDAO.clearCart(cid)
        res.json(new CartDTO(cart))
    }

    static generateTicketHTML(ticket, purchasedProducts, unavailableProducts) {
        const purchasedItemsHTML = purchasedProducts.map(item => `
            <tr>
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
        `).join('')

        const unavailableItemsHTML = unavailableProducts.map(item => `
            <tr>
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
            </tr>
        `).join('')

        return `
            <div style="background-color: #eafaf1; padding: 20px; font-family: Arial, sans-serif; color: #333;">
                <h1 style="color: #3a7d44; text-align: center;">Thank You for Your Purchase!</h1>
                <p style="text-align: center;">Here are the details of your purchase:</p>
                <h3 style="color: #3a7d44;">Ticket Code: ${ticket.code}</h3>
                <p>Total Amount: <strong>$${ticket.amount.toFixed(2)}</strong></p>
                <p>Date: ${ticket.createdAt.toISOString().split('T')[0]}</p>
                
                <h3 style="color: #3a7d44;">Purchased Products:</h3>
                <table style="width: 100%; border-collapse: collapse; background-color: #f1f1f1;">
                    <thead>
                        <tr style="background-color: #3a7d44; color: white;">
                            <th style="padding: 10px; border: 1px solid #ddd;">Title</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${purchasedItemsHTML}
                    </tbody>
                </table>

                <h3 style="color: #ff6f61; margin-top: 20px;">Unavailable Products:</h3>
                <table style="width: 100%; border-collapse: collapse; background-color: #f9e5e5;">
                    <thead>
                        <tr style="background-color: #ff6f61; color: white;">
                            <th style="padding: 10px; border: 1px solid #ddd;">Title</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${unavailableItemsHTML}
                    </tbody>
                </table>
            </div>
        `
    }

    async purchaseCart(req, res) {
        const { cid } = req.params
        const cart = await CartDAO.getCartById(cid)

        if (!cart || cart.products.length === 0) {
            return res.status(400).send('Cart is empty or does not exist')
        }

        const unavailableProducts = []
        const purchasedProducts = []
        let totalAmount = 0

        for (const item of cart.products) {
            const product = await productModel.findById(item.product)

            if (!product) {
                unavailableProducts.push({
                    title: item.product.title,
                    quantity: item.quantity,
                    price: item.product.price,
                })
                continue
            }

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity
                await product.save()
                totalAmount += item.quantity * product.price
                purchasedProducts.push({
                    title: product.title,
                    quantity: item.quantity,
                    price: product.price,
                })
            } else {
                unavailableProducts.push({
                    title: product.title,
                    quantity: item.quantity,
                    price: product.price,
                })
            }
        }

        cart.products = cart.products.filter(item =>
            unavailableProducts.some(unavailable => unavailable.title === item.product.title)
        )

        await cart.save()

        const ticket = {
            code: uuidv4(),
            amount: totalAmount,
            purchaser: req.user.email,
            createdAt: new Date(),
        }

        const createdTicket = await ticketModel.create(ticket)

        const emailHTML = CartController.generateTicketHTML(ticket, purchasedProducts, unavailableProducts)
        const emailData = new EmailDTO({
            to: req.user.email,
            subject: 'Your Purchase Ticket',
            html: emailHTML,
        })

        try {
            await mailService.sendMail(emailData)
            console.log('Email sent successfully')
        } catch (error) {
            console.error('Error sending email:', error)
        }

        return res.status(201).json({
            id: createdTicket._id,
            purchasedProducts,
            unavailableProducts,
            ...ticket,
        })
    }

}

export default new CartController()
