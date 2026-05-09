import React, { Component } from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Login from './component/Login'
import TableCustomer from './component/TableCustomer'
import HistoryPayment from './component/HistoryPayment'
import ViewCustomer from './component/ViewCustomer'
import * as actions from './actions'
import { connect } from 'react-redux'
//import { Router } from 'react-router-dom'
//import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './style/login.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap'
import 'semantic-ui-css/semantic.min.css'

//const hist = createBrowserHistory()
//ใช้เวลาใช้ Router

const NoMatch = () => <div>404 Not Found</div>

class App extends Component {

  render() {
    return (
      <BrowserRouter >
        {/* <Router {...this.props}> //ถ้าใช้ Router ต้องส่ง hist เข้ามาเป็น props ด้วย history={hist} */}
          <Switch>
            <Route path='/' exact render={() => (
              !this.props.userAuth
                ? <Login />
                : <Redirect to='/TableCustomer' />
            )} />
            <Route path='/TableCustomer' exact render={() => (
              this.props.userAuth
                ? <TableCustomer />
                : <Redirect to='/' />
            )} />
            <Route path='/HistoryPayment/:id' exact render={(props) => (
              this.props.userAuth
                ? <HistoryPayment {...props} />
                : <Redirect to='/' />
            )} />
            <Route path='/View/:id' exact render={(props) => (
              this.props.userAuth
                ? <ViewCustomer {...props} />
                : <Redirect to='/' />
            )} />
            <Route component={NoMatch} />
          </Switch>
        {/* </Router> */}
      </BrowserRouter >
    )
  }

}

const mapStateToProps = state => {
  return {
    ...state
  }
}


export default connect(mapStateToProps, actions)(App)
