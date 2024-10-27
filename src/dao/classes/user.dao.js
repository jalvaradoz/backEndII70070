import userModel from "../models/user.model.js"

export default class User {
    getUsers = async () => {
        try {
            let users = await userModel.find()
            return users
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getUserById = async (id) => {
        try {
            let user = await userModel.findOne({ _id: id })
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    }
}