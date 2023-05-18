import { useState } from 'react'

const Blog = ({ blog, loggedUser, updateBlog, deleteBlog }) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleDelete = () => {

        deleteBlog(blog)
    }

    const handleLike = () => {
        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id,
        }
        updateBlog(blog.id, updatedBlog)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style = {blogStyle} >
            <div className="blogSimple">
                <div>
                    {blog.title} by {blog.author}<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
                </div>
                <div>
                    {loggedUser && loggedUser.username === blog.user.username && (
                        <button onClick={() => handleDelete()}>delete</button>
                    )}
                </div>
            </div>
            {visible && (
                <div>
                    <div className="blogExpand">
                        <p>{blog.url}</p>
                        <p>
                        likes {blog.likes} <button onClick={handleLike}>like</button>
                        </p>
                        <p>added by user: {blog.user.name}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Blog