import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "../src/services/authService";
import Movies from "./components/movies";
import Costomers from "./components/costomers";
import LoginForm from './components/loginForm'
import Register from "./components/register";
import Logout from './components/logout';
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import MovieAddEdit from './components/addEditMovie';
import ProtecedRoute from './components/common/protectedRoute';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
   const user =auth.getCurrentUser();
   this.setState({user});
  }
  render() {
    const {user} =this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path={"/register"} component={Register} />
            <Route path={"/login"} component={LoginForm} />
            <Route path={"/logout"} component={Logout} />
            <ProtecedRoute path={"/movies/:id"} component={MovieAddEdit} />
            <Route path="/movies" render={props => <Movies {...props} user={user}/>} />
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
