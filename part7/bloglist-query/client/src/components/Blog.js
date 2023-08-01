import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { updateLike, deleteBlog/*, addComment */} from '../requests'
import { useUserValue } from '../userContext'
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogs, addComment } from '../requests'
import BlogComments from './BlogComments';
import { useState } from 'react';

const Blog = () => {
    const { id } = useParams();
    const result = useQuery('blogs', getBlogs, {retry:false})
    const blogs = result.data
    const blog = blogs.find(n => n.id === String(id))
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState('');

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

    const addCommentMutation = useMutation(addComment, {
        onSuccess: (addedComment) => {
          // After adding the comment successfully, invalidate the blogs query
          queryClient.invalidateQueries('blogs');
          // You can also show a notification to the user, if desired
        },
    });
    
    const handleLike = async (blog) => {
        addLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
    
        await dispatch({ type: 'showNotification', payload: `You add one like for: ${blog.title} !` })
    
        setTimeout(() => {
          dispatch({ type: 'hideNotification' })
        }, 5000)
    }

    const handleAddComment = async (event) => {
        event.preventDefault();
    
        try {
          // Call the mutation function to add the comment
          await addCommentMutation.mutateAsync({
            blogId: blog.id,
            content: commentContent,
          });
    
          setCommentContent('');
    
          await dispatch({ type: 'showNotification', payload: `You added a comment on: ${blog.title} !` })
    
            setTimeout(() => {
            dispatch({ type: 'hideNotification' })
            }, 5000)
        } catch (error) {
          // Handle errors, e.g., show an error notification
        }
      };

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
            <form onSubmit={handleAddComment}>
                <input
                type='text'
                name='comment'
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                />
                <button type='submit'>add comment</button>
            </form>
            <BlogComments />        
        </div>
    )
}

export default Blog