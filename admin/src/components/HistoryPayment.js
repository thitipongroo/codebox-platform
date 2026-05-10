import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import * as actions from '../store/actions'

class HistoryPayment extends Component {
  constructor(props) {
    super(props)
    this.state = { history: [], status: '' }
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/api/customer_detail/history/${this.props.match.params.id}`, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      if (response.status === 200) {
        const data = await response.json()
        this.setState({ history: data.paymentHistoryList, status: 'data found' })
      } else {
        this.setState({ status: 'data not found' })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const data = this.state.status === 'data found'
      ? this.state.history.map((val, index) => ({
          id: index + 1,
          package: val.packageName,
          subscription: val.subscriptionName,
          price: val.amount,
          dateTime: 'N/A'
        }))
      : []

    return (
      <div className="container">
        <br />
        <BootstrapTable
          tableBodyClass='table table-bordered'
          data={data}
          pagination
          search
          exportCSV
          csvFileName='history-data.csv'>
          <TableHeaderColumn dataSort dataField='id' isKey>No</TableHeaderColumn>
          <TableHeaderColumn dataSort tdStyle={{ whiteSpace: 'normal' }} dataField='package'>Package</TableHeaderColumn>
          <TableHeaderColumn dataSort tdStyle={{ whiteSpace: 'normal' }} dataField='subscription'>Subscription</TableHeaderColumn>
          <TableHeaderColumn dataSort tdStyle={{ whiteSpace: 'normal' }} dataField='price'>Price</TableHeaderColumn>
          <TableHeaderColumn dataSort tdStyle={{ whiteSpace: 'normal' }} dataField='dateTime'>Date</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, actions)(HistoryPayment)
