const Router = require('koa-router')
const { handleError } = require('../../../service/handleError')

const router = new Router()

router.get('/view/:id', viewGet)

module.exports = router.routes()

async function viewGet (ctx) {
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
      errMessage: 'Success'
    }
  } catch (err) {
    console.log(err)
    handleError.setServerError(ctx)
  }
}
