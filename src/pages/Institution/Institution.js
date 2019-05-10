import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InstitutionView from './InstitutionView';
import Loading from '../../core/components/Loading';

export default class Institution extends Component {
  async componentDidMount() {
    const { fetchInstitutions } = this.props;
    await fetchInstitutions();
  }

  render() {
    const { isFetching } = this.props;
    return (
      <Loading isFetching={isFetching}>
        <InstitutionView {...this.props} />
      </Loading>
    );
  }
}

Institution.propTypes = {
  fetchInstitutions: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};
