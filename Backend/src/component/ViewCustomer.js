import React from 'react'
import * as actions from './../actions'
import { connect } from 'react-redux'


class ViewCustomer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerDetail: {}
        }
        this.customer = ''
    }

    editData = async () => {
        let cus = {
            username: this.props.userAuth.username,
            customerId: this.props.match.params.id,
            firstName: this.state.customerDetail.name,
            lastName: this.state.customerDetail.surname,
            email: this.state.customerDetail.email,
            address: this.state.customerDetail.addess,
            province: this.state.customerDetail.province,
            zipCode: this.state.customerDetail.zipCode,
            mobileNo: this.state.customerDetail.mobileNo
        }
        console.log(cus)
        try {
            const url = `http://139.5.146.63/api/customer_detail/view/edit`
            const response = await fetch(url, {
                method: "POST",
                cache: "no-cache",
                credentials: "include",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(cus)
            })
            //console.log(response)
            if(response.status){
                await this.componentDidMount()
            }
        } catch (err) {
            console.log(err)
        }
    }

    async componentDidMount() {
        try {
            const url = `http://139.5.146.63/api/customer_detail/view/${this.props.match.params.id}`
            const response = await fetch(url, {
                method: "GET",
                cache: "no-cache",
                credentials: "include",
                headers: { "Content-Type": "application/json; charset=utf-8" }
            })
            const data = await response.json()
            this.customer = `${data.customerDetail.name} ${data.customerDetail.surname}`
            //console.log(data.customerDetail)
            this.setState({
                ...this.state, customerDetail: { ...data.customerDetail }
            })

        } catch (err) {
            console.log(err)
        }
    }

    editCusDetail = async (event) => {
        event.preventDefault()
        try {

        } catch (err) {
            console.log(err)
        }
    }

    inputData = (event) => {
        this.setState({ ...this.state, customerDetail: { ...this.state.customerDetail, [event.target.name]: event.target.value } })
    }

    render() {

        return (
            <div className="container">
                <form className="form-horizontal" style={{ width: '100%' }} onSubmit={(event) => this.editCusDetail(event)}>
                    <fieldset>
                        <legend>{this.customer}</legend>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                            <div className="col-sm-10">
                                <input value={this.state.customerDetail.email} onChange={(event) => this.inputData(event)} type="text" className="form-control" name="email" id="email" placeholder="Enter email" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="name">First Name:</label>
                            <div className="col-sm-10">
                                <input value={this.state.customerDetail.name} onChange={(event) => this.inputData(event)} type="text" className="form-control" name="name" id="name" placeholder="Enter First Name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="surname">Last Name:</label>
                            <div className="col-sm-10">
                                <input value={this.state.customerDetail.surname} onChange={(event) => this.inputData(event)} type="text" className="form-control" name="surname" id="surname" placeholder="Enter Last Name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="addess">Address:</label>
                            <div className="col-sm-10">
                                <input value={this.state.customerDetail.addess} onChange={(event) => this.inputData(event)} type="text" className="form-control" name="addess" id="addess" placeholder="Enter address" />
                            </div>
                        </div>
                        {/* <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="district">District:</label>
                            <div className="col-sm-10">
                                <input value={this.state.customerDetail.district} onChange={(event) => this.inputData(event)} type="text" className="form-control" name="district" id="district" placeholder="Enter district" />
                            </div>
                        </div> */}
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="province">Province:</label>
                            <div className="col-sm-10">
                                <input value={this.state.customerDetail.province} onChange={(event) => this.inputData(event)} type="text" className="form-control" name="province" id="province" placeholder="Enter province" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="zipcode">Postcode:</label>
                            <div className="col-sm-10">
                                <input value={this.state.customerDetail.zipcode} onChange={(event) => this.inputData(event)} type="text" className="form-control" name="zipcode" id="zipcode" placeholder="Enter Postcode" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="mobileNo">Telephone:</label>
                            <div className="col-sm-10">
                                <input value={this.state.customerDetail.mobileNo} onChange={(event) => this.inputData(event)} type="text" className="form-control" name="mobileNo" id="mobileNo" placeholder="Enter Telephone Number" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button onClick={() => { this.editData() }} type="submit" className="btn btn-info">บันทึก</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps, actions)(ViewCustomer)