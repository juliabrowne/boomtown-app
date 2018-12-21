import { withStyles } from '@material-ui/core/styles';
import ShareItemForm from '../../components/ShareItemForm';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import styles from './styles';
import ShareItemPreview from '../../components/ShareItemPreview/ShareItemPreview';

const Share = ({ classes, data }) => {
  return (
    <Grid container className={classes.flexContainer} spacing={24}>
      <Grid item xs={4}>
        <ShareItemPreview />
      </Grid>
      <Grid item xs={4}>
        <ShareItemForm tags={data.tags} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Share);
