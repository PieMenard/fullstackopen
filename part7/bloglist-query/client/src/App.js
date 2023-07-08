import { useEffect, useRef, useContext } from 'react'
import BlogList from './components/BlogList'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { getBlogs, setToken } from './requests'
import UserContext from './userContext'
import { useQuery} from 'react-query';
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

    const dispatch = useNotificationDispatch()
    const result = useQuery('blogs', getBlogs, {retry:false})

    const [user, userDispatch] = useContext(UserContext)

    const blogFormRef = useRef()


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          userDispatch({ type: 'setUser', payload: user })
          setToken(user.token)
        }
      }, [])

      const handleLogin = async (event) => {
        event.preventDefault()
    
        const username = event.target.username.value
        const password = event.target.password.value
        event.target.username.value = ''
        event.target.password.value = ''
    
        try {
          const user = await loginService.login({
            username, password,
          })
    
          window.localStorage.setItem(
            'loggedBlogAppUser', JSON.stringify(user)
          )
    
          setToken(user.token)
          userDispatch({ type: 'setUser', payload: user })
        } catch (exception) {
          dispatch({ type: 'showNotification', payload: 'Wrong username or password' })
          setTimeout(() => {
            dispatch({ type: 'hideNotification' })
          }, 5000)
        }
      }
            
    const handleLogout = async () => {
        window.localStorage.clear()
        setToken(null)
    }


    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <LoginForm handleLogin={handleLogin}/>
            </div>
        )
    }

    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm/>
        </Togglable>
    )
    
    if ( result.isLoading ) {
        return <div>loading data...</div>
      }
    
      if ( result.isError) {
        return <div>anecdote service not available due to problems in server</div>
      }
    
      const blogs = result.data
      
    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>
                <span>{user.name} logged in</span>
                <button onClick={handleLogout}>logout</button>
            </p>
            <h2>create new blog</h2>
            <div> {blogForm()} </div>
            <BlogList
                blogs={blogs}
                user={user}
            />

        </div>
    )
}

export default App