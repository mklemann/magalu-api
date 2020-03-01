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
}

module.exports = new CustomerService()