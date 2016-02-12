import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { routeActions } from 'react-router-redux';
import { Button, Modal, Input } from 'react-bootstrap';
import actions from '../actions';
import MySelectComponent from './mySelectComponent';
//import MyMultiSelectComponent from './myMultiSelectComponent';

window.autocomplete=null;

class Eventform extends Component {
    
    logChange(val) {
    console.log("Selected: " + val);
        this.props.fields.eventType.value=val;
    }
    
    constructor() {
		super();
        this.handleChange = this.handleChange.bind(this);
        this.state = { 
            typeOptions: [
                { value: 'birthday party', label: 'birthday party' },
                { value: 'conference talk', label: 'conference talk' },
                { value: 'wedding', label: 'wedding' }
            ],
            guestOptions: [
                { value: 'Pete Rock', label: 'Pete Rock' },
                { value: 'J Dilla', label: 'J Dilla' },
                { value: 'Sean Price', label: 'Sean Price' }
            ],                     
        };
	}    
    
    componentDidMount(){
        autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')));
        autocomplete.addListener('place_changed', ()=>{
            this.handleChange(autocomplete.getPlace().formatted_address); 
        });
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props.auth.currently !== 'LOGGED_IN'){
            this.props.goSomewhere('/');
        }
    }
    
    cancel() {
        setTimeout(window.scrollTo(0,0),100);
        this.props.goSomewhere('/');
        this.props.resetForm();
    }
    
    addEvent(data) {
        this.props.submitNewEvent(data);
        this.props.goSomewhere('/');
        this.props.resetForm();
    }
    
    handleChange(value) {
        this.props.fields.eventLocation.onChange(value);
    }
    
    render() {
        const { fields: { eventName, eventType, eventHost, eventStartDatetime, eventEndDatetime, eventGuestlist, eventLocation, eventOptionalmessage }, handleSubmit } = this.props;
        
        return (
            <div className="eventformFormWrapper">
                <div className="eventformFormTitle">Create New Event</div>
                <form className="eventformForm" onSubmit={handleSubmit(this.addEvent.bind(this))}>
                    <div>
                        <label><div className="eventlabelT">Name</div>
                        <Input type="text" placeholder="event Name" bsStyle={eventName.touched && eventName.invalid ? 'error' : null} {...eventName} autoFocus="true"/>
                        </label>
                    </div>
                        
                    {eventName.touched && eventName.error && <div className="signupAlert">{eventName.error}</div>}    
                        
                    <div>
                        <label><div className="eventlabelT">Type</div>
                           <MySelectComponent {...eventType} multi={false} alert={eventType.touched && eventType.invalid} options={this.state.typeOptions}/>
                        </label>    
                    </div>
                          
                     {eventType.touched && eventType.error && <div className="signupAlert">{eventType.error}</div>}       

                    <div>
                        <label><div className="eventlabelT">Host</div>
                        <Input type="text" placeholder="event Host" bsStyle={eventHost.touched && eventHost.invalid ? 'error' : null} {...eventHost}/>
                        </label>
                    </div>
                        
                     {eventHost.touched && eventHost.error && <div className="signupAlert">{eventHost.error}</div>}     
                        
                    <div>
                        <label><div className="eventlabelT">Start date and time</div>
                        <Input type="datetime-local" placeholder="MM/dd/yyyy hh:mm" bsStyle={eventStartDatetime.touched && eventStartDatetime.invalid ? 'error' : null} {...eventStartDatetime}/>
                        </label>
                    </div>
                        
                    {eventStartDatetime.touched && eventStartDatetime.error && <div className="signupAlert">{eventStartDatetime.error}</div>}     
                        
                    <div>
                        <label><div className="eventlabelT">End date and time</div>
                        <Input type="datetime-local" placeholder="MM/dd/yyyy hh:mm" bsStyle={eventEndDatetime.touched && eventEndDatetime.invalid ? 'error' : null} {...eventEndDatetime}/>
                        </label>
                    </div>
                        
                    {eventEndDatetime.touched && eventEndDatetime.error && <div className="signupAlert">{eventEndDatetime.error}</div>}     
                    
        <div>
            <label><div className="eventlabelT">Guest list</div>
               <MySelectComponent multi={true} {...eventGuestlist} alert={eventGuestlist.touched && eventGuestlist.invalid} options={this.state.guestOptions}/>
            </label>    
        </div>

         {eventGuestlist.touched && eventGuestlist.error && <div className="signupAlert">{eventGuestlist.error}</div>} 
                    
                    <div>
                        <label><div className="eventlabelT">Location</div>
                            <Input id="autocomplete" placeholder="Enter your address" bsStyle={eventLocation.touched && eventLocation.invalid ? 'error' : null} type="text" {...eventLocation}/>
                         
                        </label>
                    </div>
                    
                    {eventLocation.touched && eventLocation.error && <div className="signupAlert">{eventLocation.error}</div>}           
                            
                    
                    <div>
                        <label><div className="eventlabelT">Message (optional)</div>
                        <Input type="textarea" placeholder="Optional message" {...eventOptionalmessage}/>
                        </label>            
                    </div> 
                        
                        
     
                    <div className="eventformSubmitWrapper">
                        <Button bsStyle="warning" onClick={this.cancel.bind(this)} onTouchEnd={this.cancel.bind(this)} >
                            Cancel
                        </Button>
                        <span  className="betweenTwoB"></span>
                        <Button type="submit">Submit</Button> 
                    </div>
                </form>   
            </div>  
        );
    }
}


