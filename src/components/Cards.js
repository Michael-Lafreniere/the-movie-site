import React, { Component } from 'react';
import { getTMDbMovie, fetchData } from '../api';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';

export class Cards extends Component {
  constructor() {
    super();
    this.toggleMovieDetails = this.toggleMovieDetails.bind(this);
    this.state = {
      displayPopup: false,
      movieDetailsID: 0
    };
  }

  toggleMovieDetails(movieID = 0) {
    this.setState({
      displayPopup: !this.state.displayPopup,
      movieDetailsID: movieID
    });
  }

  componentDidUpdate() {
    if (this.props.movieID) {
      this.setState({ movieDetailsID: this.props.movieID });
      this.props.movieSearch(0);
    }
  }

  render() {
    if (this.props.movies === undefined) {
      return null;
    }

    const movies = this.props.movies;
    const movieList = [];

    movies.map(movie =>
      movieList.push(fetchData(getTMDbMovie(movie.id), movie => movie))
    );

    let popup;
    if (this.state.movieDetailsID > 0) {
      popup = (
        <MovieDetails
          movieID={this.state.movieDetailsID}
          toggleDetails={this.toggleMovieDetails}
        />
      );
    }

    return (
      <div className="cards">
        {movies.map(movie => (
          <MovieCard
            movieData={movie}
            key={movie.id}
            toggleMovieDetails={this.toggleMovieDetails}
          />
        ))}
        {popup}
      </div>
    );
  }
}

export default Cards;
