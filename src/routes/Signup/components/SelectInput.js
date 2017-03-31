import React from 'react'
import './SelectInput.scss'

const SelectInput = ({ label = '', options, onChange }) => (
  <div className='select-input__container'>
    <label className='select-input__label'>{label}</label>
    <div className='select-input__input-container'>
      <select className='select-input__input' onChange={e => onChange(e.target.value)}>
        <option value={null} />
        {options.map(({ text, value }, i) => <option key={i} value={value}>{text}</option>)}
      </select>
      <div className='select-input__input-arrow'>
        <i className='material-icons'>keyboard_arrow_down</i>
      </div>
    </div>
  </div>
)

export default SelectInput
