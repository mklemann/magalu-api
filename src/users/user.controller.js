const service = require('./user.service')

class CustomerUsers {
    async post(req, res) {
        try {
            const { body } = req
            
            if (!body.username || !body.password) {
                throw new Error('Fields username and password must be send!')
            }
            
            res.status(201).json(await service.post(body))
        } catch (e) {
            if (e.code === 11000) res.status(500).json({ success: false, message: 'Registro duplicado! Entre com outro username!' })
            return res.status(500).send(e.message || e)
        }
    }

    async get(req, res) {
        try {
            const { skip, limit } = req.query
            if (!skip || !limit) {
                throw new Error(`Query params skip and limit must be send!`)
            }

            const users = await service.get(Number(skip), Number(limit))
            const result = {
                meta: {
                    total: users.length,
                    skip,
                    limit,
                },
                data: users
            }

            res.json(result)
        } catch (e) {
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
            res.json("User deleted!")
        } catch (e) {
            res.status(400).json({ succes: false, message: e.message || e })
        }
    }
}

module.exports = new CustomerUsers()