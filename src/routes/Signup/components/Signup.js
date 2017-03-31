import React from 'react'
import ProgressBar from './ProgressBar'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import './Signup.scss'

const steps = [Step1, Step2, Step3]
const stepLabels = ['Signup', 'Signup', 'Thank you!']

export const Signup = ({ step, progress, ...propsToPass }) => {
  const StepComponent = steps[step] || null
  return (
    <div className='signup__main-container'>
      <h1 className='signup__label'>{stepLabels[step]}</h1>
      <ProgressBar progress={progress} />
      <StepComponent {...propsToPass} />
    </div>
  )
}

export default Signup
