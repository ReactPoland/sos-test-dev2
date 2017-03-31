import React from 'react'
import './GenderButtons.scss'

const Button = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`gender-buttons__button ${active ? 'gender-buttons__button--active' : ''}`}>
    {label}
  </button>
)

const getLabelClassname = error => error
  ? 'gender-buttons__label gender-buttons__label--error'
  : 'gender-buttons__label'
const GenderButtons = ({ inputValues: { gender  }, handleInput, validationErrors }) => (
  <div className='gender-buttons__container'>
    <label className={getLabelClassname(validationErrors.gender)}>{validationErrors.gender || 'GENDER'}</label>
    <div className='gender-buttons__buttons-row'>
      <Button
        label='MALE'
        active={gender === 'male'}
        onClick={() => handleInput('male')} />
      <Button
        label='FEMALE'
        active={gender === 'female'}
        onClick={() => handleInput('female')} />
      <Button
        label='UNSPECIFIED'
        active={gender === 'unspecified'}
        onClick={() => handleInput('unspecified')} />
    </div>
  </div>
)

export default GenderButtons
