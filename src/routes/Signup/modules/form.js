// helpers
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const validators = {
  email: value => {
    if (value === '') return 'Email is required'
    else return emailRegex.test(value) ? '' : 'Incorrect email'
  },
  password: value => value.length < 6 ? 'Password is required and needs to be at least 6 characters long' : '',
  confirmPassword: (value, { password }) => value !== password ? 'Passwords don\'t match' : ''
}

// constants
const SET_INPUT_VALUE = 'SET_INPUT_VALUE'
const SET_VALIDATION_ERROR = 'SET_VALIDATION_ERROR'
const CHANGE_STEP = 'CHANGE_STEP'

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

// thunks
export const handleInput = (inputName, value) => (dispatch, getState) => {
  const { inputValues } = getState().form
  const validator = validators[inputName]
  const error = validator ? validator(value, inputValues) : ''
  dispatch(setInputValue(inputName, value))
  dispatch(setValidationError(inputName, error))
}

export const validateStep = () => (dispatch, getState) => {
  const { step, inputValues } = getState().form
  const handlers = {
    0: (inputValues) => {
      // return a new array of key - validation result values: [input name, validation error]
      const validations = ['email', 'password', 'confirmPassword'].map(
        inputName => [inputName, validators[inputName](inputValues[inputName], inputValues)]
      )
      const errors = validations.filter(([_, value]) => value !== '')
      if (errors.length === 0) dispatch(changeStep(1))
      else errors.forEach(data => dispatch(setValidationError(...data)))
    }
  }
  const handler = handlers[step]
  if (handler) handler(inputValues)
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
  [CHANGE_STEP]: (state, { step }) => ({ ...state, step })
}

// reducer
const initialState = {
  progress: 0,
  step: 0,
  inputValues: {
    email: '',
    password: '',
    confirmPassword: '',
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
    gender: '',
    howHearAboutUs: ''
  },
  validationErrors: {
    email: '',
    password: '',
    confirmPassword: '',
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
    gender: '',
    howHearAboutUs: ''
  }
}

// named function for easier debugging
export default function formReducer (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
