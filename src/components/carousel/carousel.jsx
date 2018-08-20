import React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./carousel.scss";

class Carouselse extends React.Component{
    static propTypes={
        carouselArr: PropTypes.array,
        intervalTime: PropTypes.number,
        className: PropTypes.string,
        width: PropTypes.string,
        hasCircle: PropTypes.bool,
        hasArrow: PropTypes.bool,
    };
    static defaultProps={
        carouselArr: [],
        hasCircle: true,
        hasArrow: true
    };
    constructor(props){
        super(props);
        this.state={
            currentIndex:0,
        };
        this.autoPaly=this.autoPaly.bind(this);
        this.timer=null;
    }
    componentDidMount(){
        this.autoPaly()
    }
    autoPaly(){
        let {carouselArr,intervalTime}=this.props;
        this.timer=setInterval(()=>{
            let {currentIndex}=this.state,
                index=currentIndex===(carouselArr.length-1) ? 0: ++currentIndex;
            this.setState({currentIndex:index})
        },intervalTime);
    }
    componentWillUnmount(){
        this.setState = ()=> null;
        this.timer && clearInterval(this.timer);
    }
    render(){
        let {currentIndex}=this.state,
            {carouselArr,className,width,hasCircle,hasArrow}=this.props,
            cureentImg=carouselArr[currentIndex];
        return(
            <div className={classnames("carouselBox",className)}
                 style={{width}}
                 onMouseOver={()=>{clearInterval(this.timer)}}
                 onMouseOut={this.autoPaly}
            >
                <div className="imgBox">
                    <ReactCSSTransitionGroup
                        transitionName="carousel"
                        className="carousel"
                        component="div"
                        transitionEnterTimeout={1500}
                        transitionLeaveTimeout={1500}>
                        <img src={require(`${cureentImg.url}`)}
                        />
                    </ReactCSSTransitionGroup>
                </div>
                {
                    hasCircle ?
                        <div className="circleArea">
                            <div>
                                {
                                    carouselArr.map((item,i)=>{
                                        return <i key={i}
                                                  className={classnames("circle",{active:i===currentIndex})}
                                                  onClick={()=>{this.setState({currentIndex:i})}}
                                        />
                                    })
                                }
                            </div>
                        </div>
                        :
                        null
                }
                {
                    hasArrow ?
                        [
                            <i className="iconfont icon-icon_arrow_left" key="1" onClick={()=>{
                                this.setState({
                                    currentIndex:currentIndex===0 ? (carouselArr.length-1) : --currentIndex
                                })
                            }}/>,
                            <i className="iconfont icon-icon_arrow_right" key="2"
                               onClick={()=>{
                                   this.setState({
                                       currentIndex:currentIndex===(carouselArr.length-1) ? 0: ++currentIndex
                                   })
                               }}
                            />
                        ]:null
                }
            </div>
        )
    }
}

export default Carouselse
