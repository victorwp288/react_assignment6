import React from "react";
import "../styles/KnownFor.css";

function KnownFor({ knownFor }) {
  return (
    <div className="known-for">
      <h3>Known For:</h3>
      <ul>
        {knownFor.map((item) => (
          <li key={item.id} className="known-for-item">
            <h4>{item.title || item.name}</h4>
            <p>
              <strong>Release Date:</strong> {item.release_date ? 
                item.release_date.split('-').reverse().join('-') : 
                "N/A"}
            </p>
            <p>{item.overview || "No overview available."}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KnownFor;
