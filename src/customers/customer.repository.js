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

            MongoClient.connect(process.env.URI, async (err, client) => {
                if (err) return reject(err);
                assert.equal(null, err);

                const db = client.db(process.env.DB_NAME);
                const collection = db.collection(process.env.COLLECTION_COSTUMER);

                await collection.find({}).skip(skip).limit(limit).toArray((err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                });

                client.close();

            });

        });
    };

    async getById(id) {

        if (!ObjectId.isValid(id)) throw new Error('id is invalid')

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

                collection.findOneAndUpdate({ _id: ObjectId(id) },
                    { $set: { name: body.name, email: body.email } }, { returnOriginal: false }, (err, result) => {
                        if (err) return reject(err)
                        return resolve(result)
                    });

                client.close();

            });

        });
    };

    async delete(id) {

        if (!ObjectId.isValid(id)) throw new Error('id is invalid')

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

        if (!ObjectId.isValid(customerId)) throw new Error('customerId is invalid')

        return new Promise((resolve, reject) => {

            MongoClient.connect(process.env.URI, (err, client) => {
                if (err) return reject(err);
                assert.equal(null, err);

                const db = client.db(process.env.DB_NAME);
                const collection = db.collection(process.env.COLLECTION_COSTUMER);

                collection.findOneAndUpdate({ _id: ObjectId(customerId) }, { $addToSet: { favorites: { $each: products } } }, (err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                });

                client.close();

            })
        })
    }

    async removeFavoriteProduct(customerId, id) {

        if (!ObjectId.isValid(customerId)) throw new Error('customerId is invalid')
        if (!ObjectId.isValid(id)) throw new Error('id is invalid')

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