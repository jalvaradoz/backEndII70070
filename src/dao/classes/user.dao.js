import userModel from "../models/user.model.js"

export default class UserDAO {
    async getUsers() {
        try {
            return await userModel.find()
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getUserById(id) {
        try {
            return await userModel.findById(id)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async saveUser(id, userData) {
        try {
            return await userModel.findByIdAndUpdate(id, userData, { new: true })
        } catch (error) {
            console.log(error)
            return null
        }
    }
}