import React from 'react'
import Step from './Step'
import TextInput from './TextInput'

const Step1 = ({ handleInput, onNext, inputValues, validationErrors }) => (
  <Step
    showBack={false}
    showNext
    onNext={onNext}
    progress={progress}>
    <TextInput
      type='email'
      onChange={handleInput('email')}
      onBlur={handleInput('email')}
      value={inputValues.email}
      error={validationErrors.email}
      label='Email' />
    <TextInput
      type='password'
      onChange={handleInput('password')}
      onBlur={handleInput('password')}
      value={inputValues.password}
      error={validationErrors.password}
      label='Password' />
    <TextInput
      type='password'
      onChange={handleInput('confirmPassword')}
      onBlur={handleInput('confirmPassword')}
      value={inputValues.confirmPassword}
      error={validationErrors.confirmPassword}
      label='Confirm password' />
  </Step>
)

export default Step1
