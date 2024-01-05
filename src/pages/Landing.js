import React, { useEffect } from 'react'
import { customFetch } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setAllMovies } from '../features/allMovies/allMoviesSlice';
import { setInitialFavList } from '../features/favMovieList/favMovieListSlice';
import LandMovieCard from '../components/LandMovieCard';


const Landing = () => {

  const movieList = useSelector((state) => state.allMovieState.allMoviesList);
  const user = useSelector(state => state.userState.user);
  

  const dispatch = useDispatch();



  const fetchInitialMovies = async () => {
    try {
      const response = await customFetch("/posts");
      const movies = response.data || [];
      
      // Dispatch the setAllMovies action to update the state
      dispatch(setInitialFavList(user.favMovie));
      dispatch(setAllMovies(movies));
    } catch (error) {
      console.error("Error fetching initial movies:", error.message);
    }
  };
  // console.log(movieList);
  useEffect(() => {
    fetchInitialMovies();
  },[])

  

  return (
    <div className="container mt-5">
      <div className="row ">
        {movieList.map((movie) => (
          <div className="col-md-4 mb-4">
            <LandMovieCard key={movie.id} movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing