import { useState } from "react";
import { useDispatch } from "react-redux";

import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    dispatch(likeBlog(blog.id, newObject));
    dispatch(setNotification(`liked blog ${blog.title} by ${blog.author}`));
  };

  const handleRemove = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      dispatch(setNotification(`removed blog ${blog.title} by ${blog.author}`));
    }
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div className="blogSimple">
        <div>
          {blog.title} by {blog.author}
          <button id="view-button" onClick={toggleVisibility}>
            {visible ? "hide" : "view"}
          </button>
        </div>
        <div>
          {/*loggedUser && loggedUser.username === blog.user.username && (*/
            <button id="delete-button" onClick={() => handleRemove(blog)}>
              delete
            </button>
          }
        </div>
      </div>
      {visible && (
        <div>
          <div className="blogExpand">
            <p>{blog.url}</p>
            <p>
              likes {blog.likes}{" "}
              <button id="like-button" onClick={()=> handleLike(blog)}>
                like
              </button>
            </p>
            <p>added by user: {blog.user.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
