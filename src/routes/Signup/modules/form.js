// constants
const SET_INPUT_VALUE = 'SET_INPUT_VALUE'
const SET_VALIDATION_ERROR = 'SET_VALIDATION_ERROR'

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
}

// reducer
const initialState = {
  progress: 0,
  step: 0,
  inputValues: {
    email: '',
    password: '',
    passwordConfirmation: '',
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
    gender: '',
    howHearAboutUs: ''
  },
  validationErrors: {
    email: '',
    password: '',
    passwordConfirmation: '',
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
    gender: '',
    howHearAboutUs: ''
  }
}

export default function formReducer (state = initialState, action) {
  const handler = handlers[action.type]

  return handler ? handler(state, action) : state
}
