import { Link } from 'react-router-dom';
import UserContext from '../userContext';
import { useEffect, useContext } from 'react'
import LoginForm from './LoginForm';
import { setToken } from '../requests'

const NavigationBar = () => {
  const padding = {
    padding: 5
  }
  const [user, userDispatch] = useContext(UserContext);
  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        userDispatch({ type: 'setUser', payload: user })
        setToken(user.token)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  const handleLogout = async () => {
      window.localStorage.clear()
      userDispatch({ type: 'clearUser' })
  }

  if (user) {
      return (
        <div>
            <div className="navbar">
              <Link style={padding} to="/">blogs</Link>
              <Link style={padding} to="/users">users</Link>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
          </div>
        </div>
      );
    } else return (
      <div>
          <LoginForm/>
      </div>

    )
}

export default NavigationBar