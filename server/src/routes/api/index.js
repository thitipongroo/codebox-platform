const Router = require('koa-router')
const koaBody = require('koa-body')
const checkAuth = require('../../middleware/auth')

const router = new Router()

router.use('/auth', koaBody(), require('./auth'))
router.use('/package', require('./packages'))
router.use(checkAuth)
router.use('/customer_detail', koaBody(), require('./customers'))

module.exports = router.routes()
