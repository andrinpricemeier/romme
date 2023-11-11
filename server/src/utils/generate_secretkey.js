// Utility to quickly generate secret keys, e.g. for JWT.
// Run this script with `node generate_secretkey`
console.log(require('crypto').randomBytes(64).toString('hex'));