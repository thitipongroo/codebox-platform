const Router = require('koa-router')
const config = require('../../config')
const { customerManage } = require('../../repository')
const omise = require('omise')(config.omise)

const router = new Router()

router.post('/payment', async (ctx) => {
  const body = ctx.request.body
  try {
    const token = await omise.tokens.create({
      card: {
        name: `${body.firstname} ${body.lastname}`,
        city: body.city,
        postal_code: parseInt(body.postcode),
        number: body.card,
        expiration_month: parseInt(body.expire_month),
        expiration_year: parseInt(body.expire_year)
      }
    })
    const customer = await omise.customers.create({
      email: body.email,
      description: body.email,
      card: token.id
    })
    const charge = await omise.charges.create({
      amount: parseInt(body.price) * 100,
      currency: 'thb',
      customer: customer.id,
      return_uri: `${config.appUrl}/thankyou?status=success`
    })
    if (charge.status === 'successful') {
      const [result] = await customerManage.createCustomer({
        first_name: body.firstname,
        last_name: body.lastname,
        email: body.email,
        mobile_no: body.phone,
        address_other: `${body.address} ${body.unit}`,
        district: body.district,
        province: body.city,
        zip_code: body.postcode,
        package_id: body.package_id,
        subscript_id: body.sub_id,
        customer_pay_status: 'A',
        customer_key: customer.id,
        card_key: charge.card.id
      })
      await customerManage.updatePayment(
        result.insertId, body.package_id, body.sub_id, parseInt(body.price), charge.status
      )
      await ctx.redirect(charge.authorize_uri)
    } else {
      await ctx.redirect('/thankyou?status=fail')
    }
  } catch (err) {
    console.error(err)
    await ctx.redirect('/thankyou?status=fail')
  }
})

module.exports = router.routes()
