import React from 'react';
import {easePolyOut} from 'd3-ease';
import Animate from 'react-move/Animate';
import Otamedi from '../../../resources/images/players/Otamendi.png';
import PlayerCard from '../../utils/playerCard';

class Cards extends React.Component {
    state = { 
        cards: [
            {bottom: 90, left: 300},
            {bottom: 60, left: 200},
            {bottom: 30, left: 100},
            {bottom: 0, left: 0}
        ]
    }
    showAnimateCards = () => {
        
    }
    render() { 
        console.log(this.props.show)
        return ( 
            <div>
                {
                    this.state.cards.map((card, i)=>{
                        return(
                            <Animate key = {i} show = {this.props.show} start = {{left: 0, bottom: 0}} enter = {{left: [card.left], bottom: [card.bottom], timimg: {duration: 500, ease: easePolyOut}}}>
                                {({left, bottom}) => {
                                    return(
                                        <div style = {{position: 'absolute', left, bottom}}>
                                            <PlayerCard number = "30" name = "Nicolas" lastname = "Otamendi" bck = {Otamedi}/>
                                        </div>
                                    )
                                }}
                            </Animate>
                    )})
                }
            </div>
        );
    }
}
 
export default Cards;