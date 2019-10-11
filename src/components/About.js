import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/fontawesome-free-solid';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

export const About = ({ toggleAbout }) => (
  <div className="popup">
    <div className="about-box">
      <button
        className="close-button movie-detail-close-button-position"
        onClick={() => toggleAbout()}
      >
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="transparent-background"
        />
      </button>
      <h1>
        <u>About</u>
      </h1>
      <div className="credit">
        <div className="title">Site Design and Programming:</div>
        <div className="who">
          Michael Lafreniere
          <a href="https://github.com/Michael-Lafreniere">
            <FontAwesomeIcon
              icon={faGithub}
              className="white-to-yellow-hover-text icon"
            />
          </a>
          <a href="http://www.twitter.com/">
            <FontAwesomeIcon
              icon={faTwitter}
              className="white-to-yellow-hover-text icon"
            />
          </a>
        </div>
      </div>
      <div className="credit">
        <div className="title">Movie Database Graciously Provided by:</div>
        <div className="who">
          <a href="https://www.themoviedb.org">
            <img
              src="powered-by-square-green-11c0c7f8e03c4f44aa54d5e91d9531aa9860a9161c49f5fa741b730c5b21a1f2.svg"
              alt="The Movie Database Logo"
              width="115rem"
              height="auto"
            ></img>
          </a>
        </div>
      </div>
      <div className="credit">
        <div className="title">Icons Provided By:</div>
        <div className="who">
          <a href="https://fontawesome.com" className="who">
            Font Awesome
          </a>
          <a href="https://github.com/FortAwesome/react-fontawesome">
            <FontAwesomeIcon
              icon={faGithub}
              className="white-to-yellow-hover-text icon"
            />
          </a>
        </div>
      </div>
      <div className="credit">
        <div className="title">Spinner By:</div>
        <div className="who">
          <a
            href="https://github.com/icarus-sullivan/react-spinner-material"
            className="who"
          >
            react-spinner-material
          </a>
          <a href="https://github.com/icarus-sullivan/react-spinner-material">
            <FontAwesomeIcon
              icon={faGithub}
              className="white-to-yellow-hover-text icon"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
);
