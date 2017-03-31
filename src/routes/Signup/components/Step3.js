import React from 'react'
import Step from './Step'
import './Step3.scss'

const GreenDot = () => (
  <div className='green-dot__container'>
    <div className='green-dot__dot'>
      <i className='material-icons green-dot__icon'>done</i>
    </div>
  </div>
)

const GoToDashboardButton = ({ onClick }) => (
  <button className='gtd-button' onClick={onClick}>
    Go to Dashboard
  </button>
)

const Step3 = ({ printJSON }) => (
  <Step
    showBack={false}
    showNext={false}>
    <div className='step3__container'>
      <GreenDot />
      <GoToDashboardButton onClick={printJSON} />
    </div>
  </Step>
)

export default Step3
