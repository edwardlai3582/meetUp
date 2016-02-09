import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux';
import { Button, Modal, Input, ButtonInput, Alert } from 'react-bootstrap';

import Signupform from './signupform';

import actions from '../actions';

class Login extends Component {

      close() {
        //this.setState({ showModal: false });
          this.props.hideSignupModal();
      }

      open() {
        //this.setState({ showModal: true });
          this.props.showSignupModal();
          this.props.dismissFeedback();
          this.props.resetForm();
      }
    
    signIn(data) {
        //this.props.goSomewhere('/');
        console.log(data);
        this.props.attemptLogin(data);
    }

    showAlert(){
        //console.log(this.props.fields.email);
        if(typeof this.props.fields.email.value!=="undefined" || typeof this.props.fields.password.value!=="undefined" ){
            return(
                <div></div>
            );            
        }
        else{
            return(
                <div className="signinAlert">
                    { this.props.feedback.msg }
                </div> 
            );
        }
    }
    
    render() {
        const { fields: { email, password }, handleSubmit } = this.props;
        
        return (
            <div className="loginWrapper">
            <h1 className="loginTitle">
                MeetUp Planner
            </h1>
            <form onSubmit={handleSubmit(this.signIn.bind(this))}>
            <div>
                <Input type="email" placeholder="Email" autoComplete="email" bsStyle={email.touched && email.invalid ? 'error' : null} {...email}/>
            </div>
            <div className="signinAlert">
                {email.touched && email.error && <div>{email.error}</div>}
            </div>  
                
            <div>
                <Input type="password" placeholder="Password" bsStyle={password.touched && password.invalid ? 'error' : null} {...password}/>
            </div>
            <div className="signinAlert">
                {password.touched && password.error && <div>{password.error}</div>}
            </div>     
                
            { this.showAlert() }

            <ButtonInput className="loginB" type="submit">Login</ButtonInput>
            </form>
            
            <ButtonInput className="signUpB" onClick={this.open.bind(this)} >
              Sign up
            </ButtonInput>
          
            <Signupform />
              
            </div>
        );
    }
    
}

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required field';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
    
  if (!values.password) {
    errors.password = 'Required field';
  } else if (values.password.length <3) {
    errors.password = 'Must be 3 characters or more';
  }
    
  return errors;
};

function mapDispatchToProps (dispatch) {
    return {
        goSomewhere(url) {dispatch(routeActions.push(url));},
        showSignupModal() {dispatch(actions.showSignupModal())},
        hideSignupModal() {dispatch(actions.hideSignupModal())},
        attemptLogin(data) { dispatch(actions.attemptLogin(data))},
        dismissFeedback() {dispatch(actions.dismissFeedback())}
    };
}

function mapStateToProps (appState) {
	return {
		showModalq: appState.showModal,
        feedback: appState.feedback
	};
};

Login = reduxForm({
    form: 'register',
    fields: ['email', 'password'],
    validate
}, mapStateToProps, mapDispatchToProps)(Login);

export default Login;
