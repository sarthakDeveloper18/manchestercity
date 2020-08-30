import React from 'react';
import {Link} from 'react-router-dom';
import m_city from '../../resources/images/logos/manchester_city_logo.png';

export const CityLogo = (props) => {
    const template = <div className = 'img_cover' style = {{background: `url(${m_city}) no-repeat`, width: props.width, height: props.height}}></div>
    if(props.link){
        return <Link className = 'link_logo' to = {props.linkTo}>{template}</Link>
    } else{
        return template
    }
}
