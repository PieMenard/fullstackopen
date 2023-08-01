const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

  const body = request.body
  const user = request.user
  const token = request.token

  if (!user) {
    return response.status(401).json({ error: "user doesn't exist in database" })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!(token || decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

   const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })
  
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title and url are required' });
  }
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id) 
  await user.save()
  response.status(201).json(savedBlog.toJSON());
})

blogsRouter.post("/:id/comments", async (request, response) => {
  const blogId = request.params.id;
  const { content } = request.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    // Add the new comment to the blog's comments array
    blog.comments.push({ content });

    // Save the updated blog to the database
    await blog.save();

    // Respond with the added comment
    response.status(201).json(blog.comments[blog.comments.length - 1]);
  } catch (error) {
    response.status(500).json({ error: "Failed to add comment" });
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = request.user
  const blog = await Blog.findById(request.params.id);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!request.token) {
    return response.status(401).json({ error: 'token missing' });
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
    user: User.id,
    comment: body.comment
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
      response.json(updatedBlog)
    
})

module.exports = blogsRouter