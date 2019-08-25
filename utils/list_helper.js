const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  blogsArr = [].concat(blogs)
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}