import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { LinkItem } from "../../types";
import { getLinks, saveLinks } from "../../Utils/LocalStorage";
import './Link.css';
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../Toast/Toast";

export const LinkPage: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, removeToast, success, error } = useToast();

  const [links, setLinks] = useState<LinkItem[]>([]);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  // Load all links from localStorage
  useEffect(() => {
    setLinks(getLinks());
  }, []);

  // Load editing link from localStorage if it exists
  useEffect(() => {
    const linkToEdit = localStorage.getItem("editingLink");
    if (linkToEdit) {
      const linkObj: LinkItem = JSON.parse(linkToEdit);
      setEditingLink(linkObj);
      setTitle(linkObj.title);
      setUrl(linkObj.url);
      setDescription(linkObj.description);
      setTags(linkObj.tags?.join(", ") || "");
      localStorage.removeItem("editingLink");
    }
  }, []);

  const validateForm = () => {
    const newErrors: { title?: string; url?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!url.trim()) {
      newErrors.url = "URL is required";
    } else {
      // More flexible URL validation - accepts http://, https://, or auto-adds https://
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
      if (!urlPattern.test(url.trim()) && !url.trim().startsWith('http://') && !url.trim().startsWith('https://')) {
        newErrors.url = "Please enter a valid URL";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Auto-add https:// if URL doesn't start with http:// or https://
      let finalUrl = url.trim();
      if (finalUrl && !finalUrl.match(/^https?:\/\//i)) {
        finalUrl = 'https://' + finalUrl;
      }

      const newLink: LinkItem = {
        id: editingLink?.id || Date.now().toString(),
        title: title.trim(),
        url: finalUrl,
        description: description.trim(),
        tags: tags.split(",").map(t => t.trim()).filter(t => t)
      };

      const updatedLinks = editingLink
        ? links.map(l => (l.id === editingLink.id ? newLink : l))
        : [...links, newLink];

      setLinks(updatedLinks);
      saveLinks(updatedLinks);

      success(editingLink ? "Link updated successfully!" : "Link added successfully!");
      setEditingLink(null);
      setTitle(""); 
      setUrl(""); 
      setDescription(""); 
      setTags("");
      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <section id="linkSection">
        <div className="link-container">
          <h1>{editingLink ? "Edit Link" : "Save a New Link"}</h1>
          <p className="link-subtitle">
            {editingLink ? "Update your link information" : "Add a new link to your collection"}
          </p>
          
          <form className="link-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input 
                type="text" 
                id="title" 
                className={`link-input ${errors.title ? "input-error" : ""}`}
                placeholder="Enter link title" 
                value={title} 
                onChange={e => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({ ...errors, title: undefined });
                }}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="url">Link URL *</label>
              <input 
                type="url" 
                id="url" 
                className={`link-input ${errors.url ? "input-error" : ""}`}
                placeholder="https://example.com" 
                value={url} 
                onChange={e => {
                  setUrl(e.target.value);
                  if (errors.url) setErrors({ ...errors, url: undefined });
                }}
              />
              {errors.url && <span className="error-message">{errors.url}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description" 
                className="link-input" 
                placeholder="Enter description (optional)" 
                rows={2}
                value={description} 
                onChange={e => setDescription(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input 
                type="text" 
                id="tags" 
                className="link-input" 
                placeholder="Add tags separated by commas (optional)" 
                value={tags} 
                onChange={e => setTags(e.target.value)} 
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  {editingLink ? "Updating..." : "Saving..."}
                </>
              ) : (
                editingLink ? "Update Link" : "Save Link"
              )}
            </button>
          </form>

          <button className="view-btn" onClick={() => navigate("/linkoutcome")}>
            View All Links
          </button>
        </div>
      </section>
    </>
  );
};
