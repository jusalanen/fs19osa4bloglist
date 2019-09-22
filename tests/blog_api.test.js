const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initBlogs = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json of correct size', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(initBlogs.length)
})

test('identifier is shown as "id"' , async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach( blog => {
    expect(blog.id).toBeDefined()
  })
})

test('post increases the number of blogs by one', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    url: 'localhost:something/new',
    likes: 0
  }

  await api.post('/api/blogs').send(newBlog)
  .expect(201)
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initBlogs.length + 1)
})

test('likes set to zero if not present', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    url: 'localhost:something/new2',
  }
  const response = await api.post('/api/blogs').send(newBlog)
  .expect(201)

  expect(response.body.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})