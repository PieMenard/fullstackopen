import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { initializeBlogs } from "../reducers/blogReducer";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      <div>
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
    </div>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            // handleLikeChange={handleLikeChange}
            // handleRemove={handleRemove}
          />
        ))}
      </div>
    </>
  );
};

export default BlogList;