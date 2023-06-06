const Anecdote = ({ anecdote }) => {
    return (
      <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <p> Votes: {anecdote.votes} votes</p>
      </div>
    )
  }

  export default Anecdote