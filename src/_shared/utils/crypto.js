const crypto = require('crypto');
require('dotenv').config();

module.exports = {
    encrypt(text) {
        const cipher = crypto.createCipher(process.env.ALGORITHM, process.env.KEY_CRYPTO);
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt(text) {
        const decipher = crypto.createDecipher(process.env.ALGORITHM, process.env.KEY_CRYPTO);
        let dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
};