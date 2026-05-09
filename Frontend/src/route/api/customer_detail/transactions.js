const Router = require('koa-router')
const { handleError } = require('../../../service/handleError')

const router = new Router()

router.post('/transactions', transcationPost)

module.exports = router.routes()

async function transcationPost (ctx) {
  try {
    ctx.status = 200
    ctx.body = {
      transactionsList: [{
        name: 'User1',
        surname: 'Surname1',
        type: '3 Month',
        amount: '1000',
        packageName: 'CodeCamp2',
        status: 'A'
      },
      {
        name: 'User2',
        surname: 'Surname2',
        type: '1 Month',
        amount: '1200',
        packageName: 'CodeCamp2',
        status: 'A'
      },
      {
        name: 'User3',
        surname: 'Surname3',
        type: '6 Month',
        amount: '700',
        packageName: 'CodeCamp2',
        status: 'I'
      }],
      noCountOfAllPage: '1',
      errorCode: '000',
      errMessage: 'Success'
    }
  } catch (err) {
    console.log(err)
    handleError.setServerError(ctx)
  }
}
