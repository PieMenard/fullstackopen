import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const getUsers = async () => {
  const response = await axios.get('/api/users')
  return response.data
}

export const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const updateLike = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

export const deleteBlog = async (deletedBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${deletedBlog.id}`, config)

  return response.data
}

export const login = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

export const getUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`)
  return response.data
};

export const getUserBlogs = async (id) => {
    const response = await axios.get(`/api/users/${id}/blogs`); // Replace with your API endpoint
    return response.data
};

export const addComment = async (id, comment) => {
  const response=  await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}
