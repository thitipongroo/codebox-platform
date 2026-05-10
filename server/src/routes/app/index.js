const Router = require('koa-router')

const router = new Router()

router.use(require('./store'))
router.use(require('./detail'))
router.use(require('./payment'))

module.exports = router.routes()
