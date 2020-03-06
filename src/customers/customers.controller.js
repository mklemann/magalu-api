const service = require('./customers.service');

class CustomerConstroller {
    async post(req, res) {
        try {

            const { body } = req;

            if (!body.name || !body.email) {
                throw new Error('Fields name and email must be sent!');
            };

            res.status(201).json(await service.post(body));

        } catch (err) {

            if (err.code === 11000) res.status(400).json({ success: false, message: 'Email already registered!' });
            return res.status(500).send(err.message || err);

        };
    };

    async get(req, res) {
        try {

            const { skip = 0, limit = 100 } = req.query;

            const customers = await service.get(Number(skip), Number(limit));

            const result = {
                meta: {
                    total: customers.length,
                    skip,
                    limit,
                },
                data: customers
            };

            res.status(result.data.length == 0 ? 204 : 200).json(result);
        } catch (err) {

            res.status(400).json({ succes: false, message: err.message || err });

        };
    };

    async getById(req, res) {
        try {

            const { id } = req.params;

            if (!id) {
                throw new Error(`Param id must be sent!`);
            };

            const customers = await service.getById(id);

            res.status(customers ? 200 : 204).json(customers);
        } catch (err) {

            res.status(400).json({ succes: false, message: err.message || err });

        };
    };

    async update(req, res) {

        try {

            const { id } = req.params;
            const { body } = req;

            if (!id) {
                throw new Error(`Param id must be sent!`);
            };

            if (!body) {
                throw new Error(`Body must be send to update a register!`);
            };

            const resultUpdate = await service.update(id, body)
            res.json(resultUpdate.result.nModified != 0 ? 'customer updated' : 'not updated');

        } catch (err) {

            if (e.code === 11000) res.status(400).json({ success: false, message: 'Email already registered!' });
            res.status(400).json({ succes: false, message: err.message || err });

        };
    };

    async delete(req, res) {
        try {

            const { id } = req.params;

            if (!id) {
                throw new Error(`Param id must be sent!`);
            };

            await service.delete(id);
            res.status(204).json({ message: 'user deleted!' });
        } catch (err) {

            res.status(400).json({ succes: false, message: err.message || err });

        };
    };

    async favoriteProduct(req, res) {

        try {

            const { products } = req.body;
            const { customerId } = req.params;

            if (!products || products.length === 0 || !customerId) {
                throw new Error(`products and customerId must be send!`);
            };

            res.json(await service.favoriteProduct(customerId, products));
        } catch (err) {

            res.status(400).json({ succes: false, message: err.message || err });

        };
    };

    async removeFavoriteProduct(req, res) {

        try {

            const { customerId, productId } = req.params;

            if (!productId || !customerId) {
                throw new Error(`productId and customerId must be send!`);
            };

            const resultRemoveProduct = await service.removeFavoriteProduct(customerId, productId);

            res.json(resultRemoveProduct.result.nModgified != 0 ? 'product removed' : 'not removed');
        } catch (err) {

            res.status(400).json({ succes: false, message: err.message || err });

        };
    };
};

module.exports = new CustomerConstroller();