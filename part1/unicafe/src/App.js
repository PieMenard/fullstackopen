import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return ( 
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({good,neutral,bad}) => {
  const total = good + neutral + bad;
  const score = good - bad;
  const average = total == 0? 0 : score/total;
  const percentage = total == 0? 0 : Math.round((good / total) * 100);

  if (total!=0)
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
              <StatisticLine text="good" value ={good} />
              <StatisticLine text="neutral" value ={neutral} />
              <StatisticLine text="bad" value ={bad} />
              <StatisticLine text="total" value ={total} />
              <StatisticLine text="average" value ={average} />
              <StatisticLine text="percentage" value ={percentage} />
          </tbody>
        </table>
      </div>
    );
    else
      return (
        <div>
          <h2>Statistics</h2>
          No feedback given
        </div>
      )

}

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const clickGood = () => {
    console.log("clicked good button");
    const updatedGood = good + 1;
    setGood(updatedGood);
  }
  const clickNeutral = () => {
    console.log("clicked neutral button");
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  }

  const clickBad = () => {
    console.log("clicked bad button");
    const updatedBad = bad + 1;
    setBad(updatedBad);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={clickGood} text = "good"/>
      <Button handleClick={clickNeutral} text = "neutral"/>
      <Button handleClick={clickBad} text = "bad"/>
      
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App