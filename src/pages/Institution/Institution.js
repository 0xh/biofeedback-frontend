import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InstitutionView from './InstitutionView';
import Loading from '../../core/components/Loading';

export default class Institution extends Component {
  state = {
    isOpen: false,
    modifiedInstitution: null,
  }

  async componentDidMount() {
    const { fetchInstitutions, fetchUsers } = this.props;
    await fetchInstitutions();
    await fetchUsers();
  }

  deleteInstitution = async (id) => {
    const { deleteInstitution } = this.props;
    await deleteInstitution(id);
  }

  selectInstitution = (id) => {
    const { institutions } = this.props;
    const modifiedInstitution = institutions.find(({ _id }) => _id === id);
    this.setState({
      isOpen: true,
      modifiedInstitution: {
        id,
        name: modifiedInstitution.name,
        address: modifiedInstitution.address,
        adminId: modifiedInstitution.adminId,
        measurementCount: modifiedInstitution.measurementCount,
      },
    });
  }

  modifyInstitution = async () => {
    const { modifiedInstitution } = this.state;
    const { updateInstitution, assignAdmin } = this.props;

    this.setState({ isOpen: false });
    await updateInstitution(modifiedInstitution);
    if (this.adminIdChangedOnModifiedInstitution(modifiedInstitution.id)) {
      const { id, adminId } = modifiedInstitution;
      await assignAdmin(id, adminId);
    }
    this.setState({ modifiedInstitution: null });
  }

  onFieldChange = ({ target: { id, value, type } }) => {
    this.setState(({ modifiedInstitution }) => ({
      modifiedInstitution: {
        ...modifiedInstitution,
        [id]: type === 'number' ? Number.parseInt(value, 10) : value,
      },
    }));
  }

  makeAdminOptions = () => {
    const { admins } = this.props;
    return admins.map(admin => ({
      value: admin._id,
      label: admin.name,
    }));
  }

  adminIdChangedOnModifiedInstitution = (institutionId) => {
    const { institutions } = this.props;
    const institution = institutions.find(({ _id }) => _id === institutionId);
    const { modifiedInstitution } = this.state;

    return institution.adminId !== modifiedInstitution.adminId;
  }

  toggle = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }))

  render() {
    const { isFetching } = this.props;
    const admins = this.makeAdminOptions();

    return (
      <Loading isFetching={isFetching}>
        <InstitutionView
          {...this.props}
          {...this.state}
          deleteInstitution={this.deleteInstitution}
          selectInstitution={this.selectInstitution}
          admins={admins}
          onFieldChange={this.onFieldChange}
          modifyInstitution={this.modifyInstitution}
          toggle={this.toggle}
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
  institutions: PropTypes.arrayOf().isRequired,
  admins: PropTypes.arrayOf().isRequired,
  updateInstitution: PropTypes.func.isRequired,
  assignAdmin: PropTypes.func.isRequired,
};
