const Router = require('koa-router')
const { userTB } = require('../../../repository')
const serviceAuth = require('../../../service/auth')

const router = new Router()

router.post('/signIn', signInPost)

module.exports = router.routes()

async function signInPost (ctx) {
  const {username, password} = ctx.request.body
  try {
    const userData = await userTB.getUserByUsername(username)
    console.log(userData)

    if (!userData) {
      ctx.status = 400
      ctx.body = {
        errorCode: 'CB001',
        errMessage: 'Incorrect username or password'
      }
      return
    }

    const isSuccess = await serviceAuth.verifyUsernameAndPassword(password, userData.user_password)
    if (!isSuccess) {
      ctx.status = 400
      ctx.body = {
        errorCode: 'CB001',
        errMessage: 'Incorrect username or password'
      }
      return
    }

    ctx.session.userId = userData.user_name
    ctx.status = 200
    ctx.body = {
      errorCode: '000',
      errMessage: 'Success'
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      errorCode: '551',
      errMessage: 'Exception'
    }
  }
}
