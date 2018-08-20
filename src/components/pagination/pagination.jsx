var React = require('react');
var _ = require('underscore');
var classNames = require('classnames');
require('./pagination.scss');
var stretchLength = 3;
import PropTypes from 'prop-types';

export default class Pagination  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageNo: this.props.pageNo || 1,
            pageSize:this.props.pageSize || 10,
            total:this.props.total,
            notSearch: false
        };
    }
    static propTypes = {
        onJump: PropTypes.func,
        onSelect: PropTypes.func,
        total: PropTypes.number,
        pageNo: PropTypes.number,
        pageCount: PropTypes.number
    }

    componentWillReceiveProps(newProps){
        var { pageNo,total,pageSize,notSearch } = this.state;
        var prevTotal = total;
        total = newProps.total;
      /*if(total != prevTotal){
       pageNo = 1;
       }*/
        var pageCount = total % pageSize == 0 ? total / pageSize : parseInt(total / pageSize) + 1;
        this.renderPagination(pageNo);
        this.setState({
            pageNo: pageNo,
            pageCount: pageCount,
            total:total,
            pageSize:pageSize,
            notSearch: notSearch
        });
        return false;
    }
    componentDidMount(){
        var {total,pageSize,pageNo} = this.state;
        var pageCount = total % pageSize == 0 ? total / pageSize : parseInt(total / pageSize) + 1;
        this.setState({
            pageNo: pageNo || 1,
            pageSize:pageSize || 10,
            pageCount: pageCount,
            total:total
        });
    }
    renderPagination(pageNo) {
        var {total} = this.props;
        var { pageCount } = this.state;
        var array = [],start,end;
        if(pageNo > stretchLength){
            if(pageNo > (pageCount - stretchLength)){
                end =  pageNo + (pageCount - pageNo);
                start = (pageNo - stretchLength);
            }else{
                end = pageNo + stretchLength;
                start = pageNo - stretchLength;
            }
        }else{
            start = 1;
            end = pageCount <= (stretchLength * 2) ? pageCount : stretchLength * 2;
        }
        array = _.range(start,end+1);
        return array;
    }
    pageSizeChange(e){
        var {total,notSearch} = this.props;
        var pageSize = parseInt(e.target.value);
        var pageCount = total % pageSize == 0 ? total / pageSize : parseInt(total / pageSize) + 1;
        this.setState({
            pageSize: e.target.value,
            pageCount:pageCount,
            notSearch: true
        })
        var pagination = this.state;
        pagination.pageNo = 1;
        pagination.pageSize = pageSize;
        this.props.onPageChange(pagination);
    }
    onSelect(pageNo) {
        this.setState({
            pageNo,
            notSearch: true
        });
        var pagination = this.state;
        pagination.pageNo = pageNo;
        this.props.onPageChange(pagination);
    }
    reset(pageNo){
        this.setState({
            pageNo:pageNo || 1,
            notSearch: true
        });
    }
    paging(action) {

        var { pageNo } = this.state;
        var pagination = this.state;
        if (action === 'prev') {
            this.setState({
                pageNo: pageNo - 1,
                notSearch: true
            });
            pagination.pageNo = pageNo - 1;
        }
        if (action === 'next') {
            this.setState({
                pageNo: pageNo + 1,
                notSearch: true
            });
            pagination.pageNo = pageNo + 1;
        }
        this.props.onPageChange(pagination);
    }
    goPage(){
        var { pageNo,pageCount} = this.state;
        var pagination = this.state;
        var  val =  this.refs.go_page_no.value;
        if( /^\d+$/.test(val) &&  ( val >=1 && val <= pageCount) ) {
            val = parseInt(val, 10);
            this.setState({
                pageNo: val,
                notSearch: true
            });
            pagination.pageNo = val;
            this.props.onPageChange(pagination);
        }
        $(this.refs.go_page_no).val('');
    }
    render() {
        var { pageNo,total,pageCount,pageSize } = this.state;
        var isShowGoPage = this.props.showGoPage;
        var itemsArray = this.renderPagination(pageNo);
        var len = itemsArray.length

        var index =  itemsArray.findIndex((n)=>{
            return n == pageNo;
        });
        var idx =  index + 3;

        idx = idx > len ? len : idx;

        var arr = itemsArray.slice(0, idx);

        console.log(itemsArray, pageNo)
        return (<div className="pagination-mod clearfix">
          <div className="operation pull-left">
            <span>合计:<label>{total}</label>条</span>
            <b>&nbsp;</b>
            <span>每页: <select defaultValue={pageSize} refs="pageSize" className="min" onChange={this.pageSizeChange}><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="30">30</option></select> 条,  共<label>{pageCount}</label>页</span>
          </div>
            {isShowGoPage && <div  className="operation  oper-gopage pull-left">
              <span>跳转到第</span>
              <input type="text" ref="go_page_no" />
              <span>页</span>
              <button key={_.uniqueId('_go_page_item')} className='button btn min paging' onClick={this.goPage}>确定</button>
            </div>}
          <div className="page-wrapper pull-right clearfix">
            <button className={classNames('button btn small prev paging',{disabled:pageNo <= 1})} disabled={pageNo <= 1 ? 'disabled' : ''} onClick={()=>{this.paging('prev')}}>上一页</button>
              {_.map(arr, (item) => {
                  return (
                      <button key={_.uniqueId('_page_item')} className={classNames('button btn min paging', {active: item == pageNo})}
                              onClick={() => {this.onSelect(item)}}>{item}</button>
                  );
              })}
            <button className={classNames('button btn small next paging',{disabled:pageNo >= pageCount})}  disabled={pageNo >= pageCount ? 'disabled' : ''} onClick={()=>{this.paging('next')}}>下一页</button>
          </div>
        </div>);
    }
}
