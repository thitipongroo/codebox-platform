import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import bg from '../assets/bg.jpg'

class Login extends Component {
  state = { userName: '', password: '' }

  login = async (event) => {
    event.preventDefault()
    if (!this.state.userName) {
      window.alert('Please enter your username')
      return
    }
    if (!this.state.password) {
      window.alert('Please enter your password')
      return
    }
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.state.userName, password: this.state.password })
      })
      if (response.status === 200) {
        this.props.createUserAuth({ id: 1, role: 'admin', username: this.state.userName })
      } else {
        window.alert('Username or password is incorrect')
      }
    } catch (err) {
      console.error(err)
    }
  }

  inputData = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div id="login-container">
        <img src={bg} alt="bg" className="bg" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="wrap">
                <p className="form-title">Sign In</p>
                <form className="login" onSubmit={this.login}>
                  <input type="text" placeholder="Username" name="userName" value={this.state.userName} onChange={this.inputData} />
                  <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.inputData} />
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

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, actions)(Login)
