const mysql = require('mysql2/promise')
const { db } = require('../../_config')

const pool = mysql.createPool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database
})

module.exports = pool
