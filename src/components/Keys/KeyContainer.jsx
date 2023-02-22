import React from 'react'

function KeyContainer(props) {
  let nums = []
  for (let i = 9; i > 0; i--) {
    nums.push(String(i))
  }
  return (
    <div className='keyWrapper'>
      <div className='keyContainer'>
        <div className='additional'>
          <button className='usual' onClick={props.clear}>AC</button>
          <button className='usual' onClick={props.backspace}>⌫</button>
          <button className='usual' onClick={()=>props.includer('%')}>%</button>
        </div>
        <div className='operators'>
          <button className='operator' onClick={()=>props.includer('÷')}>÷</button>
          <button className='operator' onClick={()=>props.includer('x')}>x</button>
          <button className='operator' onClick={()=>props.includer('+')}>+</button>
          <button className='operator' onClick={()=>props.includer('-')}>-</button>
        </div>
        <div className='nums'>
          {nums.map((item,index) => <button key={index} className='usual number_key' onClick={()=>props.includer(item)}>{item}</button>)}
        </div>
        <div className='basic'>
          <button className='usual' onClick={()=>props.includer('00')}>00</button>
          <button className='usual' onClick={()=>props.includer('0')}>0</button>
          <button className='usual' onClick={()=>props.includer('.')}>.</button>
          <button className='usual equal' onClick={props.click}>=</button>
        </div>
      </div>
    </div>
  )
}

export default KeyContainer;