import React, { Component } from 'react';

// Quotes sourced from: https://bestlifeonline.com/funny-movie-quotes/

export class QuoteTicker extends Component {
  render() {
    return (
      <div className="quote-ticker">
        <div className="quote">
          <span>Movie Quote:</span>
          <ul>
            <li>
              <a href="/">
                I’m about to do to you what Limp Bizkit did to music in the late
                ’90s. <cite>Deadpool (2016)</cite>
              </a>
            </li>
            <li>
              <a href="/">
                I’m just one stomach flu away from my goal weight.
                <cite>The Devil Wears Prada (2006)</cite>
              </a>
            </li>
            <li>
              <a href="/">
                I am serious. And don’t call me Shirley.
                <cite>Airplane (1980)</cite>
              </a>
            </li>
            <li>
              <a href="/">
                It’s like I have ESPN or something.
                <cite>Mean Girls (2004)</cite>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default QuoteTicker;
