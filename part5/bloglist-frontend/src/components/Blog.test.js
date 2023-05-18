import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://test.com',
    likes: 100,
}

test('renders title and author but not likes and url by default', () => {
    screen.debug()

    const { container } = render(<Blog blog={blog}/>)

    const blogSimple = container.querySelector('.blogSimple')
    expect(blogSimple).toHaveTextContent('Test title by Test author')
    const blogExpand = container.querySelector('.blogExpand')
    expect(blogExpand).toEqual(null)
    const likesElement = screen.queryByText('likes')
    expect(likesElement).not.toBeInTheDocument()
})
