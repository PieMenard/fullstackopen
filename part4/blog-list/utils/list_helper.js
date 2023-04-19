const lodash = require("lodash");

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authorsNumBlogs = lodash.countBy(blogs,"author");
  const topAuthor = Object.keys(authorsNumBlogs).reduce((a, b) => {
    return authorsNumBlogs[a] > authorsNumBlogs[b] ? a : b;
  });
  return {
    author: topAuthor,
    blogs: authorsNumBlogs[topAuthor]
  }
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs
}