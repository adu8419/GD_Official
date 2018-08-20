import React from "react";
import classNames from "classnames";
import Footer from "../index/component/footer/footer.jsx";
import Header from "../index/component/header/header.jsx";
import Api from "../../api/api.jsx";
import {fetchRequest} from "../../components/utils/util.jsx";
import "./login.scss";



class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userName: null,
            uesPwd: null,
            errorTips:null,
            userFocus:false,
            pwdFocus:false,
            isRemberPed:true,
            showFade:false
        };
        this.goLogin=this.goLogin.bind(this);
    }
    componentWillMount(){
        document.addEventListener('keyup',(e)=>{
            if(e.keyCode == 13){
                this.goLogin()
            }
        });
    }


    showTips(tip){
        this.setState({
            errorTips:tip,
            showFade:true
        });
        setTimeout(()=>{
            this.setState({
                showFade:false
            })
        },1000)
    }

    goLogin(){
        let {uesPwd,userName,isRemberPed}=this.state;
        if(!uesPwd && !userName){
            this.showTips("请输入用户名和密码");
            return;
        }
        if(!userName){
            this.showTips("请输入用户名");
            return;
        }
        if(!uesPwd){
            this.showTips("请输入密码");
            return;
        }
       
        fetchRequest({
            url:Api.adminLogin,
            type:"POST",
            dataType: 'json',
            token: true,
            body: {
                tel: userName,
                password: Encrypt(uesPwd)
            }
        }).then((data) => {
            if(data) {
                sessionStorage.setItem('admin_username', data.userName);
                sessionStorage.setItem('admin_userId', data.userId);

                this.props.history.push('/admin/doctor');
            } else {
                 this.showTips("请输入用户名和密码");
            }
            
        })
    }
    render(){
        let {userName,userFocus,uesPwd,pwdFocus,isRemberPed,showFade,errorTips}=this.state;
        return(
            <div id="loginBox">
                <div className="login-header">
                    <Header/>
                </div>  
                <div className="login-content">
                    <div className="login-item">
                        <div className="login-title">账号登陆</div>
                        <div className={classNames("login-input-box",{userFocus:userFocus})}>
                            <i className="iconfont icon-yonghu1"/>
                            <input type="text" placeholder="请输入用户名" value={userName}
                                   onChange={(e)=>{this.setState({userName:e.target.value})}}
                                   onFocus={()=>{this.setState({userFocus:true})}}
                                   onBlur={()=>{this.setState({userFocus:false})}}
                            />
                        </div>
                        <div className={classNames("login-input-box",{pwdFocus:pwdFocus})}>
                            <i className="iconfont icon-yuechi"/>
                            <input type="password" placeholder="请输入密码" value={uesPwd}
                                   onChange={(e)=>{this.setState({uesPwd:e.target.value})}}
                                   onFocus={()=>{this.setState({pwdFocus:true})}}
                                   onBlur={()=>{this.setState({pwdFocus:false})}}
                            />
                        </div>
                        <button onClick={this.goLogin}>立即登录</button>
                        <p className={classNames({fadeAnimation:showFade})}>*{errorTips}</p>
                    </div>
                </div>
                 <div class=" login-footer" >
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Login;

