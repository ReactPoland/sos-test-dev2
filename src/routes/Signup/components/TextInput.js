import React, { PropTypes } from 'react'
import './TextInput.scss'

const getLabelClassname = error => `text-input__label ${error ? 'text-input__label--error' : ''}`
const TextInput = ({ label, value, error, onChange, onBlur, type = 'text' }) => (
  <div className='text-input__container'>
    <label className={getLabelClassname(error)}>{ error || label }</label>
    <input
      className='text-input__input'
      type={type}
      onBlur={e => onBlur(e.target.value)}
      onChange={e => onChange(e.target.value)}
      value={value} />
  </div>
)

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string
}

export default TextInput
