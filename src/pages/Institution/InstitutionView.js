import React from 'react';
import {
  Container, Table,
} from 'reactstrap';
import PropTypes from 'prop-types';

const InstitutionView = ({ institutions, deleteInstitution, modifyInstitution }) => (
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
            <tr>
              <td>{institution.name}</td>
              <td>{institution.address}</td>
              <td>{institution.adminName}</td>
              <td>{institution.measurementCount}</td>
              <td className="p-2">
                <i onClick={() => modifyInstitution(institution._id)} role="presentation" className="fas fa-edit" />
                &nbsp;
                <i onClick={() => deleteInstitution(institution._id)} role="presentation" className="fas fa-trash" />
              </td>
            </tr>
          ))
        }

      </tbody>
    </Table>
  </Container>
);

InstitutionView.propTypes = {
  institutions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteInstitution: PropTypes.func.isRequired,
  modifyInstitution: PropTypes.func.isRequired,
};

export default InstitutionView;
