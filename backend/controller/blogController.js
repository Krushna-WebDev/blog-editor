const Blog = require('../models/Blog');

// Save Draft or Update
// Save Draft or Update
exports.saveDraft = async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    let blog;
    if (id) {
      // Find blog and check ownership
      blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      if (String(blog.user) !== String(req.user.id)) {
        return res.status(403).json({ message: "Not allowed" });
      }
      // Only update allowed fields, never user
      blog.title = title;
      blog.content = content;
      blog.tags = tags;
      blog.status = 'draft';
      blog.updated_at = new Date();
      await blog.save();
    } else {
      blog = await Blog.create({
        title,
        content,
        tags,
        status: 'draft',
        user: req.user.id,
      });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to save draft" });
  }
};

// Publish
exports.publishBlog = async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    let blog;
    if (id) {
      // Find blog and check ownership
      blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      if (String(blog.user) !== String(req.user.id)) {
        return res.status(403).json({ message: "Not allowed" });
      }
      // Only update allowed fields, never user
      blog.title = title;
      blog.content = content;
      blog.tags = tags;
      blog.status = 'published';
      blog.updated_at = new Date();
      await blog.save();
    } else {
      blog = await Blog.create({
        title,
        content,
        tags,
        status: 'published',
        user: req.user.id,
      });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to publish blog" });
  }
};

// Get All Published Blogs (Public)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .populate('user', 'name')
      .sort({ updated_at: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to get blogs" });
  }
};

// Get Blogs of Logged-in User (Protected)
exports.getUserBlogs = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const blogs = await Blog.find({ user: req.user.id })
      .populate('user', 'name')
      .sort({ updated_at: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user's blogs" });
  }
};

// Get Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', 'name');
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to get blog" });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (String(blog.user) !== String(req.user.id)) {
      return res.status(403).json({ message: "Not allowed" });
    }
    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
};