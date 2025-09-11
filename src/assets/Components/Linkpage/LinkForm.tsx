import "./Link.css";
import React, { useState, useEffect } from "react";
import type { LinkItem } from "../../types";

interface LinkFormProps {
  initialData?: LinkItem | null;
  onSubmit: (link: LinkItem) => void;
  onCancel: () => void;
  onViewAll: () => void;
}

const LinkForm: React.FC<LinkFormProps> = ({
  initialData = null,
  onSubmit,
  onCancel,
  onViewAll,
}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setUrl(initialData.url);
      setDescription(initialData.description);
      setTags((initialData.tags || []).join(", "));
    } else {
      setTitle("");
      setUrl("");
      setDescription("");
      setTags("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!title || !url) {
    alert("Title and URL are required."); // ✅ alert for validation
    return;
  }

  const link: LinkItem = {
    id: initialData?.id || Date.now().toString(),
    title,
    url,
    description,
    tags: tags.split(",").map(t => t.trim()).filter(t => t),
  };

  onSubmit(link);

  alert(initialData ? "Link updated successfully!" : "Link added successfully!"); // ✅ alert on success

  if (!initialData) {
    setTitle("");
    setUrl("");
    setDescription("");
    setTags("");
  }
};

  return (
    <div className="link-form-container">
      <h2>{initialData ? "Edit Link" : "Add New Link"}</h2>
      <form onSubmit={handleSubmit} className="link-form">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter link title"
          required
        />

        <label>URL</label>
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter link URL"
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter description"
        />

        <label>Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="e.g. work, research"
        />

        <div className="form-buttons">
          <button type="submit">{initialData ? "Update Link" : "Add Link"}</button>
          {initialData && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="button" onClick={onViewAll}>
            View All Links
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkForm;
