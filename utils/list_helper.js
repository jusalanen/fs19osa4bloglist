const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const blogsArr = [].concat(blogs)
  let totalLikes = 0
  blogsArr.forEach(blog => {
    totalLikes += blog.likes
  })
  return totalLikes
}

const favoriteBlog = (blogs) => {
  blogsArr = [].concat(blogs)
  let fav = null
  let maxLikes = 0
  blogsArr.forEach(blog => {
    if(blog.likes >= maxLikes) {
      fav = blog
      maxLikes = blog.likes
    }
  })
  return(
    {
      title : fav.title,
      author: fav.author,
      likes: fav.likes
    }
  )
}

const mostBlogs = (blogs) => {
  const blogsArr = [].concat(blogs)
  const authArr = []
  blogsArr.forEach(blog => {
    if (!authArr.includes(blog.author)) {
      authArr.push({ author: blog.author, blogs: 0 })
    }
  })
  const maxBlogs = { author: '', blogs: 0 }
  authArr.forEach(auth => {
    blogsArr.forEach(blog => {
      if(blog.author === auth.author) {
        auth.blogs += 1
      }
    })
    if(auth.blogs >= maxBlogs.blogs) {
      maxBlogs.blogs = auth.blogs
      maxBlogs.author = auth.author
    }
  })
  console.log(maxBlogs)
  return maxBlogs
}

const mostLikes = (blogs) => {
  const blogsArr = [].concat(blogs)
  const authArr = []
  blogsArr.forEach(blog => {
    if (!authArr.includes(blog.author)) {
      authArr.push({ author: blog.author, likes: 0 })
    }
  })
  const maxLikes = { author: '', likes: 0 }
  authArr.forEach(auth => {
    blogsArr.forEach(blog => {
      if(blog.author === auth.author) {
        auth.likes += blog.likes
      }
    })
    if(auth.likes >= maxLikes.likes) {
      maxLikes.likes = auth.likes
      maxLikes.author = auth.author
    }
  })
  console.log(maxLikes)
  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}