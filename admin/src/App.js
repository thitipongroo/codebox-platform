import React, { Component } from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './components/Login'
import TableCustomer from './components/TableCustomer'
import HistoryPayment from './components/HistoryPayment'
import ViewCustomer from './components/ViewCustomer'
import * as actions from './store/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './styles/login.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap'
import 'semantic-ui-css/semantic.min.css'

const NoMatch = () => <div>404 Not Found</div>

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={() => (
            !this.props.userAuth ? <Login /> : <Redirect to='/TableCustomer' />
          )} />
          <Route path='/TableCustomer' exact render={() => (
            this.props.userAuth ? <TableCustomer /> : <Redirect to='/' />
          )} />
          <Route path='/HistoryPayment/:id' exact render={(props) => (
            this.props.userAuth ? <HistoryPayment {...props} /> : <Redirect to='/' />
          )} />
          <Route path='/View/:id' exact render={(props) => (
            this.props.userAuth ? <ViewCustomer {...props} /> : <Redirect to='/' />
          )} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, actions)(App)
