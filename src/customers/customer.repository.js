const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const env = require('../environment')

const client = new MongoClient(env.uri, { useNewUrlParser: true, useUnifiedTopology: true });

class ReposityCustomers {
    async insert(body) {
        return new Promise((resolve, reject) => {
            client.connect(async (err, client) => {
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
            })
        })
    }

    async get() {
        return new Promise((resolve, reject) => {
            client.connect(async (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)
                console.log('Connected to insert document on mongodb')

                const db = client.db(env.databaseName)
                const collection = db.collection('customers-test')

                collection.find({}).toArray((err, docs) => {
                    if (err) return reject(err)
                    return resolve(docs)
                })

            })
        })
    }
}

module.exports = new ReposityCustomers()