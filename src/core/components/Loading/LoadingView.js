import React from 'react';
import { Loader, LoadingOverlay } from 'react-overlay-loader';
import PropTypes from 'prop-types';

const LoadingView = ({ isFetching, children }) => (
  <LoadingOverlay>
    <Loader loading={isFetching} />
    <fieldset disabled={isFetching}>
      {children}
    </fieldset>

  </LoadingOverlay>
);

LoadingView.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element).isRequired,
  ]).isRequired,
};
export default LoadingView;
