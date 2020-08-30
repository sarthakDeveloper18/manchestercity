import React, { Component } from 'react';
import AdminLayout from '../../Hoc/AdminLayout';
import FormFields from '../../utils/FormFields';
import {valdiate} from '../../utils/misc';
import { firebaseTeams, firebaseDatabse, matches } from '../../../firebase';
import {firebaseLooper} from '../../utils/misc';


class AddEditMatch extends Component {
    state = { 
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    name: 'dateInput',
                    type: 'date',
                    label: 'Event Date'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    name: 'selectLocal',
                    type: 'select',
                    label: 'Select a Local Team',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    name: 'resultLocal',
                    type: 'text',
                    label: 'Result Local'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    name: 'selectAway',
                    type: 'select',
                    label: 'Select a Away Team',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    name: 'resultAway',
                    type: 'text',
                    label: 'Result Away'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    name: 'refereeInput',
                    type: 'text',
                    label: 'Referee'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    name: 'stadiumInput',
                    type: 'text',
                    label: 'Stadium'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    name: 'selectResult',
                    type: 'select',
                    label: 'Team Result',
                    options: [
                        {key: 'W', value: 'W'},
                        {key: 'L', value: 'L'},
                        {key: 'D', value: 'D'},
                        {key: 'n/a', value: 'n/a'}
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    name: 'selectPlayedt',
                    type: 'select',
                    label: 'Game Played',
                    options: [
                        {key: 'Yes', value: 'Yes'},
                        {key: 'No', value: 'No'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
        }

    }
    updateFields = (match, teamOptions, teams, type, matchId) => {
        const newFormData = {...this.state.formData}
        for(let key in newFormData){
            if(match){
                newFormData[key].value = match[key]
                newFormData[key].valid = true
            }
            if(key === 'local' || key === 'away'){
                newFormData[key].config.options = teamOptions
            }
        }
        this.setState({
            matchId,
            formType: type,
            formData: newFormData,
            teams
        })
    }
    componentDidMount() {
        const matchId = this.props.match.params.id
        const getTeams = (match, type) => {
            firebaseTeams.once('value').then((snapshot)=>{
                const teams = firebaseLooper(snapshot)
                const teamOptions = []
                snapshot.forEach((childSnapshot)=>{
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    })
                })
                this.updateFields(match, teamOptions, teams, type, matchId)
            })
        }
        if(!matchId){
            getTeams(false, 'Add Match')
        }
        else{
            firebaseDatabse.ref(`matches/${matchId}`).once('value').then((snapshot)=>{
                const match = snapshot.val()
                getTeams(match, 'Edit Match')
            })
        }
    }
    successForm = (message) => {
        this.setState({formSuccess: message})
        setTimeout(() => {
            this.setState({formSuccess: ''})
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
        this.state.teams.forEach((team)=>{
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb
            }
            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb
            }
        })
        if(formIsValid){
            if(this.state.formType === 'Edit Match'){
                firebaseDatabse.ref(`matches/${this.state.matchId}`).update(dataToSubmit).then(()=>{
                    this.successForm('Update Correctly')
                }).catch((e)=>{
                    this.setState({formError: true})
                })
            }
            else{
                matches.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_matches')
                }).catch((e)=>{
                    this.setState({formError: true})
                })
            }
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
            <AdminLayout>
                <div className = 'editmatch_dialog_wrapper'>
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit = {(event)=> this.submitForm(event)}>
                            <FormFields id = {'date'} data = {this.state.formData.date} change = {(element)=>this.updateForm(element)}/>
                            <div className = 'select_team_layout'>
                                <div className = 'label_inputs'>Local</div>
                                <div className = 'wrapper'>
                                    <div className = 'left'>
                                        <FormFields id = {'local'} data = {this.state.formData.local} change = {(element)=>this.updateForm(element)}/>
                                    </div>
                                    <div>
                                        <FormFields id = {'resultLocal'} data = {this.state.formData.resultLocal} change = {(element)=>this.updateForm(element)}/>
                                    </div>
                                </div>
                            </div>
                            <div className = 'select_team_layout'>
                                <div className = 'label_inputs'>Away</div>
                                <div className = 'wrapper'>
                                    <div className = 'left'>
                                        <FormFields id = {'away'} data = {this.state.formData.away} change = {(element)=>this.updateForm(element)}/>
                                    </div>
                                    <div>
                                        <FormFields id = {'resultAway'} data = {this.state.formData.resultAway} change = {(element)=>this.updateForm(element)}/>
                                    </div>
                                </div>
                            </div>
                            <div className = 'split_fields'>
                                <FormFields id = {'referee'} data = {this.state.formData.referee} change = {(element)=>this.updateForm(element)}/>
                                <FormFields id = {'stadium'} data = {this.state.formData.stadium} change = {(element)=>this.updateForm(element)}/>
                            </div>
                            <div className = 'split_fields last'>
                                <FormFields id = {'result'} data = {this.state.formData.result} change = {(element)=>this.updateForm(element)}/>
                                <FormFields id = {'final'} data = {this.state.formData.final} change = {(element)=>this.updateForm(element)}/>
                            </div>
                            <div className = 'success_label'>{this.state.formSuccess}</div>
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
 
export default AddEditMatch;