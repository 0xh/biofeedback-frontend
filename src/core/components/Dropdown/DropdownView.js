import React from 'react';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';

const DropdownView = ({
  id, options, selected, placeholder, onChange,
}) => (
  <Typeahead
    id={id}
    multiple={false}
    options={options}
    selected={selected ? [selected] : []}
    placeholder={placeholder}
    filterBy={() => true}
    onChange={onChange}
  />
);

DropdownView.defaultProps = {
  selected: undefined,
  placeholder: 'Select item',
};

DropdownView.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf().isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DropdownView;
