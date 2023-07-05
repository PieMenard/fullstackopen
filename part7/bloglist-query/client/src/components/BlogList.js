import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, user, updateBlog, deleteBlog }) => {
    return (
        <div>
            {blogs
                .sort((a, b) => b.likes - a.likes) // Sort the blogs array by likes in descending order
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        loggedUser={user}
                        blog={blog}
                        updateBlog={updateBlog}
                        deleteBlog={deleteBlog}
                    />
                ))}
        </div>
    );
};

export default BlogList;
