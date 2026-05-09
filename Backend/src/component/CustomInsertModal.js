import React, { Component } from 'react'
import * as actions from './../actions'
import { connect } from 'react-redux'
//import SearchCustomer from './SearchCustomer'

class CustomInsertModal extends Component {
  state = {
    packageOption: [],
    type: []
  }

  objStatus = [
    { val: '', name: 'กรุณาเลือก' },
    { val: 'I', name: 'Inactive' },
    { val: 'A', name: 'Active' }
  ]
  status = this.objStatus.map((val, index) => <option key={index} value={val.val}>{val.name}</option>)
  
  
  

  getSelectData = async (api) => {
    try {
      const url = `http://139.5.146.63${api}`
      const response = await fetch(url, {
        method: "GET",
        cache: "no-cache",
        credentials: "include",
        headers: { "Content-Type": "application/json; charset=utf-8" }
      })
      const data = await response.json()
      if(data.subscriptionList){
        this.setState({
          ...this.state, type: data.subscriptionList.map(val => <option key={val.subscriptionId} value={val.subscriptionId}>{val.subscriptionName}</option>)
        })
      }
      if(data.packageList){
        this.setState({
          ...this.state, packageOption: data.packageList.map(val => <option key={val.packageId} value={val.packageId}>{val.packageName}</option>)
        })
      }
      //this.setState({ ...this.state, customer: [...data.transactionsList] })
    } catch (err) {
      console.log(err)
    }
  }
  
  async getCustomer() {
    try {
      let dataSend = {}
      if(this.props.firstName){
        dataSend.firstName = this.props.firstName
      }
      if(this.props.lastName){
        dataSend.lastName = this.props.lastName
      }
      if(this.props.type){
        dataSend.type = this.props.typeId
      }
      if(this.props.package){
        dataSend.package = this.props.packageId
      }
      if(this.props.status){
        dataSend.status = this.props.status
      }
      const url = `http://139.5.146.63/api/customer_detail/transactions`
      const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        credentials: "include",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(dataSend)
      })
      const data = await response.json()
      if(data.transactionsList){
        this.props.customerList(data.transactionsList)
      }else{
        this.props.removeList()
      }
      //this.setState({ ...this.state, customer: [...data.transactionsList] })
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount(){
    this.props.resetProp()
    this.getSelectData(`/api/package/subscription`)
    this.getSelectData(`/api/package/detail`)
  }

  inputDataRedux = (event) => {
    this.props.keyData(event.target.name, event.target.value)
  }

  render() {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable
    } = this.props
    return (
      <div style={{ backgroundColor: '#fff', padding: '20px' }} className='modal-content'>
        <h2 style={{}}>Search</h2>
        <div>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" className="form-control" name='firstName' id='firstName' onChange={(event) => { this.inputDataRedux(event) }} value={this.props.firstName} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" className="form-control" name='lastName' id='lastName' onChange={(event) => { this.inputDataRedux(event) }} value={this.props.lastName} />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select className="form-control" name='type' id='type' onChange={(event) => { this.inputDataRedux(event) }} >
              <option value=''>เลือกประเภทการชำระเงิน</option>
              {this.state.type}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="package">Package:</label>
            <select type="text" className="form-control" name='package' id='package' onChange={(event) => { this.inputDataRedux(event) }} >
              <option value=''>เลือกแพ็คเกจ</option>
              {this.state.packageOption}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select className="form-control" name='status' id='status' onChange={(event) => { this.inputDataRedux(event) }}>
              {this.status}
            </select>
          </div>
        </div>
        <div>
          <button className='btn btn-danger' onClick={onModalClose}>Leave</button>
          <button className='btn btn-success' onClick={() => this.getCustomer()}>Search</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}


export default connect(mapStateToProps, actions)(CustomInsertModal)
