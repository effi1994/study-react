import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import MovieFrom from './components/movieFrom';
import Costomers from "./components/costomers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path={"/movies/:id"} component={MovieFrom}/>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Costomers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to={"/movies"} />
            <Redirect to={"/not-found"} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
