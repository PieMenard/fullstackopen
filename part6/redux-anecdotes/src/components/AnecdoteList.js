import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    
  const anecdotes = useSelector(state => {
    if (state.filter === null) {
      return state.anecdotes
                .sort((a, b) => b.votes - a.votes)
    }
    return state.anecdotes.filter((anecdote) => 
        anecdote.content
            .toLowerCase()
            .includes(state.filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()
  
  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(setNotification(`You voted for "${content}" !`))
        setTimeout(()=> {
            dispatch(setNotification(''))
        }, 5000) 
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
        <div>"{anecdote.content}" has {anecdote.votes} votes</div>
        <div>
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
      )}        
    </div>
  )
}

export default AnecdoteList