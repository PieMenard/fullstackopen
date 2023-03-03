import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);

  const Button = ({handleClick,text}) => (
    <button onClick={handleClick}>{text}</button>
  )
  
  const clickGood = () => {
    console.log("clicked good button");
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
    setScore(score + 1);

  }
  const clickNeutral = () => {
    console.log("clicked neutral button");
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(updatedNeutral + good + bad);
    setScore(score);
  }

  const clickBad = () => {
    console.log("clicked bad button");
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(updatedBad + good + neutral);
    setScore(score - 1);
  }

  const average = score/total;
  const percentage = Math.round((good / total) * 100)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={clickGood} text = "good"/>
      <Button handleClick={clickNeutral} text = "neutral"/>
      <Button handleClick={clickBad} text = "bad"/>
      <h2>Statistics</h2>
      <ul>
        <li>good {good} </li>
        <li> neutral {neutral}</li>
        <li>bad {bad}</li>
        <li>total {total}</li>
        <li>score {score}</li>
        <li>average {average}</li>
        <li>percentage {percentage}</li>
      </ul>

    </div>
  )
}

export default App