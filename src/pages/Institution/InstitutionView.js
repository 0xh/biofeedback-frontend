import React from 'react';
import {
  Container, Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Modal from '../../core/components/Modal';
import InstitutionForm from './InstitutionForm';

const InstitutionView = ({
  institutions,
  deleteInstitution,
  selectInstitution,
  isOpen,
  modifiedInstitution,
  modifyInstitution,
  toggle,
  ...modalProps
}) => (
  <>
    <Container>
      <h1>Institutions</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Admin name</th>
            <th>Measurement Limit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
          institutions.map(institution => (
            <tr key={institution._id}>
              <td>{institution.name}</td>
              <td>{institution.address}</td>
              <td>{institution.adminName}</td>
              <td>{institution.measurementCount}</td>
              <td className="p-2">
                <i onClick={() => selectInstitution(institution._id)} role="presentation" className="fas fa-edit" />
                &nbsp;
                <i onClick={() => deleteInstitution(institution._id)} role="presentation" className="fas fa-trash" />
              </td>
            </tr>
          ))
        }

        </tbody>
      </Table>
    </Container>

    <Modal
      title="Modify institution"
      isOpen={isOpen}
      onSubmit={modifyInstitution}
      toggle={toggle}
    >
      {
      modifiedInstitution && (
      <InstitutionForm
        {...modalProps}
        modifiedInstitution={modifiedInstitution}
      />
      )
    }
    </Modal>
  </>
);

InstitutionView.propTypes = {
  institutions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteInstitution: PropTypes.func.isRequired,
  selectInstitution: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modifiedInstitution: PropTypes.shape({}).isRequired,
  modifyInstitution: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default InstitutionView;
