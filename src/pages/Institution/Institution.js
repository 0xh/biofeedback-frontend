import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InstitutionView from './InstitutionView';
import Loading from '../../core/components/Loading';

export default class Institution extends Component {
  async componentDidMount() {
    const { fetchInstitutions, fetchUsers } = this.props;
    await fetchInstitutions();
    await fetchUsers();
  }

  deleteInstitution = async (id) => {
    const { deleteInstitution } = this.props;
    await deleteInstitution(id);
  }

  render() {
    const { isFetching } = this.props;
    return (
      <Loading isFetching={isFetching}>
        <InstitutionView
          {...this.props}
          deleteInstitution={this.deleteInstitution}
        />
      </Loading>
    );
  }
}

Institution.propTypes = {
  fetchInstitutions: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  deleteInstitution: PropTypes.func.isRequired,
};
