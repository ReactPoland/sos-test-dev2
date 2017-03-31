import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInput, changeStep, validateStep } from '../modules/form'
import Signup from '../components/Signup'

const mapStateToProps = ({ form }) => form
const mapDispatchToProps = { handleInput, changeStep, validateStep }

class SignupContainer extends Component {
  handleInput = inputName => value => this.props.handleInput(inputName, value)
  onBack = () => {
    const { changeStep, step } = this.props
    changeStep(step - 1)
  }
  onNext = () => this.props.validateStep()
  render () {
    const { inputValues, validationErrors, step, progress } = this.props
    const props = {
      onBack: this.onBack,
      onNext: this.onNext,
      handleInput: this.handleInput,
      inputValues,
      validationErrors,
      step,
      progress
    }
    return <Signup {...props} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)
