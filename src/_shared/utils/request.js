const request = require('request');

module.exports = (options) => {
    const config = {
        method: options.method,
        url: options.url,
        headers: options.headers || {},
        timeout: options.timeout || 240000,
        json: true
    };

    return new Promise((resolve, reject) => {
        request(config, (err, response, body) => {
            if (err) return reject(err);
            return resolve({
                body,
                statusCode: response.statusCode,
                resposeHeaders: response ? response.headers : {}
            });
        });
    });
};