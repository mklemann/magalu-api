const service = require('./customers.service')
const jwt = require('jsonwebtoken')
const env = require('../environment')

class CustomerConstroller {
    // async login(req, res) {
    //     try {
    //         const { body } = req
    //         if (!body.user || !body.password) {
    //             throw new Error('User and password must be send!')
    //         }

            

    //         const id = 1
    //         const token = jwt.sign({ id }, env.SECRET, {
    //             expiresIn: 3600
    //         })
    //         res.json({ auth: true, token, expiresIn: 3600 })
    //     } catch (e) {
    //         res.json(e.message || e)
    //     }
    // }

    async post(req, res) {
        try {
            const { body } = req
            if (!body.name || !body.email) {
                throw new Error('Fields name and email must be send!')
            }

            res.status(201).json(await service.post(body))
            return
        } catch (e) {
            // return sendJSONResponse(e, 500, { success: false, message: 'Registro duplicado. Cadastre com outro email!' })
            if (e.code === 11000) res.status(500).json({ success: false, message: 'Registro duplicado. Cadastre com outro email!' })
            return res.status(500).send(e)
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
                total: customers.length,
                skip,
                limit,
                data: customers
            }

            res.json(result)
            return
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
            return
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

            const customers = await service.update(id, body)

            res.json(customers)
            return
        } catch (e) {
            if (e.code === 11000) res.status(500).json({ success: false, message: 'Registro duplicado. Cadastre com outro email!' })
            res.status(400).json({ succes: false, message: e.message || e })
        }
    }
}

module.exports = new CustomerConstroller()