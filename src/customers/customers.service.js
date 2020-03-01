const repository = require('./customer.repository')

class CustomerService {
    async post(body) {
        const createCustomer = await repository.insert({ name: body.name, email: body.email })
        return createCustomer
    }

    async get(skip, limit) {
        const getCustomers = await repository.get(skip, limit)
        return getCustomers
    }

    async getById(id) {
        const getCustomer = await repository.getById(id)
        return getCustomer
    }

    async update(id, body) {
        const updateCustomer = await repository.update(id, body)
        return updateCustomer
    }
}

module.exports = new CustomerService()