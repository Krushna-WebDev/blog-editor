const Blog = require('../models/Blog');

// Save Draft or Update
exports.saveDraft = async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    let blog;
    if (id) {
      blog = await Blog.findByIdAndUpdate(id, { title, content, tags, status: 'draft', updated_at: new Date() }, { new: true });
    } else {
      blog = await Blog.create({ title, content, tags, status: 'draft' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to save draft", error: err });
  }
};

// Publish
exports.publishBlog = async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    let blog;
    if (id) {
      blog = await Blog.findByIdAndUpdate(id, { title, content, tags, status: 'published', updated_at: new Date() }, { new: true });
    } else {
      blog = await Blog.create({ title, content, tags, status: 'published' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to publish blog", error: err });
  }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updated_at: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to get blogs", error: err });
  }
};

// Get Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to get blog", error: err });
  }
};
