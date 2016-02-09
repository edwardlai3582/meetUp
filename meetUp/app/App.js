import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import actions from './actions';
import Wrapper from './pages/wrapper';
import Wrapperwrapper from './pages/wrapperwrapper';
//import Articles from './pages/articles';
import Login from './pages/login';


export class App extends Component {
	componentWillMount() {
		store.dispatch(actions.startListeningToAuth());
		//store.dispatch(actions.startListeningToArticles());
	}
	render() {
		return (
			<Provider store={store}>
				<Router history={browserHistory}>
					<Route path="/" component={Wrapperwrapper} />
				</Router>
			</Provider>
		);
	}
}
