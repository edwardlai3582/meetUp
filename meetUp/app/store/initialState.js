/*
This is the initial state of the Redux Store.
*/

import C from '../constants';

export default {
	//feedback: [],
	feedback: {
        msg: "", 
        error: false 
    },
    auth: {
		currently: C.ANONYMOUS,
		username: null,
		uid: null
	},
    events: {
		hasreceiveddata: false,
		submittingnew: false,
		states: {}, // events UI state
		data: {} // events data
	},
    showModal: {
        showSignupform:false,
        showEventform:false
    } 
};
