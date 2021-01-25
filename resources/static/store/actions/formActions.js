import axios from "axios"

export const SET_X = "SET_X"
export const SET_Y = "SET_Y"
export const SET_R = "SET_R"
export const R_IS_INVALID = "R_IS_INVALID"
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
export const SET_X_VALID = "SET_X_VALID"
export const SET_R_VALID = "SET_R_VALID"
export const SUBMIT = "SUBMIT"
export const SET_CONTENT = "SET_CONTENT"
export const SET_WIDTH = "SET_WIDTH"

export const ADD_POINT = "ADD_POINT"

export function setX(x) {
	let isXValid = false
	if (/^-?\d+([.,]\d+)?$/.test(x) && Number(x) >= -3 && Number(x) <= 3)
		isXValid = true
	return {
		type: SET_X,
		payload: {
			x: x,
			isXValid: isXValid
		}
	}
}

export function setXValid(isXValid) {
	return {
		type: SET_X_VALID,
		payload: isXValid
	}
}

export function setY(y) {
	return {
		type: SET_Y,
		payload: y
	}
}

export function setR(r) {
	if (/^-?\d+([.,]\d+)?$/.test(r) && Number(r) >= -3 && Number(r) <= 3) {
		return {
			type: SET_R,
			payload: {
				r: Number(r.replace(",", ".")),
				isRValid: true
			}
		}
	} else {
		return {
			type: R_IS_INVALID,
			payload: false
		}
	}
}

export function setRValid(isRValid) {
	return {
		type: SET_R_VALID,
		payload: isRValid
	}
}

export function setErrorMessage(errorMessage) {
	return {
		type: SET_ERROR_MESSAGE,
		payload: errorMessage
	}
}

export function submit(x, y, r, isXValid, isRValid) {
	if (!isXValid || !isRValid) {
		alert("Вы используете запрещенные приемчики! Не надо так")
		return {
			type: "NOTHING_HAPPENED"
		}
	}
	if (x === "" || r === "") {
		alert("Не все значения введены!")
		return {
			type: "NOTHING_HAPPENED"
		}
	}
	return dispatch => {
		axios.post("http://localhost:8080/form/submit", {
			x: Number(x.replace(",", ".")),
			y: y,
			r: r
		})
			.then((resp) =>
				dispatch(submitSuccess(x, y, r, resp.data)))
			.catch(err => dispatch(submitFailure(err)))
	}
}

function submitSuccess(x, y, r, data) {
	return {
		type: ADD_POINT,
		payload: {
			x: Number(x),
			y: y,
			r: Number(r),
			inArea: data.in
		}
	}
}

function submitFailure(err) {
	console.log(err.message)
	return {
		type: "SUBMIT_ERROR"
	}
}

export function handleClick(event, r) {
	let coords = document.getElementById("svg").getBoundingClientRect()
	let x = r/100*(event.clientX - 150 - coords.left)
	let y = r/100*(150 + coords.top - event.clientY)
	return submit(String(x), y, r, true, true)
}

export function getUsersPoints() {
	return (dispatch) => {
		axios.post("http://localhost:8080/form/getUsersPoints")
			.then(r => dispatch(getUsersPointsSuccess(r.data)))
			.catch(err => dispatch(getUsersPointsFailure(err)))
	}
}

function getUsersPointsSuccess(data) {
	console.log(data)
	return {
		type: SET_CONTENT,
		payload: data
	}
}

function getUsersPointsFailure(err) {
	console.log(err)
	return {
		type: "SET_CONTENT_ERR"
	}
}

export function deletePoints() {
	return (dispatch) => {
		axios.post("http://localhost:8080/form/delete")
			.then(() => dispatch(deletePointsSuccess()))
			.catch((err) => dispatch(deletePointsFailure(err)))
	}
}

function deletePointsSuccess() {
	return {
		type: SET_CONTENT,
		payload: []
	}
}

function deletePointsFailure(err) {
	console.log(err.message)
	return {
		type: "DELETE_ERROR"
	}
}

export function widthUpdate(width) {
	return {
		type: SET_WIDTH,
		payload: width
	}
}