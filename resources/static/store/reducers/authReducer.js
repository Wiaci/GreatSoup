import {LOGIN, LOGOUT, REGISTER, SET_ERROR_MESSAGE, SET_LOGIN, SET_PASSWORD} from "../actions/authActions";

const initialState = {
	login: "",
	password: "",
	errorMessage: "",
	hidden: true,
}

function authReducer(state = initialState, action) {
	console.log(state)
	switch (action.type) {
		case SET_LOGIN: return {...state, login: action.payload};
		case SET_PASSWORD: return {...state, password: action.payload}
		case SET_ERROR_MESSAGE: return {...state, errorMessage: action.payload}
		case REGISTER: return {...state,
			errorMessage: action.payload.errorMessage,
			hidden: action.payload.hidden}
		case LOGIN: return {...state, hidden: action.payload}
		case LOGOUT: return {...state, hidden: action.payload}
		default: return state
	}
}

export default authReducer;