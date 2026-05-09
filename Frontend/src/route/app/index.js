const Router = require('koa-router')

const router = new Router()

router.use(require('./package/package_store'))
router.use(require('./package/package_detail'))
router.use(require('./package/payment'))

module.exports = router.routes()
