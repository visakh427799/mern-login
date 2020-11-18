import React from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Spage from './screens/Signpage';
import Lpage from './screens/logpage';
import Hpage from './screens/homepage';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
//import Grid from '@material-ui/core/Grid';



function App() {
  return (
    <Router>
					<div className="App">
					<Switch>
						<Route exact path="/" component={Spage} />
						<Route exact path="/login" component={Lpage} />
            <Route exact path="/home" component={Hpage} />
						<Redirect from="/" to="login" />
					</Switch>

					</div>
				</Router>
  );
}

export default App;
