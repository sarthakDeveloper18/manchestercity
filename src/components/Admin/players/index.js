import React, { Component } from 'react';
import AdminLayout from '../../Hoc/AdminLayout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {firebasePlayers} from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../utils/misc';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';


class AdminPlayers extends Component {
    state = { 
        isLoading: true,
        players: []
    }
    componentDidMount() {
        firebasePlayers.once('value').then(snapshot=>{
            const players = firebaseLooper(snapshot)
            this.setState({
                isLoading: false,
                players: reverseArray(players)
            })
        }).catch(e=> console.log(e))

    }
    render() { 
        return ( 
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.players ?
                                    this.state.players.map((player, i)=>(
                                        <TableRow key = {i}>
                                            <TableCell>
                                                <Link to = {`/admin_players/edit_player/${player.id}`}>{player.name}</Link>
                                            </TableCell>
                                            <TableCell>{player.lastname}</TableCell>
                                            <TableCell>{player.number}</TableCell>
                                            <TableCell>{player.position}</TableCell>
                                        </TableRow>
                                    )) : null
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                    <div className = 'admin_progress'>
                        {
                            this.state.isLoading ?
                            <CircularProgress thickness = {7} style = {{color: '#98c5e9'}}/> :
                            null
                        }
                    </div>
                </div>
            </AdminLayout>
        );
    }
}
 
export default AdminPlayers;