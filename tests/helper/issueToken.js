const jwt = require('jsonwebtoken');

module.exports = (data, options = {}) => jwt.sign(data, 'FhOdRM5GpEaqw3&BUZ$vUsjiq*7p8p', options);