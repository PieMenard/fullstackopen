
import BlogList from './components/BlogList'
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User';
import Blog from './components/Blog';

const App = () => {  
    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <LoginForm/>
            <Routes>
              <Route path="/" element={<BlogList blogs/>}></Route>
              <Route path="/blogs/:id" element={<Blog />}></Route>
              <Route path="/users" element={<UserList />}></Route>
              <Route path="/users/:id" element={<User />}></Route>
            </Routes>

        </div>
    )
}

export default App