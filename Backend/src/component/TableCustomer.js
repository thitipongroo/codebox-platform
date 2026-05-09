import React, { Component } from 'react'
import * as actions from './../actions'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomInsertModal from './CustomInsertModal'
//import SearchCustomer from './SearchCustomer'


class TableCustomer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      symbol: null
    }
  }




  createBTN(cell, row, props) {
    return (
      <div>
        <Link to={`/HistoryPayment/${cell.index}`} className="btn-info">History</Link>
        <Link to={`/View/${cell.index}`} className="btn-success">View</Link>
        {/* <button onClick={cell.delFunc} className="btn-danger">Delete</button> */}
      </div>
    )
  }

  createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable
    }
    return (
      <CustomInsertModal {...attr} />
    )
  }

  // async componentDidMount() {
  //   try {
  //     const url = `http://139.5.146.63/api/customer_detail/transactions`
  //     const response = await fetch(url, {
  //       method: "POST",
  //       cache: "no-cache",
  //       credentials: "include",
  //       headers: { "Content-Type": "application/json; charset=utf-8" }
  //     })
  //     const data = await response.json()
  //     //console.log(data)
  //     this.props.customerList(data.transactionsList)
  //     //this.setState({ ...this.state, customer: [...data.transactionsList] })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  inputDataRedux = (event) => {
    this.props.keyData(event.target.name, event.target.value)
  }

  inputData = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }


  deleteCustomer(val) {
    if(window.confirm(`Sure to do this?`)){

    }
  }




  render() {
    //console.log(this.props)
    const options = {
      insertModal: this.createCustomModal
    }

    const data = (this.props.customer.length>0) ? this.props.customer.map((val, index) => {
      return {
        id: index + 1,
        name: `${val.name} ${val.surname}`,
        type: val.type,
        amount: val.amount,
        package: val.packageName,
        status: val.status,
        manage: { index: val.customerId, delFunc: () => this.deleteCustomer(val.customerId) }
      }
    }) : []

    //console.log(this.props)

    return (
      <div className="container">
        <br />
        <BootstrapTable
          tableBodyClass='table table-bordered'
          data={data}
          pagination
          search
          exportCSV
          csvFileName='customer-data.csv'
          options={options}
          insertRow>
          <TableHeaderColumn dataSort={true} dataField='id' isKey>No</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} tdStyle={{ whiteSpace: 'normal' }} dataField='name'>Name</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField='type'>Type</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField='amount'>Amount</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField='package'>Package</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField='status'>Status</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} tdStyle={{ whiteSpace: 'normal' }} dataField='manage' dataFormat={this.createBTN} formatExtraData={this.props}>Manage</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    ...state
  }
}


export default connect(mapStateToProps, actions)(TableCustomer)
