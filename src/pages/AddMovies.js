import React from 'react'
import AddMoviesForm from '../components/AddMoviesForm';
import { redirect } from 'react-router-dom';
import AddGenreForm from '../components/AddGenreForm';

export const loader = (store) => async() => {
  const user = store.getState().userState?.user;
  if (user?.role !== "Admin") {
    alert("You must be an Admin in order to Update Movielist");
    return redirect("/");
  }
  return null;
};


const AddMovies = () => {
  
  return (
    <div className='pt-5 pb-5' style={{backgroundImage:"linear-gradient(to right top, #4b93fc, #6184ff, #8370ff, #a853fc, #cc12eb)"}}>
      <AddMoviesForm />
      <AddGenreForm />
    </div>
  );
}

export default AddMovies






