import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';
import Profile from './Profile';

class ProfileContainer extends Component {
  viewer = {};
  render() {
    return (
      <ViewerContext.Consumer>
        {({ user }) => {
          return (
            <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: user.id }}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                if (data) {
                  return (
                    <Profile
                      items={data.user.items}
                      borrowedItems={data.user.borrowed}
                    />
                  );
                }
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

export default ProfileContainer;