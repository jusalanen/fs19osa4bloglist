const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initBlogs = require('./test_helper')
const config = require('../utils/config')
const http = require('http')

/*jest.setTimeout(15000)
jest.retryTimes(3)
const server = http.createServer(app)*/

const api = supertest(app)
/*beforeAll(async (done) => {
  await server.listen(config.PORT, () => {console.log(`Server running on port ${config.PORT}`)})
  api = supertest(server)
  done()
})*/

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
  console.log(response.body)
  expect(response.body.length).toBe(initBlogs.length)
})

test('identifier is returned as "id"' , async () => {
  const response = await api.get('/api/blogs')
  const blogs = [].concat(response.body)
  blogs.forEach( blog => {
    console.log(blog)
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
//try { 
  await api.post('/api/blogs').send(newBlog)
  .expect(201)
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initBlogs.length + 1)
  console.log(response)
/*} catch (ex) {
  console.log(ex.message)
}*/
})

<<<<<<< Updated upstream
=======
test('likes set to zero if not set in the request', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    url: 'localhost:something/new'
  }
//try {
  const savedBlog = await api.post('/api/blogs').send(newBlog)
  if (savedBlog) {
    expect(savedBlog.likes).toBe(0)
//    console.log(savedBlog)
  }
/*} catch (ex) {
  console.log(ex.message)
}*/
})

>>>>>>> Stashed changes
afterAll(() => {
  mongoose.connection.close()
})