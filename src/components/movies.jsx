import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "../components/common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom"
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = (movie) => {
    let movies = this.state.movies.filter((movie1) => movie1 !== movie);
    this.setState({
      movies,
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selecetdGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({sortColumn});
  };

  getPagedData =()=>{
    const { pageSize, currentPage, selecetdGenre,sortColumn ,movies:allMovies} = this.state;
    const filtered =
      selecetdGenre && selecetdGenre._id
        ? allMovies.filter((m) => m.genre._id === selecetdGenre._id)
        : allMovies;
    const sorted=  _.orderBy(filtered,[sortColumn.path],[sortColumn.order])
    const movies = paginate(sorted, currentPage, pageSize);
    return {totalCount:filtered.length,data:movies}
  }

  handleOnClick=()=>{
    console.log("jhjh")
    return 
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize,currentPage,sortColumn} = this.state;
    if (count === 0) return <p>There are no movies in the database</p>;
    
    const {totalCount,data:movies}= this.getPagedData()
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selecetdGenre}
          />
        </div>
        <div className="col">
        <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} moves in database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
