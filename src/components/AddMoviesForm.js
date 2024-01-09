import React, { useState } from "react";
import { customFetch } from "../utils";
import { useDispatch } from "react-redux";
import { addToAllMovies } from "../features/allMovies/allMoviesSlice";
import BtnAddItems from "./BtnAddItems";

const AddMoviesForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: [],
    cast: [],
    posterUrl: "",
    releaseYear: "",
  });
  

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cast" || name === "genre") {
      const Values = value.split(",").map((item) => item.trim());
      setFormData({ ...formData, [name]: Values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.reviews = [];
    formData.ratings = [];
    try {
      const response = await customFetch.post("/posts", { ...formData });

      if (response.status === 201) {
        console.log("Form data submitted successfully");
        dispatch(addToAllMovies(response.data));
        alert("Movie Succesfully added");
      } else {
        console.error("Error submitting form data:", response.statusText);
        alert("error submiting the data")
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("there is some error while adding movie");
    }
  };

  return (
    <div
      className="container rounded"
      style={{ backgroundColor: "white", width: "30%", minWidth: "275px" }}
    >
      <div className="pt-5 mt-4">
        <strong className="h1">Add New Movies !</strong>
      </div>
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label h4">
            Title:
          </label>
          <input
            type="text"
            className="form-control w-50 m-auto"
            id="title"
            name="title"
            value={formData.title}
            placeholder="Enter Movie Title"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label h4">
            Description:
          </label>
          <textarea
            className="form-control w-50 m-auto"
            id="description"
            name="description"
            value={formData.description}
            placeholder="Enter Movie Description"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="form-label h4">
            Genre:
          </label>
          <input
            type="text"
            className="form-control w-50 m-auto"
            id="genre"
            name="genre"
            value={formData.genre.join(", ")}
            onChange={handleChange}
            placeholder="Movie Genres(comma-separated)"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cast" className="form-label h4">
            Cast:
          </label>
          <input
            type="text"
            className="form-control w-50 m-auto"
            id="cast"
            name="cast"
            value={formData.cast.join(", ")}
            onChange={handleChange}
            placeholder="Movie Casts(comma-separated)"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="releaseYear" className="form-label h4">
            Original Release Year:
          </label>
          <input
            type="text"
            className="form-control w-50 m-auto"
            id="releaseYear"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            placeholder="Enter Original Release Year"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="posterUrl" className="form-label h4">
            Poster URL:
          </label>
          <input
            type="text"
            className="form-control w-50 m-auto"
            id="posterUrl"
            name="posterUrl"
            value={formData.posterUrl}
            onChange={handleChange}
            placeholder="Poster link"
            required
          />
        </div>

        <BtnAddItems text="Add Movie" />
        <br />
        <br />
        <br />
      </form>
    </div>
  );
};

export default AddMoviesForm;
