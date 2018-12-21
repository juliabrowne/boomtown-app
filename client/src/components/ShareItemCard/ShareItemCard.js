import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles.js';
import Grid from '@material-ui/core/Grid';
import { ViewerContext } from '../../context/ViewerProvider.js';
import CardHeader from '@material-ui/core/CardHeader';
import Gravatar from 'react-gravatar';

function ShareItemCard(props) {
  const { classes } = props;
  const { item } = props;
  console.log('Item', item);
  return (
    <ViewerContext.Consumer>
      {({ loading, user, error }) => {
        return (
          <Card className={classes.card}>
            <CardMedia
              component="img"
              className={classes.media}
              src={item.imageurl}
            />
            <CardContent>
              <Grid container className={classes.avatarContainer} spacing={24}>
                <Grid item xs={2}>
                  <CardHeader
                    avatar={
                      <Gravatar
                        className={classes.gravatar}
                        email={item.ownerid.email || user.email}
                      />
                    }
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item xs={5}>
                  {item.ownerid.fullname}
                </Grid>
              </Grid>
              <Typography>{item.title}</Typography>
              <Typography component="p">{item.description}</Typography>
              <Grid item xs={5}>
                <div className={classes.tagsGrid}>
                  {item.tags.map(tag => tag.title).join(', ')}
                </div>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                className={classes.borrowButton}
              >
                Borrow
              </Button>
            </CardActions>
          </Card>
        );
      }}
    </ViewerContext.Consumer>
  );
}

ShareItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShareItemCard);
