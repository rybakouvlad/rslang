import React from 'react';
import { Spinner } from 'react-bootstrap';

export const SpinnerZ: React.FC = () => {
  return (
    <Spinner className="spinner_our_game" animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};
