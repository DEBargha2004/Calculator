import React, { useState } from 'react'
import Display from './components/Display/Display'
import Header from './components/Header/Header'
import KeyContainer from './components/Keys/KeyContainer'
import calculate from './core'

function App() {
  const [calcdata, setCalcData] = useState('')
  const [toShow, setToShow] = useState(false)
  function backspace() {
    let newCalcdata = calcdata.substring(0, calcdata.length - 1)
    setCalcData(newCalcdata)
  }
  return (
    <div className='calculator-wrapper'>
      <Header />
      <Display calc={calcdata} show={toShow} />
      <KeyContainer
        includer={(data) => {
          let li = calcdata.slice(-1)
          let ops = ['+', '-', 'x', '÷','%']
          let nonreq_ops = ['+', '-', 'x', '÷']
          if (li === '%' && !ops.includes(data)) {
            data = data.padStart(data.length + 1, 'x')
            setCalcData(calcdata + data)
            setToShow(true)
          } else if ((li === '%' && nonreq_ops.includes(data)) || (!ops.includes(li) || li!=='') || (nonreq_ops.includes(li) && !ops.includes(data))) {
            if ((calcdata.length === 0 && data !== '+' && data === '-') || calcdata.length !== 0 ||(calcdata.length===0 && data !== '-' && data !== '+')) {
              setCalcData(calcdata + data)
              setToShow(true)
            }
          }
        }}
        clear={() => setCalcData('')}
        backspace={backspace}
        click={() => {
          setCalcData(calculate(calcdata))
          setToShow(false)
        }} />
    </div>
  )
}

export default App;