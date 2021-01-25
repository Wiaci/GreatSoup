import React, {useState} from "react"
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")
	const history = useHistory();

	function check() {
		axios.post('http://localhost:8080/post/login', {
			login: login,
			password: password
		}).then(r => {
			if (r.data.auth === "true") {
				history.push("/main")
			}
		})
	}

	return (
		<div className="login-form">
			<h3>Вход</h3>
			<InputText placeholder="Введите логин" onChange={(e) =>
				setLogin(e.target.value)}/> <br/>
			<Password placeholder="Введите пароль" onChange={(e) =>
				setPassword(e.target.value)}/> <br/>
			<Button label="Войти" onClick={check}/> <br/>
			<Link to="/registration">Регистрация</Link>
		</div>
	)
}

export default LoginForm