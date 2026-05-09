const pool = require('../db')

async function getPackageDetail () {
  const [rows] = await pool.query(`
    SELECT package_id, package_name, package_description, package_picture 
    FROM package_detail 
    WHERE package_start_date BETWEEN package_start_date AND package_end_date 
  `)
  return rows
}

async function getSubscriptionDetail () {
  const [rows] = await pool.query(`
    SELECT sub_id, sub_name 
    FROM subscription 
  `)
  return rows
}

async function getPackageAndSubDetailById (packageId) {
  const [rows] = await pool.query(`
    SELECT pp.package_id, pp.sub_id, pd.package_name, pd.package_description, pd.package_picture, 
    pd.package_end_date, pp.plan_value , ss.sub_name 
    FROM package_detail pd JOIN package_plan pp 
    ON pd.package_id = pp.package_id 
    JOIN subscription ss ON pp.sub_id = ss.sub_id 
    WHERE pd.package_id = ? 
  `, [packageId])
  return rows
}

module.exports = {
  getPackageDetail,
  getSubscriptionDetail,
  getPackageAndSubDetailById
}
