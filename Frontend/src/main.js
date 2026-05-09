const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const serv = require('koa-static')
const render = require('koa-ejs')
const route = require('./route')
const koaBody = require('koa-body')
const pool = require('./db')

const app = new Koa()
const router = new Router()
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false
})

router.get('/', async (ctx, next) => {
  await ctx.render('home')
  await next()
})

router.get('/schools', async (ctx, next) => {
  await ctx.render('schools')
  await next()
})

router.get('/store', async (ctx, next) => {
  await ctx.render('store')
  await next()
})

router.get('/detail', async (ctx, next) => {
  await ctx.render('detail')
  await next()
})

router.get('/purchase', async (ctx, next) => {
  const [result] = await pool.query(
    `select package_plan.sub_id, package_plan.package_id, package_detail.package_name, package_detail.package_picture, subscription.sub_name, package_plan.plan_value
    from package_plan 
    inner join package_detail on package_detail.package_id = package_plan.package_id
    inner join subscription on subscription.sub_id = package_plan.sub_id where package_plan.sub_id = ? and package_plan.package_id = ?`,
    [ctx.request.query.s, ctx.request.query.p])
  await ctx.render('purchase',{...result[0]})
  await next()
})

router.get('/thankyou', async (ctx, next) => {
  await ctx.render('thankyou', {status: ctx.request.query.status})
  await next()
})

router.get('/login', async (ctx, next) => {
  await ctx.render('login')
  await next()
})

router.get('/signup', async (ctx, next) => {
  await ctx.render('signup')
  await next()
})

router.get('/profile', async (ctx, next) => {
  await ctx.render('profile')
  await next()
})

router.get('/demo', async (ctx, next) => {
  await ctx.render('demo')
  await next()
})

app.use(koaBody())
app.use(serv(path.join(__dirname, '../public')))
app.use(route)
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
