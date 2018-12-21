import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProfileCard from '../../components/ProfileCard';
import OwnerItemCard from '../../components/OwnerItemCard';

import styles from './styles';

const Profile = ({ classes, items, borrowedItems }) => {
  console.log('Viewer items', items);
  return (
    <Grid container className={classes.flexContainer} spacing={24}>
      <ProfileCard item={items} borrowed={borrowedItems} />
      <h1>Shared</h1>
      {items.map(item => {
        return <OwnerItemCard item={item} key={item.id} />;
      })}
      <h1>Borrowed</h1>
      {borrowedItems.map(item => {
        return <OwnerItemCard item={item} key={item.id} />;
      })}
    </Grid>
  );
};

export default withStyles(styles)(Profile);