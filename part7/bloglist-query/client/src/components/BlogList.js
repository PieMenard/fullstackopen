import React from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { getBlogs} from '../requests';
import { useQuery} from 'react-query';
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

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
        <Table striped bordered hover>
            <tbody>
                {blogs
                .slice()
                .sort((a, b) => b.likes - a.likes)
                .map((blog, index, { length }) => (
                <tr key={blog.id}>
                <Fragment >
                <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
                    {index !== length - 1 }
                </Fragment>
                </tr>
                ))}
            </tbody>
        </Table>
        </div>
    );
};



export default BlogList;
