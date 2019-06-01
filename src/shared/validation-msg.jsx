import React, { Component } from 'react';

class ValidationMsg extends Component {
    render() {
        return (this.props.messages && this.props.messages.map((msg) => <label className="invalid-input">{msg}</label>) || '')
    }
}

export default ValidationMsg;