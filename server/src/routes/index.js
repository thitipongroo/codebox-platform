const Router = require('koa-router')

const router = new Router()

router.use(require('./app'))
router.use('/api', require('./api'))

module.exports = router.routes()
