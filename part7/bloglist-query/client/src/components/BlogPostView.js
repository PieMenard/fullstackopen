import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getBlogs} from '../requests';

const BlogPostView = () => {
  const { id } = useParams();
  const result = useQuery('users', getBlogs, {retry:false})
  const blogs = result.data
  const blogPostQuery = blogs.find(n => n.id === String(id))

  if (blogPostQuery.isLoading) {
    return <div>Loading blog post...</div>;
  }

  if (blogPostQuery.isError) {
    return <div>Error fetching blog post.</div>;
  }

  const blogPost = blogPostQuery.data;

  return (
    <div>
      <h2>{blogPost.title}</h2>
      <p>{blogPost.content}</p>
      {/* Other details of the blog post */}
    </div>
  );
};

export default BlogPostView;