import React, { useEffect } from 'react'
import { customFetch } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setAllMovies } from '../features/allMovies/allMoviesSlice';
import { Button } from 'react-bootstrap';
import { addToFavorite, setInitialFavList } from '../features/favMovieList/favMovieListSlice';
import { setFavForUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';


const Landing = () => {

  const movieList = useSelector((state) => state.allMovieState.allMoviesList);
  const user = useSelector(state => state.userState.user);
  const favMoviesFromState = useSelector((state) => state.favMovieListState.favoriteMoviesList);

  const dispatch = useDispatch();
  const navigate = useNavigate();



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

  const handleFavorite = async (movie) => {

    //if user is not logged in then goto login page
    if(!user)
    {
      alert('please login first to add into favorites');
      navigate('/login');
      return;
    }

    // if movie is already added then alert and wont add again
    const isAlreadyFavorited = favMoviesFromState.some(
      (favMovie) => favMovie.id === movie.id
    );

    if (isAlreadyFavorited) {
      alert("This movie is already in your favorites!");
      return;
    }

    try {
      dispatch(addToFavorite(movie));

      // console.log(newFavMovies);
      dispatch(setFavForUser(movie));
      await customFetch.patch(`/users/${user.id}`, {
        favMovie: favMoviesFromState,
      });
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
      // Handle error, e.g., show an error message to the user
    }
  }

  return (
    <div className="container mt-5">
      <div className="row ">
        {movieList.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={movie.posterUrl} // Assuming there is a posterUrl property in your movie object
                className="card-img-top custom-card-img"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
                {/* You can add more details or buttons here */}
              </div>
              <div>
                <Button onClick={() => handleFavorite(movie)}> Add to favorite</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing