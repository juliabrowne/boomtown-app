import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ShareItemPreviewReducers from './modules/ShareItemPreview';

const middleware = [];

const store = createStore(
  combineReducers({
    shareItemPreview: ShareItemPreviewReducers
  }),
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;