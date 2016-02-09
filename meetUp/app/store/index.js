/*
This file defines the main Redux Store. It is used by the app index.js file where it is given to
the Provider element from ReactRedux, which allows smart components to `connect` to the store
*/

import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './initialstate';
import thunk from 'redux-thunk';

import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
const reduxRouterMiddleware = syncHistory(browserHistory);
// const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)
// const store = createStoreWithMiddleware(reducer)

// A super-simple logger
/*
const logger = (store) => (next) => (action) => {
	console.log('dispatching', action.type, action);
	const result = next(action);
	console.log('next state', store.getState());
	return result;
};

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
*/
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk)(createStore);
export default createStoreWithMiddleware(rootReducer, initialState);
