import React from 'react';

const FormFields = ({data, id, change}) => {
    const showError = () => {
        let error_message = <div className = 'error_label'>
            {data.validation && !data.valid ? data.validationMessage : null}
        </div>
        return error_message
    }
    const renderTemplate = () => {
        let formTemplate = null
        switch(data.element){
            case 'input':
                formTemplate = (
                    <div>
                        {
                            data.showLabel ?
                            <div className = 'label_inputs'>
                                {data.config.label}
                            </div>
                            : null
                        }
                        <input {...data.config} value = {data.value} onChange = {(event)=> change({event, id})}/>
                        {showError()}
                    </div>
                )
            break;
            case 'select':
                formTemplate = (
                    <div>
                        {
                            data.showLabel ?
                            <div className = 'label_inputs'>
                                {data.config.label}
                            </div>
                            : null
                        }
                        <select value = {data.value} onChange = {(event)=> change({event, id})}>
                            <option value=''>Select one</option>
                            {
                                data.config.options.map((item)=>{
                                    return(
                                        <option key={item.key} value={item.key}>{item.value}</option>
                                    )
                                })
                            }
                        </select>
                        {showError()}
                    </div>
                )
            break
            default:
                formTemplate = null
        }
        return formTemplate
    }
    return ( 
        <div>
            {renderTemplate()}
        </div>
    );
}
 
export default FormFields;