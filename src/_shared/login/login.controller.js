const jwt = require('jsonwebtoken')
const { MongoClient } = require('mongodb')
const assert = require('assert')
const crypto = require('../utils/crypto')

require('dotenv').config()

class LoginController {
    async login(req, res) {
        const { username, password } = req.body

        if (!username || !password) {
            throw res.status(500).json('username and password must be informed!')
        }

        MongoClient.connect(process.env.URI, (err, client) => {
            if (err) return reject(err)
            assert.equal(null, err)

            const db = client.db(process.env.DB_NAME)
            const collection = db.collection('users')

            collection.findOne({ username, password: crypto.encrypt(password) }, (err, doc) => {
                if (err) return res.send(err)

                if (doc) {
                    const { _id } = doc

                    const token = jwt.sign({ id: _id }, process.env.SECRET, {
                        expiresIn: 3600
                    })

                    res.json({ auth: true, token, expiresIn: 3600 })
                } else {
                    res.json({ message: "Usuáro ou Senha inválido!" })
                }
            })
            client.close()
        })
    }

    async verifyJwt(req, res, next) {
        const { authorization } = req.headers

        const token = authorization.split(' ')[1]

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
            next()
        })
    }
}

module.exports = new LoginController()