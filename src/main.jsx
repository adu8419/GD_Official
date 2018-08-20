import React from "react";
import ReactDOM from "react-dom";
import Routers from "./route/route.jsx";
import "./asset/style/common.scss";
import "./asset/style/iconfont.scss";
import "babel-polyfill";


UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
UE.Editor.prototype.getActionUrl = function(action){
	if(action == 'uploadfile' || action == 'uploadimage') {
		return `http://${window.location.host}/api/common/uploadimage`
	} else {
		console.log(this)
		return this._bkGetActionUrl.call(this, action)
	}
}

ReactDOM.render(<Routers/>,document.getElementById("container"));


