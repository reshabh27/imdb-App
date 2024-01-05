import React from 'react'
import { customFetch } from '../utils';
import AddMoviesForm from '../components/AddMoviesForm';
import { redirect } from 'react-router-dom';

export const loader = (store) => async() => {
  const user = store.getState().userState?.user;
  if (user?.role !== "Admin") {
    alert("You must be Admin in order to Update Movielist");
    return redirect("/");
  }
  
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






