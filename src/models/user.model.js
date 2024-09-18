import mongoose from "mongoose"

const userCollection = "Users"

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true }
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel