import { useDispatch, useSelector } from 'react-redux'
import { addVotes, createAnecdote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    
    const vote = (id) => {
      dispatch(addVotes(id))
    }

    const addAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(createAnecdote(content))
    }

    return(
      <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )}
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
        
      </div>
    )
  }

export default Anecdotes