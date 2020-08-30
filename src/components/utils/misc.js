import React from 'react';
import {Link} from 'react-router-dom';

export const Tag = (props) => {
    const template = <div style={{background: props.bck, fontSize: props.size, color: props.color, padding: '5px 10px', display: 'inline-block', fontFamily: 'righteous', ...props.add}}>{props.children}</div>
    if(props.link){
        return <Link to = {props.linkTo}>{template}</Link>
    } else{
        return template
    }
}

export const firebaseLooper = (snapshot) => {
    var data = []
    snapshot.forEach(childSnapshot => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });
    return data
}

export const reverseArray = (array) => {
    let reverseArrays = []
    for(let i = array.length - 1 ; i >= 0 ; i--){
        reverseArrays.push(array[i])
    }
    return reverseArrays
}

export const valdiate = (element) => {
    let error = [true, '']
    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Enter Valid Email' : ''}`
        error = !valid ? [valid,message] : error
    }
    if(element.validation.required){
        const valid = element.value.trim() !== ''
        const message = `${!valid ? 'This Field is Required' : ''}`
        error = !valid ? [valid,message] : error
    }
    return error
}