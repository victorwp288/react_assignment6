// src/components/ImagesFor.js
import React, { useState, useEffect } from "react";
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from "../config";
import "../styles/ImagesFor.css";

function ImagesFor({ id }) {
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [errorImages, setErrorImages] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/person/${id}/images?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setImages(data.profiles);
        setLoadingImages(false);
      } catch (err) {
        console.error("Error fetching images:", err);
        setErrorImages(true);
        setLoadingImages(false);
      }
    };

    fetchImages();
  }, [id]);

  if (loadingImages) return <div>Loading images...</div>;
  if (errorImages) return <div>Error loading images.</div>;

  return (
    <div className="images-for">
      <h3>Images:</h3>
      <div className="images-grid">
        {images.length > 0 ? (
          images.map((image) => (
            <img
              key={image.file_path}
              src={`${IMAGE_BASE_URL}w200${image.file_path}`}
              alt="Profile"
              className="profile-image"
            />
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>
  );
}

export default ImagesFor;
