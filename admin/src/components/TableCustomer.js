import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import * as actions from '../store/actions'
import FilterModal from './FilterModal'

class TableCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  createBTN(cell) {
    return (
      <div>
        <Link to={`/HistoryPayment/${cell.index}`} className="btn-info">History</Link>
        <Link to={`/View/${cell.index}`} className="btn-success">View</Link>
      </div>
    )
  }

  createCustomModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
    return (
      <FilterModal
        onModalClose={onModalClose}
        onSave={onSave}
        columns={columns}
        validateState={validateState}
        ignoreEditable={ignoreEditable}
      />
    )
  }

  deleteCustomer(id) {
    if (window.confirm('Are you sure?')) {
      // TODO: implement delete
    }
  }

  render() {
    const options = { insertModal: this.createCustomModal }
    const data = this.props.customer.map((val, index) => ({
      id: index + 1,
      name: `${val.name} ${val.surname}`,
      type: val.type,
      amount: val.amount,
      package: val.packageName,
      status: val.status,
      manage: { index: val.customerId, delFunc: () => this.deleteCustomer(val.customerId) }
    }))

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
          <TableHeaderColumn dataSort dataField='id' isKey>No</TableHeaderColumn>
          <TableHeaderColumn dataSort tdStyle={{ whiteSpace: 'normal' }} dataField='name'>Name</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField='type'>Type</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField='amount'>Amount</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField='package'>Package</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField='status'>Status</TableHeaderColumn>
          <TableHeaderColumn dataSort tdStyle={{ whiteSpace: 'normal' }} dataField='manage' dataFormat={this.createBTN} formatExtraData={this.props}>Manage</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, actions)(TableCustomer)
