const Router = require('koa-router')
const { handleError } = require('../../../service/handleError')

const router = new Router()

router.post('/cancel', cancelPost)

module.exports = router.routes()

async function cancelPost (ctx) {
  try {
    ctx.status = 200
    ctx.body = {
      errorCode: '000',
      errMessage: 'Success'
    }
  } catch (err) {
    console.log(err)
    handleError.setServerError(ctx)
  }
}
