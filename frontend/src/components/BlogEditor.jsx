import React from 'react';

const BlogEditor = ({ blog, setBlog, onSaveDraft, onPublish }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };

  const isDisabled = !blog.title.trim() || !blog.content.trim();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{blog._id ? 'Edit Blog' : 'New Blog'}</h2>

      <input
        type="text"
        name="title"
        value={blog.title}
        onChange={handleInputChange}
        placeholder="Blog Title"
        className="w-full border p-2 mb-4 rounded"
      />

      <textarea
        name="content"
        value={blog.content}
        onChange={handleInputChange}
        placeholder="Write your content..."
        rows="10"
        className="w-full border p-2 mb-4 rounded"
      />

      <input
        type="text"
        name="tags"
        value={blog.tags}
        onChange={handleInputChange}
        placeholder="Tags (comma separated)"
        className="w-full border p-2 mb-4 rounded"
      />

      <div className="flex gap-4">
        <button
          onClick={() => !isDisabled && onSaveDraft(false)}
          className={`bg-yellow-400 px-4 py-2 rounded text-white font-semibold ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isDisabled}
        >
          Save Draft
        </button>
        <button
          onClick={() => !isDisabled && onPublish()}
          className={`bg-green-600 px-4 py-2 rounded text-white font-semibold ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isDisabled}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;