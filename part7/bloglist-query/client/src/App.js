
import BlogList from './components/BlogList'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {  
    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <LoginForm/>
            <BlogList blogs/>

        </div>
    )
}

export default App