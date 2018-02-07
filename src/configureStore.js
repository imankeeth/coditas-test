import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducers } from './reducers';

const logger = createLogger({
  duration: true, // print the duration of each action?
});

const store = createStore(rootReducers, applyMiddleware(thunk, logger));

export default store;
