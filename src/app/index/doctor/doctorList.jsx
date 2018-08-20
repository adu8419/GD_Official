import React from 'react'
import LeftTabs from '../component/leftTabs/leftTabs';
import {fetchRequest} from "../../../components/utils/util.jsx";
import Api from "../../../api/api.jsx";



import GoMeTable from "../../../components/tables/table.jsx";
let Column = GoMeTable.Column;
import Pagination from "../../../components/pagination/pagination.jsx";

export  default  class DoctorListComp extends React.Component {
    constructor(props) {
        super(props);
        this.pageChange = this.pageChange.bind(this);
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
            url: Api.getUserList,
            type: 'post',
            dataType: 'json',
            body:{
                tel: search,
                userName: search,
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
    render() {
        let {data, pageSize, pageNum, search, total} = this.state;
    
        return (
        <LeftTabs activeIndex={0} history={this.props.history}>
            <div className="form-box">
                <div className="header-title">
                    <img src={require("../../../asset/images/icon/icon_doctor2.png")}/>
                    <span>医生列表</span>
                </div>
                <div className="form-content-box">
                    <div className="filter-box filter-single-box">
                        <div className="filter-search">
                            <input type="text" className="form-control" value={search} onChange={this.onChange}/>
                            <img src={require('../../../asset/images/icon_search_btn.png')} alt="" onClick={this.search}/>
                        </div>
                        <div className="clearfix"></div>
                    </div>
              
                    <GoMeTable data={data} className="table" colClick={this.colClick}>
                       <Column  header={<span>姓名</span>} colKey='userName'/>
                       <Column  header={<span>电话</span>} colKey='tel'/>
                       <Column  header={<span>注册日期</span>} colKey='registerTime'/>
                       <Column  header={<span>证书编码</span>} colKey='cardnumber'/>
                       <Column  header={<span>工作单位</span>} colKey='company'/>
                       <Column  header={<span>专业</span>} colKey='department'/>
                    </GoMeTable>
                    {
                        total ? <Pagination ref='pagination' total={total}  onPageChange={this.pageChange}/> : null
                    }
                </div>
            </div>
        </LeftTabs>
        )

    }
}