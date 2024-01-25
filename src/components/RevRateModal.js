import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { updateMovieInAllMovies } from "../features/allMovies/allMoviesSlice";
import { useDispatch, useSelector } from 'react-redux';
import { customFetch } from '../utils';
import { updateReviewAndComment } from '../features/user/userSlice';

export const RevRateModal = ({ movie, showModal, setShowModal }) => {
    
    const [userreview, setUserReview] = useState("");
    const [userrating, setUserRating] = useState(0);
    const user = useSelector((state) => state.userState.user);
    const dispatch = useDispatch();

  const handleCloseModal = () => setShowModal(false);

    const handleSaveReviewAndRating = async () => {
      // console.log(userreview,userrating);
      try {
        // Check if the user has already reviewed and rated the movie
        const hasReviewed = movie?.reviews?.some((review) => review.userid === user.id);
        const hasRated = movie?.ratings?.some((rating) => rating.userid === user.id);
        // console.log(hasRated,hasReviewed);
        let updatedMovie = { ...movie };

        if (hasReviewed || hasRated) {
          // If the user has already reviewed or rated, update the existing review or rating
          const updatedReviews = movie?.reviews?.map((review) =>
            review.userid === user.id
              ? { userid: user.id, comment: userreview, username: user.name }
              : review
          );
          console.log(updatedMovie);
          const updatedRatings = movie?.ratings?.map((rating) =>
            rating.userid === user.id
              ? { userid: user.id, rate: userrating, username: user.name }
              : rating
          );

          if (userreview !== "")
          {
              await customFetch.patch(`/posts/${movie.id}.json`, { reviews: updatedReviews});
              updatedMovie = { ...updatedMovie, review: updatedReviews };
          }
          if (userrating !== 0)
          {
            await customFetch.patch(`/posts/${movie.id}.json`, { ratings: updatedRatings});
            updatedMovie = { ...updatedMovie, ratings: updatedRatings };
          }
        } 
        else 
        {
          // If the user hasn't reviewed or rated, add a new review and rating
          const newReview = {
            userid: user.id, comment: userreview, username: user.name,
          };

          const newRating = {
            userid: user.id, rate: userrating, username: user.name,
          };
          // console.log(newReview,newRating);
          // Send a PATCH request to update the movie
         let updatedMovie = { ...movie }; // Create a copy of the movie object

          if (userreview !== "") {
            // If there are existing reviews, add the new review to the array; otherwise, create a new array with the new review
            const newReviews = movie.reviews ? [...movie.reviews, newReview] : [newReview];
            await customFetch.patch(`/posts/${movie.id}.json`, { reviews: newReviews });
            updatedMovie = { ...updatedMovie, reviews: newReviews };
          }

          if (userrating !== 0) {
            // If there are existing ratings, add the new rating to the array; otherwise, create a new array with the new rating
            const newRatings = movie.ratings ? [...movie.ratings, newRating] : [newRating];
            await customFetch.patch(`/posts/${movie.id}.json`, { ratings: newRatings });
            updatedMovie = { ...updatedMovie, ratings: newRatings };
          }
        }
        
        dispatch(updateMovieInAllMovies(updatedMovie));
        dispatch(updateReviewAndComment(updatedMovie));
        // Close the modal after successfully saving the review and rating
        handleCloseModal();
        alert("succesfully submited rating and review");
      } catch (error) {
        console.error("Error saving review and rating:", error.message);
      }
    };


  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Reviews and Ratings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="review">
            <Form.Label>Review:</Form.Label>
            <Form.Control as="textarea" rows={3} value={userreview}
              onChange={(e) => setUserReview(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Rating:</Form.Label>
            <Form.Control type="number" min="0" max="10" step="1" value={userrating}
              onChange={(e) => setUserRating(parseFloat(e.target.value))} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}> Cancel </Button>
        <Button variant="primary" onClick={handleSaveReviewAndRating}> Submit review </Button>
      </Modal.Footer>
    </Modal>
  );
};
