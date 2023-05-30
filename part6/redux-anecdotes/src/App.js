import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdotesFilter from './components/AnecdotesFilter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesFilter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App