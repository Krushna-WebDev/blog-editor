import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE = import.meta.env.VITE_API_URL;

const BlogList = ({ blogs = [], title, onDelete }) => {
  if (!blogs || blogs.length === 0) return <p className="text-gray-400 italic mb-8">No {title?.toLowerCase() || 'blogs'} yet.</p>;

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) return;
    try {
      await axios.delete(`${API_BASE}/blogs/${id}`);
      toast.success('Draft deleted');
      if (onDelete) onDelete(id);
    } catch (err) {
      toast.error('Failed to delete draft');
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="grid gap-5">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white border border-gray-100 rounded-xl shadow hover:shadow-md transition p-5 flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
            <p className="text-gray-500 text-sm">Tags: <span className="font-medium text-gray-700">{blog.tags?.join(', ')}</span></p>
            <p className="text-gray-400 text-xs mt-1">
              Last updated: {blog.updated_at ? new Date(blog.updated_at).toLocaleString() : 'N/A'}
            </p>
            <div className="flex gap-3 mt-2">
              <Link
                to={`/edit/${blog._id}`}
                className="px-4 py-1 rounded bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
              >
                Edit
              </Link>
              {title === 'Drafts' && (
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-4 py-1 rounded bg-red-100 text-red-600 font-medium hover:bg-red-200 transition"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogList;