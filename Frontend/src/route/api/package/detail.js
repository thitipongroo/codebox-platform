const Router = require('koa-router')
const { handleError } = require('../../../service/handleError')
const packageTb = require('../../../repository/package')

const router = new Router()

router.get('/detail', detailGet)

module.exports = router.routes()

async function detailGet (ctx) {
  try {
    const packageLists = await packageTb.getPackage()
    let packageList = []

    for (const obj of packageLists) {
      let newObj = {
        packageId: obj.package_id,
        packageName: obj.package_name,
        packageDescription: obj.package_description
      }
      packageList.push(newObj)
    }

    ctx.status = 200
    ctx.body = {
      packageList: packageList,
      errorCode: '000',
      errorMessage: 'Success'
    }
  } catch (err) {
    console.error(err)
    handleError.setServerError(ctx)
  }
}
