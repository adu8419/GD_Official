import React from "react";
import {fetchRequest} from "../../../components/utils/util.jsx";
import Api from "../../../api/api.jsx";
import msgAlert from "../../../components/msgalert/msgalert.jsx";
import LeftTabs from '../component/leftTabs/leftTabs';

import GoMeTable from "../../../components/tables/table.jsx";
let Column = GoMeTable.Column;
import Pagination from "../../../components/pagination/pagination.jsx";
import {Link } from "react-router-dom";



var OperateCell = (props) => {
    var {data}= props;
    var id = data.id || '';
    return(
        <p>
            <Link  to={{pathname: '/admin/vedio/modify', params: {id: id}}} >编辑</Link>
             <a href="javascript:;" onClick={()=>{props.onChange({type:"delete"});}}>删除</a>
        </p>
    );
}


export default class  VedioListComp extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.pageChange = this.pageChange.bind(this);
        this.linkOptions = this.linkOptions.bind(this);
        this.search = this.search.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            data: [],
            search: '',
            total: 0,
            pageSize: 10,
            pageNum: 1
        }
    }
    componentDidMount() {
        this.getData();
    }
     search() {
        this.state.pageNum = 1;
        this.getData();
    }
    onChange(e){
        this.setState({search: e.target.value});
    }
    searchChange(e) {
        this.setState({search: e.target.value})
    }
    getData() {
        let {search, pageSize, pageNum} = this.state;
        fetchRequest({
            url: Api.getVedioList,
            type: 'post',
            dataType: 'json',
            body:{
                title: search,
                pageSize: pageSize,
                pageNum: pageNum,
                status: 1
            },
        }).then((data)=>{
            console.log(data)
            this.setState({
                data: data.list,
                total: data.total
            });
        }).catch(()=>{

        });
    }
    add() {
        this.props.history.push('/admin/vedio/modify')
    }
    linkOptions(obj,item){//操作对应处理
        var {type} =obj;
        console.log(obj)
        if(type == "delete"){
            fetchRequest({
                url: Api.updateVedioById,
                type: 'post',
                dataType: 'json',
                body: {id: item.id, status: 0}
            }).then((data) => {
                if(data) {
                    this.getData();
                } else {
                    msgAlert.show('删除失败')
                }
            }).catch(()=>{

            });
        }
    }
    pageChange(pagination) {
        this.state.pageSize = pagination.pageSize;
        this.state.pageNum = pagination.pageNo;
        this.getData();
    }
    render() {
        let {data, pageSize,search, total} = this.state
        return (
        <LeftTabs activeIndex={6} history={this.props.history}>
            <div className="form-box">
                <div className="header-title">
                    <img src={require("../../../asset/images/icon/icon_vedio2.png")}/>
                    <span>视频管理</span>
                </div>
                <div className="form-content-box">
                    <div className="filter-box ">
                        <button type="button" className="btn btn-primary" onClick={this.add}>
                         <span class="glyphicon glyphicon-plus" style={{color: '#fff'}}></span>
                        新增视频</button>
                        <div className="filter-search">
                            <input type="text" className="form-control" value={search} onChange={this.onChange} />
                            <img src={require('../../../asset/images/icon_search_btn.png')} alt=""  onClick={this.search} />
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <GoMeTable data={data} className="table">
                        <Column header={<span>标题</span>} colKey='title'/>
                        <Column header={<span>上传时间</span>} colKey='uploadTime' />
                        <Column header={<span>操作</span>} cell={OperateCell} onCellChange={this.linkOptions}/>
                    </GoMeTable>
                    {
                        total ? <Pagination ref='pagination' total={total} pageSize={pageSize}  onPageChange={this.pageChange}/> : null
                    }

                </div>
            </div>
        </LeftTabs>
        )

    }
}