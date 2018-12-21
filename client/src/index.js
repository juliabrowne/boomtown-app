import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo'
import { Provider as ReduxProvider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import theme from './theme';
import client from './apollo';
import store from './redux';
import Layout from './routes/Layout';
import { ViewerProvider } from './context/ViewerProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

const App = () => {
  return (
    <ReduxProvider store={store}>
    <MuiThemeProvider theme={theme}>
    <ApolloProvider client={client}>
    <ViewerProvider>
      <CssBaseline />
      <Router>
      <Layout />
      </Router>
      </ViewerProvider>
      </ApolloProvider>
    </MuiThemeProvider>
    </ReduxProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();