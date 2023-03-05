import { useState } from 'react'

const MostVoted = ({anecdotes,votes}) => {
  const max = Math.max( ...votes );
  const maxIndex = votes.indexOf(max)
  
  if (max == 0)
    return (
      <div>
        <p>There are 0 votes</p>
      </div>
    )
  else
    return (
      <div>
        <p><strong>Anecdote with most votes:</strong></p>
        <p><i>"{anecdotes[maxIndex]}"</i> Has the most votes with <strong>{max}</strong> votes</p>
      </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  //Make an array same length as anecdotes and fill it with zeros
  const [votes,setVote] = useState(Array(anecdotes.length).fill(0));

  const Button = ({handleClick,text}) => (
    <button onClick={handleClick}>{text}</button>
  )

  const clickNext = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length));
  }

  const clickVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1; 
    setVote(updatedVotes);
    console.log(updatedVotes);
    console.log(votes);
  }
  
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={clickVote} text = "vote"/>
      <Button handleClick={clickNext} text = "next anecdote"/>
      <MostVoted anecdotes = {anecdotes} votes = {votes}/>
    </div>
  )
}

export default App