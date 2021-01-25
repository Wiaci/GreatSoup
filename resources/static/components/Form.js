import React from "react"
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import {Button} from "primereact/button";
import {deletePoints, setErrorMessage, setR, setX, setY, submit} from "../store/actions/formActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../store/actions/authActions";
import {useHistory} from "react-router";

const Form = (props) => {
	return (
		<div id="form">
			<span>X: </span>
			<InputText placeholder="От -3 до 3" onChange={e => props.setX(e.target.value)}/> <br/>
			<small className="invalid">{!props.isXValid && "Некорректные данные!"}</small> <br/>
			<span>Y: {props.y}</span>
			<Slider min={-3}
			        max={5}
			        value={props.y}
			        onChange={e => props.setY(e.value)}/> <br/>
			<span>R: </span>
			<InputText placeholder="От -3 до 3"
			           className={!props.isRValid && "invalid"}
			           onChange={e => props.setR(e.target.value)}/> <br/>
			<small className="invalid">{!props.isRValid && "Некорректные данные!"}</small> <br/>
			<button className="btn" onClick={() =>
				props.submit(props.x, props.y, props.r, props.isXValid,
					props.isRValid)}>Submit</button>
			<button className="btn" onClick={() =>
				props.deletePoints()}>Очистить</button>
			<Link to={"/"} onClick={() => props.logout()} id="logout">Logout</Link>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		x: state.form.x,
		isXValid: state.form.isXValid,
		y: state.form.y,
		r: state.form.r,
		isRValid: state.form.isRValid,
		errorMessage: state.form.errorMessage
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setX: x => dispatch(setX(x)),
		setY: y => dispatch(setY(y)),
		setR: r => dispatch(setR(r)),
		setErrorMessage: errorMessage => dispatch(setErrorMessage(errorMessage)),
		submit: (x, y, r, isXValid, isRValid, login) =>
			dispatch(submit(x, y, r, isXValid, isRValid, login)),
		deletePoints: () => dispatch(deletePoints()),
		logout: () => dispatch(logout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
