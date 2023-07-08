import { useMutation, useQueryClient } from 'react-query'
import { createBlog } from '../requests'
import { useNotificationDispatch } from "../NotificationContext"

const BlogForm = () => {

    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()
   
    const newBlogMutation = useMutation(createBlog, {
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData('blogs')
            queryClient.setQueryData('blogs', blogs.concat(newBlog))
        },
        onError: () => {
            dispatch({ type: 'showNotification', payload: `error creating blog, invalid name` })
        }
    })

    const addBlog = async (event) => {

        event.preventDefault()

        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value

        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''

        newBlogMutation.mutate({ title,author,url })
        await dispatch({ type: 'showNotification', payload: `You added ${title} by ${author} !` })

        setTimeout(() => {
            dispatch({ type: 'hideNotification' })
        }, 5000)
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                title
                <input id='title-input'
                    type="text"
                    name="title"
                />
            </div>
            <div>
                author
                    <input id='author-input'
                        type="text"
                        name="author"
                    />
            </div>
            <div>
                website
                    <input id='url-input'
                        type="text"
                        name="url"
                    />
            </div>
            <button type="submit">submit</button>
        </form>
    )
}

export default BlogForm