import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Test title",
  author: "Test author",
  url: "http://test.com",
  likes: 100,
};

test("renders title and author but not likes and url by default", () => {
  screen.debug();

  const { container } = render(<Blog blog={blog} />);

  const blogSimple = container.querySelector(".blogSimple");
  expect(blogSimple).toHaveTextContent("Test title by Test author");
  const blogExpand = container.querySelector(".blogExpand");
  expect(blogExpand).toEqual(null);
  const likesElement = screen.queryByText("likes");
  expect(likesElement).not.toBeInTheDocument();
});

test("displays URL and likes when the button is clicked", async () => {
  //const mockHandler = jest.fn()

  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://example.com",
    likes: 111,
    user: {
      username: "test_username",
      name: "Test User",
    },
  };
  screen.debug();

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".blogExpand");
  expect(div).toHaveTextContent("https://example.com");
  expect(div).toHaveTextContent("111");
});

test("calls the event handler twice when the like button is clicked twice", async () => {
  const loggedUser = {
    username: "test_user",
    name: "Test User",
  };
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://example.com",
    likes: 10,
    user: loggedUser,
  };

  const updateBlogMock = jest.fn();
  const deleteBlogMock = jest.fn();

  render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      updateBlog={updateBlogMock}
      deleteBlog={deleteBlogMock}
    />
  );
  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(updateBlogMock).toHaveBeenCalledTimes(2);
});
