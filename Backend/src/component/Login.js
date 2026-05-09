import React, { Component } from 'react'
import * as actions from './../actions'
import { connect } from 'react-redux'
import bg from '../asset/bg.jpg'

class Login extends Component {
  state = {
    userName: '',
    password: ''
  }

  login = async (event) => {
    event.preventDefault()
    try {
      if(this.state.userName === ''){
        window.alert(`Pleas input your user`)
        return
      }
      if(this.state.password === ''){
        window.alert(`Pleas input your password`)
        return
      }
      const url = `http://139.5.146.63/api/auth/signin`
      const data = { username: this.state.userName, password: this.state.password }
      const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        credentials: "include",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        const resData = await response.json()
        //moc data
        this.props.createUserAuth({ id: 1, roll: 'admin', username: this.state.userName })

        //this.props.createUserAuth({ id: resData.id, roll: resData.roll, username: this.state.userName })
        //console.log(resData)
      } else {
        window.alert(`User name or password is incorrect`)
      }
    }catch(err){
      console.error(err)
    }
    
    
    
  }

  inputData = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }
  
  render() {
    return (
      <div id="login-container">
        <img src={bg} alt="bg" className="bg" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="wrap">
                <p className="form-title">
                  Sign In</p>
                <form className="login" onSubmit={(event) => { this.login(event) }}>
                  <input type="text" placeholder="Username" name='userName' value={this.state.userName} onChange={(event) => { this.inputData(event) }} />
                  <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={(event) => { this.inputData(event) }} />
                  <input type="submit" value="Sign In" className="btn btn-success btn-sm" />
                </form>
              </div>
            </div>
          </div>
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


export default connect(mapStateToProps, actions)(Login)
