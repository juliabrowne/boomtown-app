import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles.js';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Checkbox } from '@material-ui/core';
import { Form, Field, FormSpy } from 'react-final-form';
import {
  updateNewItem,
  resetNewItem,
  resetNewItemImage
} from '../../redux/modules/ShareItemPreview.js';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { ViewerContext } from '../../context/ViewerProvider.js';
import { ADD_ITEM_MUTATION } from '../../apollo/queries.js';
import { graphql, compose } from 'react-apollo';
import { VIEWER_QUERY } from '../../apollo/queries';

class ShareForm extends Component {
  constructor() {
    super();
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: '',
      done: false,
      selectedTags: []
    };
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  dispatchUpdate(values, tags, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        console.log(imageurl);
        updateNewItem({
          imageurl
        });
      });
    }
    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  handleSelectTag(event) {
    this.setState({ selectedTags: event.target.value });
  }

  handleSelectFile(event) {
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  render() {
    const { classes, tags, updateNewItem, addItemMutation } = this.props;
    return (
      <ViewerContext.Consumer>
        {({ user }) => (
          <Grid className={classes.shareItemFormGrid}>
            <Form
              onSubmit={values => {
                const item = {
                  variables: {
                    item: { ...values, tags: this.state.selectedTags }
                  }
                };
                console.log('VALUES::::', item);
                addItemMutation(item);
              }}
              render={({ handleSubmit, pristine, invalid }) => (
                <form className={classes.shareItemForm} onSubmit={handleSubmit}>
                  <FormSpy
                    subscription={{ values: true }}
                    component={({ values }) => {
                      if (values) {
                        this.dispatchUpdate(values, tags, updateNewItem);
                      }
                      return '';
                    }}
                  />
                  <Typography variant="display3">
                    Share. Borrow. Prosper.
                  </Typography>
                  <Field
                    name="imageurl"
                    render={({ input, meta }) => (
                      <React.Fragment>
                        {!this.state.fileSelected ? (
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() => {
                              this.fileInput.current.click();
                            }}
                          >
                            <Typography>Select Image</Typography>
                          </Button>
                        ) : (
                          <Button onClick={() => this.resetFileInput()}>
                            <Typography>Reset Image</Typography>
                          </Button>
                        )}
                        <input
                          type="file"
                          ref={this.fileInput}
                          accept="image/*"
                          hidden
                          onChange={event => this.handleSelectFile(event)}
                        />
                      </React.Fragment>
                    )}
                  />
                  <FormControl fullWidth className={classes.formControl}>
                    <Field
                      name="title"
                      render={({ input, meta }) => (
                        <TextField
                          className={classes.titleInput}
                          placeholder="Title"
                          id="filled-multiline-flexible"
                          rowsMax="4"
                          {...input}
                        />
                      )}
                    />

                    <Field
                      name="description"
                      render={({ input, meta }) => (
                        <TextField
                          className={classes.descriptionInput}
                          placeholder="Description"
                          id="filled-multiline-flexible"
                          rowsMax="4"
                          {...input}
                        />
                      )}
                    />

                    <Field name="tags">
                      {({ input, meta }) => {
                        console.log('INPUT:::', input);
                        return (
                          <Select
                            placeholder="Tags"
                            className={classes.multiline}
                            multiple
                            renderValue={selectedTags => {
                              return this.generateTagsText(tags, selectedTags);
                            }}
                            value={this.state.selectedTags}
                            onChange={event => this.handleSelectTag(event)}
                          >
                            {tags.map(tag => (
                              <MenuItem key={tag.id} value={tag.id}>
                                <Checkbox
                                  checked={
                                    this.state.selectedTags.indexOf(tag.id) > -1
                                  }
                                />
                                {tag.title}
                              </MenuItem>
                            ))}
                          </Select>
                        );
                      }}
                    </Field>
                    <Button
                      type="submit"
                      className={classes.formButton}
                      variant="contained"
                      size="large"
                      color="secondary"
                      disabled={
                        false
                      }
                    >
                      SHARE
                    </Button>
                  </FormControl>
                </form>
              )}
            />
          </Grid>
        )}
      </ViewerContext.Consumer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    dispatch(updateNewItem(item));
  },
  resetNewItem() {
    dispatch(resetNewItem());
  },
  resetNewItemImage() {
    dispatch(resetNewItemImage());
  }
});

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default connect(
  null,
  mapDispatchToProps
)(
  compose(
    graphql(ADD_ITEM_MUTATION, {
      options: { refetchQueries },
      name: 'addItemMutation'
    }),
    withStyles(styles)
  )(ShareForm)
);
