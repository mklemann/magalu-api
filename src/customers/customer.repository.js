const { MongoClient, ObjectId } = require('mongodb')
const assert = require('assert')

const env = require('../environment')

class ReposityCustomers {
    async insert(body) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(env.uri, (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)
                console.log('Connected to insert document on mongodb')

                const db = client.db(env.databaseName)

                const collection = db.collection('customers-test')
                collection.createIndex({ email: 1 }, { unique: true })

                collection.insertOne(body, {
                    wtimeout: 10000,
                    j: true
                }, (err, r) => {
                    if (err) return reject(err)
                    return resolve('Criado')
                })

                client.close()
            })
        })
    }

    async get(skip, limit) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(env.uri, { useUnifiedTopology: true }, async (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)
                console.log('Connected to insert document on mongodb')

                const db = client.db(env.databaseName)
                const collection = db.collection('customers-test')

                await collection.find({}).skip(skip).limit(limit).toArray((err, docs) => {
                    if (err) return reject(err)
                    return resolve(docs)

                    
                    client.close()
                })
            })
        })
    }

    async getById(id) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(env.uri, (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)
                console.log('Connected to insert document on mongodb')

                const db = client.db(env.databaseName)
                const collection = db.collection('customers-test')

                collection.findOne({ _id: ObjectId(id) }, (err, doc) => {
                    if (err) return reject(err)
                    return resolve(doc)
                })
                client.close()
            })
        })
    }

    async update(id, body) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(env.uri, (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)
                console.log('Connected to insert document on mongodb')

                const db = client.db(env.databaseName)
                const collection = db.collection('customers-test')

                collection.updateOne({ _id: ObjectId(id) },
                    { $set: { name: body.name, email: body.email } }, (err, doc) => {
                        if (err) return reject(err)
                        return resolve(doc)
                    })
                client.close()
            })
        })
    }

}

module.exports = new ReposityCustomers()