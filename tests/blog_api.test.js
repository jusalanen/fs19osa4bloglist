const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initBlogs = [
  {
    title: 'Blog One',
    author: 'First Author',
    url: 'localhost:something',
    likes: 3
  },
  {
    title: 'Blog Two',
    author: 'Author Also',
    url: 'localhost:something/2',
    likes: 2
  }
]

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

  expect(response.body.length).toBe(2)
})

test('identifier is shown as "id"' , async () => {
  const response = await api.get('/api/blogs')
  const blogs = [].concat(response.body)
  blogs.forEach( blog => {
    expect(blog.id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})