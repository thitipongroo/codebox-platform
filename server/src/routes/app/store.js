const Router = require('koa-router')
const { packageTb } = require('../../repository')

const router = new Router()

router.get('/store', async (ctx) => {
  try {
    const packages = await packageTb.getPackageDetail()
    await ctx.render('store', { packageDetailList: packages || [] })
  } catch (err) {
    console.error(err)
    await ctx.render('error')
  }
})

module.exports = router.routes()
