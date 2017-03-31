// helpers
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isLeapYear = year => ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
const validateDate = value => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const [dayStr, monthStr, yearStr] = value.split('-')
  const day = parseInt(dayStr, 10)
  const month = parseInt(monthStr, 10)
  const year = parseInt(yearStr, 10)
  const numberOfDaysInFeb = isLeapYear(currentYear) ? 29 : 28
  const monthDaysAmount = [1, 3, 5, 7, 8, 10, 12].find(monthWith31Days => month === monthWith31Days) ? 31 : 30

  if (day < 1 || day > monthDaysAmount || (month === 2 && day > numberOfDaysInFeb) || isNaN(day)) return 'Invalid day'
  if (month < 1 || month > 12 || isNaN(month)) return 'Invalid month'
  if (year < currentYear - 150 || year > currentYear || isNaN(year)) return 'Invalid year'
  const userBirthDate = new Date(0)
  userBirthDate.setYear(year)
  userBirthDate.setMonth(month - 1)
  userBirthDate.setDate(day)
  const eighteenYearsAgo = new Date(0)
  eighteenYearsAgo.setYear(currentYear - 18)
  eighteenYearsAgo.setMonth(currentDate.getMonth())
  eighteenYearsAgo.setDate(currentDate.getDate())
  if (userBirthDate.getTime() > eighteenYearsAgo.getTime()) return 'You must be at least 18 years old'
  return ''
}
const validators = {
  email: value => {
    if (value === '') return 'Email is required'
    else return emailRegex.test(value) ? '' : 'Incorrect email'
  },
  password: value => value.length < 6 ? 'Password is required and needs to be at least 6 characters long' : '',
  confirmPassword: (value, { password }) => value !== password ? 'Passwords don\'t match' : '',
  dateOfBirth: validateDate,
  gender: value => value === '' ? 'Gender is required' : ''
}
const progressValueAtStep = {
  0: 33,
  1: 66,
  2: 100
}

// constants
const SET_INPUT_VALUE = 'SET_INPUT_VALUE'
const SET_VALIDATION_ERROR = 'SET_VALIDATION_ERROR'
const CHANGE_STEP = 'CHANGE_STEP'
const SET_PROGRESS = 'SET_PROGRESS'

// action creators
export const setInputValue = (inputName, value) => ({
  type: SET_INPUT_VALUE,
  inputName,
  value
})

export const setValidationError = (inputName, error) => ({
  type: SET_VALIDATION_ERROR,
  inputName,
  error
})

export const changeStep = step => ({
  type: CHANGE_STEP,
  step
})

export const setProgress = progress => ({
  type: SET_PROGRESS,
  progress
})

// thunks
export const handleInput = (inputName, value) => (dispatch, getState) => {
  const { inputValues } = getState().form
  const validator = validators[inputName]
  const error = validator ? validator(value, inputValues) : ''
  dispatch(setInputValue(inputName, value))
  dispatch(setValidationError(inputName, error))
}

export const validateStepAndProceed = () => (dispatch, getState) => {
  const { step, inputValues } = getState().form
  const inputValuesToValidate = {
    0: ['email', 'password', 'confirmPassword'],
    1: ['dateOfBirth', 'gender']
  }

  const validations = (inputValuesToValidate[step] || []).map(
    inputName => [inputName, validators[inputName](inputValues[inputName], inputValues)]
  )
  const errors = validations.filter(([_, value]) => value !== '')
  if (errors.length === 0) {
    dispatch(changeStep(step + 1))
    dispatch(setProgress(progressValueAtStep[step + 1]))
  }
  else errors.forEach(data => dispatch(setValidationError(...data)))
}

export const printJSON = () => (_, getState) => {
  const { email, password, dateOfBirth, gender, howHearAboutUs } = getState().form.inputValues
  console.log('user data', {
    user_data: {
      email,
      password,
      date_of_birth: dateOfBirth,
      gender,
      how_hear_about_us: howHearAboutUs
    }
  })
}

export const goBack = () => (dispatch, getState) => {
  const { step } = getState().form
  dispatch(changeStep(step - 1))
  dispatch(setProgress(progressValueAtStep[step - 1]))
}

// action handlers
const handlers = {
  [SET_INPUT_VALUE]: (state, { inputName, value }) => {
    const inputValues = { ...state.inputValues, [inputName]: value }
    return { ...state, inputValues }
  },
  [SET_VALIDATION_ERROR]: (state, { inputName, error }) => {
    const validationErrors = { ...state.validationErrors, [inputName]: error }
    return { ...state, validationErrors }
  },
  [CHANGE_STEP]: (state, { step }) => ({ ...state, step }),
  [SET_PROGRESS]: (state, { progress }) => ({ ...state, progress })
}

// reducer
const initialState = {
  progress: 33,
  step: 0,
  inputValues: {
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    howHearAboutUs: null
  },
  validationErrors: {
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    howHearAboutUs: ''
  }
}

// named function for easier debugging
export default function formReducer (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
