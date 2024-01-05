import React, { useState } from 'react'
import { setFavForUser } from "../features/user/userSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../features/favMovieList/favMovieListSlice';
import { customFetch } from '../utils';

import { Button, Modal, Form } from "react-bootstrap";

const LandMovieCard = ({movie}) => {
    
    const user = useSelector((state) => state.userState.user);
    const favMoviesFromState = useSelector((state) => state.favMovieListState.favoriteMoviesList);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  
  const [showModal, setShowModal] = useState(false);



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

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    const handleSaveReviewAndRating = async () => {
      try {
        await customFetch.post(`/posts/${movie.id}`, {
          reviews: [],
          ratings:[],
        });

        // Close the modal after successfully saving the review and rating
        handleCloseModal();
      } catch (error) {
        console.error("Error saving review and rating:", error.message);
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

      {/* Reviews and Ratings Modal */}
      <Button className='m-4' onClick={handleShowModal}>
         Review and give rating
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reviews and Ratings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="review">
              <Form.Label>Review:</Form.Label>
              <Form.Control
                as="textarea" rows={3} value={review}
                onChange={(e) => setReview(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>Rating:</Form.Label>
              <Form.Control
                type="number" min="0" max="5" step="1"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveReviewAndRating}>
            Submit review
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      </div>
    </div>
  );
}

export default LandMovieCard