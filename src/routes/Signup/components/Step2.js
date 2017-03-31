import React from 'react'
import Step from './Step'
import DateOfBirthInput from './DateOfBirthInput'
import GenderButtons from './GenderButtons'
import SelectInput from './SelectInput'

const howHearAboutUsOptions = [
  'Event/Festival',
  'Family/Friend',
  'Internet Article',
  'Internet Search',
  'Other'
].map(text => ({ text, value: text }))
const Step2 = ({ handleInput, onNext, onBack, inputValues, validationErrors }) => (
  <Step
    showBack
    showNext
    onBack={onBack}
    onNext={onNext}>
    <DateOfBirthInput
      inputValues={inputValues}
      handleInput={handleInput('dateOfBirth')}
      validationErrors={validationErrors} />
    <GenderButtons
      inputValues={inputValues}
      validationErrors={validationErrors}
      handleInput={handleInput('gender')} />
    <SelectInput
      options={howHearAboutUsOptions}
      value={inputValues.howHearAboutUs}
      onChange={handleInput('howHearAboutUs')}
      label='HOW DID YOU HEAR ABOUT US?'/>
  </Step>
)

export default Step2
