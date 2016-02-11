import C from '../../constants';
import initialState from '../initialstate';

export default (currentfeedback, action) => {
	switch (action.type) {
		case C.DISMISS_FEEDBACK:
			return { msg: "", error: false };
		case C.DISPLAY_ERROR:
            return { msg: action.error, error: true };
		case C.DISPLAY_MESSAGE:
            return { msg: action.message, error: false };
		default: return currentfeedback || initialState.feedback;
	}
};
