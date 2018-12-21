import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './styles.js';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import BoomTownLogo from '../../images/boomtown.svg';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { LOGOUT_MUTATION } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import { VIEWER_QUERY } from '../../apollo/queries';

class NavBar extends Component {
  constructor() {
    super();
    this.state = { anchorEl: null };
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = url => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, logoutMutation } = this.props;
    return (
      this.props.location.pathname != '/home' && (
        <Grid container className={classes.flexContainer} spacing={24}>
          <AppBar
            position="fixed"
            backgroundcolor="orange"
            className={classes.flexContainer}
          >
            <Grid item xs={10}>
              <IconButton
                className={classes.itemButton}
                to="/items"
                component={Link}
              >
                <img
                  src={BoomTownLogo}
                  alt="BoomTown"
                  className={classes.logo}
                />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <Button href="/share" className={classes.shareButton}>
                <AddCircleOutline />
                Share Something
              </Button>
              <IconButton
                className={classes.iconButton}
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreIcon />
              </IconButton>
            </Grid>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <Link to={'/profile'}>Profile</Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <Link to={'/home'} onClick={logoutMutation}>
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </AppBar>
        </Grid>
      )
    );
  }
}

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'logoutMutation'
  }),
  withStyles(styles)
)(withRouter(NavBar));
