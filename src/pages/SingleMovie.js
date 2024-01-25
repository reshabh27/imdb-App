import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

export const SingleMovie = () => {
    const  {id:movieId}  = useParams();
    const movieList = useSelector((state) => state.allMovieState.allMoviesList);
    // console.log(movieList);
    // const numericMovieId = parseInt(movieId, 10);
    const curMovie = movieList.find((movie) => movie.id === movieId);
    // console.log(curMovie);

    const calculateAverageRating = (ratings) => {
      if(ratings == null)
        return "N/A"
      if (ratings.length === 0) return "N/A";

      const totalRating = ratings.reduce((sum, rating) => sum + rating.rate, 0);
      const averageRating = totalRating / ratings.length;

      return averageRating.toFixed(1);
    };

  return (
    <div className="singlemoviebody">
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={curMovie?.posterUrl}
              className="img-fluid rounded"
              alt={curMovie?.title}
            />
          </div>
          <div className="col-md-7 text-start ms-4">
            <h1 className="text-uppercase">
              <u>{curMovie?.title}</u>
            </h1>
            <br />
            <br />
            <p>{curMovie?.description}</p>
            <div>
              <h2 style={{ color: "#01ff01" }}>Genres:</h2>{" "}
              <span className="opacity-75">{curMovie?.genre.join(", ")}</span>
            </div>
            <div>
              <h2 style={{ color: "#01ff01" }}>Cast:</h2>{" "}
              <span className="opacity-75">{curMovie?.cast.join(", ")}</span>
            </div>
            <div>
              <h2 style={{ color: "#01ff01" }}>Original Release year:</h2>{" "}
              <span className="opacity-75">{curMovie?.releaseYear}</span>
            </div>
            <div>
              <h2 style={{ color: "#01ff01" }}>Rate Average:</h2>{" "}
              <span className="opacity-75">{calculateAverageRating(curMovie?.ratings)} / 10</span>
            </div>

            {/* Reviews Section */}
            <div className="mt-4">
              <h2 style={{ color: "#01ff01" }}>Reviews:</h2>
              {curMovie?.reviews?.length > 0 ? (
                <ul>
                  {curMovie?.reviews?.map((review, index) => (
                    <li key={index}>{`${review.username}: ${review.comment}`}</li>
                  ))}
                </ul>
              ) : (
                <p className="opacity-75">No reviews yet.</p>
              )}
            </div>
            {/* Add more details as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
