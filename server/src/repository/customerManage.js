const pool = require('../db')

async function createCustomer(obj) {
    try {
        const result = await pool.query(
            `insert into customer_detail
            (first_name, last_name, email, mobile_no, address_other, district, province, zip_code, package_id, subscription_id, customer_pay_status, customer_key, card_key)
            values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                obj.first_name, obj.last_name, obj.email, obj.mobile_no, obj.address_other, obj.district,
                obj.province, obj.zip_code, obj.package_id, obj.subscript_id, obj.customer_pay_status,
                obj.customer_key, obj.card_key
            ]
        )
        return result
    } catch (err) {
        console.error(err)
        return false
    }

}

async function updatePayment(cusId, packId, subId, payVal, payStatus) {
    try {
        await pool.query(`
                insert into payment_detail(customer_id, package_id, sub_id, pay_value, payment_status) 
                value(?, ?, ?, ?, ?)
                `,
                [cusId, packId, subId, payVal, payStatus]
        )
        return true
    }catch(err){
        console.error(err)
        return false
    }
    
}


module.exports = {
    createCustomer,
    updatePayment
}

