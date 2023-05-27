import { useDispatch, useSelector } from 'react-redux'
import { addVotes, } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes =  useSelector(state => state.sort((a, b) => b.votes - a.votes))
    
    const vote = (id) => {
      dispatch(addVotes(id))
    }

    return(
      <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
          <div>"{anecdote.content}" has {anecdote.votes} votes</div>
          <div>
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )}        
      </div>
    )
  }

export default Anecdotes