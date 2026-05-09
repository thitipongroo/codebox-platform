const Router = require('koa-router')
const { omiseKey } = require('../../../../_config')
const { customerManage } = require('../../../repository')
const omise = require('omise')(omiseKey)

const router = new Router()

router.post('/payment', cardCharge)

async function cardCharge(ctx, next) {
    //console.log(ctx.request.body)
    // if (ctx.request.body.sub_id != '' && ctx.request.body.package_id != '') {
    //     try {
    //         const d = new Date()
    //         let ed =  new Date()
    //         ed.setMonth(ed.getMonth()+parseInt(ctx.request.body.period))
    //         thisDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    //         endDate = `${ed.getFullYear()}-${ed.getMonth()}-${ed.getDate()}`
    //         const cardDetails = {
    //             card: {
    //                 'name': `${ctx.request.body.firstname} ${ctx.request.body.lastname}`,
    //                 'city': ctx.request.body.city,
    //                 'postal_code': parseInt(ctx.request.body.postcode),
    //                 'number': ctx.request.body.card,
    //                 'expiration_month': parseInt(ctx.request.body.expire_month),
    //                 'expiration_year': parseInt(ctx.request.body.expire_year)
    //             }
    //         }
    //         const token = await omise.tokens.create(cardDetails)
    //         const customer = await omise.customers.create({
    //             'email': ctx.request.body.email,
    //             'description': `test`,
    //         })
    //         monthlyCharge = {
    //             every: parseInt(ctx.request.body.period),
    //             period: 'month',
    //             start_date: thisDate,
    //             end_date: endDate,
    //             on: {
    //                 days_of_month: [1],
    //             },
    //             charge: {
    //                 customer: customer.id,
    //                 card: token.card.id,
    //                 amount: parseInt(ctx.request.body.price) * 100,
    //                 description: 'Membership fee',
    //             },
    //         }
    //         console.log(omise)
    //         const schedules = await omise.schedules.create(monthlyCharge)
            
    //     } catch (err) {
    //         console.error(err)
    //     }
    // } else {
        try {
            const cardDetails = {
                // card: {
                //     'name': 'JOHN DOE',
                //     'city': 'Bangkok',
                //     'postal_code': 10320,
                //     'number': '4242424242424242',
                //     'expiration_month': 10,
                //     'expiration_year': 2019,
                // }
                card: {
                    'name': `${ctx.request.body.firstname} ${ctx.request.body.lastname}`,
                    'city': ctx.request.body.city,
                    'postal_code': parseInt(ctx.request.body.postcode),
                    'number': ctx.request.body.card,
                    'expiration_month': parseInt(ctx.request.body.expire_month),
                    'expiration_year': parseInt(ctx.request.body.expire_year)
                }
            }
            const token = await omise.tokens.create(cardDetails)
            const customer = await omise.customers.create({
                'email': ctx.request.body.email,
                'description': `test`,
                'card': token.id,
            })
            const charge = await omise.charges.create({
                'amount': parseInt(ctx.request.body.price) * 100, //10000/100 = 100 thb
                'currency': 'thb',
                'customer': customer.id,
                'return_uri': 'http://139.5.146.63/thankyou?status=success'
            })
            if (charge.status === 'successful') {
                const cusData = {
                    first_name: ctx.request.body.firstname,
                    last_name: ctx.request.body.lastname,
                    email: ctx.request.body.email,
                    mobile_no: ctx.request.body.phone,
                    address_other: `${ctx.request.body.address} ${ctx.request.body.unit}`,
                    district: ctx.request.body.district,
                    province: ctx.request.body.city,
                    zip_code: ctx.request.body.postcode,
                    package_id: ctx.request.body.package_id,
                    subscript_id: ctx.request.body.sub_id,
                    customer_pay_status: 'A',
                    customer_key: customer.id,
                    card_key: charge.card.id
                }
                const [result] = await customerManage.createCustomer(cusData)
                await customerManage.updatePayment(result.insertId, ctx.request.body.package_id, ctx.request.body.sub_id, parseInt(ctx.request.body.price), charge.status)
                await ctx.redirect(charge.authorize_uri)
            } else {
                await ctx.redirect(`/thankyou?status=fail`)
            }

            //console.log(charge)
        } catch (err) {
            await ctx.redirect(`/thankyou?status=fail`)
        }
    //}
}


module.exports = router.routes()