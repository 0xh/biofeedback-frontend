import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownView from './DropdownView';

export default class Dropdown extends Component {
  getSelectedByValue = (options, selected) => {
    const selectedEl = (options || []).find(item => item.value === selected);
    return selectedEl || '';
  }

  onChange = (selected) => {
    const { onChange, id } = this.props;
    const [firstItem] = selected;
    if (!firstItem) return;

    const value = firstItem && firstItem.value ? firstItem.value : '';
    onChange({ value, id }, firstItem);
  }

  render() {
    const { selected, options } = this.props;
    const selectedItem = this.getSelectedByValue(options, selected);
    return (
      <DropdownView
        {...this.props}
        selected={selectedItem}
        onChange={this.onChange}
      />
    );
  }
}

Dropdown.defaultProps = {
  selected: undefined,
};

Dropdown.propTypes = {
  selected: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
