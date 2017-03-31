import React from 'react'
import Step1 from './Step1'
import './Signup.scss'

const steps = [Step1, () => <div>asd</div>]

export const Signup = ({ step, ...propsToPass }) => {
  const StepComponent = steps[step] || null
  return (
    <div className='signup__main-container'>
      <StepComponent {...propsToPass} />
    </div>
  )
}

export default Signup
