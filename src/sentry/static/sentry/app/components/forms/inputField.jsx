import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import FormField from './formField';

export default class InputField extends FormField {
  constructor(props) {
    super(props);

    this.state.value = (
      props.value !== '' ? props.value : (props.defaultValue || '')
    );
  }

  // XXX(dcramer): this comes from TooltipMixin
  componentDidMount() {
    this.attachTooltips();
  }

  componentWillUnmount() {
    this.removeTooltips();
    jQuery(ReactDOM.findDOMNode(this)).unbind();
  }

  attachTooltips() {
    jQuery('.tip', ReactDOM.findDOMNode(this))
      .tooltip();
  }

  removeTooltips() {
    jQuery('.tip', ReactDOM.findDOMNode(this))
      .tooltip('destroy');
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    }, () => {
      this.props.onChange(this.state.value);
    });
  }

  render() {
    let className = 'control-group';
    if (this.props.error) {
      className += ' has-error';
    }
    return (
      <div className={className}>
        <div className="controls">
          <label className="control-label">{this.props.label}</label>
          {this.props.disabled && this.props.disabledReason &&
            <span className="disabled-indicator tip" title={this.props.disabledReason}>
              <span className="icon-question" />
            </span>
          }
          <input type={this.getType()}
                 name={this.props.name}
                 className="form-control"
                 placeholder={this.props.placeholder}
                 onChange={this.onChange.bind(this)}
                 disabled={this.props.disabled}
                 value={this.state.value} />
          {this.props.help &&
            <p className="help-block">{this.props.help}</p>
          }
          {this.props.error &&
            <p className="error">{this.props.error}</p>
          }
        </div>
      </div>
    );
  }
}
