import React, { useState, useEffect } from 'react';
import CineratorApi from "../api/api";
import { Link, useHistory } from 'react-router-dom';
import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";
import "./SearchPlaque.css";
import ShowAllRateFav from "./ShowAllRateFav";

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
			<span className="container d-flex justify-content-evenly align-self-stretch flex-wrap">
				{moviesList.map((movie, idx) => (
				<div className="container custom-container" key={idx}>
					<ShowAllRateFav movieId={movie.imdbID} />
					<Link	
						to={`/movie?Id=${movie.imdbID}`} 
						onClick={() => history.push(`/movie?Id=${movie.imdbID}`)}
					>
						<h4 className="custom-title">
							{movie.Title}
						</h4>
						<img 
							src={movie.Poster} 
							alt="movie poster" 
							className="custom-poster"
						/> {/*this is the poster*/}
					</Link>
				</div>
				))}
			</span>
		</div>
	);
};

export default SearchPlaque;