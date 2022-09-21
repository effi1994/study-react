import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Costomers from "./components/costomers";
import LoginForm from './components/loginForm'
import Register from "./components/register";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import MovieAddEdit from './components/addEditMovie';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
           <Route path={"/register"} component={Register} />
            <Route path={"/login"} component={LoginForm} />
            <Route path={"/movies/:id"} component={MovieAddEdit} />
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
