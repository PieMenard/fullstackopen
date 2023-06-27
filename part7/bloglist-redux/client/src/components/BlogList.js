import { useSelector } from 'react-redux'
import Blog from "./Blog";

const BlogList = () => {
    const sortedblogs = useSelector(state => {
        return state.blogs.slice().sort((a,b) => b.likes - a.likes)
    })
  return (
    <div>
      {sortedblogs.map((blog) => (
          <Blog
            key={blog.id}

            blog={blog}
      
          />
        ))}
    </div>
  );
};

export default BlogList;