
import BlogList from './components/BlogList'
import { Routes, Route } from 'react-router-dom';
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User';
import Blog from './components/Blog';
import NavigationBar from './components/NavigationBar';

const App = () => {  
    return (
        <div className="container">
            <NavigationBar/>
            <h2>Blogs App</h2>
            <Notification />
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