import React, { Component } from 'react';
import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../utils/misc';
import {Promise} from 'core-js'
import Fade from 'react-reveal/Fade';
import PlayerCard from '../utils/playerCard';
import stripes from '../../resources/images/stripes.png';

class Team extends Component {
    state = { 
        loading: true,
        players: []
    }
    componentDidMount() {
        firebasePlayers.once('value').then(snapshot=>{
            const players = firebaseLooper(snapshot)
            let promises = []
            for(let key in players){
                promises.push(
                    new Promise((resolve, reject)=>{
                        firebase.storage().ref('players').child(players[key].image).getDownloadURL().then(url=>{
                            players[key].url = url
                            resolve()
                        })
                    })
                )
            }
            Promise.all(promises).then(()=>{
                this.setState({loading: false, players})
            })
        })
    }
    render() {
        return ( 
            <div className = 'the_team_container' style={{background: `white url(${stripes})`}}>
                { 
                    !this.state.loading ?
                    <>
                        <div className = 'team_category_wrapper'>
                            <div className = 'title'>Keepers</div>
                            <div className = 'team_cards'>
                                {
                                    this.state.players && this.state.players.length > 0 ?
                                    this.state.players.map((player, i)=>{
                                        if(player.position === 'Keeper'){
                                            return(
                                                <Fade left delay = {i * 20} key = {i}>
                                                    <div className = 'item'>
                                                        <PlayerCard number = {player.number} name = {player.name} lastname = {player.lastname} bck = {player.url}/>
                                                    </div>
                                                </Fade>
                                            )
                                        }
                                        else{
                                            return null
                                        }
                                    })
                                    : null
                                }
                            </div>
                        </div>
                        <div className = 'team_category_wrapper'>
                            <div className = 'title'>Defence</div>
                            <div className = 'team_cards'>
                                {
                                    this.state.players && this.state.players.length > 0 ?
                                    this.state.players.map((player, i)=>{
                                        if(player.position === 'Defence'){
                                            return(
                                                <Fade left delay = {i * 20} key = {i}>
                                                    <div className = 'item'>
                                                        <PlayerCard number = {player.number} name = {player.name} lastname = {player.lastname} bck = {player.url}/>
                                                    </div>
                                                </Fade>
                                            )
                                        }
                                        else{
                                            return null
                                        }
                                    })
                                    : null
                                }
                            </div>
                        </div>
                        <div className = 'team_category_wrapper'>
                            <div className = 'title'>Midfield</div>
                            <div className = 'team_cards'>
                                {
                                    this.state.players && this.state.players.length > 0 ?
                                    this.state.players.map((player, i)=>{
                                        if(player.position === 'Midfield'){
                                            return(
                                                <Fade left delay = {i * 20} key = {i}>
                                                    <div className = 'item'>
                                                        <PlayerCard number = {player.number} name = {player.name} lastname = {player.lastname} bck = {player.url}/>
                                                    </div>
                                                </Fade>
                                            )
                                        }
                                        else{
                                            return null
                                        }
                                    })
                                    : null
                                }
                            </div>
                        </div>
                        <div className = 'team_category_wrapper'>
                            <div className = 'title'>Striker</div>
                            <div className = 'team_cards'>
                                {
                                    this.state.players && this.state.players.length > 0 ?
                                    this.state.players.map((player, i)=>{
                                        if(player.position === 'Striker'){
                                            return(
                                                <Fade left delay = {i * 20} key = {i}>
                                                    <div className = 'item'>
                                                        <PlayerCard number = {player.number} name = {player.name} lastname = {player.lastname} bck = {player.url}/>
                                                    </div>
                                                </Fade>
                                            )
                                        }
                                        else{
                                            return null
                                        }
                                    })
                                    : null
                                }
                            </div>
                        </div>
                    </>
                    : null
                }
            </div>
        );
    }
}
 
export default Team;