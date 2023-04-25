const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  const ids = response.body.map((blog) => blog.id);

  for (const id of ids) {
    expect(id).toBeDefined();
  }
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "The whiteness of the whale",
    author: "herman Melville",
    url: "mobydick.com",
    likes: 55
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const title = blogsAtEnd.map(blog => blog.title)

  expect(title).toContain(
    'The whiteness of the whale'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})