const pool = require('../db')

async function getSubscription () {
  const [rows] = await pool.query(`
  SELECT sub_id, sub_name 
  FROM subscription
  `)
  return rows
}

async function getPackage () {
  const [rows] = await pool.query(`
  SELECT package_id, package_name, package_description 
  FROM package_detail
  `)
  return rows
}

module.exports = {
  getSubscription,
  getPackage
}
