/**
 * Key Configuration
 */

// Setup key configuration

let config;

if (process.env.NODE_ENV === "production") config = require("./prod");
else config = require('./dev');

// Export key configuration

module.exports = config;
