import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogList from "../components/BlogList";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Home = () => {
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]); // <-- new state
  const [activeTab, setActiveTab] = useState("published");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch published blogs (all users)
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE}/blogs`)
      .then((res) => setPublishedBlogs(res.data))
      .catch((err) => {
        console.error("Error fetching published blogs:", err);
        toast.error("Failed to fetch published blogs!");
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch user's drafts
  useEffect(() => {
    if (!token) {
      setDrafts([]);
      setMyBlogs([]);
      return;
    }
    axios
      .get(`${API_BASE}/blogs/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDrafts(res.data.filter((blog) => blog.status === "draft"));
        setMyBlogs(res.data); // <-- all user blogs (published + drafts)
      })
      .catch((err) => {
        console.error("Error fetching drafts/myblogs:", err);
      });
  }, [token]);

  const handleDelete = (id) => {
    setPublishedBlogs((blogs) => blogs.filter((blog) => blog._id !== id));
    setDrafts((blogs) => blogs.filter((blog) => blog._id !== id));
    setMyBlogs((blogs) => blogs.filter((blog) => blog._id !== id)); // <-- update myBlogs too
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Please login to view blogs.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-8">
          Blogs
        </h1>
        <div className="flex gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold transition ${
              activeTab === "published"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("published")}
          >
            Published ({publishedBlogs.length})
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
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold transition ${
              activeTab === "myblogs"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700"
            }`}
            onClick={() => setActiveTab("myblogs")}
          >
            My Blogs ({myBlogs.length})
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : activeTab === "published" ? (
          <BlogList blogs={publishedBlogs} title="Published" onDelete={handleDelete} />
        ) : activeTab === "draft" ? (
          <BlogList blogs={drafts} title="Drafts" onDelete={handleDelete} />
        ) : (
          <BlogList blogs={myBlogs} title="My Blogs" onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Home;