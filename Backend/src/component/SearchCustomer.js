import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap'
//import 'bootstrap/dist/css/bootstrap.min.css'

class SearchCustomer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      backdrop: true,
      nameSearch: ''
    }
    this.toggle = this.toggle.bind(this)
    this.changeBackdrop = this.changeBackdrop.bind(this)
  }

  inputData = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  changeBackdrop(e) {
    let value = e.target.value
    if (value !== 'static') {
      value = JSON.parse(value)
    }
    this.setState({ backdrop: value })
  }

  render() {
    return (
      <div>
        <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Form inline onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Label for="nameSearch">Name: </Label>{' '}
                <Input type="text" name="nameSearch" id="nameSearch" value={this.state.nameSearch} onChange={(event)=>{this.inputData(event)}} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    ...state
  }
}


export default connect(mapStateToProps, actions)(SearchCustomer)
