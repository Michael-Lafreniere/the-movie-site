import React, { Component } from 'react';
import { DetailedCastCard } from './DetailedCastCard';
import { VideoPlayer } from './VideoPlayer';
import { Reviews } from './Reviews';
import { CloseButton } from './CloseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faAddressCard
} from '@fortawesome/fontawesome-free-solid';
import {
  fetchData,
  getTMDbMovie,
  getTMDbCastCrewInfo,
  getTMDbVideos,
  formatMoney
} from '../api';

export class CastCard extends Component {
  render() {
    let person = this.props.person;

    let image =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
    if (person.profile_path !== null) {
      image =
        'https://image.tmdb.org/t/p/w138_and_h175_face' + person.profile_path;
    }

    return (
      <li>
        <div
          className="cast-info"
          onClick={() => this.props.toggleCastCard(person.id)}
        >
          <img src={image} alt={person.name}></img>
          <br />
          <span id="white-text">{person.name}</span>
          <br />
          <span className="character-name text">{person.character}</span>
        </div>
      </li>
    );
  }
}

export class MovieDetails extends Component {
  constructor() {
    super();
    this.toggleTrailer = this.toggleTrailer.bind(this);
    this.toggleReviews = this.toggleReviews.bind(this);
    this.toggleCastCard = this.toggleCastCard.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      loaded: false,
      castInfoOpen: false,
      playTrailer: false,
      openReviews: false,
      scrollDown: true
    };
  }

  componentDidMount() {
    fetchData(getTMDbMovie(this.props.movieID), movie => {
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

      fetchData(getTMDbCastCrewInfo(this.props.movieID), castCrew => {
        this.setState({
          cast: castCrew.cast
        });
      });

      fetchData(getTMDbVideos(this.props.movieID), videos => {
        this.setState({
          videos: videos.results
        });
      });

      // Wait a short period before checking everything has loaded successfully before attempting to render:
      setTimeout(() => {
        if (
          this.state.id !== undefined &&
          this.state.cast !== undefined &&
          this.state.videos !== undefined
        ) {
          this.setState({ loaded: true });
        }
      }, 150);
    });
  }

  toggleCastCard(personID) {
    this.setState({
      castInfoOpen: !this.state.castInfoOpen,
      personID
    });
  }

  toggleTrailer() {
    if (this.state.videos.length > 0) {
      this.setState({
        playTrailer: !this.state.playTrailer
      });
    }
  }

  toggleReviews() {
    this.setState({ openReviews: !this.state.openReviews });
  }

  generateGenreList(data) {
    let list = '';
    if (data) {
      data.forEach((item, index) => {
        list += item.name;
        if (index < data.length - 1) {
          list += ', ';
        }
      });
    }
    return list;
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

  render() {
    if (this.state.loaded === false) {
      return null;
    }

    const genreList = this.generateGenreList(this.state.genres);
    const companyList = this.generateGenreList(this.state.production_companies);
    const userRatings = this.state.vote_average * 10;

    let poster =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
    if (this.state.poster_path !== null) {
      poster = 'https://image.tmdb.org/t/p/w500/' + this.state.poster_path;
    }

    let releaseDate = this.state.status;
    if (releaseDate === 'Released') {
      releaseDate = this.state.release_date;
    }

    let revenue = '-';
    if (this.state.revenue > 0) {
      revenue = formatMoney(this.state.revenue, 0);
    }

    let percentColor = 'green-text';
    if (userRatings <= 50) {
      percentColor = 'red-text';
    } else if (userRatings <= 65) {
      percentColor = 'yellow-text';
    }

    let videoTrailer = null;
    if (
      this.state.videos !== undefined &&
      this.state.videos[0].site === 'YouTube'
    ) {
      videoTrailer = (
        <span
          onClick={this.toggleTrailer}
          className="white-to-yellow-hover-text animate-link pointer"
        >
          <FontAwesomeIcon icon={faPlayCircle} className="play-button" /> Play
          Trailer
        </span>
      );
    } else {
      videoTrailer = <span className="no-trailer">No Trailer Available</span>;
    }

    let videoPlayer = null;
    if (
      this.state.playTrailer === true &&
      this.state.videos[0].site === 'YouTube'
    ) {
      videoPlayer = (
        <VideoPlayer
          toggleFunction={this.toggleTrailer}
          trailerID={this.state.videos[0].key}
        />
      );
    }

    let reviews = null;
    if (this.state.openReviews === true) {
      reviews = (
        <Reviews movieID={this.state.id} toggleFunction={this.toggleReviews} />
      );
    }

    let cast = null;
    let scroll = null;
    if (this.state.cast !== undefined) {
      if (this.state.cast.length > 5) {
        if (this.state.scrollDown) {
          scroll = <div className="scroll-down-arrow scroll-position"></div>;
        } else {
          scroll = <div className="scroll-up-arrow scroll-position"></div>;
        }
      }
      cast = this.state.cast.map((person, index) => {
        return (
          <CastCard
            key={index}
            person={person}
            toggleCastCard={this.toggleCastCard}
          />
        );
      });
    }

    let castCard = null;
    if (this.state.castInfoOpen === true) {
      castCard = (
        <DetailedCastCard
          personID={this.state.personID}
          toggleDetails={this.toggleCastCard}
        />
      );
    }

    let closeButton = null;
    if (
      this.state.castInfoOpen === false &&
      this.state.playTrailer === false &&
      this.state.openReviews === false
    ) {
      closeButton = (
        <CloseButton
          position={'movie-detail-close-button-position'}
          toggleWindow={this.props.toggleDetails}
        />
      );
    }

    return (
      <div className="popup">
        <div
          className="movie-detail-outer-box"
          style={{
            background: `linear-gradient(
              rgba(0, 0, 0, 0.85) 15%,
              rgba(0, 0, 0, 0.2) 40%,
              #000 90%
            ), url(https://image.tmdb.org/t/p/original${this.state.backdrop_path}) no-repeat`,
            backgroundSize: 'cover'
          }}
        >
          <div className="movie-details-inner-box">
            {closeButton}
            <div
              className="poster"
              style={{
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${poster})`
              }}
            ></div>
            <div className="title-tagline">
              <h1>{this.state.title}</h1>
              <span>{this.state.tagline}</span>
            </div>
            <div className="writeup">
              <span>{this.state.overview}</span>
            </div>
            <div className="catagories-companies">
              <span className="catagories">{genreList}</span>
              <br />
              <span className="company">{companyList}</span>
            </div>
            <div className="cast">
              {scroll}
              <ul onScroll={this.handleScroll}>{cast}</ul>
              {castCard}
            </div>
            <div className="extra">
              <div className="runtime">
                <span id="white-text">Run Time:</span>
                <br />
                <span className="text">{this.state.runtime} mins</span>
              </div>
              <div className="trailer">
                {videoTrailer}
                {videoPlayer}
              </div>
              <div className="release-date">
                <div className="float-right" id="white-text">
                  Release Date:
                </div>
                <br />
                <div className="text float-right">{releaseDate}</div>
              </div>
              <div className="profit">
                <span id="white-text">Revenue:</span>
                <br />
                <span className="text">${revenue}</span>
              </div>
              <div className="reviews">
                <span
                  className="white-to-yellow-hover-text animate-link"
                  onClick={this.toggleReviews}
                >
                  <FontAwesomeIcon icon={faAddressCard} className="alt-text" />{' '}
                  Reviews
                </span>
                {reviews}
              </div>
              <div className="user-rating">
                <div className="float-right" id="white-text">
                  User Score:
                </div>
                <br />
                <div className="float-right" id={`${percentColor}`}>
                  {userRatings}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
