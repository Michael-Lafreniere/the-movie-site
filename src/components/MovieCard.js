import React, { Component } from 'react';
import Spinner from 'react-spinner-material';
import { getTMDbMovie, fetchData } from '../api';

export class MovieCard extends Component {
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      loaded: false,
      scrollDown: true
    };
  }

  componentDidMount() {
    this.setState({ loaded: false });
    fetchData(getTMDbMovie(this.props.movieData.id), movie => {
      if (movie) {
        this.setState({
          id: movie.id,
          adult: movie.adult,
          release_date: movie.release_date,
          original_language: movie.original_language,
          title: movie.title,
          runtime: movie.runtime,
          budget: movie.budget,
          revenue: movie.revenue,
          tagline: movie.tagline,
          imdb_id: movie.imdb_id,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          overview: movie.overview,
          status: movie.status,
          backdrop_path: movie.backdrop_path,
          poster_path: movie.poster_path,
          popularity: movie.popularity,
          homepage: movie.homepage,
          genres: movie.genres,
          production_companies: movie.production_companies,
          production_countries: movie.production_countries
        });
      }

      setTimeout(() => {
        if (this.state.id !== undefined) {
          this.setState({ loaded: true });
        }
      }, 255);
    });
  }

  handleScroll(e) {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (this.state.scrollDown === true && bottom === true) {
      this.setState({ scrollDown: false });
    } else if (this.state.scrollDown === false && e.target.scrollTop === 0) {
      this.setState({ scrollDown: true });
    }
  }

  generateGenreList() {
    let genreList = '';
    if (this.state.genres) {
      this.state.genres.forEach((item, index) => {
        genreList += item.name;
        if (index < this.state.genres.length - 1) {
          genreList += ', ';
        }
      });
    }
    return genreList;
  }

  render() {
    if (this.props.movieData === undefined) {
      return null;
    }

    if (this.state.loaded === true) {
      return this.renderCard();
    } else {
      return (
        <span className="text">
          Loading...
          <Spinner
            size={45}
            spinnerColor={'#c5c6c7'}
            spinnerWidth={3}
            visible={true}
          />
        </span>
      );
    }
  }

  renderCard() {
    const value = this.state.vote_average * 10;

    let percentColor = 'green-text';
    if (value <= 50) {
      percentColor = 'red-text';
    } else if (value <= 65) {
      percentColor = 'yellow-text';
    }

    let poster =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
    if (this.state.poster_path !== null) {
      poster = 'https://image.tmdb.org/t/p/w500/' + this.state.poster_path;
    }

    let scroll = null;
    let summary = this.state.overview;
    if (this.state.overview.length > 320) {
      if (this.state.scrollDown) {
        scroll = <div className="scroll-down-arrow"></div>;
      } else {
        scroll = <div className="scroll-up-arrow"></div>;
      }
    }

    return (
      <div
        className="card"
        onClick={() => this.props.toggleMovieDetails(this.state.id)}
      >
        <div className="card-header">
          <a
            href={`https://www.imdb.com/title/${this.state.imdb_id}`}
            className="imdb_logo"
            id="no_text"
            alt={`Link to IMDb for ${this.state.title}`}
          >
            IMDb Link for {this.state.title}
          </a>
          <div className="title-area">
            <span className="title">{this.state.title}</span>
            <h5 className="genre-list">{this.generateGenreList()}</h5>
          </div>
          <span className="votes">
            <span className="user-score">User Score:</span>
            <br />
            <span className="percent alt-text">%</span>
            <span className="vote" id={`${percentColor}`}>
              {value}
            </span>
          </span>
        </div>
        <img src={poster} alt={`Movie poster for ${this.state.title}`}></img>
        <span className="catagories alt-text">{`${this.state.tagline}`}</span>
        <div className="writeup">
          {scroll}
          <p className="summary" onScroll={this.handleScroll}>
            {summary}
          </p>
        </div>
        <div className="release-date">
          <span>Release Date:&nbsp;</span>
          <span className="date text">{this.state.release_date}</span>
        </div>
      </div>
    );
  }
}

export default MovieCard;
