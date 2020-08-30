import React from 'react';
import {easePolyOut} from 'd3-ease';
import Animate from 'react-move/Animate';

class Stripes extends React.Component {
    state = {
        stripes : [
            {
                background:'#98c5e9',
                left: 120,
                rotate: 25,
                top: -260 ,
                delay: 0
            },
            {
                background:'#ffffff',
                left: 360,
                rotate: 25,
                top: -397,
                delay: 200
            },
            {
                background:'#98c5e9',
                left: 600,
                rotate: 25,
                top: -498,
                delay: 400
            }
        ]
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() { 
        return ( 
            <div className = 'featured_stripes'>
                {
                    this.state.stripes.map((str, i)=>(
                        <Animate key = {i} show = {true} start = {{background: 'white',opacity: 0, left: 0, rotate: 0, top: 0}} enter = {{background: [str.background], timing: {delay: str.delay, duration: 200, ease: easePolyOut}, opacity: [1], left: [str.left], rotate: [str.rotate], top: [str.top]}}>
                            {({background, opacity, left, rotate, top})=>{
                                return(
                                    <div className = 'stripe' style = {{background, opacity, transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`}}></div>
                                )
                            }}
                        </Animate>
                    ))
                }
            </div>
        );
    }
}
 
export default Stripes;