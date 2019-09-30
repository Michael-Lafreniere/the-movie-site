import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/fontawesome-free-solid';

export const CloseButton = ({ position, toggleWindow }) => {
  const buttonClass = `close-button ${position}`;
  return (
    <button className={buttonClass} onClick={() => toggleWindow()}>
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="transparent-background"
      />
    </button>
  );
};
