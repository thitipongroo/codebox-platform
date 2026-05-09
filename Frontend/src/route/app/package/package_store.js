const Router = require('koa-router')
const { packageTb } = require('../../../repository')

const router = new Router()

router.get('/store', packageStoreGet)

module.exports = router.routes()

async function packageStoreGet (ctx, next) {
  try {
    const packageDetail = await packageTb.getPackageDetail()
    console.log(packageDetail)

    if (packageDetail) {
      const data = {
        packageDetailList: packageDetail
      }
      await ctx.render('store', data)
      return
    }

    await ctx.render('store', {})
  } catch (err) {
    console.error(err)
    await ctx.render('error')
  }
  await next()
}
