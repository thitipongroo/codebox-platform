const Router = require('koa-router')
const { packageTb } = require('../../repository')

const router = new Router()

router.get('/detail/:id', async (ctx) => {
  const { id } = ctx.params
  try {
    const rows = await packageTb.getPackageAndSubDetailById(id)
    if (rows.length > 0) {
      const packageDetail = {
        package_id: rows[0].package_id,
        sub_id: rows[0].sub_id,
        package_name: rows[0].package_name,
        package_description: rows[0].package_description,
        package_picture: rows[0].package_picture,
        package_end_date: rows[0].package_end_date
      }
      const packageSubList = rows.map(r => ({
        package_id: r.package_id,
        sub_id: r.sub_id,
        sub_name: r.sub_name,
        plan_value: r.plan_value
      }))
      await ctx.render('detail', { packageDetail, packageSubList })
      return
    }
    await ctx.render('detail', { packageDetail: {} })
  } catch (err) {
    console.error(err)
    await ctx.render('error')
  }
})

module.exports = router.routes()
