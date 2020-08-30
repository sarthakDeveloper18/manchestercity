import React from 'react';
import Layout from './components/Hoc/Layout';
import {Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'
import {useEffect} from 'react';
import Dashboard from './components/Admin/Dashboard';
import PrivateRoute from './components/authRoutes/privateRoute';
import PublicRoute from './components/authRoutes/publicRoute';
import AdminMatches from './components/Admin/matches';
import AddEditMatch from './components/Admin/matches/AddEditMatch';
import AdminPlayers from './components/Admin/players';
import AddEditPlayers from './components/Admin/players/AddEditPlayers';
import Team from './components/Team';
import Matches from './components/Matches';
import NotFound from './components/utils/not_found';

const Routes = (props) => {
  // ...props contain the user object
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return(
    <div>
      <Layout>
        <Switch>
          <PrivateRoute {...props} path = '/dashboard' exact component = {Dashboard}/>
          <PrivateRoute {...props} path = '/admin_matches' exact component = {AdminMatches} />
          <PrivateRoute {...props} path = '/admin_matches/edit_match/:id' exact component = {AddEditMatch}/>
          <PrivateRoute {...props} path = '/admin_matches/add_match' exact component = {AddEditMatch}/>
          <PrivateRoute {...props} path = '/admin_players' exact component = {AdminPlayers}/>
          <PrivateRoute {...props} path = '/admin_players/edit_player/:id' exact component = {AddEditPlayers}/>
          <PrivateRoute {...props} path = '/admin_players/add_player' exact component = {AddEditPlayers}/>
          <PublicRoute restricted = {false} {...props} exact component = {Home} path = '/'/>
          <PublicRoute restricted = {false} {...props} exact component = {Team} path = '/the_team'/>
          <PublicRoute restricted = {false} {...props} exact component = {Matches} path = '/the_matches'/>
          <PublicRoute restricted = {true} {...props} exact component = {Login} path = '/login'/>
          <PublicRoute restricted = {false} {...props} component = {NotFound}/>
        </Switch>
      </Layout>
    </div>
  )
}
 
export default Routes;
