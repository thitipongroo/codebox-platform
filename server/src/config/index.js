require('dotenv').config()

module.exports = {
  db: {
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'codebox'
  },
  omise: {
    publicKey: process.env.OMISE_PUBLIC_KEY || '',
    secretKey: process.env.OMISE_SECRET_KEY || ''
  },
  port: parseInt(process.env.PORT, 10) || 3000,
  appUrl: process.env.APP_URL || 'http://localhost:3000'
}
