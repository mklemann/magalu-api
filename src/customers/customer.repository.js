const { MongoClient, ObjectId } = require('mongodb')
const assert = require('assert')
const _ = require('lodash')
const env = require('../environment')

class ReposityCustomers {
    async insert(body) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(env.uri, (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)

                const db = client.db(env.databaseName)

                const collection = db.collection('customers-test')
                collection.createIndex({ email: 1 }, { unique: true })
                // collection.createIndex({ "favorites.id": 1 }, { unique: true })

                collection.insertOne(body, {
                    wtimeout: 10000,
                    j: true
                }, (err, result) => {
                    if (err) return reject(err)
                    return resolve(result.ops[0] || result)
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

                const db = client.db(env.databaseName)
                const collection = db.collection('customers-test')

                await collection.find({}).skip(skip).limit(limit).toArray((err, result) => {
                    if (err) return reject(err)
                    return resolve(result)
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

                collection.findOne({ _id: ObjectId(id) }, (err, result) => {
                    if (err) return reject(err)
                    return resolve(result)
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
                    { $set: { name: body.name, email: body.email } }, (err, result) => {
                        if (err) return reject(err)
                        return resolve(result)
                    })
                client.close()
            })
        })
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(env.uri, (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)
                console.log('Connected to insert document on mongodb')

                const db = client.db(env.databaseName)
                const collection = db.collection('customers-test')

                collection.deleteOne({ _id: ObjectId(id) }, (err, result) => {
                    if (err) return reject(err)
                    return resolve(result)
                })
                client.close()
            })
        })
    }

    async favoriteProduct(customerId, products) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(env.uri, (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)
                console.log('Connected to insert document on mongodb')

                const db = client.db(env.databaseName)
                const collection = db.collection('customers-test')

                collection.findOne({ _id: ObjectId(customerId) }, (err, res) => {
                    if (err) return reject(err)

                    let { favorites = [] } = res
                    let allFavorites = []

                    // products - novos
                    // existentes


                    if (favorites.length === 0) {
                        allFavorites = products
                    } else {
                        for (const product of products) {
                            const favoritesString = JSON.stringify(favorites)
                            if(!favoritesString.includes(product.id)) allFavorites.push(product)
                        }
                    }

                    collection.updateOne({ _id: ObjectId(customerId) }, { $push: { favorites: { $each: allFavorites } } }, (err, result) => {
                        if (err) return reject(err)
                        return resolve(result)
                    })

                    client.close()
                })

            })
        })
    }
}

module.exports = new ReposityCustomers()