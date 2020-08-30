import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormFields from '../../utils/FormFields';
import {valdiate} from '../../utils/misc';
import {promotions} from '../../../firebase'

class Enroll extends Component {
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
            promotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
            .then((snapshot)=>{
                if(snapshot.val() === null){
                    promotions.push(dataToSubmit)
                    this.successForm(true)
                }
                else{
                    this.successForm(false)
                }
            })
        }
        else{
            this.setState({formError: true})
        }
    }
    successForm = (type) => {
        const newFormData = {...this.state.formData}
        for(let key in newFormData){
            newFormData[key].value = ''
            newFormData[key].valid = false
            newFormData[key].validationMessage = ''
        }
        this.setState({formError: false, formData: newFormData, formSuccess: type ? 'Congratulation!' : 'Already On Databse'})
        this.successMessage()
    }
    successMessage = () => {
        setTimeout(() => {
            this.setState({formSuccess: ''})
        }, 2000);
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
            <Fade>
                <div className = 'enroll_wrapper'>
                    <form onSubmit = {(event)=>this.submitForm(event)}>
                        <div className = 'enroll_title'>
                            Enter Your Email
                        </div>
                        <div className = 'enroll_input'>
                            <FormFields id = {'email'} data = {this.state.formData.email} change = {(element)=>this.updateForm(element)}/>
                            {this.state.formError ? <div className = 'error_label'>Something Went Wronng</div> : null}
                            <div className = 'success_label'>{this.state.formSuccess}</div>
                            <button onClick = {(event)=>this.submitForm(event)}>Enroll</button>
                            <div className = 'enroll_discl'>
                                Lorem Ipsum
                            </div>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}
 
export default Enroll;