import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux';
import { Button, Modal, Input } from 'react-bootstrap';

import actions from '../actions';

class Signupform extends Component {
    constructor() {
		super();
		this.state = { lastemail: ""};
	}
    
    close() {
        this.props.hideSignupModal();
        this.props.resetForm();
        this.props.dismissFeedback();
    }
    
    signUp(data) {
        //console.log(data);
        this.props.dismissFeedback();
        this.state.lastemail = data.signupemail;
        this.props.attemptSignupLogin(data);
    }
        
    showAlert(){
        //console.log(this.props.fields.signupdob.value);
       if( this.props.feedback.msg && this.state.lastemail===this.props.fields.signupemail.value){
            return(
                <div className="signupAlert">
                    { this.props.feedback.msg }
                </div> 
            );            
        }
        else{
            return(
                <div></div> 
            );
        }
    }

    render() {
        const { fields: { signupfirstName, signuplastName, signupemail, signuppassword, signupconfirmpassword, signupdob}, handleSubmit } = this.props;
        
        return (
            <Modal show={this.props.showSignupform} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title className="signupformTitle">Sign up</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className="signupformForm" onSubmit={handleSubmit(this.signUp.bind(this))}>
                    <label><div className="labelT">Email</div> 
                    <Input type="email"  placeholder="email" className="signupformInput" bsStyle={signupemail.touched && signupemail.invalid ? 'error' : this.props.feedback.msg &&this.state.lastemail===signupemail.value?'error':null} {...signupemail}/>
                    </label>
                    
                        {signupemail.touched && signupemail.error && <div className="signupAlert">{signupemail.error}</div>}
                    
                    
                    {this.showAlert()}
                    
                    <label> <div className="labelT">Password</div>
                    <Input type="password" placeholder="password" className="signupformInput"  bsStyle={signuppassword.touched && signuppassword.invalid ? 'error' : null} {...signuppassword}/>
                    </label>
                    
                        {signuppassword.touched && signuppassword.error && <div className="signupAlert">{signuppassword.error}</div>}
                    
                    
                    <label> <div className="labelT">Confirm Password</div>
                    <Input type="password" placeholder="confirm password" className="signupformInput" bsStyle={signupconfirmpassword.touched && signupconfirmpassword.invalid ? 'error' : null} {...signupconfirmpassword}/>
                    </label>
                    
                        {signupconfirmpassword.touched && signupconfirmpassword.error && <div  className="signupAlert">{signupconfirmpassword.error}</div>}
                    
                    
                    <label> <div className="labelT">First Name </div>
                    <Input type="text" placeholder="first Name" className="signupformInput" bsStyle={signupfirstName.touched && signupfirstName.invalid ? 'error' : null} {...signupfirstName}/>
                    </label>
                    
                        {signupfirstName.touched && signupfirstName.error && <div className="signupAlert">{signupfirstName.error}</div>}
                   
                    
                    <label> <div className="labelT">Last Name </div>
                    <Input type="text" placeholder="last Name" className="signupformInput" bsStyle={signuplastName.touched && signuplastName.invalid ? 'error' : null} {...signuplastName}/>
                    </label>
                   
                        {signuplastName.touched && signuplastName.error && <div className="signupAlert">{signuplastName.error}</div>}
                 
                    
                    <label> <div className="labelT">Date of Birth </div>
                    <Input type="date" placeholder="yyyy-mm-dd" className="signupformInput" bsStyle={signupdob.touched && signupdob.invalid ? 'error' : null} {...signupdob}/>
                    </label>
                
                        {signupdob.touched && signupdob.error && <div className="signupAlert">{signupdob.error}</div>}
                   
                    
                    <div className="signupformSubmitWrapper">
                        <Button type="submit">Submit</Button>    
                    </div>
                </form>
              </Modal.Body>
            </Modal>  
        );
    }
}

const validate = values => {
  const errors = {};

  if (!values.signupemail) {
    errors.signupemail = 'Required field';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.signupemail)) {
    errors.signupemail = 'Invalid email address';
  }
    
  if (!values.signuppassword) {
    errors.signuppassword = 'Required field';
  } else if (values.signuppassword.length <3) {
    errors.signuppassword = 'Must be 3 characters or more';
  }
    
  if (!values.signupconfirmpassword) {
    errors.signupconfirmpassword = 'Required field';
  } else if (values.signupconfirmpassword !== values.signuppassword) {
    errors.signupconfirmpassword = 'Password not match';
  }    
    
    
  if (!values.signupfirstName) {
    errors.signupfirstName = 'Required field';
  }  
    
  if (!values.signuplastName) {
    errors.signuplastName = 'Required field';
  } 
    
  if (!isValidDate(values.signupdob)) {
    errors.signupdob = 'Invalid date';
  }   
    
  return errors;
};

function isValidDate(str){
	// STRING FORMAT yyyy-mm-dd
	if(str=="" || str==null){return false;}								
	
	// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'					
	var m = str.match(/(\d{4})-(\d{2})-(\d{2})/);
	
	// STR IS NOT FIT m IS NOT OBJECT
	if( m === null || typeof m !== 'object'){return false;}				
	
	// CHECK m TYPE
	if (typeof m !== 'object' && m !== null && m.size!==3){return false;}
				
	var ret = true; //RETURN VALUE						
	var thisYear = new Date().getFullYear(); //YEAR NOW
	var minYear = 1900; //MIN YEAR
	
	// YEAR CHECK
	if( (m[1].length < 4) || m[1] < minYear || m[1] > thisYear){ret = false;}
	// MONTH CHECK			
	if( (m[2].length < 2) || m[2] < 1 || m[2] > 12){ret = false;}
	// DAY CHECK
	if( (m[3].length < 2) || m[3] < 1 || m[3] > 31){ret = false;}
	
	return ret;			
}

function mapDispatchToProps (dispatch) {
    return {
        goSomewhere(url) {dispatch(routeActions.push(url));},
        showSignupModal() {dispatch(actions.showSignupModal())},
        hideSignupModal() {dispatch(actions.hideSignupModal())},
        attemptSignupLogin(data) { dispatch(actions.attemptSignupLogin(data))},
        dismissFeedback() {dispatch(actions.dismissFeedback())}
    };
}

function mapStateToProps (appState) {
	return {
		showSignupform: appState.showModal.showSignupform,
        feedback: appState.feedback
	};
};

Signupform = reduxForm({
    form: 'signupform',
    fields: ['signupfirstName', 'signuplastName', 'signupemail', 'signuppassword', 'signupconfirmpassword', 'signupdob'],
    validate
}, mapStateToProps, mapDispatchToProps)(Signupform);

export default Signupform;
