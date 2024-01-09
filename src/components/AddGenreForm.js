import React, { useState } from "react";
import { customFetch } from "../utils";
import BtnAddItems from "./BtnAddItems";

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
      alert("there is an error while adding genre");
    }
  };

  return (
    <div className="container mt-5 pt-5 rounded" style={{backgroundColor:"white",width:"30%",minWidth:'275px'}}>
      <div className="mb-5">
        <strong className="h1">Add New Genre</strong>
      </div>
      <div>
        <label className="form-label h4" htmlFor="newGenre">Genre Name:</label>
        <input
          type="text"
          id="newGenre"
          value={newGenre}
          className="form-control w-50 m-auto mb-4"
          placeholder="New Genre"
          onChange={(e) => setNewGenre(e.target.value)}
        />
      </div>
      <BtnAddItems text="Add Genre" onClick={handleAddGenre}/>
    </div>
  );
};

export default AddGenreForm;
