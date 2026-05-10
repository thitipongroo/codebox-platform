import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class ViewCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { customerDetail: {} }
    this.customerName = ''
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/api/customer_detail/view/${this.props.match.params.id}`, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      this.customerName = `${data.customerDetail.name} ${data.customerDetail.surname}`
      this.setState({ customerDetail: { ...data.customerDetail } })
    } catch (err) {
      console.error(err)
    }
  }

  editData = async () => {
    try {
      const { customerDetail } = this.state
      const payload = {
        username: this.props.userAuth.username,
        customerId: this.props.match.params.id,
        firstName: customerDetail.name,
        lastName: customerDetail.surname,
        email: customerDetail.email,
        address: customerDetail.addess,
        province: customerDetail.province,
        zipCode: customerDetail.zipCode,
        mobileNo: customerDetail.mobileNo
      }
      const response = await fetch('/api/customer_detail/view/edit', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (response.status === 200) {
        await this.componentDidMount()
      }
    } catch (err) {
      console.error(err)
    }
  }

  inputData = (event) => {
    this.setState({
      customerDetail: { ...this.state.customerDetail, [event.target.name]: event.target.value }
    })
  }

  render() {
    const { customerDetail } = this.state
    return (
      <div className="container">
        <form className="form-horizontal" style={{ width: '100%' }}>
          <fieldset>
            <legend>{this.customerName}</legend>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="email">Email:</label>
              <div className="col-sm-10">
                <input value={customerDetail.email || ''} onChange={this.inputData} type="text" className="form-control" name="email" id="email" placeholder="Enter email" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="name">First Name:</label>
              <div className="col-sm-10">
                <input value={customerDetail.name || ''} onChange={this.inputData} type="text" className="form-control" name="name" id="name" placeholder="Enter First Name" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="surname">Last Name:</label>
              <div className="col-sm-10">
                <input value={customerDetail.surname || ''} onChange={this.inputData} type="text" className="form-control" name="surname" id="surname" placeholder="Enter Last Name" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="addess">Address:</label>
              <div className="col-sm-10">
                <input value={customerDetail.addess || ''} onChange={this.inputData} type="text" className="form-control" name="addess" id="addess" placeholder="Enter address" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="province">Province:</label>
              <div className="col-sm-10">
                <input value={customerDetail.province || ''} onChange={this.inputData} type="text" className="form-control" name="province" id="province" placeholder="Enter province" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="zipcode">Postcode:</label>
              <div className="col-sm-10">
                <input value={customerDetail.zipcode || ''} onChange={this.inputData} type="text" className="form-control" name="zipcode" id="zipcode" placeholder="Enter Postcode" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="mobileNo">Telephone:</label>
              <div className="col-sm-10">
                <input value={customerDetail.mobileNo || ''} onChange={this.inputData} type="text" className="form-control" name="mobileNo" id="mobileNo" placeholder="Enter Telephone Number" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button onClick={this.editData} type="button" className="btn btn-info">Save</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, actions)(ViewCustomer)
