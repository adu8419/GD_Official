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
            <Link  to={{pathname: '/admin/product/modify', params: {id: id}}} >编辑</Link>
             <a href="javascript:;" onClick={()=>{props.onChange({type:"delete"});}}>删除</a>
        </p>
    );
}



var ProductTypeCell = (props) => {
    var {data}= props;
    var type = data.type || 0;
    let typeName = '';
    switch (type) {
            case 0:
                typeName = '其他';
                break;
            case 1:
                typeName = '儿科';
                break;
            case 2:
                typeName = '妇科';
                break;
            case 3:
                typeName = '男科';
                break;
            case 4:
                typeName = '免疫';
                break;
            case 5:
                typeName = '维生素';
                break;
            case 6:
                typeName = '特医药品';
                break;
        }
    return(
       <span>{typeName}</span>
    );
}



var TableImageCell = (props) => {
    var {data}= props;
    var image = data.smallImage || '';
    return(
        <img src={image} onError={(e)=>{e.target.src=require("../../../asset/images/icon/icon_product2.png")}} />
    );
}



export default class  ProductListComp extends React.Component {
    constructor(props) {
        super(props);
        this.pageChange = this.pageChange.bind(this);
        this.linkOptions = this.linkOptions.bind(this);
        this.add = this.add.bind(this);
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
    onChange(e){
        this.setState({search: e.target.value});
    }
    search() {
        this.state.pageNum = 1;
        this.getData();
    }
    getData() {
        let {search, pageSize, pageNum} = this.state;
        fetchRequest({
            url: Api.getProductList,
            type: 'post',
            dataType: 'json',
            body:{
                name: search,
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

    pageChange(pagination) {
        this.state.pageNum = pagination.pageNo;
        this.state.pageSize = pagination.pageSize;
        this.getData();
    }
    add() {
        this.props.history.push('/admin/product/modify')
    }
    linkOptions(obj,item){//操作对应处理
        var {type} =obj;
        console.log(obj)
        if(type == "delete"){
            fetchRequest({
                url: Api.updateProductById,
                dataType: 'json',
                type: 'post',
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
    render() {
        let {data, pageSize,search, total} = this.state;
        return (
        <LeftTabs activeIndex={2} history={this.props.history}>
            <div className="form-box">
                <div className="header-title">
                    <img src={require("../../../asset/images/icon/icon_product2.png")}/>
                    <span>产品展示</span>
                </div>
                <div className="form-content-box">
                    <div className="filter-box ">
                        <button type="button" className="btn btn-primary" onClick={this.add}>
                        <span class="glyphicon glyphicon-plus" style={{color: '#fff'}}></span>
                        新增产品</button>
                        <div className="filter-search">
                            <input type="text" className="form-control" value={search} onChange={this.onChange} />
                            <img src={require('../../../asset/images/icon_search_btn.png')} alt=""  onClick={this.search} />
                        </div>
                        <div className="clearfix"></div>
                    </div>
                   <GoMeTable data={data} className="table">
                        <Column header={<span>缩略图</span>} colKey='smallImage'  cell={TableImageCell}/>
                        <Column header={<span>产品名称</span>} colKey='name' />
                        <Column header={<span>产品规格</span>} colKey='standard'  />
                        <Column header={<span>产品分类</span>} colKey='type'  cell={ProductTypeCell} />
                        <Column header={<span>操作</span>} cell={OperateCell} onCellChange={this.linkOptions}/>
                    </GoMeTable>
                    {
                        total ? <Pagination ref='pagination' total={total}  pageSize={pageSize}   onPageChange={this.pageChange}/> : null
                    }
               
                </div>
            </div>
        </LeftTabs>
        )

    }
}