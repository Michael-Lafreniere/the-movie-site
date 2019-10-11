import React, { Component } from 'react';
import { AutoComplete } from './AutoComplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faCheckCircle
} from '@fortawesome/fontawesome-free-solid';
// FontAwesome = require('react-fontawesome');

export class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      title: this.props.title
    };
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    const { listOpen } = this.state;
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  select(title, id, key) {
    this.setState(
      {
        title: title,
        selected: id,
        key: key,
        listOpen: false
      }
      // this.props.resetThenSet(id, stateKey)
    );
  }

  close() {
    this.setState({
      listOpen: false
    });
  }

  toggleList() {
    this.setState({ listOpen: !this.state.listOpen });
  }

  render() {
    const { list } = this.props;
    const { listOpen, title } = this.state;

    return (
      <div className="drop-down-wrapper">
        <div className="drop-down-header" onClick={() => this.toggleList()}>
          <div className="drop-down-header-title">{title}</div>
          <div className="drop-down-arrow">
            {listOpen ? (
              <FontAwesomeIcon icon={faArrowUp} />
            ) : (
              <FontAwesomeIcon icon={faArrowDown} />
            )}
          </div>
        </div>
        {listOpen && (
          <ul className="drop-down-list" onClick={e => e.stopPropagation()}>
            {list.map(item => (
              <li
                className="drop-down-list-item"
                key={item.id}
                onClick={() => this.select(item.title, item.id, item.key)}
              >
                {item.title}{' '}
                {item.selected === item.id ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      choice: [
        {
          id: 0,
          title: 'Most Popular',
          selected: false,
          key: 'selection'
        },
        {
          id: 1,
          title: 'Recently Released',
          selected: false,
          key: 'selection'
        },
        {
          id: 2,
          title: 'User Rated',
          selected: false,
          key: 'selection'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <header>
          <DropDown title={'Most Popular'} list={this.state.choice} />
          <h1>The Movie Site</h1>
          <AutoComplete movieSearch={this.props.movieSearch} />
        </header>
      </div>
    );
  }
}

export default Header;
