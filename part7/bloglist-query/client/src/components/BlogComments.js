import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getBlog } from '../requests';

const BlogComments = () => {
  const { id } = useParams();

  const { data: blog, isLoading, isError } = useQuery(['blog', id], () =>
    getBlog(id)
  );

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  const comments = blog.comments;

  return (
    <>
      <h3>comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.content}</li>
        ))}
      </ul>
      {!comments.length && <p>no comments to display</p>}
    </>
  );
};

export default BlogComments;