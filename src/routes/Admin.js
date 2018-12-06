import React, { Component } from 'react';
import {
  Link,
  Redirect,
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Container, Grid, Header, Button, Segment } from 'semantic-ui-react';
import Sidebar from '../components/Cdmin/Sidebar';
import '../components/Cdmin/style.scss';
import Dashboard from '../components/Cdmin/Dashboard';
import Login from '../components/Cdmin/Login';
import Settings from '../components/Cdmin/Settings';
import Log from '../components/Cdmin/Log';
import util from '../util';

class Admin extends Component {
  render() {
    //FIXME: fix the following auth logic below
    if (!util.isLoggedIn()) {
      return <Redirect to={'/'} />;
    }

    return (
      <Router>
        <div style={{ paddingTop: '4em' }}>
          <Grid
            style={{ minHeight: 'calc(100vh - 83px)', paddingLeft: '14px' }}
          >
            <Grid.Column width={3} className="sidebar">
              <Sidebar />
            </Grid.Column>
            <Grid.Column width={13}>
              <Route exact path="/admin" component={Dashboard} />
              <Route path="/admin/login" component={Login} />
              <Route path="/admin/settings" component={Settings} />
              <Route path="/admin/log" component={Log} />
            </Grid.Column>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default Admin;
