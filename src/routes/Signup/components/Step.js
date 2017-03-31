import React, { PropTypes } from 'react'
import './Step.scss'

// since those components are very specific for the Step component, they are declared in the same file
const BackButton = ({ onClick, visible }) => visible
  ? <button onClick={onClick} className='step__back'>Back</button>
  : null
BackButton.propTypes = {
  onClick: PropTypes.func,
  visible: PropTypes.bool
}

const NextButton = ({ onClick, visible }) => visible
  ? (
    <button onClick={onClick} className='step__next'>
      Next <i className='material-icons step__next__arrow'>arrow_forward</i>
    </button>
  )
  : null
NextButton.propTypes = {
  onClick: PropTypes.func,
  visible: PropTypes.bool
}

const Buttons = ({ showBack, onBack, showNext, onNext }) => showBack ||  showNext
  ? (
    <div className='step__buttons'>
      <BackButton visible={showBack} onClick={onBack} />
      <NextButton visible={showNext} onClick={onNext} />
    </div>
  )
  : null
Buttons.propTypes = {
  showBack: PropTypes.bool,
  showNext: PropTypes.bool,
  onBack: PropTypes.func,
  onNext: PropTypes.func
}

const Step = ({ label, progress, children, showNext, showBack, onNext, onBack }) => (
  <div className='step__container'>
    {children}
    <Buttons
      showBack={showBack}
      showNext={showNext}
      onBack={onBack}
      onNext={onNext} />
  </div>
)

Step.propTypes = {
  showBack: PropTypes.bool,
  showNext: PropTypes.bool,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  label: PropTypes.string,
  progress: PropTypes.number
}

export default Step

