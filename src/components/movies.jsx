import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "../components/common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/pagination";
import MoviesTable from "./moviesTable";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
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
    this.setState({ selecetdGenre: genre ,currentPage:1 });
  };

  handleSort=(path)=>{
    console.log(path)
  }
  
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selecetdGenre } = this.state;
    if (count === 0) return <p>There are no movies in the database</p>;
    const filtered =
      selecetdGenre && selecetdGenre._id
        ? this.state.movies.filter((m) => m.genre._id === selecetdGenre._id)
        : this.state.movies;

    const movies = paginate(filtered, currentPage, pageSize);
    console.log(movies);
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
          <p>Showing {filtered.length} moves in database</p>
          <MoviesTable
           movies={movies}
           onDelete={this.handleDelete}
           onLike={this.handleLike}
           onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
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
