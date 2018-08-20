import {combineReducers} from "redux";
import headerClassReducer from "./headerClass/headerClassRedcuer.jsx";

const rootReducer=combineReducers({
    headerClass:headerClassReducer
});

export default rootReducer