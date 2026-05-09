const Router = require('koa-router')
const { packageTb } = require('../../../repository')

const router = new Router()

router.get('/detail/:id', packageDetailGet)

module.exports = router.routes()

async function packageDetailGet (ctx, next) {
  const { id } = ctx.params
  console.log(id)
  try {
    const packageDetail = await packageTb.getPackageAndSubDetailById(id)
    //console.log(packageDetail)

    if (packageDetail.length > 0) {
      const packageObj = {
        package_id: packageDetail[0].package_id,
        sub_id: packageDetail[0].sub_id,
        package_name: packageDetail[0].package_name,
        package_description: packageDetail[0].package_description,
        package_picture: packageDetail[0].package_picture,
        package_end_date: packageDetail[0].package_end_date
      }

      const packageSubList = packageDetail.map((data) => {
        return {
          package_id: data.package_id,
          sub_id: data.sub_id,
          sub_name: data.sub_name,
          plan_value: data.plan_value
        }
      })
      // console.log(packageObj)
      // console.log(packageSubList)

      const data = {
        packageDetail: packageObj,
        packageSubList: packageSubList
      }
      await ctx.render('detail', data)
      return
    }

    await ctx.render('detail', {packageDetail: {}})
  } catch (err) {
    console.error(err)
    await ctx.render('error')
  }
  await next()
}
