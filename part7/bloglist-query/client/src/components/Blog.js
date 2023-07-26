import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { updateLike, deleteBlog/*, addComment */} from '../requests'
import { useUserValue } from '../userContext'
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogs } from '../requests'
import BlogComments from './BlogComments';
//import { useState } from 'react';

const Blog = () => {
    const { id } = useParams();
    const result = useQuery('blogs', getBlogs, {retry:false})
    const blogs = result.data
    const blog = blogs.find(n => n.id === String(id))
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    //const [commentContent, setCommentContent] = useState('');

    

    const user = useUserValue()

    const dispatch = useNotificationDispatch()
    
    const addLikeMutation = useMutation(updateLike, {
        onSuccess: (updatedLike) => {
          console.log('update', updatedLike)
    
          const blogs = queryClient.getQueryData('blogs')
    
          queryClient.setQueryData('blogs', blogs.map(blog =>
            blog.id === updatedLike.id ? updatedLike : blog
          ))
        }
    })

    /*const addCommentMutation = useMutation(addComment, {
        onSuccess: (addedComment) => {
          console.log('update', addedComment)
    
          const blogs = queryClient.getQueryData('blogs')
    
          queryClient.setQueryData('blogs', blogs.map(blog =>
            blog.id === addedComment ? addedComment : blog
          ))
        }
    })*/
    
    const handleLike = async (blog) => {
        addLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
    
        await dispatch({ type: 'showNotification', payload: `You add one like for: ${blog.title} !` })
    
        setTimeout(() => {
          dispatch({ type: 'hideNotification' })
        }, 5000)
    }
    /*const handleAddComment = async (blog) => {
        addCommentMutation.mutateAsync({ blogId: blog.id, content: commentContent });
        // Reset the comment content after adding the comment
        setCommentContent('');
        await dispatch({ type: 'showNotification', payload: `You added a comment on: ${blog.title} !` })
    
        setTimeout(() => {
          dispatch({ type: 'hideNotification' })
        }, 5000)
    }*/

    const deleteMutation = useMutation(deleteBlog, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs');
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
         navigate('/');
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const showDelete = blog.user && user && blog.user.username === user.username;
   
    return (
        <div style = {blogStyle} className='blog'>
                <div>
                    <h3>{blog.title}</h3>
                    <p>by: {blog.author}</p>
                    <p>url: {blog.url}</p>
                    <p>
                    likes {blog.likes} <button id='like-button' onClick={() => handleLike(blog)}>like</button>
                    </p>
                    <p>added by user: {blog.user.name}</p>
                    {showDelete && (
                        <button id='delete-button' onClick={() => handleDelete(blog)}>delete</button>
                    )}
                </div>
                
        </div>
    )
}

export default Blog