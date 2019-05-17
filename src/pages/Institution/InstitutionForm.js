import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import Dropdown from '../../core/components/Dropdown';

const InstitutionForm = ({ admins, modifiedInstitution, onFieldChange }) => (
  <Form>
    <FormGroup>
      <Label for="name">Name</Label>
      <Input onChange={onFieldChange} value={modifiedInstitution.name} type="text" name="name" id="name" placeholder="Institution name..." />
    </FormGroup>

    <FormGroup>
      <Label for="address">Address</Label>
      <Input onChange={onFieldChange} value={modifiedInstitution.address} type="text" name="address" id="address" placeholder="Institution address..." />
    </FormGroup>

    <FormGroup>
      <Label for="adminId">Measurement admin</Label>
      <Dropdown
        id="adminId"
        options={admins}
        onChange={({ id, value }) => onFieldChange({ target: { id, value } })}
        selected={modifiedInstitution.adminId}
        placeholder="Select measurement admin"
      />
    </FormGroup>

    <FormGroup>
      <Label for="measurementCount">Maximum measurements</Label>
      <Input onChange={onFieldChange} value={modifiedInstitution.measurementCount} type="number" name="measurementCount" id="measurementCount" placeholder="Measurement limit" />
    </FormGroup>
  </Form>
);

InstitutionForm.defaultProps = {
  modifiedInstitution: {
    name: '',
    address: '',
    adminId: '',
    measurementCount: 0,
  },
};

InstitutionForm.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.string,
  })).isRequired,
  modifiedInstitution: PropTypes.shape({}),
  onFieldChange: PropTypes.func.isRequired,
};

export default InstitutionForm;
