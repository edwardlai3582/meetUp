import C from '../../constants';
import initialState from '../initialstate';

export default (currentstate, action) => {
	let newstate;
	switch (action.type) {
		case C.RECEIVE_EVENTS_DATA:
			return Object.assign({}, currentstate, {
				hasreceiveddata: true,
				data: action.data
			});
		case C.AWAIT_NEW_EVENT_RESPONSE:
			return Object.assign({}, currentstate, {
				submittingnew: true
			});
		case C.RECEIVE_NEW_EVENT_RESPONSE:
			return Object.assign({}, currentstate, {
				submittingnew: false
			});
		case C.START_EVENT_EDIT:
			newstate = Object.assign({}, currentstate);
			newstate.states[action.qid] = C.EDITING_EVENT;
			return newstate;
		case C.FINISH_EVENT_EDIT:
			newstate = Object.assign({}, currentstate);
			delete newstate.states[action.qid];
			return newstate;
		case C.SUBMIT_EVENT_EDIT:
			newstate = Object.assign({}, currentstate);
			newstate.states[action.qid] = C.SUBMITTING_EVENT;
			return newstate;
		default: return currentstate || initialState.events;
	}
};
