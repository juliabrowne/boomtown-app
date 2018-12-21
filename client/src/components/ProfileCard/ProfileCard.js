import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './styles.js';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { ViewerContext } from '../../context/ViewerProvider';

function ProfileCard(props) {
  const { classes } = props;
  const { item, borrowed } = props;
  console.log('ProfileCard item', item);
  return (
    <Grid container className={classes.profileCardContainer} spacing={24}>
      <Grid container className={classes.profileCard} spacing={6}>
        <Grid container className={classes.profileInfo} xs={4}>
          <Avatar
            alt="Remy Sharp"
            src="http://www.carderator.com/assets/avatar_placeholder_small.png"
            className={classes.avatar}
          />

          <ViewerContext.Consumer className={classes.username}>
            {({ user }) => <h1>{user.fullname}</h1>}
          </ViewerContext.Consumer>
          <h2 className={classes.sharedAndBorrowsTitle}>
            {item.length} Items shared {borrowed.length} Items borrowed
          </h2>
          <ViewerContext.Consumer className={classes.userBio}>
            {({ user }) => {
              if (user.bio !== null) {
                return <h2>{user.bio}</h2>;
              } else {
                return <h2>"No bio provided."</h2>;
              }
            }}
          </ViewerContext.Consumer>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ProfileCard);