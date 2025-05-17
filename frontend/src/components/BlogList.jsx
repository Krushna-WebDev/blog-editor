import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL;

const BlogList = ({ blogs = [], title, onDelete }) => {
  if (!blogs || blogs.length === 0)
    return (
      <div className="flex flex-col items-center text-gray-400 italic mb-8">
        <svg
          className="w-12 h-12 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        <span>No {title?.toLowerCase() || "blogs"} yet.</span>
      </div>
    );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API_BASE}/blogs/${id}`);
      toast.success("Blog deleted");
      if (onDelete) onDelete(id);
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  // Sort blogs by updated date (latest first)
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="grid gap-5">
        {sortedBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border border-gray-100 rounded-xl shadow hover:shadow-xl transition-transform hover:-translate-y-1 p-5 flex flex-col gap-2"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {blog.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-1">
              {blog.content.replace(/<[^>]+>/g, "").slice(0, 120)}
              {blog.content.length > 120 ? "..." : ""}
            </p>
            {blog.tags?.length > 0 && (
              <p className="text-gray-500 text-sm flex flex-wrap gap-2">
                Tags:
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-blue-200 text-blue-800 px-3 py-0.5 rounded-full text-xs font-semibold shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            )}
            <p className="text-gray-400 text-xs mt-1">
              Last updated:{" "}
              {blog.updated_at
                ? new Date(blog.updated_at).toLocaleString()
                : "N/A"}
            </p>
            <div className="flex gap-3 mt-2">
              <Link
                to={`/edit/${blog._id}`}
                className="px-4 py-1 rounded bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="px-4 py-1 rounded bg-red-100 text-red-600 font-medium hover:bg-red-200 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {sortedBlogs.length > 10 && (
        <div className="text-center text-sm text-gray-500 mt-4">
          Showing latest 10 blogs
        </div>
      )}
    </section>
  );
};

export default BlogList;
