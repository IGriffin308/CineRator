import React, { useState, useEffect } from 'react';
import RateFav from './RateFav';
import CineratorApi from "../api/api";
import { Link, useHistory } from 'react-router-dom';
import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";

// Show short version of movie details in a list for search page
function SearchPlaque({ title }) {
  const [isLoading, setIsLoading] = useState(true);
	const [moviesList, setMoviesList] = useState([]);
	const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieBySearch(title) {
      try {
        let movies = await CineratorApi.getMovieBySearch(title);
        setMoviesList(movies.Search);
        setIsLoading(false);
      } catch (errors) {
        console.error("get failed", errors);
        setError(errors);
        setIsLoading(false);
        return { success: false, errors };
      }
    }
    getMovieBySearch(title)
  }, [title]);


	if (isLoading) {
		return (<LoadingSpinner />);
	}
	if (error) {
		return (<Alert type="danger" messages={error} />);
	}
	// If no error, but also no search results, show unique error
	if (moviesList === undefined || moviesList.length === 0) {
		return (
			<Alert type="danger" messages={["No Search Results Found"]} />
		);
	}
	// If search results, show list of movies
	return (
		<div className="container border border-dark rounded">
			{moviesList.map((movie, idx) => (
				<div className="container" key={idx}>
					<Link	
						to={`/movie?Id=${movie.imdbID}`} 
						onClick={() => history.push(`/movie?Id=${movie.imdbID}`)}
					>
						<h2>{movie.Title}</h2>
					</Link>
					{/* <div className="container">
						<RateFav movieId={movie.imdbID}/>
					</div> */}
					<img 
						src={movie.Poster} 
						alt="movie poster" 
						style={{
							width: "70vw",
							maxWidth: "300px", 
							height: "auto",
							position: "relative", 
							left: "50%", 
							transform: "translateX(-50%)"}}
					/> {/*this is the poster*/}
				</div>
			))}
		</div>
	);
};

export default SearchPlaque;