import React, { Component } from 'react';
import { AutoComplete } from './AutoComplete';
import { DropDown } from './DropDown';

export class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <DropDown
            title={'Most Popular'}
            list={this.props.list}
            update={this.props.update}
          />
          <h1>The Movie Site</h1>
          <AutoComplete movieSearch={this.props.movieSearch} />
        </header>
      </div>
    );
  }
}

export default Header;
