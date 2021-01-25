import {
	ADD_POINT,
	R_IS_INVALID, SET_CONTENT,
	SET_ERROR_MESSAGE,
	SET_R,
	SET_R_VALID, SET_WIDTH,
	SET_X,
	SET_X_VALID,
	SET_Y
} from "../actions/formActions";

const initialState = {
	x: "",
	y: 0,
	r: 1,
	login: "",
	isXValid: true,
	isRValid: true,
	errorMessage: "",
	content: [],
	width: 1247
}

function formReducer(state = initialState, action) {
	console.log(state)
	switch (action.type) {
		case SET_X: return {
			...state,
			x: action.payload.x,
			isXValid: action.payload.isXValid
		}
		case SET_Y: return {...state, y: action.payload};
		case SET_R: return {
			...state,
			r: action.payload.r,
			isRValid: action.payload.isRValid
		}
		case R_IS_INVALID: return {...state, isRValid: action.payload}
		case SET_CONTENT:
			return {...state, content: getNewContent(action.payload, null)}
		case SET_ERROR_MESSAGE: return {...state, errorMessage: action.payload}
		case SET_WIDTH: return {...state, width: action.payload}
		case ADD_POINT:
			return {...state, content: getNewContent(state.content, action.payload)}
		default: return state
	}
}

function getNewContent(currentContent, newEl) {
	const newContent = []
	currentContent.forEach((el) => {
		newContent.push(el)
	})
	if (newEl !== null) {
		newContent.push(newEl)
	}
	return newContent
}

export default formReducer