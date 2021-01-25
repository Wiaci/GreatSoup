import React from "react"
import {render} from "react-dom"
import store from "./store/store"
import {Provider} from "react-redux";
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";

const Main = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>
	)
}

render(<Main/>, document.getElementById("root"))