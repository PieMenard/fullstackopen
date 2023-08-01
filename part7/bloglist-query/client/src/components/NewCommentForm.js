import { useState } from 'react'

const NewCommentForm = () => {
    const [comment, setComment] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        setComment('')
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    type="text"
                    value={comment}
                    placeholder="enter a comment here"
                    name="Comment"
                    onChange={({ target }) => setComment(target.value)}
                />
            </div>
            <button id="comment-button" type="submit">comment</button>
        </form>
    )
}

export default NewCommentForm