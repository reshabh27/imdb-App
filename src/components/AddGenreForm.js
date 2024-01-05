import React, { useState } from "react";
import { customFetch } from "../utils";

const AddGenreForm = () => {
  const [newGenre, setNewGenre] = useState("");

  const handleAddGenre = async () => {
    try {
      // Validate if the newGenre is not empty
      if (!newGenre.trim()) {
        alert("Please enter a valid genre");
        return;
      }

      // Make a POST request to add the new genre
      const response = await customFetch.post("/genres", {newGenre});

      // Check if the request was successful
      if (response.status > 199 && response.status < 300) {
        alert("Genre added successfully!");
        setNewGenre(""); // Clear the input field after successful addition
      } else {
        // Handle other status codes or error scenarios
        alert("Failed to add genre. Please try again.");
      }
    } catch (error) {
      console.error("Error adding genre:", error.message);
    }
  };

  return (
    <div>
      <h3>Add New Genre</h3>
      <div>
        <label htmlFor="newGenre">Genre Name:</label>
        <input
          type="text"
          id="newGenre"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
        />
      </div>
      <button onClick={handleAddGenre}>Add Genre</button>
    </div>
  );
};

export default AddGenreForm;
