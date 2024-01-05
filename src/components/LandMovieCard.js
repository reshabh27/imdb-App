import React from 'react'
import { Button } from "react-bootstrap";
import { setFavForUser } from "../features/user/userSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../features/favMovieList/favMovieListSlice';
import { customFetch } from '../utils';

const LandMovieCard = ({movie}) => {
    
    const user = useSelector((state) => state.userState.user);
    const favMoviesFromState = useSelector((state) => state.favMovieListState.favoriteMoviesList);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleFavorite = async (movie) => {
      //if user is not logged in then goto login page
      if (!user) {
        alert("please login first to add into favorites");
        navigate("/login");
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
      }
    };



  return (
    <div>
      <div key={movie.id} className="mb-4">
        <div className="card">
          <img
            src={movie.posterUrl}
            className="card-img-top custom-card-img"
            alt={movie.title}
          />
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text">{movie.description}</p>
            <p className="card-text">
              <strong>Genres: </strong>
              {/* {movie.genre.map((genre, index) => (
                <span key={index} style={{ margin: '2px', padding: '5px', background: 'green', color: 'white' }}>
                  {genre}
                </span>
              ))} */}
              {movie.genre.join(", ")}
            </p>
          </div>
          <div>
            <Button onClick={() => handleFavorite(movie)}>
              {" "}
              Add to favorite
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandMovieCard