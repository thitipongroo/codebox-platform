const Router = require('koa-router')
const { handleError } = require('../../services/handleError')

const router = new Router()

router.get('/view/:id', async (ctx) => {
  try {
    ctx.status = 200
    ctx.body = {
      customerDetail: {
        email: 'user1@use.com',
        name: 'User1',
        surname: 'Surname1',
        addess: 'อาคารสีลมแกรนด์ เทอเรส 1/232, 1/249',
        district: 'จตุจักร',
        province: 'จตุจักร',
        zipcode: '10221',
        mobileNo: '09912324124'
      },
      errorCode: '000',
      errorMessage: 'Success'
    }
  } catch (err) {
    console.error(err)
    handleError.setServerError(ctx)
  }
})

router.get('/history/:id', async (ctx) => {
  try {
    ctx.status = 200
    ctx.body = {
      paymentHistoryList: [
        { name: 'User1', surname: 'Surname1', packageName: 'CodeCamp2', amount: '1000' },
        { name: 'User1', surname: 'Surname1', packageName: 'CodeCamp2', amount: '2000' },
        { name: 'User1', surname: 'Surname1', packageName: 'CodeCamp2', amount: '1200' }
      ],
      errorCode: '000',
      errorMessage: 'Success'
    }
  } catch (err) {
    console.error(err)
    handleError.setServerError(ctx)
  }
})

router.post('/transactions', async (ctx) => {
  try {
    ctx.status = 200
    ctx.body = {
      transactionsList: [
        { name: 'User1', surname: 'Surname1', type: '3 Month', amount: '1000', packageName: 'CodeCamp2', status: 'A' },
        { name: 'User2', surname: 'Surname2', type: '1 Month', amount: '1200', packageName: 'CodeCamp2', status: 'A' },
        { name: 'User3', surname: 'Surname3', type: '6 Month', amount: '700', packageName: 'CodeCamp2', status: 'I' }
      ],
      noCountOfAllPage: '1',
      errorCode: '000',
      errorMessage: 'Success'
    }
  } catch (err) {
    console.error(err)
    handleError.setServerError(ctx)
  }
})

router.post('/cancel', async (ctx) => {
  try {
    ctx.status = 200
    ctx.body = { errorCode: '000', errorMessage: 'Success' }
  } catch (err) {
    console.error(err)
    handleError.setServerError(ctx)
  }
})

module.exports = router.routes()
