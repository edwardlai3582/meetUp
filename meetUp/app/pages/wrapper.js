/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

import React, { Component } from 'react';
import Authpanel from './components/authpanel';
import Feedbackpanel from './components/feedbackpanel';
import Events from './events';

import { connect } from 'react-redux';
import C from '../constants';
import { routeActions } from 'react-router-redux';

const mapStateToProps = (appState) => {
	return { auth: appState.auth };
};

const mapDispatchToProps = (dispatch) => {
	return {
        goSomewhere(url) { dispatch(routeActions.push(url)); },
	};
};

class Wrapper extends Component {
	render() {
		return (
				<div className="center">
					<Events />
				</div>
		);
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
