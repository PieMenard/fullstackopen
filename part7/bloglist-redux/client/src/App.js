import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(null)
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs)); // Dispatch the setBlogs action with the fetched blogs
    });
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
    }
}, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification(`Logging successful! Hello ${user.name}! `));
   
    } catch (error) {
      dispatch(setNotification("Wrong credentials"));
    }
  };

  const handleLogout = async () => {
    window.localStorage.clear();
    dispatch(setUser(null));
  };

  const handleAddBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject);
      dispatch(setBlogs(blogs.concat(blog)));
      blogFormRef.current.toggleVisibility();
      dispatch(setNotification(`Added a new blog: "${blog.title}" by "${blog.author}" `, 5));
    } catch (exception) {
      console.log("exception", exception);
      dispatch(setNotification("Error adding new blog", 5));
    }
  };

  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      const response = await blogService.update(id, updatedBlog);
      dispatch(setBlogs(blogs.map((blog) => (blog.id === response.id ? response : blog))));
    } catch (exception) {
      dispatch(setNotification("error" + exception.response.data.error, 5));
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Delete ${blog.title} by "${blog.author}" ?`)) {
      await blogService.destroy(blog.id);
      dispatch(setNotification(`Deleted blog: "${blog.title}" by "${blog.author}" `, 5));

      const updatedBlogs = blogs.filter((currentBlog) => currentBlog.id !== blog.id);
      dispatch(setBlogs(updatedBlogs));
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleAddBlog} />
    </Togglable>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new blog</h2>
      <div>{blogForm()}</div>
      <BlogList/>
    </div>
  );
};

export default App;
