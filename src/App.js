// src/App.js
import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import { API_KEY, BASE_URL } from "./config";
import "./styles/App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("spielberg");
  const [persons, setPersons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch persons when the component mounts
  useEffect(() => {
    const fetchPersons = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `${BASE_URL}/search/person?api_key=${API_KEY}&query=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPersons(data.results);
        setCurrentIndex(0); // Reset to first result when search changes
        setLoading(false);
      } catch (err) {
        console.error("Error fetching persons:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchPersons();
  }, [searchQuery]);

  // Handlers for navigation buttons
  const handleNext = () => {
    if (currentIndex < persons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Add search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search").trim();
    if (query) {
      setSearchQuery(query);
    }
  };
  if (loading) return <div className="App">Loading...</div>;
  if (error) return <div className="App">Error fetching data.</div>;

  return (
    <div className="App">
      <h1>The Movie Database Persons</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search for a person..."
          defaultValue={searchQuery}
        />
        <button type="submit">Search</button>
      </form>
      {persons.length > 0 ? (
        <>
          <Person person={persons[currentIndex]} />
          <div className="navigation">
            <button onClick={handlePrev} disabled={currentIndex === 0}>
              Previous
            </button>
            <span>
              {currentIndex + 1} / {persons.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex === persons.length - 1}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div>No persons found.</div>
      )}
    </div>
  );
}

export default App;
