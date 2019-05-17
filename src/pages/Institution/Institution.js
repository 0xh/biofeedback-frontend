import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InstitutionView from './InstitutionView';
import Loading from '../../core/components/Loading';

const modalTypes = {
  CREATE: 'CREATE',
  MODIFY: 'MODIFY',
};

export default class Institution extends Component {
  state = {
    isOpen: false,
    modifiedInstitution: undefined,
    modalType: modalTypes.CREATE,
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
      modalType: modalTypes.MODIFY,
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
    this.setState({ modifiedInstitution: undefined });
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

  handleCreateInstitution = () => {
    this.setState({
      isOpen: true,
      modifiedInstitution: undefined,
      modalType: modalTypes.CREATE,
    });
  }

  createInstitution = async () => {
    const { modifiedInstitution } = this.state;
    const { createInstitution, assignAdmin } = this.props;
    const { adminId, ...newInstitution } = modifiedInstitution;
    this.setState({ isOpen: false });
    await createInstitution(newInstitution);
    if (adminId !== undefined) {
      const { institutions } = this.props;
      const newlyCreatedInstitution = institutions[institutions.length - 1];
      await assignAdmin(newlyCreatedInstitution._id, adminId);
    }
    this.setState({ modifiedInstitution: undefined });
  }

  toggle = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }))

  render() {
    const { isFetching } = this.props;
    const { modalType } = this.state;
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
          toggle={this.toggle}
          handleCreateInstitution={this.handleCreateInstitution}
          createInstitution={this.createInstitution}
          onSubmit={modalType === modalTypes.MODIFY
            ? this.modifyInstitution
            : this.createInstitution}
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
  createInstitution: PropTypes.func.isRequired,
};
