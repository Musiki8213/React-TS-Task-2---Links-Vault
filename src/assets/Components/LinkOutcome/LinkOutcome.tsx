// src/assets/Components/LinkOutcome/LinkOutcome.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLinks, saveLinks } from "../../Utils/LocalStorage";
import type { LinkItem } from "../../types";
import './LinkOutcome.css';

const LinkOutcome: React.FC = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLinks(getLinks());
  }, []);

  // Delete a link
  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    const updatedLinks = links.filter(l => l.id !== id);
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
    alert("Link deleted!");
  };

  // Edit a link
  const handleEdit = (link: LinkItem) => {
    // Save link temporarily to localStorage for editing
    localStorage.setItem("editingLink", JSON.stringify(link));
    navigate("/linkpage");
  };

  // Filter links based on search term
  const filteredLinks = links.filter(link =>
    [link.title, link.url, link.description, ...(link.tags || [])]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section id="linkOutcomeSection">
      <div className="outcome-container">
        <h1>All Saved Links</h1>

        <input
          type="text"
          placeholder="Search links..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {filteredLinks.length === 0 ? (
          <p>No links found.</p>
        ) : (
          <div className="link-list">
            {filteredLinks.map(link => (
              <div className="link-card" key={link.id}>
                <h3>{link.title}</h3>
                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                <p>{link.description}</p>
                {link.tags && <small>Tags: {link.tags.join(", ")}</small>}
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(link)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(link.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LinkOutcome;
