import React, { Component } from 'react';
import ValidationMsg from './validation-msg';

class Input extends Component {
    render() {
        return (
            <div className="form-group">
                <label className="form-label" for={this.props.context.label}>{this.props.context.label}</label>
                <input 
                    id={this.props.context.label}
                    name={this.props.context.field}
                    type={this.props.context.type}
                    value={this.props.context.value}
                    placeholder={this.props.context.placeholder}
                    onChange={this.props.handleChange}></input>
                <ValidationMsg messages={this.props.context.validationMsgs}></ValidationMsg>
            </div>
        );
    }
}

export default Input;