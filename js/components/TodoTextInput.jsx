import React, { PropTypes } from 'react';

const ENTER_KEY_CODE = 13;

/**
 * General purpose text input component.
 */
const TodoTextInput = React.createClass({
  propTypes: {
    className: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onSave: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      value: this.props.value || ''
    };
  },

  // FIXME: properly register blur events on the input field.
  handleBlur() {
    this.props.onSave(this.state.value.trim());
    this.setState({
      value: ''
    });
  },

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  },

  handleKeyDown(e) {
    if (e.keyCode !== ENTER_KEY_CODE) return;

    this.props.onSave(this.state.value.trim());
    this.setState({
      value: ''
    });
  },

  render() {
    const { className, placeholder } = this.props;
    const { value } = this.state;

    return (
      <input
        className={className}
        placeholder={placeholder}
        value={value}
        autoFocus={true}
        type="text"
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
});

export default TodoTextInput;
