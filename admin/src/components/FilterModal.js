import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class FilterModal extends Component {
  state = {
    packageOptions: [],
    subscriptionOptions: []
  }

  async componentDidMount() {
    this.props.resetProp()
    await this.fetchSelectData('/api/package/subscription')
    await this.fetchSelectData('/api/package/detail')
  }

  fetchSelectData = async (path) => {
    try {
      const response = await fetch(path, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      if (data.subscriptionList) {
        this.setState({
          subscriptionOptions: data.subscriptionList.map(s => (
            <option key={s.subscriptionId} value={s.subscriptionId}>{s.subscriptionName}</option>
          ))
        })
      }
      if (data.packageList) {
        this.setState({
          packageOptions: data.packageList.map(p => (
            <option key={p.packageId} value={p.packageId}>{p.packageName}</option>
          ))
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  searchCustomers = async () => {
    try {
      const payload = {}
      if (this.props.firstName) payload.firstName = this.props.firstName
      if (this.props.lastName) payload.lastName = this.props.lastName
      if (this.props.typeId) payload.type = this.props.typeId
      if (this.props.packageId) payload.package = this.props.packageId
      if (this.props.status) payload.status = this.props.status

      const response = await fetch('/api/customer_detail/transactions', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      if (data.transactionsList) {
        this.props.customerList(data.transactionsList)
      } else {
        this.props.removeList()
      }
    } catch (err) {
      console.error(err)
    }
  }

  inputDataRedux = (event) => {
    this.props.keyData(event.target.name, event.target.value)
  }

  render() {
    const { onModalClose } = this.props
    return (
      <div style={{ backgroundColor: '#fff', padding: '20px' }} className='modal-content'>
        <h2>Search</h2>
        <div>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" className="form-control" name='firstName' id='firstName' onChange={this.inputDataRedux} value={this.props.firstName || ''} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" className="form-control" name='lastName' id='lastName' onChange={this.inputDataRedux} value={this.props.lastName || ''} />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select className="form-control" name='type' id='type' onChange={this.inputDataRedux}>
              <option value=''>Select payment type</option>
              {this.state.subscriptionOptions}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="package">Package:</label>
            <select className="form-control" name='package' id='package' onChange={this.inputDataRedux}>
              <option value=''>Select package</option>
              {this.state.packageOptions}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select className="form-control" name='status' id='status' onChange={this.inputDataRedux}>
              <option value=''>Please select</option>
              <option value='I'>Inactive</option>
              <option value='A'>Active</option>
            </select>
          </div>
        </div>
        <div>
          <button className='btn btn-danger' onClick={onModalClose}>Cancel</button>
          <button className='btn btn-success' onClick={this.searchCustomers}>Search</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, actions)(FilterModal)
