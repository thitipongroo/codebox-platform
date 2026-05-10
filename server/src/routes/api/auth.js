const Router = require('koa-router')
const userRepo = require('../../repository/user')
const authService = require('../../services/auth')

const router = new Router()

router.post('/signin', async (ctx) => {
  const { username, password } = ctx.request.body
  try {
    const userData = await userRepo.getUserByUsername(username)
    if (!userData) {
      ctx.status = 400
      ctx.body = { errorCode: 'CB001', errorMessage: 'Incorrect username or password' }
      return
    }
    const isValid = await authService.verifyUsernameAndPassword(password, userData.user_password)
    if (!isValid) {
      ctx.status = 400
      ctx.body = { errorCode: 'CB001', errorMessage: 'Incorrect username or password' }
      return
    }
    ctx.session.userId = userData.user_name
    ctx.status = 200
    ctx.body = { errorCode: '000', errorMessage: 'Success' }
  } catch (err) {
    console.error(err)
    ctx.status = 500
    ctx.body = { errorCode: '551', errorMessage: 'Internal server error' }
  }
})

module.exports = router.routes()
