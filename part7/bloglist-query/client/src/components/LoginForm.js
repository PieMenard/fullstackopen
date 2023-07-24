import { useState } from 'react'
import { useContext } from 'react'
import PropTypes from 'prop-types'
import UserContext from '../userContext'
import { setToken } from '../requests'
import loginService from '../services/login'
import { useNotificationDispatch } from '../NotificationContext'

const LoginForm = () => {
    const dispatch = useNotificationDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [userDispatch] = useContext(UserContext)

    
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

    const onSubmit = (event) => {
        event.preventDefault()
        handleLogin(event)
        setUsername('')
        setPassword('')
    }

    LoginForm.propTypes = {
        handleLogin: PropTypes.func.isRequired,
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
              username
                <input
                    id='username'
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
              password
                <input
                    id='password'
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="login-button" type="submit">login</button>
        </form>
    )
}

export default LoginForm