const jwt = require('jsonwebtoken')
const { MongoClient } = require('mongodb')
const assert = require('assert')

const env = require('../../environment')

class LoginController {
    async login(req, res) {
        const { email } = req.body

        MongoClient.connect(env.uri, (err, client) => {
            if (err) return reject(err)
            assert.equal(null, err)
            console.log('Connected to insert document on mongodb')

            const db = client.db(env.databaseName)
            const collection = db.collection('customers-test')

            collection.findOne({ email: email }, (err, doc) => {
                if (err) return res.send(err)
                if (doc) {
                    const { _id } = doc
                    const token = jwt.sign({ id: _id }, env.SECRET, {
                        expiresIn: 3600
                    })

                    res.json({ auth: true, token, expiresIn: 3600 })
                } else {
                    res.json({ message: "Usuáro não encontrado, certifique-se do email!" })
                }
            })

            client.close()
        })
    }

    async verifyJwt(req, res, next) {
        const { authorization } = req.headers

        const token = authorization.split(' ')[1]

        jwt.verify(token, env.SECRET, (err, decoded) => {
            if (err) res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
            next()
        })
    }
}

module.exports = new LoginController()