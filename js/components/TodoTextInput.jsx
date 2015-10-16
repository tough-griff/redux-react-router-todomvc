import React, { Component, PropTypes } from 'react';

const ENTER_KEY_CODE = 13;

/**
 * General purpose text input component.
 */
export default class TodoTextInput extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
  }

  state = {
    value: this.props.value || ''
  }

  // FIXME: properly register blur events on the input field.
  onBlur = () => {
    this.props.onSave(this.state.value.trim());
    this.setState({
      value: ''
    });
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  onKeyDown = (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) return;

    this.props.onSave(this.state.value.trim());
    this.setState({
      value: ''
    });
  }

  render() {
    const { className, placeholder } = this.props;
    const { value } = this.state;

    return (
      <input
        autoFocus
        className={className}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    );
  }
}
