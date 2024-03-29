import React, { useEffect, useState } from 'react'
import { customFetch } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setAllMovies } from '../features/allMovies/allMoviesSlice';
import LandMovieCard from '../components/LandMovieCard';


const Landing = () => {

   const movieList = useSelector((state) => state.allMovieState.allMoviesList);
   const [genreOption,setGenreOption] = useState([])
   const [filteredMovies, setFilteredMovies] = useState(movieList);
   const [nameFilter, setNameFilter] = useState("");
   const [genreFilter, setGenreFilter] = useState("");
   const [ratingFilter, setRatingFilter] = useState("");

  const dispatch = useDispatch();

  const fetchInitialMovies = async () => {
     try {
       const response = await customFetch("/posts.json");
       const movies = Object.keys(response?.data).map((key) => ({
         id: key,
         ...response.data[key],
       }));

       // Dispatch the setAllMovies action to update the state
       dispatch(setAllMovies(movies));
       setFilteredMovies(movies);
     } catch (error) {
       console.error("Error fetching initial movies:", error.message);
       alert("Error fetching initial movies");
     }
  };

  const fetchInitilGenres = async() => {
    try {
      const response = await customFetch("/genres.json");
      const data = Object.keys(response?.data)?.map((key) => response.data[key]);

      // Extract only the values from the 'newGenre' property
      const genreValues = data?.map((genreObject) => genreObject.newGenre);

      // console.log(genreValues);
      setGenreOption(genreValues);
    } catch (error) {
      console.error("Error fetching genres:", error.message);
      alert("Error fetching genres");
    }
  }

  useEffect(() => {
    fetchInitialMovies();
    fetchInitilGenres();
  },[])


  const filterMoviesByRating = (movies, minRating) => {
    return movies?.filter((movie) => {
      // Calculate the average rating for the movie
      const ratings = movie?.ratings?.map((rating) => rating.rate);
      const averageRating =  ratings?.length > 0 ? ratings?.reduce((a, b) => a + b) / ratings?.length : 0;

      // Check if the average rating is greater than or equal to the minimum rating
      return averageRating >= minRating;
    });
  };

  
   const handleFilter = () => {
     // Apply filters based on name, genre, and rating
     let filteredResults = movieList;

     if (nameFilter) {
       filteredResults = filteredResults.filter((movie) =>
         movie.title.toLowerCase().includes(nameFilter.toLowerCase())
       );
     }

    if (genreFilter) {
      filteredResults = filteredResults.filter((movie) =>
        movie.genre.some((genre) =>
          genre.toLowerCase().includes(genreFilter.toLowerCase())
        )
      );
    }

     if (ratingFilter) {
       filteredResults = filterMoviesByRating(filteredResults, ratingFilter);
     }

     setFilteredMovies(filteredResults);
   };
  //  console.log(filteredMovies);

  return (
    <div className='landingbody'>

      <div className="container pt-5">
        {/* filters */}
        <div className="mb-3">
          <input type="text" placeholder="Search by name" className='m-2 p-2 rounded filterinp'
            value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}
          />
          <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}
            className='me-2 p-2 rounded filterinp'
          >
            <option value="">Select genre</option>
            {genreOption?.map(gen => {
              return <option value={gen}>{gen}</option>;
            })}
          </select>
          <input type="text" placeholder="Filter by IMDb rating"
            value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}
            className='me-2 p-2 rounded filterinp'
          />
          <button className='applybtn p-2 rounded' onClick={handleFilter}>Apply Filters</button>
        </div>
            <br />
        {/* movies card container */}
        <div className="row ">
          {filteredMovies?.map((movie) => (
            <div className="col-md-4 mb-4">
              <LandMovieCard key={movie.id} movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing