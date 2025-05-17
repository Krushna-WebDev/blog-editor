import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import BlogEditor from '../components/BlogEditor';

const API_BASE = import.meta.env.VITE_API_URL;

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    _id: '',
    title: '',
    content: '',
    tags: ''
  });

  const timeoutRef = useRef(null);
  const isSavingRef = useRef(false);

  useEffect(() => {
    if (id) {
      axios.get(`${API_BASE}/blogs/${id}`)
        .then(res => {
          const data = res.data;
          setBlog({
            _id: data._id,
            title: data.title,
            content: data.content,
            tags: data.tags.join(', ')
          });
        })
        .catch(err => {
          console.error("Error loading blog:", err);
          toast.error("Failed to load blog!");
        });
    }
  }, [id]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      handleSaveDraft(true);
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [blog]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSaveDraft(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [blog]);

  const handleSaveDraft = async (isAuto = false) => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;

    const payload = {
      ...blog,
      tags: blog.tags.split(',').map(tag => tag.trim()),
    };

    if (id) payload.id = id;

    try {
      const res = await axios.post(`${API_BASE}/blogs/save-draft`, payload);
      if (!id && res.data.id) navigate(`/edit/${res.data.id}`);
      if (isAuto) toast.info("Auto-saved draft ", { autoClose: 2000 });
      else toast.success("Draft saved ");
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save draft ");
    } finally {
      isSavingRef.current = false;
    }
  };

  const handlePublish = async () => {
    const payload = {
      ...blog,
      tags: blog.tags.split(',').map(tag => tag.trim()),
    };
    if (id) payload.id = id;

    try {
      await axios.post(`${API_BASE}/blogs/publish`, payload);
      toast.success("Published successfully ");
      navigate('/');
    } catch (err) {
      console.error("Publish error:", err);
      toast.error("Failed to publish ");
    }
  };

  return (
    <BlogEditor
      blog={blog}
      setBlog={setBlog}
      onSaveDraft={handleSaveDraft}
      onPublish={handlePublish}
    />
  );
};

export default EditBlog;