import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
//import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

    const dispatch = useNotificationDispatch()

    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
   // const queryClient = useQueryClient();

    const [user, setUser] = useState(null)
    const [refreshBlog, setRefreshBlog] = useState(false)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [refreshBlog])

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
           await dispatch({ type: 'showNotification', payload: `Logging succesful! Hello ${user.name}! ` })
            setTimeout(() => {
             dispatch({ type: 'hideNotification' })
            }, 5000)

        } catch (error) {
           await dispatch({ type: 'showNotification', payload: "Wrong credentials" })
            setTimeout(() => {
             dispatch({ type: 'hideNotification' })
            }, 5000)
        }
    }

    const handleLogout = async () => {
        window.localStorage.clear()
        setUser(null)
    }

    const handleAddBlog = async(blogObject) => {
        try {
            const blog = await blogService.create(blogObject)
            setBlogs(blogs.concat(blog))
            blogFormRef.current.toggleVisibility()
           await dispatch({ type: 'showNotification', payload: `Added a new blog: "${blog.title}" by "${blog.author}" ` })
            setTimeout(() => {
             dispatch({ type: 'hideNotification' })
            }, 5000)
        } catch (exception) {
            console.log('exception', exception)
           await dispatch({ type: 'showNotification', payload: "Error adding new blog" })
            setTimeout(() => {
             dispatch({ type: 'hideNotification' })
            }, 5000)
        }
    }

    

    const ErrorMessage = ({ message }) => {
        if (message === null) {
            return null
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

    const handleUpdateBlog = async (id, updatedBlog) => {
        try {
            const response = await blogService.update(id, updatedBlog)
            setRefreshBlog(!refreshBlog)
            setBlogs(
                blogs.map((blog) => (blog.id === response.id ? response : blog))
            )
        } catch (exception) {
            setErrorMessage('error' + exception.response.data.error)
        }

    }

    const handleDeleteBlog = async (blog) => {
        if (window.confirm(`Delete ${blog.title} by "${blog.author}" ?`)) {
            await blogService.destroy(blog.id)
           await dispatch({ type: 'showNotification', payload: `Deleted blog: "${blog.title}" by "${blog.author}" ` })
            setTimeout(() => {
             dispatch({ type: 'hideNotification' })
            }, 5000)
            const updatedBlogs = blogs.filter((currentBlog) => currentBlog.id !== blog.id)
            setBlogs(updatedBlogs)
        }
    }

    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={handleAddBlog} />
        </Togglable>
    )

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
                updateBlog={handleUpdateBlog}
                deleteBlog={handleDeleteBlog}
            />

        </div>
    )
}

export default App