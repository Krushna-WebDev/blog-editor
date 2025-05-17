import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL;

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("published");

  useEffect(() => {
    axios
      .get(`${API_BASE}/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        toast.error("Failed to fetch blogs!");
      });
  }, []);

  const handleDelete = (id) => {
    setBlogs((blogs) => blogs.filter((blog) => blog._id !== id));
  };

  const drafts = blogs.filter((blog) => blog.status === "draft");
  const published = blogs.filter((blog) => blog.status === "published");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">My Blogs</h1>
          <Link
            to="/edit"
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
          >
            + New Blog
          </Link>
        </div>

        {/* Navbar Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold transition ${
              activeTab === "published"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("published")}
          >
            Published ({published.length})
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold transition ${
              activeTab === "draft"
                ? "bg-yellow-500 text-white"
                : "bg-yellow-100 text-yellow-700"
            }`}
            onClick={() => setActiveTab("draft")}
          >
            Drafts ({drafts.length})
          </button>
        </div>

        {/* Show only the active tab */}
        {activeTab === "published" && (
          <BlogList blogs={published} title="Published" onDelete={handleDelete} />
        )}
        {activeTab === "draft" && (
          <BlogList blogs={drafts} title="Drafts" onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Home;