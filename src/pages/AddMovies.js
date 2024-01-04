import React, { useEffect, useState } from 'react'
import { customFetch } from '../utils';
import SubmitBtn from '../components/SubmitBtn';
import { useLoaderData } from 'react-router-dom';




const AddMovies = () => {

  const [moviesStored,setMoviesStored] = useState([]);

  setMoviesStored(useLoaderData());


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: [],
    cast: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "cast") || (name === "genre")) 
    {
      // For the "team" field, split the input values into an array
      const Values = value.split(",").map((item) => item.trim());
      setFormData({ ...formData, [name]: Values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.reviews = [];
    formData.ratings =[];
    try {
      const response = await customFetch.post("/posts", { body: formData});

      // console.log(response);
      if (response.status === 201) {
        console.log("Form data submitted successfully");
        // Handle successful submission, e.g., redirect or show a success message
      } else {
        console.error("Error submitting form data:", response.statusText);
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle unexpected errors, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Add new movies</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Genre (comma-separated):</label>
          <input
            type="text"
            name="genre"
            value={formData.genre.join(", ")} // Display the array as a comma-separated string
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Team (comma-separated):</label>
          <input
            type="text"
            name="cast"
            value={formData.cast.join(", ")} // Display the array as a comma-separated string
            onChange={handleChange}
            required
          />
        </div>

        <SubmitBtn text="Add Movie"/>
      </form>
    </div>
  );
}

export default AddMovies






