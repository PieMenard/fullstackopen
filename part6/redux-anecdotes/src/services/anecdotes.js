import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes:0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const anecdotes = await getAll();
  const anecdoteToUpdate = anecdotes.find((anecdote) => anecdote.id === id);
 
  const updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1 
  }
  const response = await axios.patch(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data;
}

export default { getAll, createNew, vote}