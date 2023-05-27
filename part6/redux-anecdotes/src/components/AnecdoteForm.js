import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
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