import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

const ModalView = ({
  isOpen, toggle, children, title, onSubmit, isSubmitDisabled,
}) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>{title}</ModalHeader>
    <ModalBody>
      {children}
    </ModalBody>
    <ModalFooter>
      <Button disabled={isSubmitDisabled} color="primary" onClick={onSubmit}>Save</Button>{' '}
      <Button color="secondary" onClick={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
);

ModalView.defaultProps = {
  title: 'Modal title',
  isSubmitDisabled: false,
};

ModalView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isSubmitDisabled: PropTypes.bool,
};

export default ModalView;
