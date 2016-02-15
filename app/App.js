import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';
import actions from './actions';

import Wrapper from './components/wrapper';
import Newevent from './components/eventform_div';
import Toplevel from './components/toplevel';

export class App extends Component {
	componentWillMount() {
		store.dispatch(actions.startListeningToAuth());
	}
    
	render() {
		return (
			<Provider store={store}>
				<Router history={browserHistory}>
					<Route path="/" component={Toplevel}>
                        <IndexRoute component={Wrapper}/>
                        <Route path="newevent" component={Newevent}/>
                    </Route>
				</Router>
			</Provider>
		);
	}
}
