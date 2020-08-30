import React, { Component } from 'react';
import AdminLayout from '../../Hoc/AdminLayout';
import FormFields from '../../utils/FormFields';
import {valdiate} from '../../utils/misc';
import { firebasePlayers, firebaseDatabse, firebase } from '../../../firebase';
import FileUploaders from '../../utils/fileUploader';

class AddEditPlayers extends Component {
    state = { 
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'nameInput',
                    type: 'text',
                    label: 'Player Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastNameInput',
                    type: 'text',
                    label: 'Player Last Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    name: 'numberInput',
                    type: 'text',
                    label: 'Player Number'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    name: 'selectposition',
                    type: 'select',
                    label: 'Select a position',
                    options: [
                        {key: 'Keeper', value: 'Keeper'},
                        {key: 'Defence', value: 'Defence'},
                        {key: 'Midfield', value: 'Midfield'},
                        {key: 'Striker', value: 'Striker'}
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false,

            }
        }
    }
    updateFields = (playerData, playerId, type, url) => {
        const newFormData = {...this.state.formData}
        for(let key in newFormData){
            newFormData[key].value = playerData[key]
            newFormData[key].valid = true
        }
        console.log(newFormData)
        this.setState({
            playerId, 
            formType: type,
            defaultImg: url,
            formData: newFormData
        })
    }
    componentDidMount() {
        const playerId = this.props.match.params.id
        if(!playerId){
            this.setState({formType: 'Add Player'})
        }
        else{
            firebaseDatabse.ref(`players/${playerId}`).once('value').then(snapshot=>{
                const playerData = snapshot.val()
                firebase.storage().ref('players').child(playerData.image).getDownloadURL().then(url=>{
                    this.updateFields(playerData, playerId, 'Edit Player', url)
                }).catch(e=>{
                    this.updateFields({...playerData, image: ''}, playerId, 'Edit Player', '')
                })
            })
        }
    }
    successForm = (message) => {
        this.setState({validationMessage: message})
        setTimeout(() => {
            this.setState({validationMessage: ''})
        }, 2000);
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
            if(this.state.formType === 'Edit Player'){
                firebaseDatabse.ref(`players/${this.state.playerId}`).update(dataToSubmit).then(()=>{
                    this.successForm('Updated Correctly')
                }).catch((e)=>{
                    this.setState({formError: true})
                })
            }
            else{
                firebasePlayers.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_players')
                }).catch((e)=>{
                    this.setState({formError: true})
                })
            }
        }
        else{
            this.setState({formError: true})
        }
    }
    updateForm = (element, content = '') => {
        const newFormData = {...this.state.formData}
        const newElement = {...newFormData[element.id]}
        if(content === ''){
            newElement.value = element.event.target.value
        }
        else{
            newElement.value = content
        }
        let validData = valdiate(newElement)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]
        newFormData[element.id] = newElement
        this.setState({formData: newFormData, formError: false})
    }
    resetImage = () => {
        const newFormData = {...this.state.formData}
        newFormData['image'].value = ''
        newFormData['image'].valid = false
        this.setState({defaultImg: '', formData: newFormData})
    }
    storeFileName = (filename) => {
        this.updateForm({id: 'image'}, filename)
    }
    render() { 
        return ( 
            <AdminLayout>
                <div className = 'editplayers_dialog_wrapper'>
                    <h2>{this.state.formType}</h2>
                    <div>
                        <form onSubmit = {(event)=> this.submitForm(event)}>
                            <FileUploaders dir = 'players' tag = {'Player image'} defaultImg = {this.state.defaultImg} defaultImgName = {this.state.formData.image.value} resetImage = {()=> this.resetImage()} filename = {(filename)=> this.storeFileName(filename)}/>
                            <FormFields id = {'name'} data = {this.state.formData.name} change = {(element)=>this.updateForm(element)}/>
                            <FormFields id = {'lastname'} data = {this.state.formData.lastname} change = {(element)=>this.updateForm(element)}/>
                            <FormFields id = {'number'} data = {this.state.formData.number} change = {(element)=>this.updateForm(element)}/>
                            <FormFields id = {'position'} data = {this.state.formData.position} change = {(element)=>this.updateForm(element)}/>
                            <div className = 'success_label'>{this.state.validationMessage}</div>
                            {
                                this.state.formError ? 
                                <div className = 'error_label'>Something Went Wrong</div> : null
                            }
                            <div className = 'admin_submit'>
                                <button onClick = {(event)=> this.submitForm(event)}>{this.state.formType}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}
 
export default AddEditPlayers;