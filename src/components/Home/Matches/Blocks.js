import React from 'react';
import {matches} from '../../../firebase';
import {firebaseLooper} from '../../utils/misc';
import {reverseArray} from '../../utils/misc';
import MatchesBlock from '../../utils/matches_block';
import {Slide} from 'react-reveal';

class Blocks extends React.Component {
    state = { 
        matches: []
    }
    componentDidMount(){
        matches.limitToLast(6).once('value').then(snapshot=>{
            const matches = firebaseLooper(snapshot)
            this.setState({matches: reverseArray(matches)})
        })
    }
    showMatches = (matches) => (
        matches ?
        matches.map((match)=>(
            <Slide bottom key = {match.id}>
                <div className = 'item'>
                    <div className = 'wrapper'>
                        <MatchesBlock match = {match}/>
                    </div>
                </div>
            </Slide>
        )) :
        null
    )
    render() { 
        return ( 
            <div className = 'home_matches'>
                {this.showMatches(this.state.matches)}
            </div>
        );
    }
}
 
export default Blocks;