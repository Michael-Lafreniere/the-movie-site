import React from 'react';

// Creates a popup window which loads the specified video:

export const VideoPlayer = ({ toggleFunction, trailerID }) => (
  <div className="popup" onClick={() => toggleFunction()}>
    <div className="video-player">
      <iframe
        title="video-player"
        width="99.5%"
        height="99%"
        src={`https://www.youtube.com/embed/${trailerID}?controls=1`}
      ></iframe>
    </div>
  </div>
);
