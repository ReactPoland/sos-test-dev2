import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInput, goBack, validateStepAndProceed, printJSON } from '../modules/form'
import Signup from '../components/Signup'

const mapStateToProps = ({ form }) => form
const mapDispatchToProps = { handleInput, validateStepAndProceed, goBack, printJSON }

class SignupContainer extends Component {
  handleInput = inputName => value => this.props.handleInput(inputName, value)
  render () {
    const { inputValues, validationErrors, step, progress, validateStepAndProceed, goBack, printJSON } = this.props
    const props = {
      onBack: goBack,
      onNext: validateStepAndProceed,
      handleInput: this.handleInput,
      inputValues,
      validationErrors,
      step,
      progress,
      printJSON
    }
    return <Signup {...props} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)
