const { MongoClient, ObjectId } = require('mongodb');
const assert = require('assert');

require('dotenv').config();

class ReposityCustomers {
    async insert(body) {
        return new Promise((resolve, reject) => {

            MongoClient.connect(process.env.URI, (err, client) => {
                if (err) return reject(err);
                assert.equal(null, err);

                const db = client.db(process.env.DB_NAME);

                const collection = db.collection(process.env.COLLECTION_COSTUMER);
                collection.createIndex({ email: 1 }, { unique: true });

                collection.insertOne(body, {
                    wtimeout: 10000,
                    j: true
                }, (err, result) => {
                    if (err) return reject(err);
                    return resolve(result.ops[0] || result);
                });
                client.close();

            });

        });
    };

    async get(skip, limit) {
        return new Promise((resolve, reject) => {

            MongoClient.connect(process.env.URI, { useUnifiedTopology: true }, async (err, client) => {
                if (err) return reject(err);
                assert.equal(null, err);

                const db = client.db(process.env.DB_NAME);
                const collection = db.collection(process.env.COLLECTION_COSTUMER);

                await collection.find({}).skip(skip).limit(limit).toArray((err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                    client.close();
                });

            });

        });
    };

    async getById(id) {
        return new Promise((resolve, reject) => {

            MongoClient.connect(process.env.URI, (err, client) => {
                if (err) return reject(err);
                assert.equal(null, err);

                const db = client.db(process.env.DB_NAME);
                const collection = db.collection(process.env.COLLECTION_COSTUMER);

                collection.findOne({ _id: ObjectId(id) }, (err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                });
                client.close();
            });

        });
    };

    async update(id, body) {
        return new Promise((resolve, reject) => {

            MongoClient.connect(process.env.URI, (err, client) => {
                if (err) return reject(err);
                assert.equal(null, err);

                const db = client.db(process.env.DB_NAME);
                const collection = db.collection(process.env.COLLECTION_COSTUMER);

                collection.updateOne({ _id: ObjectId(id) },
                    { $set: { name: body.name, email: body.email } }, (err, result) => {
                        if (err) return reject(err)
                        return resolve(result)
                    });

                client.close();

            });

        });
    };

    async delete(id) {
        return new Promise((resolve, reject) => {

            MongoClient.connect(process.env.URI, (err, client) => {
                if (err) return reject(err);
                assert.equal(null, err);

                const db = client.db(process.env.DB_NAME);
                const collection = db.collection(process.env.COLLECTION_COSTUMER);

                collection.deleteOne({ _id: ObjectId(id) }, (err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                });

                client.close();

            });

        });
    };

    async favoriteProduct(customerId, products) {
        return new Promise((resolve, reject) => {

            MongoClient.connect(process.env.URI, (err, client) => {
                if (err) return reject(err);
                assert.equal(null, err);

                const db = client.db(process.env.DB_NAME);
                const collection = db.collection(process.env.COLLECTION_COSTUMER);

                collection.updateOne({ _id: ObjectId(customerId) }, { $addToSet: { favorites: { $each: products } } }, (err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                });

                client.close();

            })
        })
    }

    async removeFavoriteProduct(customerId, id) {
        return new Promise((resolve, reject) => {

            MongoClient.connect(process.env.URI, (err, client) => {
                if (err) return reject(err);
                assert.equal(null, err);

                const db = client.db(process.env.DB_NAME);
                const collection = db.collection(process.env.COLLECTION_COSTUMER);

                collection.updateOne({ _id: ObjectId(customerId) }, { $pull: { favorites: { id: id } } }, (err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                });

                client.close();

            });

        });
    };
};

module.exports = new ReposityCustomers();