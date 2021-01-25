import axios from "axios";

export const SET_LOGIN = "SET_LOGIN";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
export const REGISTER = "REGISTER"
export const USER_IS_ALREADY_LOGGED = "USER_IS_ALREADY_LOGGED"
export const USER_IS_NOT_LOGGED = "USER_IS_NOT_LOGGED"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export function setLogin(login) {
	return {
		type: SET_LOGIN,
		payload: login
	}
}

export function setPassword(password) {
	return {
		type: SET_PASSWORD,
		payload: password
	}
}

export function setErrorMessage(errorMessage) {
	return {
		type: SET_ERROR_MESSAGE,
		payload: errorMessage
	}
}

export function register(login, password, history) {
	return dispatch => {
		axios.post('http://localhost:8080/post/register', {
			login: login,
			password: password
		}).then(r => {
			dispatch(registerSuccess(r.data, history))
		}).catch(err => {
			dispatch(registerFailure(err))
		})
	}
}

function registerSuccess(data, history) {
	console.log(data)
	let hidden = true
	let errorMessage = ""
	if (data.added === "true") {
		hidden = false
		history.push("/main")
	} else if (data.in === "true") {
		errorMessage = "Пользователь с таким логином уже зарегистрирован!"
	} else errorMessage = "Ответ сервера некорректный"
	return {
		type: REGISTER,
		payload: {
			errorMessage: errorMessage,
			hidden: hidden
		}
	}
}

function registerFailure(err) {
	const errorMessage = "Ошибка сервера"
	console.log(err.message)
	return {
		type: REGISTER,
		payload: errorMessage
	}
}

export function checkIfLogged(history) {
	console.log("CheckIfLogged")
	return dispatch => {
		axios.post("http://localhost:8080/post/checkIfLogged")
			.then(r => {
				if (r.data.log === "true") dispatch(userIsAlreadyLogged(history))
				else dispatch(userIsNotLogged(history))
			})
			.catch((err) => dispatch(checkIfLoggedFailure(err)))
	}
}

function userIsAlreadyLogged(history) {
	history.push("/main")
	console.log(USER_IS_ALREADY_LOGGED)
	return {
		type: USER_IS_ALREADY_LOGGED
	}
}

function userIsNotLogged(history) {
	history.push("/")
	console.log(USER_IS_NOT_LOGGED)
	return {
		type: USER_IS_NOT_LOGGED
	}
}

function checkIfLoggedFailure(err) {
	alert(err.message)
	console.log(err.message)
	return {
		type: "CHECK_IF_LOGGED_FAILURE",
	}
}

export function logout() {
	return dispatch => {
		axios.post("http://localhost:8080/post/logout")
			.then(() => dispatch(() => {
				console.log("logged out")
				return {
					type: LOGOUT
				}
			}))
			.catch((err) => dispatch((err) => {
				console.log(err.message)
				return {type: "LOGOUT_FAILURE"}
			}))
	}
}

export function checkLogin(login, password) {
	return (dispatch) => {
		axios.post('http://localhost:8080/post/login', {
			login: login,
			password: password
		}).then(r => dispatch(checkLoginSuccess(r.data)))
			.catch(err => dispatch(checkLoginFailure(err)))
	}
}

function checkLoginSuccess(data) {
	let hidden = true
	if (data.auth === "true") {
		hidden = false
		history.push("/main")
	} else if (data.ident === "true") {
		alert("Неверный пароль!")
	} else {
		alert("Такого пользователя нет!")
	}
	return {
		type: LOGIN,
		payload: hidden
	}
}

function checkLoginFailure(err) {
	console.log(err.message)
	return {
		type: "LOGIN_FAILURE"
	}
}