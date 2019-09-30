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
    this.state = {
      movieID: 0
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

  render() {
    return (
      <div className="App">
        <Header movieSearch={this.movieSearch} />

        <QuoteTicker />
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
