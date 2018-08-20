import React from "react";
import PropTypes from 'prop-types';
import classname from "classnames";
import "./teamCarousel.scss";

class TeamCarousel extends React.Component{
    static propTypes={
        teamCarouselArr: PropTypes.array,
        intervalTime: PropTypes.number,
        className: PropTypes.string,
        width: PropTypes.string,
        hasCircle: PropTypes.bool,
        hasArrow: PropTypes.bool,
    };
    static defaultProps={
        teamCarouselArr: [],
        hasCircle: true,
        hasArrow: true
    };
    constructor(props){
        super(props);
        this.state={
            cureentIndex:0,
            nextIndex:1,
            towardLeft:false,
            towardRight:false
        };
        this.towardLeft=this.towardLeft.bind(this);
        this.towardRight=this.towardRight.bind(this)
    }
    towardLeft(){
        let {cureentIndex,nextIndex}=this.state,
            {teamCarouselArr}=this.props;
        this.setState({
            towardLeft:true,
            towardRight:false,
        });
        // let nowCureentIndex=cureentIndex===(teamCarouselArr.length-1) ? 0: ++cureentIndex;
        // console.log(nowCureentIndex,'nowCureentIndex')
        // setTimeout(()=>{
        //     console.log(nowCureentIndex,'srtyy')
        //     this.setState({
        //         currentIndex:nowCureentIndex,
        //         // nextIndex:nextIndex===(teamCarouselArr.length-1) ? 0: ++nextIndex,
        //     });
        // },3000)
    }
    towardRight(){
        this.setState({
            towardLeft:false,
            towardRight:true
        })
    }
    render(){
        let {hasArrow,teamCarouselArr}=this.props,
            {cureentIndex,nextIndex,towardLeft,towardRight}=this.state;
        console.log(cureentIndex,'cureentIndex56565')
        return(
            <div className="teamCarousel">
                <div className="contentArea">
                    <ul className={classname({towardLeft:towardLeft,towardRight:towardRight})}>
                        <li>
                            {teamCarouselArr[cureentIndex]}
                        </li>
                        <li>
                            {teamCarouselArr[nextIndex]}
                        </li>
                    </ul>
                    <div>

                    </div>
                </div>
                {
                    hasArrow ?
                        [
                            <i className="iconfont icon-icon_arrow_left" key="1" onClick={this.towardLeft}/>,
                            <i className="iconfont icon-icon_arrow_right" key="2" onClick={
                                ()=>{return towardLeft ? this.towardRight() :false}
                            }/>
                        ]:null
                }
            </div>
        )
    }
}

export default TeamCarousel