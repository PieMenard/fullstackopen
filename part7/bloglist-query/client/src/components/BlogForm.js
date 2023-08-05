import { useMutation, useQueryClient } from 'react-query'
import { createBlog } from '../requests'
import { useNotificationDispatch } from "../NotificationContext"
import { Button, Form } from 'react-bootstrap'

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
        <Form onSubmit={addBlog}>
            <Form.Group>
          <Form.Label className="mt-2">Title:</Form.Label>
          <Form.Control
                    type="text"
                    name="title"
                />

            <Form.Label className="mt-2">Author:</Form.Label>
            <Form.Control id='author-input'
                        type="text"
                        name="author"
                    />

            <Form.Label className="mt-2">Url:</Form.Label>
                    <Form.Control
                    id='url-input'
                        type="text"
                        name="url"
                    />
            </Form.Group>
            <Button 
                type="submit"
                variant="success"
                id="create"
                className="justify-content-end mt-3"
                >submit
            </Button>
        </Form>
    )
}

export default BlogForm