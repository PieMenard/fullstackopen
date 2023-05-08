const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app)
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('123456', 10)
  const user = new User({
    username: 'admin',
    name: 'admin',
    passwordHash,
  })
  const savedUser = await user.save()
  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  }
  token = jwt.sign(userForToken, process.env.SECRET)

  for (let blog of helper.initialBlogs) {
    blog.user = savedUser._id
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
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
      author: "Herman Melville",
      url: "mobydick.com",
      likes: 55
    }

    const user = new User({
      username: "testuser",
      name: "Test User",
      passwordHash: "testpassword"
    });

    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.SECRET); 

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`) // Set the token in the request headers
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  
    const titles = blogsAtEnd.map(blog => blog.title);
  
    expect(titles).toContain('The whiteness of the whale');
  });

  test("if the likes property is missing it will default to the value 0", async () => {
    const newBlog = {
      title: "El llano en llamas",
      author: "Juan Rulfo",
      url: "fantasmas.com",
    };

    const user = new User({
      username: "testuser",
      name: "Test User",
      passwordHash: "testpassword"
    });

    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.SECRET); 
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`) 
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test("backend responds with status 400 if title and url are missing", async () => {
    const newBlog = {
      likes: 1,
    };
  
    const user = new User({
      username: "testuser",
      name: "Test User",
      passwordHash: "testpassword"
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.SECRET); 
  
    const initialBlogs = await helper.blogsInDb();
  
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`);
  
    expect(response.status).toBe(400);
  
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test('should return 401 Unauthorized if token is not provided', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 5,
    };
  
    const response = await supertest(app)
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'Bearer invalid-token') // Set an invalid token
      .expect(401);
  
    expect(response.body.error).toBe('invalid token');
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