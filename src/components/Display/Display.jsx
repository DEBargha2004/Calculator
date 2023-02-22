import React from 'react'
import calculate from '../../core';

function Display(props) {
  return (
    <div className='display'>
      <div className='cur'>
        {props.calc ? props.calc : 0}
      </div>
      <div className='res'>
        {props.show ? calculate(props.calc) : ''}
      </div>
    </div>
  )
}

export default Display;