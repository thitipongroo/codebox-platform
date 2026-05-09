const bcrypt = require('bcrypt')
// const AppError = require('../util/appError')

/**
 * verifyPassword
 * verify password
 * @param {string} password
 * @param {string} hashPassword
 * @returns {Promise<boolean>}
 */
async function verifyUsernameAndPassword (password, hashPassword) {
  try {
    if (!hashPassword) {
      return false
    }

    if (!password) {
      return false
      // throw new AppError('wrong email or password', 400)
    }

    return await bcrypt.compare(password, hashPassword)
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = {
  verifyUsernameAndPassword
}
