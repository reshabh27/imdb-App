import React, { useState } from "react";
import { setFavForUser, updateReviewAndComment } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customFetch } from "../utils";
import { Button } from "react-bootstrap";
import { RevRateModal } from "./RevRateModal";


const LandMovieCard = ({ movie }) => {
  const user = useSelector((state) => state.userState.user);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleFavorite = async (movie) => {
    //if user is not logged in then goto login page
    if (!user) {
      alert("please login first to add into favorites");
      navigate("/login");
      return;
    }
    console.log(user);
    const isAlreadyFavorited = user?.favMovie?.some(
      (favMovie) => favMovie.id === movie.id
    );

    if (isAlreadyFavorited) {
      alert("This movie is already in your favorites!");
      return;
    }

    try {
      dispatch(setFavForUser(movie));
      // console.log(user);
      const res = await customFetch.patch(`/users/${user.id}.json`, {
        favMovie: user.favMovie,
      });
      console.log(res);
      alert("added to favorite")
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
      alert("there is an error please try again");
    }
  };

  const handleShowModal = () => setShowModal(true);


  return (
    <div>
      <div key={movie.id} className="mb-4">
        <div className="card">
          <Link to={`/movies/${movie.id}`} className="row no-gutters movie-link">
            <div className="col-md-5">
              <img
                src={movie?.posterUrl}
                className="card-img custom-card-img"
                alt={movie?.title}
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title">{movie?.title}</h5>
                <p className="card-text">{movie?.description}</p>
                <p className="card-text">
                  <strong className="rounded p-2" style={{ width: 'auto', background: '#ff7400', color: 'white' }}>Genres: </strong>
                  <br />
                  {movie.genre?.map((genre, index) => (
                    <b style={{ margin: '3px' }} key={index} > {genre} </b>
                  ))}
                </p>
              </div>
            </div>
          </Link>
          <div className="card-footer cardbtns">
            <Button onClick={() => handleFavorite(movie)}>
              {" "}
              Add to favorite
            </Button>
            <Button className="ml-4" onClick={handleShowModal}>
              Review and give rating
            </Button>
          </div>
        </div>

        {/* Reviews and Ratings Modal */}
        <RevRateModal movie={movie} showModal={showModal} setShowModal={setShowModal}/>

      </div>
    </div>
  );
};

export default LandMovieCard;
