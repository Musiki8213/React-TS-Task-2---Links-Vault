import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { LinkItem } from "../../types";
import { getLinks, saveLinks } from "../../Utils/LocalStorage";
import './Link.css';

export const LinkPage: React.FC = () => {
  const navigate = useNavigate();

  const [links, setLinks] = useState<LinkItem[]>([]);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) {
      alert("Title and URL are required!");
      return;
    }

    const newLink: LinkItem = {
      id: editingLink?.id || Date.now().toString(),
      title,
      url,
      description,
      tags: tags.split(",").map(t => t.trim()).filter(t => t)
    };

    const updatedLinks = editingLink
      ? links.map(l => (l.id === editingLink.id ? newLink : l))
      : [...links, newLink];

    setLinks(updatedLinks);
    saveLinks(updatedLinks);

    alert(editingLink ? "Link updated!" : "Link added!");
    setEditingLink(null);
    setTitle(""); setUrl(""); setDescription(""); setTags("");
  };

  return (
    <section id="linkSection">
      <div className="link-container">
        <h1>{editingLink ? "Edit Link" : "Save a New Link"}</h1>
        <form className="link-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" className="link-input" placeholder="Enter link title" value={title} onChange={e => setTitle(e.target.value)} />

          <label htmlFor="url">Link</label>
          <input type="url" id="url" className="link-input" placeholder="Enter link URL" value={url} onChange={e => setUrl(e.target.value)} />

          <label htmlFor="description">Description</label>
          <textarea id="description" className="link-input" placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} />

          <label htmlFor="tags">Tags</label>
          <input type="text" id="tags" className="link-input" placeholder="Add tags separated by commas" value={tags} onChange={e => setTags(e.target.value)} />

          <button type="submit" className="submit-btn">{editingLink ? "Update" : "Submit"}</button>
        </form>


        <button className="view-btn" onClick={() => navigate("/linkoutcome")}>
          View All Links
        </button>
      </div>
    </section>
  );
};
