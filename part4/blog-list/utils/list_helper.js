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

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const blogsLikes = lodash.groupBy(blogs,"likes");
  console.log(`blogsLikes: ${blogsLikes}`);
  const topAuthor = Object.keys(blogsLikes).reduce((a, b) => {
    console.log(`topAuthor: ${blogsLikes}`);
    console.log(`a: ${a}`);
    console.log(`blogsLikes[a]: ${blogsLikes[a]}`);
    console.log(`a: ${a}`);
    console.log(`blogsLikes[b]: ${blogsLikes[b]}`);
    return blogsLikes[a] > blogsLikes[b] ? a : b;
  });
  return {
    author: topAuthor,
    likes: authorsNumBlogs[topAuthor]
  }
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}