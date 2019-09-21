const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
 
  response.json(blogs.map(blog => blog.toJSON()))
})

<<<<<<< Updated upstream
blogsRouter.post('/', async (request, response) => {
  const newBlog = new Blog(request.body)

  const savedBlog = await newBlog.save()
  
  response.status(201).json(savedBlog.toJSON())
=======
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })
  try {
    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
>>>>>>> Stashed changes
})

module.exports = blogsRouter
