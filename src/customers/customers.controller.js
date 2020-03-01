const service = require('./customers.service')

class CustomerConstroller {
    async post(req, res, next) {
        try {
            const { body } = req
            if (!body.name || !body.email) {
                throw new Error('Fields name and email must be send!')
            }

            res.send(await service.post(body))
        } catch (e) {
            if(e.code === 11000) res.status(500).send('Registro duplicado. Cadastre com outro email!') 
            res.status(500).send(e)
        }
    }

    async get(req, res, next) {
        try {
            // const { body } = req
            // if (!body.name || !body.email) {
            //     throw new Error('Fields name and email must be send!')
            // }

            res.send(await service.get())
        } catch (e) {
            res.status(400).send(e)
        }
    }
}

module.exports = new CustomerConstroller()