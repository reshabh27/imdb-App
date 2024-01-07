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
    <div className="container mt-5">
      <h2>Your Favorite Movies</h2>
      <div className="row">
        {favMovies?.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-4">
            <Card>
              <Card.Img variant="top" src={movie.posterUrl} alt={movie.title} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                {/* Add more details or buttons here */}
                <Button onClick={()=> handleRemoveFav(movie)} variant="primary">Remove from favorites</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite