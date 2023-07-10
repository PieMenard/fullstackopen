import React from "react";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { getBlogs} from '../requests';
import { useQuery} from 'react-query';

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
                .sort((a, b) => b.likes - a.likes) // Sort the blogs array by likes in descending order
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                    />
                ))}
        </div>
    );
};

export default BlogList;
