const service = require('./customers.service')

class CustomerConstroller {
    async post(req, res) {
        try {
            const { body } = req

            if (!body.name || !body.email) {
                throw new Error('Fields name and email must be send!')
            }

            res.status(201).json(await service.post(body))
        } catch (e) {
            if (e.code === 11000) res.status(500).json({ success: false, message: 'Registro duplicado. Cadastre com outro email!' })
            return res.status(500).send(e.message || e)
        }
    }

    async get(req, res) {
        try {
            const { skip, limit } = req.query
            if (!skip || !limit) {
                throw new Error(`Query params skip and limit must be send!`)
            }

            const customers = await service.get(Number(skip), Number(limit))
            const result = {
                meta: {
                    total: customers.length,
                    skip,
                    limit,
                },
                data: customers
            }

            res.json(result)
        } catch (e) {
            res.status(400).json({ succes: false, message: e.message || e })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                throw new Error(`Param id must be send!`)
            }

            const customers = await service.getById(id)

            res.json(customers)
        } catch (e) {
            res.status(400).json({ succes: false, message: e.message || e })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { body } = req

            if (!id) {
                throw new Error(`Param id must be send!`)
            }
            if (!body) {
                throw new Error(`Body must be send to update a register!`)
            }

            await service.update(id, body)
            res.json("Customer updated!")
        } catch (e) {
            if (e.code === 11000) res.status(500).json({ success: false, message: 'Registro duplicado. Cadastre com outro email!' })
            res.status(400).json({ succes: false, message: e.message || e })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            if (!id) {
                throw new Error(`Param id must be send!`)
            }

            await service.delete(id)
            res.json("Customer deleted!")
        } catch (e) {
            res.status(400).json({ succes: false, message: e.message || e })
        }
    }

    async favoriteProduct(req, res) {
        try {
            const { products } = req.body
            const { customerId } = req.params
            if (!products || products.length === 0 || !customerId) {
                throw new Error(`products and customerId must be send!`)
            }

            res.json(await service.favoriteProduct(customerId, products))
        } catch (e) {
            res.status(400).json({ succes: false, message: e.message || e })
        }
    }

    async removeFavoriteProduct(req, res) {
        try {
            const { customerId, productId } = req.params
            if (!productId || !customerId) {
                throw new Error(`productId and customerId must be send!`)
            }

            res.json(await service.removeFavoriteProduct(customerId, productId))
        } catch (e) {
            res.status(400).json({ succes: false, message: e.message || e })
        }
    }
}

module.exports = new CustomerConstroller()