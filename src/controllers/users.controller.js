import UserRepository from "../repository/user.repository.js";

export const getUsers = async (req, res) => {
    try {
        const users = await UserRepository.getUsers()
        res.send({ status: "success", result: users })
    } catch (error) {
        res.status(500).send({ status: "error", error })
    }
};

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await UserRepository.getUserById(uid)
        res.send({ status: "success", result: user })
    } catch (error) {
        res.status(500).send({ status: "error", error })
    }
};

export const saveUser = async (req, res) => {
    try {
        const { uid } = req.params
        const userData = req.body

        const updatedUser = await UserRepository.saveUser(uid, userData)

        if (updatedUser) {
            res.send({ status: "success", result: updatedUser })
        } else {
            res.status(404).send({ status: "error", message: "User not found" })
        }
    } catch (error) {
        res.status(500).send({ status: "error", error })
    }
};

