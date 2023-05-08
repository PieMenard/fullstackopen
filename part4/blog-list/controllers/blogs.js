const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response) => {
  //const user = await User.findOne();
  const body = request.body
  const user = request.user
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  //const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })
  
 /* if (!blog.title && !blog.url) {
    response.status(400).end()
  } else {
    
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  }*/
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id) // Update the user's 'blogs' array
  await user.save()
  response.status(201).json(savedBlog.toJSON());
})


blogsRouter.delete('/:id', async (request, response, next) => {
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = request.user
  const blog = await Blog.findById(request.params.id);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if ( blog.user.toString() === user.id.toString() )
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: User.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
      response.json(updatedBlog)
    
})

module.exports = blogsRouter