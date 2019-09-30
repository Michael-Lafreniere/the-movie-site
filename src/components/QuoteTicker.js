import React, { Component } from 'react';

// Quotes sourced from: https://bestlifeonline.com/funny-movie-quotes/

export class Quote extends Component {
  onClick() {
    this.props.movieSearch(this.props.movieID);
  }

  render() {
    const data = this.props;
    return (
    <li onClick={this.onClick.bind(this)}>
      {data.quote} <cite>{data.name} ({data.year})</cite>
    </li>
    );
  }
}

export class QuoteTicker extends Component {
  render() {
    return (
      <div className="quote-ticker">
        <div className="quote">
          <span>Movie Quote:</span>
          <ul>
            <Quote quote={"I’m about to do to you what Limp Bizkit did to music in the late ’90s."} name={"Deadpool"} year={"2016"} movieID={293660} movieSearch={this.props.movieSearch} />
            <Quote quote={"I’m just one stomach flu away from my goal weight."} name={"The Devil Wears Prada"} year={"2006"}  movieID={350} movieSearch={this.props.movieSearch} />
            <Quote quote={"I am serious. And don’t call me Shirley."} name={"Airplane"} year={"1980"}  movieID={813} movieSearch={this.props.movieSearch} />
            <Quote quote={"It’s like I have ESPN or something."} name={"Mean Girls"} year={"2004"}  movieID={10625} movieSearch={this.props.movieSearch} />
          </ul>
        </div>
      </div>  
    );
  }
}

export default QuoteTicker;
