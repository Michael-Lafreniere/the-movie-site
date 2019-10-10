import React, { Component } from 'react';
import { CloseButton } from './CloseButton';
import Spinner from 'react-spinner-material';
import { getTMDbPersonInfo, getTMDbSocialMediaInfo } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

const PersonalData = ({ text, body }) => {
  if (text === null || body === null) {
    return null;
  }

  return (
    <li>
      <div className="general">
        <strong>{text}:</strong>
        <div className="personal-data">{body}</div>
      </div>
    </li>
  );
};

const SocialMedia = ({ facebookID, twitterID, instagramID }) => {
  let facebook = null;
  let twitter = null;
  let instagram = null;

  if (facebookID !== null && twitterID.length > 0) {
    facebook = (
      <a href={`https://www.facebook.com/${facebookID}`}>
        <FontAwesomeIcon
          icon={faFacebook}
          className="white-to-yellow-hover-text icon transparent-background"
        />
      </a>
    );
  }

  if (twitterID !== null && twitterID.length > 0) {
    twitter = (
      <a href={`https://www.twitter.com/${twitterID}`}>
        <FontAwesomeIcon
          icon={faTwitter}
          className="white-to-yellow-hover-text icon transparent-background"
        />
      </a>
    );
  }

  if (instagramID !== null && twitterID.length > 0) {
    instagram = (
      <a href={`https://www.instagram.com/${instagramID}`}>
        <FontAwesomeIcon
          icon={faInstagram}
          className="white-to-yellow-hover-text icon transparent-background"
        />
      </a>
    );
  }

  return (
    <div className="social-media">
      {facebook}
      {twitter}
      {instagram}
    </div>
  );
};

export class DetailedCastCard extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    getTMDbPersonInfo(this.props.personID).then(person => {
      this.setState({
        id: person.id,
        name: person.name,
        known_for: person.known_for_department,
        birthday: person.birthday,
        deathDate: person.deathday,
        biography: person.biography,
        place_of_birth: person.place_of_birth,
        profile_path: person.profile_path,
        homepage: person.homepage,
        imdb_id: person.imdb_id
      });
    });

    getTMDbSocialMediaInfo(this.props.personID).then(social => {
      this.setState({
        facebook: social.facebook_id,
        twitter: social.twitter_id,
        instagram: social.instagram_id
      });
    });

    setTimeout(() => {
      if (this.state.id !== undefined) {
        this.setState({ loaded: true });
      }
    }, 175);
  }

  render() {
    if (this.state.loaded === true) {
      return this.renderCard();
    } else {
      return (
        <span className="text">
          Loading...
          <Spinner
            size={75}
            spinnerColor={'#c5c6c7'}
            spinnerWidth={3}
            visible={true}
          />
        </span>
      );
    }
  }

  renderCard() {
    let knownFor = this.state.known_for;
    if (this.state.known_for === 'Acting') {
      knownFor = 'Actor';
    }

    const noData = '-';

    let birthDay = noData;
    if (this.state.birthday !== null) {
      birthDay = this.state.birthday;
    }

    let deathDate = null;
    if (this.state.deathDate !== null) {
      deathDate = this.state.deathDate;
    }

    let placeOfBirth = noData;
    if (this.state.place_of_birth !== null) {
      placeOfBirth = this.state.place_of_birth;
    }

    let homePage = null;
    if (this.state.homepage !== null) {
      homePage = (
        <div className="homepage">
          <a href={this.state.homepage}>
            <span className="homepage white-to-yellow-hover-text icon">
              Home Page
            </span>
          </a>
        </div>
      );
    }

    return (
      <div className="card-shaded-background">
        <div className="cast-card">
          <CloseButton
            position={'cast-card-close-button-position'}
            toggleWindow={this.props.toggleDetails}
          />
          <div
            className="image"
            style={{
              overflow: 'hidden',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url(
                  https://image.tmdb.org/t/p/w300/${this.state.profile_path}
                )`
            }}
          ></div>
          <div className="name">
            <strong>{this.state.name}</strong>
            <div className="known-for">{knownFor}</div>
          </div>
          <div className="bio">
            <strong>Biography:</strong>
            <div className="text">{this.state.biography}</div>
          </div>
          <div className="personal">
            <ul>
              <PersonalData text={'Birthday'} body={birthDay} />
              <PersonalData text={'Place of Birth'} body={placeOfBirth} />
              <PersonalData text={'Date of Death'} body={deathDate} />
            </ul>
          </div>
          <div className="social">
            <SocialMedia
              facebookID={this.state.facebook}
              twitterID={this.state.twitter}
              instagramID={this.state.instagram}
            />
            {homePage}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailedCastCard;
