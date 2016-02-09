import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import C from '../../constants';

import { Button } from 'react-bootstrap';
import { routeActions } from 'react-router-redux';

const mapStateToProps = (appState) => {
	return { auth: appState.auth };
};

const mapDispatchToProps = (dispatch) => {
	return {
		attemptLogin() { dispatch(actions.attemptLogin()); },
		logoutUser() { dispatch(actions.logoutUser()); },
        goSomewhere(url) { dispatch(routeActions.push(url)); },
	};
};

class Authpanel extends Component {
    onClick() {
        this.props.goSomewhere('/signup');
    }
    
    render() {
		const p = this.props;
		switch (p.auth.currently) {
			case C.LOGGED_IN: return (
				<div className="authpanel">
                    <div className="appName"> MeetUp Planner </div>
					<Button className="logoutB" onClick={p.logoutUser}>Log out</Button>
				</div>
			);
			default: return (
				<div>
				</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Authpanel);
//onClick={p.attemptLogin}
//onClick={this.onClick.bind(this)}
/*
            case C.AWAITING_AUTH_RESPONSE: return (
				<div className="authpanel">
					<button disabled>authenticating...</button>
				</div>
			);
			default: return (
				<div className="authpanel">
					<button onClick={p.attemptLogin}>Log in</button>
				</div>
			);
*/