import React from "react";
import type { LinkItem } from "../../types";
import './LinkList.css';

interface LinkListProps {
  links: LinkItem[];
  onEdit: (link: LinkItem) => void;
  onDelete: (id: string) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, onEdit, onDelete }) => {
  if (links.length === 0) return <p style={{ textAlign: "center", color: "#fff" }}>No links saved yet.</p>;

  return (
    <div className="link-list">
      {links.map(link => (
        <div className="link-card" key={link.id}>
          <h3>{link.title}</h3>
          <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
          {link.description && <p>{link.description}</p>}
          {link.tags && <small>Tags: {link.tags.join(", ")}</small>}
          <div className="card-actions">
            <button onClick={() => onEdit(link)}>Edit</button>
            <button onClick={() => onDelete(link.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinkList;
