import React, { PropTypes } from 'react'
import './ProgressBar.scss'

const ProgressBar = ({ progress }) => (
  <div className='progress-bar'>
    <div className='progress-bar--bar' style={{ width: progress + '%' }} />
  </div>
)
ProgressBar.propTypes = { progress: PropTypes.number }

export default ProgressBar
