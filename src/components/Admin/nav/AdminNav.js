import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import {firebase} from '../../../firebase'

const AdminNav = () => {
    const links = [
        {title: 'Matches', linkTo: '/admin_matches'},
        {title: 'Add Match', linkTo: '/admin_matches/add_match'},
        {title: 'Players', linkTo: '/admin_players'},
        {title: 'Add Player', linkTo: '/admin_players/add_player'},
    ]
    const logoutHandler = () => {
        firebase.auth().signOut().then().catch(e=> console.log(e))
    }
    return ( 
        <div>
            {
                links.map(link=> (
                    <Link to = {link.linkTo} key = {link.title}>
                        <ListItem button style = {{color: 'white', fontWeight: 300, borderBottom: '1px solid #353535'}}>{link.title}</ListItem>
                    </Link>
                ))
            }
            <ListItem onClick = {()=> logoutHandler()} button style = {{color: 'white', fontWeight: 300, borderBottom: '1px solid #353535'}}>Logout</ListItem>
        </div>
    );
}
 
export default AdminNav;