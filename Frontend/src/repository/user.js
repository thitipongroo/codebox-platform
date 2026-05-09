// const mysqlErrors = require('mysql2/lib/constants/errors')
const pool = require('../db')

async function getUserByUsername (username) {
  const [rows] = await pool.query(`
    SELECT user_name, user_password 
    FROM admin_user 
    WHERE user_name = ?
  `, [username])
  return rows[0]
}

module.exports = {
  getUserByUsername
}
