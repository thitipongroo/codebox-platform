const Router = require('koa-router')
const { handleError } = require('../../services/handleError')
const packageRepo = require('../../repository/package')

const router = new Router()

router.get('/detail', async (ctx) => {
  try {
    const packages = await packageRepo.getPackage()
    ctx.status = 200
    ctx.body = {
      packageList: packages.map(p => ({
        packageId: p.package_id,
        packageName: p.package_name,
        packageDescription: p.package_description
      })),
      errorCode: '000',
      errorMessage: 'Success'
    }
  } catch (err) {
    console.error(err)
    handleError.setServerError(ctx)
  }
})

router.get('/subscription', async (ctx) => {
  try {
    const subscriptions = await packageRepo.getSubscription()
    ctx.status = 200
    ctx.body = {
      subscriptionList: subscriptions.map(s => ({
        subscriptionId: s.sub_id,
        subscriptionName: s.sub_name
      })),
      errorCode: '000',
      errorMessage: 'Success'
    }
  } catch (err) {
    console.error(err)
    handleError.setServerError(ctx)
  }
})

module.exports = router.routes()
