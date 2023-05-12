import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username,password) => {
        
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setNotification(`Logging succesful! Hello ${user.name}! `) ;
        setTimeout(() => {setNotification(null)}, 5000);
      
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) =>{
    window.localStorage.clear();
    setUser(null);
  }

  const handleAddBlog = async(title, author, url) => {
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisibility()
      setNotification(`Added a new blog: "${blog.title}" by "${blog.author}" `) ;
        setTimeout(() => {setNotification(null)}, 5000);
    } catch (exception) {
      console.log('exception', exception)
      setErrorMessage('Error dding new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return (
      <div className='notification'>
        {message}
      </div>
    )
  }

  const ErrorMessage = ({ message }) => {
    if (message === null) {
      return null;
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
            <ErrorMessage message={errorMessage}/>
            <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm handleAddBlog={handleAddBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage}/>
      <p> 
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new blog</h2>
      <div> {blogForm()} </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
            
    </div>
  )
}

export default App