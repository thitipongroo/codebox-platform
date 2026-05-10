import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap'
import * as actions from '../store/actions'

class SearchCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = { modal: false, nameSearch: '' }
    this.toggle = this.toggle.bind(this)
  }

  inputData = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }

  render() {
    return (
      <div>
        <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Search Customer</ModalHeader>
          <ModalBody>
            <Form inline onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Label for="nameSearch">Name: </Label>{' '}
                <Input type="text" name="nameSearch" id="nameSearch" value={this.state.nameSearch} onChange={this.inputData} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Search</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, actions)(SearchCustomer)
