import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../componentsRouter/Homepage';
import LoginSignupPage from '../componentsRouter/LoginSignupPage';
import MoviePage from '../componentsRouter/MoviePage';
import Searchpage from '../componentsRouter/Searchpage';
import UserPage from '../componentsRouter/UserPage';
import "./NavRoutes.css"


function NavRoutes({ login, signup }) {
	return (
		<div className="pt-5">
			<Switch>

				<Route exact path="/">
					<Homepage />
				</Route>

				<Route exact path="/login-signup">
					<LoginSignupPage login={login} signup={signup}/>
				</Route>

				<Route exact path="/movie">
					<MoviePage />
				</Route>

				<Route exact path="/search">
					<Searchpage />
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