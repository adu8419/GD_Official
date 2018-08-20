import React from "react";
import PropTypes from "prop-types";
import classname from "classnames";
import "./leftTabs.scss";
import {Route, Redirect } from "react-router-dom";



class LeftTabs extends React.Component{
    static propTypes={
        children:PropTypes.node
    };
    constructor(props){
        super(props);

    }

    render(){
        let {children}=this.props;
        let tabsMenu = [
            {text:"医生列表",icon:"icon_doctor", pathname: '/admin/doctor'},
            {text:"专家展示",icon:"icon_spe", pathname: '/admin/specialist'},
            {text:"产品展示",icon:"icon_product", pathname: '/admin/product'},
            {text:"新闻动态",icon:"icon_news", pathname: '/admin/news'},
            {text:"商城活动",icon:"icon_mall", pathname: '/admin/mall'},
            {text:"文献管理",icon:"icon_doc", pathname: '/admin/literature'},
            {text:"视频管理",icon:"icon_vedio", pathname: '/admin/vedio'},
            {text:"退出登录",icon:"icon_logout", pathname: '/login', isLogout: true}
        ];
          let name = sessionStorage.getItem('admin_username');
        return(
            <ul className="leftTabs">
                <li className="aisde">
                    <div className="welcomeArea">
                        <p>Hello，{name}</p>
                        <span>欢迎来到你的戈哒官网服务器</span>
                    </div>
                    <ul>
                        {
                            tabsMenu.map((item,i)=>{
                                if(item.isLogout) {
                                     return(
                                        <li key={i} onClick={()=>{sessionStorage.removeItem('token'); sessionStorage.removeItem('admin_username'); sessionStorage.removeItem('admin_userId'); this.props.history.push(item.pathname);}}
                                            className={classname({active:this.props.activeIndex==i})}
                                        >
                                            <img src={require(`../../../../asset/images/icon/${item.icon}.png`)}/>
                                            <span>{item.text}</span>
                                        </li>
                                    )
                                }
                                return(
                                    <li key={i} onClick={()=>{ this.props.history.push(item.pathname)}}
                                        className={classname({active:this.props.activeIndex==i})}
                                    >
                                        <img src={require(`../../../../asset/images/icon/${item.icon}.png`)}/>
                                        <span>{item.text}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>
                <li className="section">
                    {children}
                </li>
            </ul>
        )
    }
}

export default LeftTabs