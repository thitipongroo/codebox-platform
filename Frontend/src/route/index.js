const Router = require('koa-router')

const router = new Router()

router.use(require('./app'))

module.exports = router.routes()
