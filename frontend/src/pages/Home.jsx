import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';
import { toast } from 'react-toastify'; // Add this import

const API_BASE = import.meta.env.VITE_API_URL;

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/blogs`)
      .then(res => setBlogs(res.data))
      .catch(err => {
        console.error("Error fetching blogs:", err);
        toast.error("Failed to fetch blogs!");
      });
  }, []);

  const drafts = blogs.filter(blog => blog.status === 'draft');
  const published = blogs.filter(blog => blog.status === 'published');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Blogs</h1>
        <Link to="/edit" className="bg-blue-600 text-white px-4 py-2 rounded">
          + New Blog
        </Link>
      </div>

      <BlogList blogs={published} title="Published" />
      <BlogList blogs={drafts} title="Drafts" />
    </div>
  );
};

export default Home;