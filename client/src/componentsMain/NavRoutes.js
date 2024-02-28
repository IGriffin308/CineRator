import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Homepage from '../componentsRouter/Homepage';
import LoginPage from '../componentsRouter/LoginPage';
import SignupPage from '../componentsRouter/SignupPage';
import MoviePage from '../componentsRouter/MoviePage';
import Searchpage from '../componentsRouter/Searchpage';
import UserPage from '../componentsRouter/UserPage';

// Custom hook to get query params from URL
function useQuery() {
	const { search } = useLocation();
  
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

// Routes for the main navigation
function NavRoutes({ login, signup }) {
	let query = useQuery();
	return (
		<div className="pt-5">
			<Switch>

				<Route exact path="/">
					<Homepage />
				</Route>

				<Route exact path="/login">
					<LoginPage login={login} />
				</Route>

				<Route exact path="/signup">
					<SignupPage signup={signup} />
				</Route>

				<Route path="/movie">
					<MoviePage movieId={query.get("id")}/>
				</Route>

				<Route exact path="/search">
					<Searchpage title={query.get("title")}/>
				</Route>

				<Route exact path="/userpage">
					<UserPage />
				</Route>

				<Redirect to="/" />
			</Switch>
		</div>
	);
}

export default NavRoutes;