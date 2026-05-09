const Router = require('koa-router')
const koaBody = require('koa-body')

const router = new Router()

// const koaBodyConfig = {
//   multipart: true,
//   formidable: {
//     maxFileSize: 4 * 1024 * 1024 // 4MB
//   },
//   onError: function (err) {
//     throw new Error(err.message)
//   }
// }

const chackAuthen = async (ctx, next) => { // Authen middleware
  if (!ctx.session || !ctx.session.userId) {
    ctx.status = 401
    ctx.body = {
      errorCode: 'CB002',
      errorMessage: 'Unauthorized'
    }
    return
  }
  await next()
}

// Auth
router.use('/auth', koaBody(), require('./auth/signIn'))
// Package
router.use('/package', require('./package/detail'))
router.use('/package', require('./package/subscription'))
// Middleware check login
router.use(chackAuthen)
// Customer detail
router.use('/customer_detail', koaBody(), require('./customer_detail/transactions'))
router.use('/customer_detail', require('./customer_detail/history'))
router.use('/customer_detail', require('./customer_detail/view'))
router.use('/customer_detail', require('./customer_detail/cancel'))

module.exports = router.routes()
