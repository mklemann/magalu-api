const repository = require('./user.repository')
const crypto = require('../_shared/utils/crypto')

require('dotenv').config()

class ServiceUsers {
    async post(body) {
        const createUser = await repository.insert({ username: body.username, password: crypto.encrypt(body.password) })
        return createUser
    }

    async get(skip, limit) {
        const getUsers = await repository.get(skip, limit)
        return getUsers
    }

    async delete(id) {
        const deleteCustomer = await repository.delete(id)
        return deleteCustomer
    }
}

module.exports = new ServiceUsers()