// import React from 'react';
// import { Switch, Route, Redirect, Link } from 'react-router-dom'
// import Login from './component/Login'
// import TableCustomer from './component/TableCustomer'
// import HistoryPayment from './component/HistoryPayment'
// import { connect } from 'react-redux'
// import * as actions from './actions'


// const NoMatch= () => <div>404 Not Found</div>

// const Main = (props) => (
//  <Switch>
//    <Route path='/' exact render={ () => (
//      !props.userAuth
//      ? <Login />
//      : <Redirect to='/TableCustomer' />
//    ) }/>
//    {/* <Route path='/TableCustomer' exact render={ () => (
//      props.userAuth
//      ? <TableCustomer />
//      : <Redirect to='/' />
//    ) } /> */}
//    {/* <Route exact path='/TableCustomer' component={Test} /> */}
//    <Route path='/HistoryPayment/:id' exact component={HistoryPayment} />
//    <Route component={NoMatch} />
//  </Switch>
// )



// const mapStateToProps = state => {
//   return {
//     ...state
//   }
// }


// export default connect(mapStateToProps, actions)(Main)
