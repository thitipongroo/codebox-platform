const Router = require('koa-router')
const { handleError } = require('../../../service/handleError')
const packageTb = require('../../../repository/package')

const router = new Router()

router.get('/subscription', subscriptionGet)

module.exports = router.routes()

async function subscriptionGet (ctx) {
  try {
    const subscriptionLists = await packageTb.getSubscription()
    let subscriptionList = []

    for (const obj of subscriptionLists) {
      let newObj = {
        subscriptionId: obj.sub_id,
        subscriptionName: obj.sub_name
      }
      subscriptionList.push(newObj)
    }

    ctx.status = 200
    ctx.body = {
      subscriptionList: subscriptionList,
      errorCode: '000',
      errorMessage: 'Success'
    }
  } catch (err) {
    console.error(err)
    handleError.setServerError(ctx)
  }
}
