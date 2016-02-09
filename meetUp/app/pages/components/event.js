import React, { Component } from 'react';
import C from '../../constants';

import { Panel } from 'react-bootstrap';

class Event extends Component {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
	}
	submit(e) {
		this.props.submit(this.refs.field.value);
		this.refs.field.value = '';
		e.preventDefault();
	}
	render() {
		const p = this.props;
		let button;
		if (p.state === C.EDITING_EVENT) {
			return (<form className="event" onSubmit={this.submit}>
				<input ref="field" defaultValue={p.event.content}/>
				<button type="button" onClick={p.cancel}>Cancel</button>
				<button type="submit" onClick={this.submit}>Submit</button>
			</form>);
		}
		if (!p.mayedit) {
			button = '';
		} else if (p.state === C.SUBMITTING_EVENT) {
			button = <button disabled="disabled">Submitting...</button>;
		} else {
			button = <span><button onClick={p.edit}>Edit</button><button onClick={p.delete}>Delete</button></span>;
		}
		return (
			
				<Panel header={p.event.name} >
                    <div> {p.event.type} </div>
                    <div> {p.event.host} </div>
                    <div> {button} </div>
			    </Panel>
		);
	}
}

export default Event;
