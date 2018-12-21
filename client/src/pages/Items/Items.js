import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemCard from '../../components/ShareItemCard';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const Items = ({ classes, items }) => {
  return (
    <Grid container className={classes.flexContainer} spacing={24}>
      {items.map(item => {
        return <ShareItemCard item={item} key={item.id} />;
      })}
    </Grid>
  );
};

export default withStyles(styles)(Items);
