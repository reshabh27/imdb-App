import React from 'react'
import { customFetch } from '../utils';
import AddMoviesForm from '../components/AddMoviesForm';

export const loader = async () => {
  const response = await customFetch("/posts");
  console.log(response.data);
  return response?.data;
};


const AddMovies = () => {
  
  return (
    <div>
      <AddMoviesForm />
    </div>
  );
}

export default AddMovies






