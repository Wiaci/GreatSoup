import LoginForm from "./LoginForm";
import React from "react";

const HomePage = (props) => {
	return (
		<div>
			<LoginForm isLogin={props.isLogin}/>
		</div>
	)
}

export default HomePage