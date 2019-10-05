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

const initUser = [
  {
    username: 'tester',
    name: 'Test User',
    password: 'testpswd',
    blogs: []
  },
  {
    username: 'wrong',
    name: 'Wrong User',
    password: 'wrongpswd',
    blogs: []
  }
]

module.exports = { initBlogs, initUser }