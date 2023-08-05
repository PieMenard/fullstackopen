import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getBlog } from '../requests';
import ListGroup from 'react-bootstrap/ListGroup'

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
      <h5>comments:</h5>
      <ListGroup variant="flush">
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment.content}</ListGroup.Item>
        ))}
      </ListGroup>
      {!comments.length && <p>no comments to display</p>}
    </>
  );
};

export default BlogComments;