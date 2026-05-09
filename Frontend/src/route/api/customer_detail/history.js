const Router = require('koa-router')
const { handleError } = require('../../../service/handleError')

const router = new Router()

router.get('/history/:id', historyGet)

module.exports = router.routes()

async function historyGet (ctx) {
  try {
    ctx.status = 200
    ctx.body = {
      paymentHistoryList: [{
        name: 'User1',
        surname: 'Surname1',
        packageName: 'CodeCamp2',
        amount: '1000'
      },
      {
        name: 'User1',
        surname: 'Surname1',
        packageName: 'CodeCamp2',
        amount: '2000'
      },
      {
        name: 'User1',
        surname: 'Surname1',
        packageName: 'CodeCamp2',
        amount: '1200'
      }],
      errorCode: '000',
      errMessage: 'Success'
    }
  } catch (err) {
    console.log(err)
    handleError.setServerError(ctx)
  }
}
