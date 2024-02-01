import React from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import Homepage from './Homepage';
import Searchpage from './Searchpage';
import Userpage from './Userpage';
import "./NavRoutes.css"


function NavRoutes() {
  	return (
		<div>
			<Homepage />
			<div id="nav">
				<Route exact path="/">
					<Link to="/search">Search</Link><br />
      		<Link to="/userpage">Userpage</Link><br />
				</Route>
			</div>
        <Route exact path="/search">
					<Searchpage />
    		</Route>
        <Route exact path="/userpage">
					<Userpage />
    		</Route>
		</div>
  	);
}

export default NavRoutes;