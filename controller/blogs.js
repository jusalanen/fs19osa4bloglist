const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
 
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  /*const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result.toJSON())
    })*/
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
  //  console.log(exception)
    next(exception)
  }
})

module.exports = blogsRouter
