import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from "react-bootstrap";
import { customFetch } from '../utils';
import { removeFavForUser } from '../features/user/userSlice';

const Favorite = () => {
  const favMovies = useSelector((state) => state.userState?.user?.favMovie);
  const user = useSelector((state) => state.userState.user);


  const dispatch = useDispatch();

  const handleRemoveFav = async(movie) => {
    try {
      // Assuming there is a unique movie ID for identification
      const updatedFavMovies = favMovies.filter((favMovie) => favMovie.id !== movie.id);

      // Dispatch action to update Redux state
      dispatch(removeFavForUser(movie));

      // Update server data
      await customFetch.patch(`/users/${user.id}`, { favMovie: updatedFavMovies });
      alert('Movie removed from favorites successfully')
      console.log('Movie removed from favorites successfully');
    } catch (error) {
      console.error('Error removing movie from favorites:', error.message);
      alert("there is an error");
    }
  }


  return (
    <div className="favbody">
      <div className="container pt-5 text-white">
        {user ? (
          <h2>Your Favorite Movies</h2>
        ) : (
          "you must be logged in to add into favorites"
        )}
        <br /><br />
        
        <div className="row">
          {favMovies?.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-4">
              <div className="card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img
                src={movie.posterUrl}
                className="card-img custom-card-img"
                alt={movie.title}
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.description}</p>
                <p className="card-text">
                  <strong
                    style={{ width: "auto", margin: "2px", padding: "4px", background: "green",
                      color: "white"}} >
                    Genres:{" "}
                  </strong>
                  <br />
                  {movie.genre.map((genre, index) => (
                    <b style={{ margin: "3px" }} key={index}> {genre} </b>
                  ))}
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Button onClick={() => handleRemoveFav(movie)} variant="primary">
              Remove from favorites
            </Button>
          </div>
        </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorite