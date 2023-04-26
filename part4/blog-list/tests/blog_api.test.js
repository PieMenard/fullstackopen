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

describe('when there is initially some notes saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})
describe('viewing a specific blog', () => {

  test("unique identifier property of the blog post is named id", async () => {
    const response = await api.get("/api/blogs");

    const ids = response.body.map((blog) => blog.id);

    for (const id of ids) {
      expect(id).toBeDefined();
    }
  });
})
describe('when creating a new blog', () => {

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

  test("if the likes property is missing it will default to the value 0", async () => {
    const newBlog = {
      title: "El llano en llamas",
      author: "Juan Rulfo",
      url: "fantasmas.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test("backend responds with status 400 if title and url are missing", async () => {
    const newBlog = {
      likes: 1,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update info on a blog', () => {
  test('the number of likes can be updated and returns status 200', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 111 })
      .expect(200);
  

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0];

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(updatedBlog.likes).toBe(111);
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})