import React from "react";
import {Route, Redirect } from "react-router-dom";
import asyncComponent from "../../route/asyncComponent/asyncComponent.jsx";
import Footer from "./component/footer/footer.jsx";
import Header from "./component/header/header.jsx";
import './index.scss'
const DoctorListComp=asyncComponent(()=>import("./doctor/doctorList.jsx"));//医生列表
const NewsListComp=asyncComponent(()=>import("./news/newsList.jsx"));//新闻动态
const NewsModifyComp=asyncComponent(()=>import("./news/newsModify.jsx"));//新增/编辑新闻动态

const ProductListComp=asyncComponent(()=>import("./product/productList.jsx"));//产品展示
const ProductModifyComp=asyncComponent(()=>import("./product/productModify.jsx"));//新增/编辑产品展示

const LiteratureListComp=asyncComponent(()=>import("./literature/literatureList.jsx"));//文献管理
const LiteratureModifyComp=asyncComponent(()=>import("./literature/literatureModify.jsx"));//新增/编辑文献管理

const MallListComp=asyncComponent(()=>import("./mall/mallList.jsx"));//商城活动
const MallModifyComp=asyncComponent(()=>import("./mall/mallModify.jsx"));//新增/编辑商城活动

const SpecialistListComp=asyncComponent(()=>import("./specialist/specialistList.jsx"));//专家展示
const SpecialistModifyComp=asyncComponent(()=>import("./specialist/specialistModify.jsx"));//新增/编辑专家

const VedioListComp=asyncComponent(()=>import("./vedio/vedioList.jsx"));//视频管理
const VedioModifyComp=asyncComponent(()=>import("./vedio/vedioModify.jsx"));//新增/编辑视频

class Index extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id="indexArea" className="indexArea">
                <Header />
                <div className="section">
                    <Redirect from='/' to='/admin/doctor' />
                    <Route exact path="/admin/doctor" component={DoctorListComp}/>

                    <Route exact path="/admin/news" component={NewsListComp}/>
                    <Route exact path="/admin/news/modify" component={NewsModifyComp}/>

                    <Route exact path="/admin/product" component={ProductListComp}/>
                    <Route exact path="/admin/product/modify" component={ProductModifyComp}/>
                    <Route exact path="/admin/vedio" component={VedioListComp}/>
                    <Route exact path="/admin/vedio/modify" component={VedioModifyComp}/>
                    <Route exact path="/admin/mall" component={MallListComp}/>
                    <Route exact path="/admin/mall/modify" component={MallModifyComp}/>
                    <Route exact path="/admin/literature" component={LiteratureListComp}/>
                    <Route exact path="/admin/literature/modify" component={LiteratureModifyComp}/>
                    <Route exact path="/admin/specialist" component={SpecialistListComp}/>
                    <Route exact path="/admin/specialist/modify" component={SpecialistModifyComp}/>

                </div>
                <Footer/>
            </div>
        )
    }
}

export default Index