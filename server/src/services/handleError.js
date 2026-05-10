function setServerError (ctx) {
  ctx.status = 500
  ctx.body = {
    errorCode: '99',
    errorMessage: 'Sorry, this service is currently unavailable.'
  }
}

module.exports.handleError = {
  setServerError
}
