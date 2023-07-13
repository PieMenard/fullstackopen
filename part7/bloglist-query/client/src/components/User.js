import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUsers } from '../requests';

const User = () => {
  const { id } = useParams();
  const result = useQuery('users', getUsers, {retry:false})
  const users = result.data
  const user = users.find(n => n.id === String(id))

  return (
    <div>
      <h3>User: {user.name}</h3>
      <h3>Blogs created:</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id} >{blog.title}</li>
        )}
      </ul>
    </div>
  );
};

export default User;