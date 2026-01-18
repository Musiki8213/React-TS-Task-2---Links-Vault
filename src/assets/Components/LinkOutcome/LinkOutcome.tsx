// src/assets/Components/LinkOutcome/LinkOutcome.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLinks, saveLinks } from "../../Utils/LocalStorage";
import type { LinkItem } from "../../types";
import './LinkOutcome.css';
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../Toast/Toast";

const LinkOutcome: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, removeToast, success } = useToast();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLinks(getLinks());
  }, []);

  // Delete a link
  const handleDelete = (link: LinkItem) => {
    const updatedLinks = links.filter(l => l.id !== link.id);
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
    success(`"${link.title}" deleted successfully!`);
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
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <section id="linkOutcomeSection">
        <div className="outcome-container">
          <div className="header-section">
            <h1>All Saved Links</h1>
            <p className="links-count">
              {filteredLinks.length} {filteredLinks.length === 1 ? 'link' : 'links'} found
            </p>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search by title, URL, description, or tags..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {filteredLinks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔗</div>
              <p className="empty-message">
                {searchTerm ? "No links match your search." : "No links saved yet."}
              </p>
              {!searchTerm && (
                <button className="add-link-btn" onClick={() => navigate("/linkpage")}>
                  Add Your First Link
                </button>
              )}
            </div>
          ) : (
            <div className="link-list">
              {filteredLinks.map(link => (
                <div className="link-card" key={link.id}>
                  <div className="card-header">
                    <h3>{link.title}</h3>
                  </div>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link-url"
                  >
                    {link.url}
                  </a>
                  {link.description && (
                    <p className="link-description">{link.description}</p>
                  )}
                  {link.tags && link.tags.length > 0 && (
                    <div className="tags-container">
                      {link.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="card-actions">
                    <button 
                      className="edit-btn" 
                      onClick={() => handleEdit(link)}
                      aria-label={`Edit ${link.title}`}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(link)}
                      aria-label={`Delete ${link.title}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LinkOutcome;
