
import BlogList from './components/BlogList'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserDisplay from './components/UserDisplay'

const App = () => {  
    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <UserDisplay />
            <LoginForm/>
            <BlogList blogs/>

        </div>
    )
}

export default App