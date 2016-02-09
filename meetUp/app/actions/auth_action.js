import C from '../constants';

import {reset} from 'redux-form';

import Firebase from 'firebase';

const fireRef = new Firebase(C.FIREBASE);

const authActions = {
	startListeningToAuth() {
		return (dispatch, getState) => {
			fireRef.onAuth((authData) => {
				if (authData) {
					dispatch({
						type: C.LOGIN_USER,
						uid: authData.uid
					});
				} else {
					if (getState().auth.currently !== C.ANONYMOUS) {
						dispatch({ type: C.LOGOUT });
					}
				}
			});
		};
	},
	attemptSignupLogin(data) {
		return (dispatch) => {
			dispatch({ type: C.ATTEMPTING_LOGIN });
            /*
			fireRef.authWithOAuthPopup('facebook', (error) => {
				if (error) {
					dispatch({ type: C.DISPLAY_ERROR, error: 'Login failed! ' + error });
					dispatch({ type: C.LOGOUT });
				}
			});
            */
            //create annount
            fireRef.createUser({
              email    : data.signupemail,
              password : data.signuppassword
            }, function(error, userData) {
              if (error) {
                console.log("Error creating user:", error);
                dispatch({ type: C.DISPLAY_ERROR, error: error.toString() }); 
                dispatch({ type: C.LOGOUT });  
              } else {
                dispatch({ type: 'HIDESIGNUPMODAL'});  
                console.log("Successfully created user account with uid:", userData.uid);
                fireRef.authWithPassword({
                  email    : data.signupemail,
                  password : data.signuppassword
                }, function(error, authData) {
                  if (error) {
                    console.log("Login Failed!", error);
                    dispatch({ type: C.DISPLAY_ERROR, error: error.toString() });   
                    dispatch({ type: C.LOGOUT });  
                  } else {
                    console.log("Authenticated successfully with payload:", authData);
                    dispatch({ type: C.DISMISS_FEEDBACK });  
                    var usersRef = fireRef.child('users').child(authData.uid);
                    usersRef.set({
                      full_name: {
                        first_name: data.signupfirstName,
                        last_name: data.signuplastName
                      },
                      dob: data.signupdob        
                    });  

                  }
                });  
              }
            });
		};
	},
    attemptLogin(data) {
		return (dispatch) => {
			dispatch({ type: C.ATTEMPTING_LOGIN });

            fireRef.authWithPassword({
              email    : data.email,
              password : data.password
            }, function(error, authData) {
              if (error) {
                console.log("Login Failed!", error);
                dispatch(reset('register'));   
                dispatch({ type: C.DISPLAY_ERROR, error: error.toString() });  
                dispatch({ type: C.LOGOUT });  
              } else {
                dispatch({ type: C.DISMISS_FEEDBACK });  
                console.log("Authenticated successfully with payload:", authData);
              }
            }); 
		};
	},
	logoutUser() {
		return (dispatch) => {
			dispatch({ type: C.LOGOUT });
			fireRef.unauth();
		};
	}
};

export default authActions;
