// src/components/Person.js
import React from "react";
import KnownFor from "../components/KnownFor";
import ImagesFor from "../components/ImagesFor";
import { IMAGE_BASE_URL } from "../config";
import "../styles/Person.css";

function Person({ person }) {
  const profileImage = person.profile_path
    ? `${IMAGE_BASE_URL}w200${person.profile_path}`
    : "missing.png";

  return (
    <div className="person-card">
      <img src={profileImage} alt={person.name} className="profile-image" />
      <div className="person-details">
        <h2>{person.name}</h2>
        <p>
          <strong>Department:</strong> {person.known_for_department}
        </p>
        <KnownFor knownFor={person.known_for} />
        <ImagesFor id={person.id} />
      </div>
    </div>
  );
}

export default Person;
