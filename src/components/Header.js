import React, { Component } from 'react';
import { AutoComplete } from './AutoComplete';
export class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>The Movie Site</h1>
          <AutoComplete movieSearch={this.props.movieSearch} />
        </header>
      </div>
    );
  }
}

export default Header;
