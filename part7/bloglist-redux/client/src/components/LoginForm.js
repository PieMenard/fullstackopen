import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from "../reducers/notificationReducer";
import loginService from "../services/login";
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);


  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user));
      dispatch(setNotification(`welcome ${user.name}`,5));
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification("wrong username or password",5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
    dispatch(setNotification("logged out",5));
  };

  if (user) {
    return (
      <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
    );
  } else return (
    <Form onSubmit={handleLoginFormSubmit}>
      <Form.Group>
          <Form.Label className="mt-2">Username</Form.Label>
          <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
     <Form.Label className="mt-2">Password</Form.Label>
          <Form.Control
          id="password"
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
        login
      </Button>
      </Form.Group>
      </Form>
  );
};

export default LoginForm;
