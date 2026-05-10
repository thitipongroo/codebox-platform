const bcrypt = require('bcrypt')

async function verifyUsernameAndPassword(password, hashPassword) {
  try {
    if (!hashPassword || !password) return false
    return await bcrypt.compare(password, hashPassword)
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = { verifyUsernameAndPassword }