const validate = values => {
    const errors = {};
    const isFirefoxOrIe = (typeof InstallTrigger !== 'undefined') || (false || !!document.documentMode);

    if (!values.eventName) {
        errors.eventName = 'Required field';
    }

    if (!values.eventType) {
        errors.eventType = 'Required field';
    }

    if (!values.eventHost) {
        errors.eventHost = 'Required field';
    }

    if (!values.eventStartDatetime) {
        errors.eventStartDatetime = 'Required field';
    } 
    else if ( isFirefoxOrIe ) {
        if(!/^([0][1-9]|[1][0-2])\/([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/[1-2][0-9][0-9][0-9]\s([0-1][0-9]|[2][0-3]):([0-5][0-9])$/i.test(values.eventStartDatetime)){
            errors.eventStartDatetime = 'Invalid time format';      
        } 
        else {
            let day, A= values.eventStartDatetime.match(/[1-9][\d]*/g);
            day= new Date(A[2], --A[0], A[1]);
            if(!(day.getMonth()== A[0] && day.getDate()== A[1])){
                errors.eventStartDatetime = 'Invalid time format';
            } 
        }
    }

    if (!values.eventEndDatetime) {
        errors.eventEndDatetime = 'Required field';
    } 
    else if ( isFirefoxOrIe ) {
        if(!/^([0][1-9]|[1][0-2])\/([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/[1-2][0-9][0-9][0-9]\s([0-1][0-9]|[2][0-3]):([0-5][0-9])$/i.test(values.eventEndDatetime)){
            errors.eventEndDatetime = 'Invalid time format';      
        } 
        else {
            let day, A= values.eventEndDatetime.match(/[1-9][\d]*/g);
            day= new Date(A[2], --A[0], A[1]);
            if(!(day.getMonth()== A[0] && day.getDate()== A[1])){
                errors.eventEndDatetime = 'Invalid time format';
            } 
        }
    } 

    if ( new Date(values.eventStartDatetime) >= new Date(values.eventEndDatetime) ) {
        errors.eventEndDatetime = 'End date should be after start date';     
    }     
    
    if (!values.eventGuestlist) {
        errors.eventGuestlist = 'Required field';
    }
    
    if (!values.eventLocation) {
        errors.eventLocation = 'Required field';
    } 

    return errors;
};


function mapDispatchToProps (dispatch) {
    return {
        submitNewEvent(data) { dispatch(actions.submitNewEvent(data)); },
        goSomewhere(url) { dispatch(routeActions.push(url)); },
    };
}

function mapStateToProps (appState) {
	return {
		showEventform: appState.showModal.showEventform,
        auth: appState.auth
	};
};

Eventform = reduxForm({
    form: 'eventform',
    fields: ['eventName', 'eventType', 'eventHost', 'eventStartDatetime', 'eventEndDatetime', 'eventGuestlist', 'eventLocation', 'eventOptionalmessage'],
    validate
}, mapStateToProps, mapDispatchToProps)(Eventform);

export default Eventform;

 
 
 
 
 
 