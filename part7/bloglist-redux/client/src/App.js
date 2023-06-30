import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'

import BlogList from "./components/BlogList";

const App = () => {

  const [user, setUser] = useState(null)

  const dispatch = useDispatch();

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
      <BlogList/>
    </div>
  );
};

export default App;
