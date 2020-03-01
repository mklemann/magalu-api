const repository = require('./customer.repository')

class CustomerService {
    async post(body) {
        const createCustomer = await repository.insert({ name: body.name, email: body.email })
        return createCustomer
    }

    async get() {
        const getCustomers = await repository.get()
        return getCustomers
    }
}

module.exports = new CustomerService()