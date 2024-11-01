import UserDAO from "../dao/classes/user.dao.js"
import UserDTO from "../dao/dto/user.dto.js"

class UserRepository {
    static userDAO = new UserDAO()

    static async getUsers() {
        const users = await this.userDAO.getUsers();
        return users.map(user => new UserDTO(user));
    }

    static async getUserById(id) {
        const user = await this.userDAO.getUserById(id);
        return user ? new UserDTO(user) : null;
    }

    static async saveUser(id, userData) {
        const updateUser = await this.userDAO.saveUser(id, userData)
        return updateUser ? new UserDTO(updateUser) : null
    }
}

export default UserRepository
