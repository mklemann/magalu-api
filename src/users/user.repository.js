const { MongoClient, ObjectId } = require('mongodb')
const assert = require('assert')

require('dotenv').config()

class RepositoryUsers {
    async insert(body) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(process.env.URI, (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)

                const db = client.db(process.env.DB_NAME)

                const collection = db.collection(process.env.COLLECTION_USER)
                collection.createIndex({ username: 1 }, { unique: true })

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
            MongoClient.connect(process.env.URI, { useUnifiedTopology: true }, async (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)

                const db = client.db(process.env.DB_NAME)
                const collection = db.collection(process.env.COLLECTION_USER)

                await collection.find({}).skip(skip).limit(limit).toArray((err, result) => {
                    if (err) return reject(err)
                    return resolve(result)
                    client.close()
                })
            })
        })
    }

    async update(id, body) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(process.env.URI, (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)
                console.log('Connected to insert document on mongodb')

                const db = client.db(process.env.DB_NAME)
                const collection = db.collection(process.env.COLLECTION_USER)

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
            MongoClient.connect(process.env.URI, (err, client) => {
                if (err) return reject(err)
                assert.equal(null, err)
                console.log('Connected to insert document on mongodb')

                const db = client.db(process.env.DB_NAME)
                const collection = db.collection(process.env.COLLECTION_USER)

                collection.deleteOne({ _id: ObjectId(id) }, (err, result) => {
                    if (err) return reject(err)
                    return resolve(result)
                })
                client.close()
            })
        })
    }
}

module.exports = new RepositoryUsers()