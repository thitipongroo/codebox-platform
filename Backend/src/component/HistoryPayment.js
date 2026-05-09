import React, { Component } from 'react'
import * as actions from './../actions'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

class HistoryPayment extends Component {
    constructor(props){
        super(props)
        this.state = {
            history: [],
            status: ``
        }
    }
    
    async componentDidMount(){
        const url = `http://139.5.146.63/api/customer_detail/history/${this.props.match.params.id}`
        const response = await fetch(url, {
            method: "GET",
            cache: "no-cache",
            credentials: "include",
            headers: { "Content-Type": "application/json; charset=utf-8" }
        })
        //console.log(response)
        if(response.status===200){
            const data = await response.json()
            //console.log(data)
            this.setState({
                ...this.state, history: [ ...data.paymentHistoryList ], status: `data found`
            })
        }else{
            this.setState({
                ...this.state, status: `data not found`
            })
        }
    }

    render() {
        //console.log(this.props)
        const data = (this.state.status === `data found`) ? this.state.history.map((val, index)=>{
            return { id: index+1, package: val.packageName, price: val.amount, status: val.status, dateTime: `now no data`, subscription: val.subscriptionName  }
        }) : []

        return (
            <div className="container">
                <br />
                <BootstrapTable
                    tableBodyClass='table table-bordered'
                    data={data}
                    pagination
                    search
                    exportCSV
                    csvFileName='history-data.csv'
                    //options={options}
                    >
                    <TableHeaderColumn dataSort={true} dataField='id' isKey>No</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} tdStyle={{ whiteSpace: 'normal' }} dataField='package'>Package</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} tdStyle={{ whiteSpace: 'normal' }} dataField='subscription'>Subscription</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} tdStyle={{ whiteSpace: 'normal' }} dataField='price'>Price</TableHeaderColumn>
                    <TableHeaderColumn dataSort={true} tdStyle={{ whiteSpace: 'normal' }} dataField='dateTime'>Date</TableHeaderColumn>
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


export default connect(mapStateToProps, actions)(HistoryPayment)