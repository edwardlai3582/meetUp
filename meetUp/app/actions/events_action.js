import C from '../constants';
import Firebase from 'firebase';

const Ref = new Firebase(C.FIREBASE);

const eventsActions = {
	// called when the app starts. this means we immediately download all articles, and
	// then receive all articles again as soon as anyone changes anything.
	startListeningToEvents() {
		return (dispatch, getState) => {
            const state = getState();
			const uid = state.auth.uid;
            var eventsRef = Ref.child('users').child(uid).child('events');
			eventsRef.on('value', (snapshot) => {
                console.log(snapshot.key());
				dispatch({ type: C.RECEIVE_EVENTS_DATA, data: snapshot.val() });
			});
		};
	},
	startEventEdit(qid) {
		return { type: C.START_EVENT_EDIT, qid };
	},
	cancelEventEdit(qid) {
		return { type: C.FINISH_EVENT_EDIT, qid };
	},
	deleteEvent(qid) {
		return (dispatch) => {
			dispatch({ type: C.SUBMIT_EVENT_EDIT, qid });
			Ref.child(qid).remove((error) => {
				dispatch({ type: C.FINISH_EVENT_EDIT, qid });
				if (error) {
					dispatch({ type: C.DISPLAY_ERROR, error: 'Deletion failed! ' + error });
				} else {
					dispatch({ type: C.DISPLAY_MESSAGE, message: 'Event successfully deleted!' });
				}
			});
		};
	},
	submitEventEdit(qid, content) {
		return (dispatch, getState) => {
			const state = getState();
			//const username = state.auth.username;
			const uid = state.auth.uid;
			const error = false;
			if (error) {
				dispatch({ type: C.DISPLAY_ERROR, error });
			} else {
				dispatch({ type: C.SUBMIT_EVENT_EDIT, qid });
				Ref.child(qid).set({ content, uid }, (error2) => {
					dispatch({ type: C.FINISH_EVENT_EDIT, qid });
					if (error2) {
						dispatch({ type: C.DISPLAY_ERROR, error: 'Update failed! ' + error });
					} else {
						dispatch({ type: C.DISPLAY_MESSAGE, message: 'Update successfully saved!' });
					}
				});
			}
		};
	},
	submitNewEvent(data) {
		return (dispatch, getState) => {
			const state = getState();
			const uid = state.auth.uid;
            var eventsRef = Ref.child('users').child(uid).child('events');
            
            dispatch({ type: C.AWAIT_NEW_EVENT_RESPONSE });
            //eventName, eventType, eventHost
            eventsRef.push({ 
                            "name": data.eventName,
                            "type": data.eventType,
                            "host": data.eventHost,
                            "start": data.eventStartDatetime,
                            "end": data.eventEndDatetime,
                            "location": data.eventLocation
                           }, (error2) => {
                dispatch({ type: C.RECEIVE_NEW_EVENT_RESPONSE });
                if (error2) {
                    dispatch({ type: C.DISPLAY_ERROR, error: 'Submission failed! ' + error });
                } else {
                    dispatch({ type: C.DISPLAY_MESSAGE, message: 'Submission successfully saved!' });
                    dispatch({ type: 'HIDEEVENTMODAL'});
                }
            });
			
		};
	}
};

export default eventsActions;
