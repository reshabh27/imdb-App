import React, { useState } from "react";
import { setFavForUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customFetch } from "../utils";

import { Button, Modal, Form } from "react-bootstrap";


const LandMovieCard = ({ movie }) => {
  const user = useSelector((state) => state.userState.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userreview, setUserReview] = useState("");
  const [userrating, setUserRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleFavorite = async (movie) => {
    //if user is not logged in then goto login page
    if (!user) {
      alert("please login first to add into favorites");
      navigate("/login");
      return;
    }

    // if movie is already added then alert and wont add again
    // console.log(user.favMovie);
    const isAlreadyFavorited = user.favMovie.some(
      (favMovie) => favMovie.id === movie.id
    );

    if (isAlreadyFavorited) {
      alert("This movie is already in your favorites!");
      return;
    }

    try {
      dispatch(setFavForUser(movie));

      await customFetch.patch(`/users/${user.id}`, {
        favMovie: user.favMovie,
      });
      alert("added to favorite")
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
      alert("there is an error please try again");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const handleSaveReviewAndRating = async () => {
    try {
      // Check if the user has already reviewed and rated the movie
      const hasReviewed = movie.reviews.some(
        (review) => review.userid === user.id
      );
      const hasRated = movie.ratings.some(
        (rating) => rating.userid === user.id
      );

      if (hasReviewed || hasRated) {
        // If the user has already reviewed or rated, update the existing review or rating
        const updatedReviews = movie.reviews.map((review) =>
          review.userid === user.id
            ? { userid: user.id, comment: userreview, username: user.name }
            : review
        );

        const updatedRatings = movie.ratings.map((rating) =>
          rating.userid === user.id
            ? { userid: user.id, rate: userrating, username: user.name }
            : rating
        );
        // console.log(updatedRatings, updatedReviews);
        // Send a PATCH request to update the movie
        await customFetch.patch(`/posts/${movie.id}`, {
          reviews: updatedReviews,
          ratings: updatedRatings,
        });
      } else {
        // If the user hasn't reviewed or rated, add a new review and rating
        const newReview = {
          userid: user.id,
          comment: userreview,
          username: user.name,
        };

        const newRating = {
          userid: user.id,
          rate: userrating,
          username: user.name,
        };
        // console.log(newReview,newRating);

        // Send a PATCH request to update the movie
        await customFetch.patch(`/posts/${movie.id}`, {
          reviews: [...movie.reviews, newReview], // Add the new review to the existing array
          ratings: [...movie.ratings, newRating], // Add the new rating to the existing array
        });
      }

      // Close the modal after successfully saving the review and rating
      handleCloseModal();
      alert("succesfully submited rating and review");
      setUserReview("");
    } catch (error) {
      console.error("Error saving review and rating:", error.message);
    }
  };

  return (
    <div>
      <div key={movie.id} className="mb-4">
        <div className="card" style={{padding:'4px'}}>
          <img
            src={movie.posterUrl}
            className="card-img-top custom-card-img"
            alt={movie.title}
          />
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text">{movie.description}</p>
            <p className="card-text">
              <strong style={{ width:'auto',margin: '2px', padding: '4px', background: 'green', color: 'white' }}>Genres: </strong>
              <br />
              {movie.genre.map((genre, index) => (
                <b style={{margin:'3px'}} key={index} >
                  {genre}
                </b>
              ))}
            </p>
          </div>
          <div className="card-text">
              <strong style={{ width:'auto',margin: '2px', padding: '4px', background: 'green', color: 'white' }}>Reviews: </strong>
              <br />
              {movie.reviews.length ? movie.reviews.map((review, index) => (
                <div key={index}><b>{review.username}</b> : {review.comment}</div>
              )) : "Not reviewed by anyone"}
            </div>
            <br />
            <div className="card-text">
              <strong style={{ width:'auto',margin: '2px', padding: '4px', background: 'green', color: 'white' }}>Ratings: </strong>
              <br />
              {
                movie.ratings.length ? movie.ratings.map((rating, index) => (
                <div key={index}><b>{rating.username}</b> : {rating.rate} / 5</div>
              )) : "Not rated by anyone"
              }
            </div>
            <br />
          <div>
            <Button onClick={() => handleFavorite(movie)}>
              {" "}
              Add to favorite
            </Button>
          </div>

          {/* Reviews and Ratings Modal */}
          <Button className="m-4" onClick={handleShowModal}>
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
                  <Form.Control as="textarea" rows={3} value={userreview}
                    onChange={(e) => setUserReview(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="rating">
                  <Form.Label>Rating:</Form.Label>
                  <Form.Control type="number" min="0" max="5" step="1" value={userrating} 
                  onChange={(e) => setUserRating(parseFloat(e.target.value))}
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
};

export default LandMovieCard;
