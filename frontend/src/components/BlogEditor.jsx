import React from 'react';

const BlogEditor = ({ blog, setBlog, onSaveDraft, onPublish }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{blog._id ? 'Edit Blog' : 'New Blog'}</h2>

      <input
        type="text"
        name="title"
        value={blog.title}
        onChange={handleInputChange}
        placeholder="Blog Title"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 mb-5 rounded-lg text-lg transition"
      />

      <textarea
        name="content"
        value={blog.content}
        onChange={handleInputChange}
        placeholder="Write your content..."
        rows="10"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 mb-5 rounded-lg text-base transition"
      />

      <input
        type="text"
        name="tags"
        value={blog.tags}
        onChange={handleInputChange}
        placeholder="Tags (comma separated)"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 mb-6 rounded-lg text-base transition"
      />

      <div className="flex gap-4">
        <button
          onClick={() => onSaveDraft(false)}
          className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-lg text-white font-semibold shadow transition"
        >
          Save Draft
        </button>
        <button
          onClick={onPublish}
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 px-6 py-2 rounded-lg text-white font-semibold shadow transition"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;