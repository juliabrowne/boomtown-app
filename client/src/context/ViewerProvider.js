import { Query } from 'react-apollo';
import React from 'react';

import { VIEWER_QUERY } from '../apollo/queries';

export const ViewerContext = React.createContext();

export const ViewerProvider = ({ children }) => {
  return (
    <Query query={VIEWER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        if (data) {
          return (
            <ViewerContext.Provider value={{ user: data.viewer }}>
              {children}
            </ViewerContext.Provider>
          );
        }
      }}
    </Query>
  );
};
