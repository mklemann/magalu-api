const repository = require('./customer.repository');
const checkProduct = require('../_shared/utils/checkProduct');

class CustomerService {

    async post(body) {

        const createCustomer = await repository.insert({ name: body.name, email: body.email });
        return createCustomer;

    };

    async get(skip, limit) {

        const getCustomers = await repository.get(skip, limit);
        return getCustomers;

    };

    async getById(id) {

        const getCustomer = await repository.getById(id);
        return getCustomer;

    };

    async update(id, body) {

        const updateCustomer = await repository.update(id, body);
        return updateCustomer;

    }

    async delete(id) {

        const deleteCustomer = await repository.delete(id);
        return deleteCustomer;

    };

    async favoriteProduct(customerId, products) {

        products = [...new Set(products)];

        const favoriteProducts = [];

        // VALIDAR
        for (const p of products) {

            const check = await checkProduct(p);

            if (check.statusCode == 200) {
                favoriteProducts.push(check.body);
            };

        };

        await repository.favoriteProduct(customerId, favoriteProducts);
        return favoriteProducts;
    };

    async removeFavoriteProduct(customerId, productId) {
        const removeProduct = await repository.removeFavoriteProduct(customerId, productId);
        return removeProduct;
    };
};

module.exports = new CustomerService();