import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`"${content}" has been added`))
    setTimeout(()=> {
        dispatch(setNotification(''))
    }, 5000) 
  }

  return (
    <div>
    <form onSubmit={addAnecdote}>
    <input name="anecdote" />
    <button type="submit">add</button>
    </form>
    </div>
  )
}

export default AnecdoteForm