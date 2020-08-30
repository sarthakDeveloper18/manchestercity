import React from 'react';
import stripes from '../../../resources/images/stripes.png';
import {Tag} from '../../utils/misc';
import Reveal from 'react-reveal';
import Cards from './Cards';

class MeetPlayers extends React.Component {
    state = { 
        show: false
    }
    render() { 
        return ( 
            <Reveal fraction = {0.7} onReveal = {()=>{
                this.setState({show: true})
            }}>
                <div className = 'home_meetplayers' style={{background: `white url(${stripes})`}}>
                    <div className = 'container'>
                        <div className = 'home_meetplayers_wrapper'>
                            <div className = 'home_card_wrapper'>
                                <Cards show = {this.state.show}/>
                            </div>
                            <div className = 'home_text_wrapper'>
                                <div>
                                    <Tag bck = '#0e1731' size = '100px' color = 'white' add = {{display: 'inline-block', marginBottom: '20px'}}>Meet</Tag>
                                </div>
                                <div>
                                    <Tag bck = '#0e1731' size = '100px' color = 'white' add = {{display: 'inline-block', marginBottom: '20px'}}>The</Tag>
                                </div>
                                <div>
                                    <Tag bck = '#0e1731' size = '100px' color = 'white' add = {{display: 'inline-block', marginBottom: '20px'}}>Players</Tag>
                                </div>
                                <div>
                                    <Tag bck = 'white' size = '27px' color = '#0e1731' link = {true} linkTo = '/the_team' add = {{border: '1px solid #0e1731', display: 'inline-block', marginBottom: '20px'}}>Meet Them Here</Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        );
    }
}
 
export default MeetPlayers;