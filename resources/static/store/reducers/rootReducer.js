import {combineReducers} from "redux";
import authReducer from "./authReducer";
import formReducer from "./formReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	form: formReducer
});

export default rootReducer;