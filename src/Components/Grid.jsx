/* eslint-disable react/prop-types */

// components
import Row from './Row'

export default function Grid({ guesses, currentGuess, turn, solution }) {
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row solution={solution} key={i} currentGuess={currentGuess} />
        }
        return <Row solution={solution} key={i} guess={g} /> 
      })}
    </div>
  )
}
