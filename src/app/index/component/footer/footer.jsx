import React from "react";
import "./footer.scss";

class Footer extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="footerArea">
                <ul>
                    <li className="logoMark">
                        <img src={require("../../../../asset/images/logoTransparent.png")}/>
                        <ul>
                            <li>
                                <span>公司名称</span><i className="iconfont icon-vertical_line"/><span>华西生物技术(北京)有限公司</span>
                            </li>
                            <li>
                                <span>公司地址</span><i className="iconfont icon-vertical_line"/><span>北京市朝阳区亮马桥路48号</span>
                            </li>
                            <li>
                                <span>客服热线</span><i className="iconfont icon-vertical_line"/><span>028-85977497</span>
                            </li>
                            <li>
                                <span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&thinsp;箱</span><i className="iconfont icon-vertical_line"/><span>contact@huaxibio.cn</span>
                            </li>
                        </ul>
                    </li>
                    <li className="subsidiaryPdc">
                        <p>旗下产品</p>
                        <ul>
                            <li>
                                <img src={require("../../../../asset/images/subsidiaryPdc1.png")}/>
                                <div>
                                    <img src={require("../../../../asset/images/subsidiaryPdc2.png")}/>
                                </div>
                            </li>
                            <li>
                                <img src={require("../../../../asset/images/subsidiaryPdc3.png")}/>
                                <div>
                                    <img src={require("../../../../asset/images/subsidiaryPdc4.png")}/>
                                </div>
                            </li>
                            <li><img src={require("../../../../asset/images/subsidiaryPdc5.png")}/></li>
                        </ul>
                    </li>
                    <li className="contact">
                        <p>关注我们</p>
                        <img src={require("../../../../asset/images/footerCode.png")}/>
                    </li>
                </ul>
                <p>
                    <span>京ICP备10024665</span>
                    <span>&copy;华西生物科技（北京）有限公司版权所有2018</span>
                </p>
            </div>
        )
    }
}

export default Footer