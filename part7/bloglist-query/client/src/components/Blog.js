import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { updateLike, deleteBlog } from '../requests'
import { useUserValue } from '../userContext'

const Blog = (({ blog }) => {
    const queryClient = useQueryClient()

    const user = useUserValue()

    const dispatch = useNotificationDispatch()
    
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const addLikeMutation = useMutation(updateLike, {
        onSuccess: (updatedLike) => {
          console.log('update', updatedLike)
    
          const blogs = queryClient.getQueryData('blogs')
    
          queryClient.setQueryData('blogs', blogs.map(blog =>
            blog.id === updatedLike.id ? updatedLike : blog
          ))
        }
    })
    
    const handleLike = async (blog) => {
        addLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
    
        await dispatch({ type: 'showNotification', payload: `You add one like for: ${blog.title} !` })
    
        setTimeout(() => {
          dispatch({ type: 'hideNotification' })
        }, 5000)
    }

    const deleteMutation = useMutation(deleteBlog, {
        onSuccess: (deletedBlog) => {
            const blogs = queryClient.getQueryData('blogs')

            queryClient.setQueryData('blogs', blogs.filter(blog =>
            blog.id !== deletedBlog.id
            ))
        }
    })

    const handleDelete = async (blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            deleteMutation.mutate(blog)
        }
        await dispatch({ type: 'showNotification', payload: `You deleted: ${blog.title} !` })

        setTimeout(() => {
            dispatch({ type: 'hideNotification' })
        }, 5000)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const showDelete = blog.user.username === user.username ? true : false
    
    return (
        <div style = {blogStyle} className='blog'>
            <div className="blogSimple">
                <div>
                    {blog.title} by {blog.author}<button id='view-button' onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
                </div>
                <div>
                    {showDelete && (
                        <button id='delete-button' onClick={() => handleDelete(blog)}>delete</button>
                    )}
                </div>
            </div>
            {visible && (
                <div>
                    <div className="blogExpand">
                        <p>{blog.url}</p>
                        <p>
                        likes {blog.likes} <button id='like-button' onClick={() => handleLike(blog)}>like</button>
                        </p>
                        <p>added by user: {blog.user.name}</p>
                    </div>
                </div>
            )}
        </div>
    )
})

export default Blog