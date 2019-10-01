import React, { Component } from 'react';
import { CloseButton } from './CloseButton';
import { getTMDbReviews } from '../api';
export class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    if (this.props.movieID !== undefined) {
      getTMDbReviews(this.props.movieID).then(reviews => {
        if (reviews) {
          this.setState({
            reviews: reviews.results
          });
        }
      });
    }

    setTimeout(() => {
      if (this.state.id !== undefined) {
        this.setState({ loaded: true });
      }
    }, 275);
  }

  render() {
    let reviews = null;
    if (this.state.reviews !== undefined) {
      reviews = this.state.reviews.map((review, index) => {
        return (
          <li className="review" key={index}>
            <div className="author">
              <a href={review.url}>{review.author}</a>
            </div>
            <p className="content">{review.content}</p>
          </li>
        );
      });
    }

    let noReviewsFound = (
      <h3
        style={{
          color: 'white',
          background: 'transparent',
          textAlign: 'center',
          paddingTop: '5rem'
        }}
      >
        Currently no reviews available for this movie.
        <br /> Check back soon!
      </h3>
    );

    if (reviews !== null && reviews.length > 0) {
      noReviewsFound = null;
    }

    return (
      <div className="card-shaded-background">
        <div className="review-box">
          <CloseButton
            position={'cast-card-close-button-position'}
            toggleWindow={this.props.toggleFunction}
          />
          <h1>Reviews</h1>
          {noReviewsFound}
          <ul>{reviews}</ul>
        </div>
      </div>
    );
  }
}

export default Reviews;
