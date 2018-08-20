import React from "react";
import classname from "classnames";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import "./header.scss";

class Header extends React.Component{
    static propTypes={
        headerClass: PropTypes.string,
        className: PropTypes.string,
    };
    static defaultProps={
        className:"headerNotFixed"
    };
    constructor(props){
        super(props);
        this.state={
            menuSignShow:false
        }
    }
    render(){
        let {menuSignShow}=this.state,{className}=this.props;
        return(
            <div className={classname("headerArea",className)}>
                <div>
                    <img src={require("../../../../asset/images/logoTransparent.png")}/>
                    <div className="horizontaSort">
                        <i className="iconfont icon-ego-caidan" onClick={()=>{
                            this.setState({
                                menuSignShow:!menuSignShow
                            })
                        }}/>
                        
                    </div>
                 
                </div>
            </div>
        )
    }
}

export default Header