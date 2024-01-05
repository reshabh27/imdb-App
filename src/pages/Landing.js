import React, { useEffect, useState } from 'react'
import { customFetch } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setAllMovies } from '../features/allMovies/allMoviesSlice';
import { setInitialFavList } from '../features/favMovieList/favMovieListSlice';
import LandMovieCard from '../components/LandMovieCard';


const Landing = () => {

  const movieList = useSelector((state) => state.allMovieState.allMoviesList);
  const user = useSelector(state => state.userState.user);
  const [genreOption,setGenreOption] = useState([])

   const [filteredMovies, setFilteredMovies] = useState(movieList);
   const [nameFilter, setNameFilter] = useState("");
   const [genreFilter, setGenreFilter] = useState("");
   const [ratingFilter, setRatingFilter] = useState("");

  const dispatch = useDispatch();



  const fetchInitialMovies = async () => {
    try {
      const response = await customFetch("/posts");
      const movies = response.data || [];
      
      // Dispatch the setAllMovies action to update the state
      if(user)
        dispatch(setInitialFavList(user.favMovie));
      dispatch(setAllMovies(movies));
     setFilteredMovies(movies);
    } catch (error) {
      console.error("Error fetching initial movies:", error.message);
    }
  };

  const fetchInitilGenres = async() => {
    const response = await customFetch('/genres');
    // console.log(response.data);
    setGenreOption(response.data);
  }

  // console.log(movieList);
  useEffect(() => {
    fetchInitialMovies();
    fetchInitilGenres();
  },[])

  
   const handleFilter = () => {
     // Apply filters based on name, genre, and rating
     let filteredResults = movieList;

     if (nameFilter) {
       filteredResults = filteredResults.filter((movie) =>
         movie.title.toLowerCase().includes(nameFilter.toLowerCase())
       );
     }

    //  if (genreFilter) {
    //    filteredResults = filteredResults.filter((movie) =>
    //      movie.genre.includes(genreFilter.toLowerCase())
    //    );
    //  }
    if (genreFilter) {
      filteredResults = filteredResults.filter((movie) =>
        movie.genre.some((genre) =>
          genre.toLowerCase().includes(genreFilter.toLowerCase())
        )
      );
    }

     if (ratingFilter) {
       filteredResults = filteredResults.filter((movie) =>
         movie.ratings.includes(ratingFilter)
       );
     }

     setFilteredMovies(filteredResults);
   };




  return (
    <div className="container mt-5">
      {/* filters */}
      <div className="mb-3">
        <input type="text" placeholder="Search by name"
          value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}
        />
        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="">Select genre</option>
          {genreOption.map(gen => {
            return <option value={gen.name}>{gen.name}</option>;
          })}
        </select>
        <input type="text" placeholder="Filter by IMDb rating"
          value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}
        />
        <button onClick={handleFilter}>Apply Filters</button>
      </div>

      {/* movies card container */}
      <div className="row ">
        {filteredMovies.map((movie) => (
          <div className="col-md-4 mb-4">
            <LandMovieCard key={movie.id} movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing