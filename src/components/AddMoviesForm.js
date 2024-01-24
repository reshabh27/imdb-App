import React, { useState } from "react";
import { customFetch } from "../utils";
import { useDispatch } from "react-redux";
import { addToAllMovies } from "../features/allMovies/allMoviesSlice";
import BtnAddItems from "./BtnAddItems";
import { AddMoviesFormInput } from "./AddMoviesFormInput";

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
      const response = await customFetch.post("/posts.json", { ...formData });
      console.log(response);
      if (response.statusText === 'OK') {
        dispatch(addToAllMovies(response.data));
        alert("Movie Succesfully added");
        setFormData({
          title: "",
          description: "",
          genre: [],
          cast: [],
          posterUrl: "",
          releaseYear: "",
        });
      } else {
        console.error("Error submitting form data:", response.statusText);
        alert("error submiting the data");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("there is some error while adding movie");
    }
  };

  return (
    <div className="container rounded"
      style={{ backgroundColor: "white", width: "30%", minWidth: "275px" }} 
    >
      <div className="pt-5 mt-4">
        <strong className="h1">Add New Movies !</strong>
      </div>
      <br /> <br /> <br />
      <form onSubmit={handleSubmit}>
        <AddMoviesFormInput inpId="title" pHolder="Enter Movie Title" text="Title" 
        fieldValue={formData.title} handleChange={handleChange} />

        <div className="mb-3">
          <label htmlFor="description" className="form-label h4"> Description: </label>
          <textarea
            className="form-control w-50 m-auto" id="description" name="description" value={formData.description}
            placeholder="Enter Movie Description" onChange={handleChange} required
          />
        </div>

        <AddMoviesFormInput inpId="genre" pHolder="Movie Genres(comma-separated)" text="Genre" 
        fieldValue={formData.genre.join(", ")} handleChange={handleChange} />

        <AddMoviesFormInput inpId="cast" pHolder="Movie Casts(comma-separated)" text="Cast" 
        fieldValue={formData.cast.join(", ")} handleChange={handleChange} />

        <AddMoviesFormInput inpId="releaseYear" pHolder="Enter Original Release Year" 
        text="Original Release Year" fieldValue={formData.releaseYear} handleChange={handleChange} />

        <AddMoviesFormInput inpId="posterUrl" pHolder="Poster link" text="Poster URL" 
        fieldValue={formData.posterUrl} handleChange={handleChange} />

        <BtnAddItems text="Add Movie" />
        <br /> <br /> <br />
      </form>
    </div>
  );
};

export default AddMoviesForm;
