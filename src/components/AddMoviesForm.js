import React, { useState } from "react";
import SubmitBtn from "./SubmitBtn";
import { customFetch } from "../utils";
import { useDispatch } from "react-redux";
import { addToAllMovies } from "../features/allMovies/allMoviesSlice";

const AddMoviesForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: [],
    cast: [],
    posterUrl: "",
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
      } else {
        console.error("Error submitting form data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add new movies</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre (comma-separated):
          </label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={formData.genre.join(", ")}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cast" className="form-label">
            Team (comma-separated):
          </label>
          <input
            type="text"
            className="form-control"
            id="cast"
            name="cast"
            value={formData.cast.join(", ")}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="posterUrl" className="form-label">
            Poster URL:
          </label>
          <input
            type="text"
            className="form-control"
            id="posterUrl"
            name="posterUrl"
            value={formData.posterUrl}
            onChange={handleChange}
            required
          />
        </div>

        <SubmitBtn text="Add Movie" />
      </form>
    </div>
  );
};

export default AddMoviesForm;
