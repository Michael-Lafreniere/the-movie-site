import React, { Component } from 'react';
import { About } from './About';

export class Footer extends Component {
  constructor() {
    super();
    this.toggleAbout = this.toggleAbout.bind(this);
    this.state = {
      aboutOpen: false
    };
  }

  toggleAbout() {
    this.setState({ aboutOpen: !this.state.aboutOpen });
  }

  render() {
    let about = null;
    if (this.state.aboutOpen) {
      about = <About toggleAbout={this.toggleAbout} />;
    }

    return (
      <footer>
        <a href="https://www.themoviedb.org">
          <img
            className="tmdb-img"
            src="powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg"
            alt="The Movie Database Logo"
          ></img>
        </a>
        <span>&copy;2019 by Michael Lafreniere</span>
        <span
          className="site-about white-to-yellow-hover-text animate-link"
          onClick={this.toggleAbout}
        >
          About
        </span>
        {about}
      </footer>
    );
  }
}

export default Footer;
