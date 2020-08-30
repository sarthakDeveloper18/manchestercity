import React from 'react';
import { Tag } from '../../utils/misc';
import Blocks from './Blocks';

class Matches extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div className = 'home_matches_wrapper'>
                <div className = 'container'>
                    <Tag bck = '#0e1731' size = '50px' color = 'white'>
                        Matches
                    </Tag>
                    <Blocks/>
                    <Tag bck = 'white' size = '22px' color = '#0e1731' link = {true} linkTo = '/the_team'>
                        See More Matches
                    </Tag>
                </div>
            </div>
        );
    }
}
 
export default Matches;