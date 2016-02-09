/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

import React, { Component } from 'react';
import Authpanel from './components/authpanel';
import Feedbackpanel from './components/feedbackpanel';
import Wrapper from './wrapper';
import Login from './login';

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


class Wrapperwrapper extends Component {
    loginOrNot(){
        const p = this.props;
		if(p.auth.currently!==C.LOGGED_IN){
            //this.props.goSomewhere('/signup'); 
            return(
                <Login  />
            );
        }
        else{
            return(
                <Wrapper/>
            );
        }        
    }
    
	render() {
		return (
			<div className="wrapperwrapper">
                <Authpanel />
				{this.loginOrNot()}
			</div>
		);
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Wrapperwrapper);
/*
			<div className="wrapperwrapper">
                <Authpanel />
				{this.props.children}
			</div>
*/