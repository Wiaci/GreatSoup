import React, {Component} from "react"
import Graph from "./Graph";
import Form from "./Form";
import Table from "./Table";
import {connect} from "react-redux";
import {logout} from "../store/actions/authActions";
import {getUsersPoints, widthUpdate} from "../store/actions/formActions";

class MainPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			width: 0
		}
	}

	componentDidMount() {
		this.props.getUsersPoints()
		window.addEventListener("resize", () => {
			this.state.width = document.getElementById("root").clientWidth;
			console.log(document.getElementById("root").clientWidth + " evL")
			this.forceUpdate()
		})
	}

	render() {
		console.log("render " + document.getElementById("root").clientWidth)
		if (this.state.width >= 1247 || this.state.width <= 748) {
			console.log(this.state.width + " width")
			return (
				<div id="wrapper">
					<Graph points={this.props.points} r={this.props.r}/>
					<Form/>
					<Table content={this.props.points}/>
				</div>
			)
		} else {
			console.log(this.state.width + " width")
			return (
				<div id="wrapper">
					<Table content={this.props.points}/>
					<Graph points={this.props.points} r={this.props.r}/>
					<Form/>
				</div>
			)
		}
	}
	/*render() {
		console.log("render " + document.getElementById("root").clientWidth)
		if (this.props.width >= 1247 || this.props.width <= 748) {
			console.log(this.props.width + " width")
			return (
				<div id="wrapper">
					<Graph points={this.props.points} r={this.props.r}/>
					<Form/>
					<Table content={this.props.points}/>
				</div>
			)
		} else {
			console.log(this.props.width + " width")
			return (
				<div id="wrapper">
					<Table content={this.props.points}/>
					<Graph points={this.props.points} r={this.props.r}/>
					<Form/>
				</div>
			)
		}
	}*/

}

const mapStateToProps = (state) => {
	return {
		points: state.form.content,
		r: state.form.r,
		width: state.form.width
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUsersPoints: () => dispatch(getUsersPoints()),
		logout: () => dispatch(logout()),
		widthUpdate: (width) => dispatch(widthUpdate(width))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)