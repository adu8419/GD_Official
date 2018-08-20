import "whatwg-fetch";
import msgAlert from "../msgalert/msgalert.jsx";

function fetchRequest(options){//fetch请求封装
    function checkStatus(response){
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            // msgAlert.showMsg(response.statusText);
            let error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }
    function parseJSON(response) {
        return response.json()
    }
    options.method = options.type || 'POST';
        options.headers = {'token':sessionStorage.getItem('token') || null};
    if(options.dataType == 'json') {
        options.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token':sessionStorage.getItem('token') || null
        }
        options.body = JSON.stringify(options.body);
    }

    return fetch(options.url,options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data)=>{
            if(!data.isSuccess){
                if(options.error){
                    options.error(data);
                    return false;
                }
                if(data.errorMsg){
                    // 显示错误信息
                    _this.msgAlert(data.errorMsg)
                }
                return false
            }
            else {
                if(options.token) {
                    sessionStorage.setItem('token', data.token);
                }
                return Promise.resolve(data.result)
            }
        }).catch((error)=>{
            if(options.catchCbk){
                options.catchCbk(error)
            }
            console.log('request failed',error);
        })
}


export {fetchRequest}

