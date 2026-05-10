const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const serv = require('koa-static')
const render = require('koa-ejs')
const koaBody = require('koa-body')
const { port } = require('./config')
const pool = require('./db')
const routes = require('./routes')

const app = new Koa()
const router = new Router()

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false
})

router.get('/', async (ctx) => { await ctx.render('home') })
router.get('/schools', async (ctx) => { await ctx.render('schools') })
router.get('/detail', async (ctx) => { await ctx.render('detail') })

router.get('/purchase', async (ctx) => {
  const [result] = await pool.query(`
    SELECT pp.sub_id, pp.package_id, pd.package_name, pd.package_picture, s.sub_name, pp.plan_value
    FROM package_plan pp
    INNER JOIN package_detail pd ON pd.package_id = pp.package_id
    INNER JOIN subscription s ON s.sub_id = pp.sub_id
    WHERE pp.sub_id = ? AND pp.package_id = ?
  `, [ctx.request.query.s, ctx.request.query.p])
  await ctx.render('purchase', { ...result[0] })
})

router.get('/thankyou', async (ctx) => {
  await ctx.render('thankyou', { status: ctx.request.query.status })
})
router.get('/login', async (ctx) => { await ctx.render('login') })
router.get('/signup', async (ctx) => { await ctx.render('signup') })
router.get('/profile', async (ctx) => { await ctx.render('profile') })
router.get('/demo', async (ctx) => { await ctx.render('demo') })

app.use(koaBody())
app.use(serv(path.join(__dirname, '../public')))
app.use(routes)
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port)
