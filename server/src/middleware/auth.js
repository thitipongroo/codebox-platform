async function checkAuth(ctx, next) {
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

module.exports = checkAuth
