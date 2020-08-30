import React, { Component } from 'react';
import FormFields from '../utils/FormFields';
import {valdiate} from '../utils/misc';
import {firebase} from '../../firebase'

class Login extends Component {
    state = { 
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'emailInput',
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'passwordInput',
                    type: 'password',
                    placeholder: 'Enter your Password'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            }
        }
    }
    submitForm = (event) => {
        event.preventDefault()
        let dataToSubmit = {}
        let formIsValid = true
        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value
            formIsValid = this.state.formData[key].valid && formIsValid
        }
        if(formIsValid){
            firebase.auth().signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
            .then(()=>{
                this.props.history.push('/dashboard')
            }).catch(e=>{
                this.setState({formError: true})
            })
        }
        else{
            this.setState({formError: true})
        }
    }
    updateForm = (element) => {
        const newFormData = {...this.state.formData}
        const newElement = {...newFormData[element.id]}
        newElement.value = element.event.target.value
        let validData = valdiate(newElement)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]
        newFormData[element.id] = newElement
        this.setState({formData: newFormData, formError: false})
    }
    render() { 
        return ( 
            <div className = 'container'>
                <div className = 'signin_wrapper' style = {{margin: '100px'}}>
                    <form onSubmit = {(event)=> this.submitForm(event)}>
                        <h2>Please Login</h2>
                        <FormFields id = {'email'} data = {this.state.formData.email} change = {(element)=>this.updateForm(element)}/>
                        <FormFields id = {'password'} data = {this.state.formData.password} change = {(element)=>this.updateForm(element)}/>
                        {this.state.formError ? <div className = 'error_label'>Something Went Wrong</div> : null}
                        <button onClick = {(event)=>this.submitForm(event)}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default Login;