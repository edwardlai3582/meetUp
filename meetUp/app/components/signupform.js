import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux';
import { Button, Modal, Input, Tooltip, OverlayTrigger, Glyphicon, Grid,Row,Col } from 'react-bootstrap';

import actions from '../actions';

class Signupform extends Component {
    constructor() {
		super();
		this.state = {  lastemail: "",
                        windowWidth: window.innerWidth,
                        windowHeight: window.innerHeight
                     };
	}
    
    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }
        
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }
    
    handleResize(e) {
        this.setState({ windowWidth: window.innerWidth,
                        windowHeight: window.innerHeight
                      });
    }
    
    close() {
        this.props.hideSignupModal();
        //this.props.resetForm();
        this.props.dismissFeedback();
    }
    
    signUp(data) {
        this.props.dismissFeedback();
        this.state.lastemail = data.signupemail;
        this.props.attemptSignupLogin(data);
    }
        
    showAlert(){
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
        const { fields: { signupfirstName, signuplastName, signupemail, signuppassword, signupconfirmpassword, signupemployer, signupjobtitle, signupdob}, handleSubmit } = this.props;
        const tooltip = (
          <Tooltip className="tooltipx">
            &bull; at least 8 characters <br /> 
            &bull; no more then 100 characters <br />
            &bull; at least 1 special character <br />
            &bull; at least 1 number <br />        
            &bull; at least 1 uppercase letter <br />  
            &bull; at least 1 lowercase letter <br />
          </Tooltip>
        );
        
        return (
            <Modal show={this.props.showSignupform} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title className="signupformTitle">Sign up</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form className="signupformForm" onSubmit={handleSubmit(this.signUp.bind(this))} autocomplete="on" >
                    <label for="signupemail" >
                        <div className="labelT">Email</div> 
                        <Input type="email" value={this.props.loginemail} placeholder="enter your email" className="signupformInput" bsStyle={signupemail.touched && signupemail.invalid ? 'error' : this.props.feedback.msg &&this.state.lastemail===signupemail.value?'error':null} {...signupemail} autoFocus />
                    </label>
                    
                    {signupemail.touched && signupemail.error && <div className="signupAlert">{signupemail.error}</div>}               
                   
                    {this.showAlert()}
                    
                    <label for="signuppassword" >
                        <div className="labelT nextToToolTip" >Password</div>
                        <OverlayTrigger overlay={tooltip} >
                            <Glyphicon glyph="info-sign" />
                        </OverlayTrigger>
                        <Input type="password" placeholder="enter your password" className="signupformInput"  bsStyle={signuppassword.touched && signuppassword.invalid ? 'error' : null} {...signuppassword}/>
                    </label>
                    
                    <div className="signupAlert">
                        {signuppassword.touched && signuppassword.error && <div className="signupAlert" dangerouslySetInnerHTML={{__html: signuppassword.error}}></div>}
                    </div>
                    
                    <label for="signupconfirmpassword" > 
                        <div className="labelT">Confirm Password</div>
                        <Input type="password" placeholder="confirm your password" className="signupformInput" bsStyle={signupconfirmpassword.touched && signupconfirmpassword.invalid ? 'error' : null} {...signupconfirmpassword}/>
                    </label>
                    
                    {signupconfirmpassword.touched && signupconfirmpassword.error && <div  className="signupAlert">{signupconfirmpassword.error}</div>}
                    
                    
                    <label for="signupfirstName" > 
                        <div className="labelT">First Name </div>
                        <Input type="text" placeholder="enter your first Name" className="signupformInput" bsStyle={signupfirstName.touched && signupfirstName.invalid ? 'error' : null} {...signupfirstName}/>
                    </label>
                    
                    {signupfirstName.touched && signupfirstName.error && <div className="signupAlert">{signupfirstName.error}</div>}
                   
                    
                    <label for="signuplastName" > 
                        <div className="labelT">Last Name </div>
                        <Input type="text" placeholder="enter your last Name" className="signupformInput" bsStyle={signuplastName.touched && signuplastName.invalid ? 'error' : null} {...signuplastName}/>
                    </label>
                   
                    {signuplastName.touched && signuplastName.error && <div className="signupAlert">{signuplastName.error}</div>}
                 
                    <div className="signupOptionalTitle">{ "Public biographical information ( optional)" }</div>
                    <div className="optionalInfoWrapper">
                        <label for="signupemployer" > 
                            <div className="labelT">&bull; Employer </div>
                            <Input type="text" placeholder="enter your employer" className="signupformInput" {...signupemployer}/>
                        </label>  
                        
                        <label for="signupjobtitle" > 
                            <div className="labelT">&bull; Job title </div>
                            <Input type="text" placeholder="enter your job title" className="signupformInput" {...signupjobtitle}/>
                        </label>  
                        
                        <label for="signupdob" > 
                            <div className="labelT">&bull; Date of Birth </div>
                            <Input type="date" placeholder="MM/dd/yyyy" className="signupformInput" bsStyle={signupdob.touched && signupdob.invalid ? 'error' : null} {...signupdob}/>
                        </label>    
                        
                        {signupdob.touched && signupdob.error && <div className="signupAlert">{signupdob.error}</div>}
                    </div>

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
    const isFirefoxOrIe = (typeof InstallTrigger !== 'undefined') || (false || !!document.documentMode)
    
    
    if (!values.signupemail) {
        errors.signupemail = 'Required field';
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.signupemail)) {
        errors.signupemail = 'Invalid email address';
    }

    //errors.signuppassword="";
    if (!values.signuppassword) {
        errors.signuppassword = 'Required field';
    }
    else{
        if (values.signuppassword.length < 8) {
            errors.signuppassword = 'Must have at least 8 characters';   
        }
        if (values.signuppassword.length > 100) {
            if(!errors.signuppassword) {
                errors.signuppassword = 'No more then 100 characters';
            }
            else{
                errors.signuppassword = errors.signuppassword + '<br/>'+ 'No more then 100 characters';
            } 
        }
        if (!/[!@#$%^&+-]+/i.test(values.signuppassword)) {
            if(!errors.signuppassword) {
                errors.signuppassword = 'Must have at least 1 special character ( !, @, #, $, %, ^, &, +, -)';
            }
            else{
                errors.signuppassword = errors.signuppassword + '<br/>'+ 'Must have at least 1 special character ( !, @, #, $, %, ^, &, +, -)';
            } 
        }
        if (!/\d+/i.test(values.signuppassword)) {
            if(!errors.signuppassword) {
                errors.signuppassword = 'Must have at least 1 number';
            }
            else{
                errors.signuppassword = errors.signuppassword + '<br/>'+ 'Must have at least 1 number';
            } 
        }
        if (!/[A-Z]+/.test(values.signuppassword)) {
            if(!errors.signuppassword) {
                errors.signuppassword = 'Must have at least 1 uppercase letter';
            }
            else{
                errors.signuppassword = errors.signuppassword + '<br/>'+ 'Must have at least 1 uppercase letter';
            } 
        }
        if (!/[a-z]+/.test(values.signuppassword)) {
            if(!errors.signuppassword) {
                errors.signuppassword = 'Must have at least 1 lowercase letter';
            }
            else{
                errors.signuppassword = errors.signuppassword + '<br/>'+ 'Must have at least 1 lowercase letter';
            } 
        }
    }
    
    if (!values.signupconfirmpassword) {
        errors.signupconfirmpassword = 'Required field';
    } 
    else if (values.signupconfirmpassword !== values.signuppassword) {
        errors.signupconfirmpassword = 'Password not match';
    }    

    if (!values.signupfirstName) {
        errors.signupfirstName = 'Required field';
    }  

    if (!values.signuplastName) {
        errors.signuplastName = 'Required field';
    } 

    if ( isFirefoxOrIe ){
        if(!/^([0][1-9]|[1][0-2])\/([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/([1][9]|[2][0])[0-9][0-9]$/i.test(values.signupdob)){
            errors.signupdob = 'Invalid date format';      
        } 
        else {
            let day, A = values.signupdob.match(/[1-9][\d]*/g);
            day = new Date(A[2], --A[0], A[1]);
            
            if(!(day.getMonth()== A[0] && day.getDate()== A[1])){
                errors.signupdob = 'Invalid date format';
            }
            else if(day>new Date()){
                errors.signupdob = 'yo from future?';    
            }
        }        
    }
    else {
        let day = new Date(values.signupdob);
        if(day>new Date()){
            errors.signupdob = 'yo from future?';    
        }
    }

    return errors;
};

function mapDispatchToProps (dispatch) {
    return {
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
    fields: ['signupfirstName', 'signuplastName', 'signupemail', 'signuppassword', 'signupconfirmpassword', 'signupemployer', 'signupjobtitle','signupdob'],
    validate
}, mapStateToProps, mapDispatchToProps)(Signupform);

export default Signupform;
