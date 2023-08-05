import { useState } from 'react'
import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import UserContext from '../userContext'
import { setToken } from '../requests'
import loginService from '../services/login'
import { useNotificationDispatch } from '../NotificationContext'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

const LoginForm = () => {
    const dispatch = useNotificationDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [user, userDispatch] = useContext(UserContext)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          userDispatch({ type: 'setUser', payload: user })
          setToken(user.token)
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const onSubmit = (event) => {
        event.preventDefault()
        handleLogin(event)
        setUsername('')
        setPassword('')
    }

    const handleLogout = async () => {
        window.localStorage.clear()
        userDispatch({ type: 'clearUser' })
    }

    LoginForm.propTypes = {
        handleLogin: PropTypes.func.isRequired,
    }

    if (user) {
        return (
          <div>
            <Form.Text className="text-muted mb-2">
              {user.name} logged in
              <Button onClick={handleLogout} variant="outline-secondary" size="sm">
                Logout
              </Button>
            </Form.Text>
          </div>
        );
      } else return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label className="mt-2">Username</Form.Label>
                <Form.Control
                    id='username'
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                <Form.Label className="mt-2">Password</Form.Label>
                <Form.Control
                    id='password'
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                <Button
                    id="login-button"
                    variant="primary"
                    className="mt-3"
                    type="submit"
                    >
                        Login
                </Button>
            </Form.Group>
        </Form>
    )
}

export default LoginForm