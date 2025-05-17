import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs = [], title }) => {
  if (!blogs || blogs.length === 0) return <p>No {title?.toLowerCase() || 'blogs'} yet.</p>;

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      {blogs.map(blog => (
        <div key={blog._id} className="border p-4 rounded mb-3">
          <h3 className="text-xl font-semibold">{blog.title}</h3>
          <p className="text-gray-600 text-sm">Tags: {blog.tags?.join(', ')}</p>
          <p className="text-gray-500 text-sm mt-1">
            Last updated: {blog.updated_at ? new Date(blog.updated_at).toLocaleString() : 'N/A'}
          </p>
          <Link
            to={`/edit/${blog._id}`}
            className="inline-block mt-2 text-blue-600 font-medium hover:underline"
          >
            Edit
          </Link>
        </div>
      ))}
    </section>
  );
};

export default BlogList;