const dummy = (blogs) => {
    return 1;
}
  
const totalLikes = (blogs) => {
    return blogs.length === 0? 0
    : blogs.reduce((total, item) => total + item.likes, 0);
}

//most likes
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  mostLikedBlog = blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog);
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog
}