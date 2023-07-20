import React from "react";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { getBlogs} from '../requests';
import { useQuery} from 'react-query';
import { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogList = () => {

    const result = useQuery('blogs', getBlogs, {retry:false})

    if ( result.isLoading ) {
        return <div>loading data...</div>
    }

    if ( result.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }

    const blogs = result.data

    return (
        <div>
        <Togglable buttonLabel='new blog'>
            <BlogForm/>
        </Togglable>
        {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog, index, { length }) => (
          <Fragment key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            {index !== length - 1 && <hr />}
          </Fragment>
        ))}
        </div>
    );
};

export default BlogList;
