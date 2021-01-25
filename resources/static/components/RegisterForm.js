import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {register, setErrorMessage, setLogin, setPassword} from "../store/actions/authActions";
import {connect} from "react-redux";

const RegisterForm = (props) => {
	const history = useHistory()

	return (
		<div className="login-form">
			<h3>Регистрация</h3>
			<InputText placeholder="Введите логин"
			           onChange={(e) => props.setLogin(e.target.value)}/> <br/>

			<Password placeholder="Введите пароль"
			          onChange={(e) => props.setPassword(e.target.value)}/> <br/>
			<span>{props.errorMessage}</span> <br/>
			<Button label="Подтвердить!" onClick={() =>
				props.register(props.login, props.password, history)}/> <br/>
			<Link to="/">Вернуться</Link>
		</div>
	)

}

const mapStateToProps = (state) => {
	return {
		login: state.auth.login,
		password: state.auth.password,
		errorMessage: state.auth.errorMessage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLogin: login => dispatch(setLogin(login)),
		setPassword: password => dispatch(setPassword(password)),
		register: (login, password, history) =>
			dispatch(register(login, password, history)),
		setErrorMessage: errorMessage =>
			dispatch(setErrorMessage(errorMessage))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

