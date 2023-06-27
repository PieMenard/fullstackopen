import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    voteBlog(state, action){
      const id = action.payload.id

      const blogToChange = action.payload

      return state.map(blog =>
        blog.id !== id ? blog : blogToChange
      )
    },
    appendBlog(state, action){
      state.push(action.payload)
    },
    setBlogs: (state, action) => {
      return action.payload
    },
    deleteBlog(state, action){
      state.filter((blog) => blog.id !== action.payload.id)
    }
  }
})

export const { appendBlog, setBlogs,/* voteBlog, deleteBlog*/ } = blogSlice.actions


export const createBlogs = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

/*export const addLikes = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1
    })
    dispatch(voteBlog(updatedBlog))

  }
}

/*export const deleteBlogs = id => {
  return async dispatch => {
    const newBlog = await blogService.remove(id)
    dispatch(deleteBlog(newBlog))

  }
}
*/
export default blogSlice.reducer