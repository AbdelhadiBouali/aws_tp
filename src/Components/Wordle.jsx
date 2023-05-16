/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'

// components
import Grid from './Grid'
import Modal from './Modal'
import Indices from './Indices'
import Countdown from 'react-countdown'

export default function Wordle({ solution, indices, score }) {
  const { currentGuess, guesses, turn, isCorrect, handleKeyup } = useWordle(solution)
  const [showModal, setShowModal] = useState(false)
  const [timer] = useState(Date.now() + 60000 * 2)

//   const renderer = ({ hours, minutes, seconds, completed }) => {
//   if (completed) {
   
//     setShowModal(true)
//     return <span>Time is up!</span>;
//   } else {
    
//     return <span>{minutes}mm : {seconds}ss</span>;
//   }
// };


useEffect(() =>  {
  console.log(indices, indices[turn], turn)
}, [turn])


  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  return (
    <div>
      <Countdown date={timer} />
      <Grid solution={solution} guesses={guesses} currentGuess={currentGuess} turn={turn} />
      {/* <Keypad usedKeys={usedKeys} /> */}
      <Indices indice={indices[turn ?? 0]} /> 
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} score={score} />}
    </div>
  )
}
