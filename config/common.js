module.exports = {
  // Secret key for JWT signing and encryption
  'JWTsecret': 'super secret passphrase',
  // Database connection information
  'database': 'mongodb://localhost:27017',
  // Setting port for server
  'port': process.env.PORT || 3000,
    // example: Configuring 3rd party APIs
  '3rdservice_api_key': 'your service private api key'
  }
