import {useHistory} from "react-router";
import React, {useEffect} from "react";
import {checkIfLogged} from "../store/actions/authActions";
import {connect} from "react-redux";
import Header from "./Header";
import {Route, Switch} from "react-router-dom";
import HomePage from "./HomePage";
import RegistrationPage from "./RegistrationPage";
import MainPage from "./MainPage";

import "../css/style.css"
import "primereact/components/slider/Slider.css"
import "primereact/components/inputtext/InputText.css"
import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/nova-colored/theme.css"
import "font-awesome/css/font-awesome.css"
import 'primeicons/primeicons.css';

const App = (props) => {
	const history = useHistory();

	useEffect(() => {
		props.checkIfLogged(history)
	}, [])

	return (
		<div>
			<Header/>
			<div>
				<Switch>
					<Route exact path="/" component={HomePage}/>
					<Route path="/registration" component={RegistrationPage}/>
					<Route path="/main" component={MainPage}/>
				</Switch>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		checkIfLogged: (history) => dispatch(checkIfLogged(history)),
	}
}

export default connect(null, mapDispatchToProps)(App)