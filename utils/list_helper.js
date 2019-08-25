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

module.exports = {
  dummy,
  totalLikes,
}