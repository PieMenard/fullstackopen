import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
    append: (state, action) => {
      return [...state, action.payload];
    },
    update: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    remove: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
})

export const { append, set, update, remove } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(set(sortedBlogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(append(newBlog))
  }
}

export const likeBlog = (id, newObject) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(id, newObject);
    dispatch(update(likedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.destroy(id);
    dispatch(remove(id));
  };
};

export default blogSlice.reducer