
const modalActions = {
	showSignupModal() {
		return { type: 'SHOWSIGNUPMODAL' };
	},
    hideSignupModal() {
		return { type: 'HIDESIGNUPMODAL' };
	},
    showEventModal() {
		return { type: 'SHOWEVENTMODAL' };
	},
    hideEventModal() {
		return { type: 'HIDEEVENTMODAL' };
	}
};

export default modalActions;