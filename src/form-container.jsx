import React, { Component } from 'react';
import Input from './shared/input.jsx';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmp: {
                fullName: {
                    label: 'Name',
                    field: 'fullName',
                    required: true,
                    pattern: /^[a-z A-Z]{4,20}$/,
                    validationMsg: {
                        required: 'Name is is required',
                        pattern: 'Incorrect name format'
                    },
                    validationMsgs: [],
                    value: ''
                },
                email: {
                    label: 'Email',
                    field: 'email',
                    required: true,
                    pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                    validationMsg: {
                        required: 'Email is is required',
                        pattern: 'Incorrect Email format'
                    },
                    validationMsgs: [],
                    value: ''
                },
                age: {
                    label: 'Age',
                    field: 'age',
                    required: true,
                    pattern: /^\d{1,3}$/,
                    validationMsg: {
                        required: 'Age is is required',
                        pattern: 'Incorrect Age format'
                    },
                    validationMsgs: [],
                    value: ''
                }
            }
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.isFormValid()) {
            //do api call
            console.log('Form Valid');
        }
    }

    setValidation(obj) {
        if (obj) {
            if (obj.required && (!obj.value || (obj.value && obj.value.length == 0))) {
                obj.validationMsgs.push(obj.validationMsg.required);
            }
            else if (obj.pattern 
                && (obj.value && obj.value.toString().length > 0 && !obj.pattern.test(obj.value))) {
                    obj.validationMsgs.push(obj.validationMsg.pattern);
            }
        }
        return obj;
    }

    isFormValid() {
        let isValid = true;
        let curState = this.state.newEmp;
        Object.keys(this.state.newEmp).forEach(function(key) {
            curState[key] = this.setValidation({ ...this.state.newEmp[key], validationMsgs:[] });
            isValid = isValid && this.state.newEmp[key].validationMsgs.length == 0;
        }.bind(this));

        this.setState((prvState) => {
            return {
                newEmp: { ...curState }
            }
        });

        return isValid;
    }

    handleInput(e) {
        let trg = e.target;
        this.setState((prvState) => {
            return {
                newEmp: {
                    ...prvState.newEmp, [trg.name]: this.setValidation({ ...prvState.newEmp[trg.name], validationMsgs:[], value: trg.value })
                }
            }
        }, () => console.log(this.state.newEmp))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <Input
                    context={this.state.newEmp.fullName}
                    handleChange={this.handleInput.bind(this)}></Input>
                <Input
                    context={this.state.newEmp.email}
                    handleChange={this.handleInput.bind(this)}></Input>
                <Input
                    context={this.state.newEmp.age}
                    handleChange={this.handleInput.bind(this)}></Input>
                <button onClick={this.handleSubmit.bind(this)}>Submit</button>
            </form>
        );
    }
}

export default FormContainer;