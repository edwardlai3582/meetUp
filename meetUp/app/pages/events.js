import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

import Event from './components/event';
import Eventform from './eventform';
import { Button, Modal, Accordion } from 'react-bootstrap';


class Events extends Component {
	componentWillMount() {
        console.log("UID= "+this.props.auth.uid);
		this.props.startListeningToEvents();
	}
    
    constructor() {
		super();
		this.newEvent = this.newEvent.bind(this);
	}
    
    open() {
        //this.setState({ showModal: true });
          this.props.showEventModal();
    }
    
    
	newEvent(e) {
		if (!this.props.events.submitting) {
			e.preventDefault();
			this.props.submitNewEvent(this.refs.newevent.value);
			this.refs.newevent.value = '';
		}
	}
  onScriptLoaded() {
        console.log('loaded it');
    }  
	render() {
		const p = this.props;
		let rows = [];
		if (p.events.data) {
			rows = Object.keys(p.events.data).map((qid) => {
				const event = p.events.data[qid];
				const eventstate = p.events.states[qid];
                console.log(qid);
				return (
					<Event
						key={qid}
						event={event}
						qid={qid}
						state={eventstate}
						edit={p.startEdit.bind(this, qid)}
						cancel={p.cancelEdit.bind(this, qid)}
						submit={p.submitEdit.bind(this, qid)}
						delete={p.deleteEvent.bind(this, qid)}
						mayedit={p.auth.uid === event.uid}
					/>
				);
			});
		}
		return (
			<div className="eventslist">
                <Accordion>
                    {p.events.hasreceiveddata ? rows : 'Loading events...'}
                </Accordion>
                <div className="neweventWrapper">
                    <Button className="neweventB" onClick={this.open.bind(this)} >
                        Add new event
                    </Button>
                </div>
                
                <Eventform/>            
			</div>
		);
	}
}

const mapStateToProps = (appState) => {
	return {
		events: appState.events,
		auth: appState.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		submitNewEvent(content) { dispatch(actions.submitNewEvent(content)); },
		startEdit(qid) { dispatch(actions.startEventEdit(qid)); },
		cancelEdit(qid) { dispatch(actions.cancelEventEdit(qid)); },
		submitEdit(qid, content) { dispatch(actions.submitEventEdit(qid, content)); },
		deleteEvent(qid) { dispatch(actions.deleteEvent(qid)); },
        startListeningToEvents(){dispatch(actions.startListeningToEvents()); },
        
        showEventModal(){dispatch(actions.showEventModal())},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
