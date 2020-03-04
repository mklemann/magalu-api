const request = require('./request');

module.exports = async (productId) => {
    const options = {
        method: 'GET',
        url: `http://challenge-api.luizalabs.com/api/product/${productId}`,
        headers: {},
        body: {}
    };

    const result = await request(options);
    return result;
}