import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Items from '../pages/Items';
import Share from '../pages/Share';
import Profile from '../pages/Profile';
import { ViewerContext } from '../context/ViewerProvider';

export default () => (
  <ViewerContext.Consumer>
    {({ user }) => {
      if (user) {
        return (
          <Fragment>
            <NavBar />
            <Switch>
              <Route exact path="/items" component={Items} />
              <Route exact path="/share" component={Share} />
              <Route exact path="/profile/" component={Profile} />
              <Redirect from="*" to="/items" />
            </Switch>
          </Fragment>
        );
      } else {
        return (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Redirect from="*" to="/home" />
          </Switch>
        );
      }
    }}
  </ViewerContext.Consumer>
);
