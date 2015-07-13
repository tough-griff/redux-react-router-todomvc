import { PropTypes } from 'react';

export const todoShape = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired
};
