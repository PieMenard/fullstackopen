import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updateVote} from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const updateVoteMutation = useMutation(updateVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const result = useQuery('anecdotes', getAnecdotes, {retry:false})

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
