import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import Share from './Share';
import { ALL_TAGS_QUERY } from '../../apollo/queries';

class ShareContainer extends Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          if (data) return <Share data={data} />;
        }}
      </Query>
    );
  }
}

export default ShareContainer;