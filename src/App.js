import React from 'react';
import './App.css';
import Header from './components/Header';
import QuoteTicker from './components/QuoteTicker';
import Cards from './components/Cards';
import Footer from './components/Footer';
import { getTMDbPopularMovies, throwCommonError } from './api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.movieSearch = this.movieSearch.bind(this);
    this.updateList = this.updateList.bind(this);
    this.state = {
      movieID: 0,
      listID: 0,
      choice: [
        {
          id: 0,
          title: 'Most Popular',
          selected: false,
          key: 'selection'
        },
        {
          id: 1,
          title: 'Upcoming',
          selected: false,
          key: 'selection'
        },
        {
          id: 2,
          title: 'Top Rated',
          selected: false,
          key: 'selection'
        },
        {
          id: 3,
          title: 'Now Playing',
          selected: false,
          key: 'selection'
        }
      ]
    };
  }

  componentDidMount() {
    fetch(getTMDbPopularMovies())
      .then(res => res.json())
      .then(movies => {
        this.setState({
          movieList: movies['results']
        });
      })
      .catch(err => {
        throwCommonError(err);
      });
  }

  movieSearch(movieID = 0) {
    this.setState({ movieID });
  }

  updateList(listID = 0) {
    this.setState({ listID });
  }

  render() {
    return (
      <div className="App">
        <Header
          movieSearch={this.movieSearch}
          list={this.state.choice}
          update={this.updateList}
        />

        <QuoteTicker movieSearch={this.movieSearch} />
        <Cards
          movies={this.state.movieList}
          movieID={this.state.movieID}
          movieSearch={this.movieSearch}
        />

        <Footer />
      </div>
    );
  }
}

export default App;
