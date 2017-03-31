import React from 'react'
import './DateOfBirthInput.scss'

const getLabelClassname = error => error
  ? 'dob-input__label dob-input__label--error'
  : 'dob-input__label'
const prependZero = (value, caretPosition) => {
  if (value.length < 2 && value.length > 0 && value.charAt(0) !== '0') return 0 + value
  if (value.length > 2) {
    if (value.charAt(0) === '0') return value.slice(1)
    if (caretPosition === 1) return value.slice(0, 1).concat(value.slice(2))
    if (caretPosition === 2) return value.slice(0, 2)
  }
  return value
}
const prepareDate = (date, part, { target: { value, selectionStart } }) => {
  const [day, month, year] = date.split('-')
  return Object
    .values({ day, month, year, [part]: part !== 'year' ? prependZero(value, selectionStart) : value })
    .join('-')
}
const DateOfBirthInput = ({ inputValues: { dateOfBirth }, validationErrors, handleInput }) => {
  const [day, month, year] = dateOfBirth.split('-')
  return (
    <div className='dob-input__container'>
      <label className={getLabelClassname(validationErrors.dateOfBirth)}>
        {validationErrors.dateOfBirth || 'DATE OF BIRTH'}
      </label>
      <div className='dob-input__inputs-row'>
        <input
          type='text'
          placeholder='DD' className='dob-input__input'
          onBlur={e => handleInput(prepareDate(dateOfBirth, 'day', e))}
          onChange={e => handleInput(prepareDate(dateOfBirth, 'day', e))}
          value={day} />
        <input
          type='text'
          placeholder='DD' className='dob-input__input'
          onBlur={e => handleInput(prepareDate(dateOfBirth, 'month', e))}
          onChange={e => handleInput(prepareDate(dateOfBirth, 'month', e))}
          value={month} />
        <input
          maxLength={4}
          type='text'
          placeholder='DD' className='dob-input__input'
          onBlur={e => handleInput(prepareDate(dateOfBirth, 'year', e))}
          onChange={e => handleInput(prepareDate(dateOfBirth, 'year', e))}
          value={year} />
      </div>
    </div>
  )
}

export default DateOfBirthInput
