import React from "react";
import Files from 'react-files'
import Editor from '../component/ueditor/ueditor.jsx';
import {fetchRequest} from "../../../components/utils/util.jsx";
import Api from "../../../api/api.jsx";
import msgAlert from "../../../components/msgalert/msgalert.jsx";
import LeftTabs from '../component/leftTabs/leftTabs';


export  default  class MallModifyComp extends React.Component{
    constructor(props){
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.onContentChange = this.onContentChange.bind(this);
        this.state={
            files: [],
            title: '',
            image: '',
            description: '',
        }
    }
    componentDidMount() {
        this.getData();
    }
   
    getData() {
        let params = this.props.location.params ;
        let id = params ? params.id : '';
        if (!id) return;
        fetchRequest({
            url: Api.getActivityById,
            type: 'post',
            dataType: 'json',
            body:{
                id: id,
                pageSize: 1,
                pageNum: 1,
                status: 1
            },
        }).then((data)=>{
            console.log(data)
            this.setState({
                id: data.id,
                title: data.title,
                image: data.image,
                description: data.description
            });

        }).catch(()=>{

        });

    }
    onChange(key, e) {
        this.setState({[key]: e.target.value})
        console.log(this.state)
    }
    onSave() {
        let { title, image, files,description, id} = this.state;
        let text = UE.getEditor('mall_description').getContent() || '';
        if(!title) {
            msgAlert.showMsg( '活动标题不能为空');
            return;
        }
        if(files.length == 0 && !image) {
            msgAlert.showMsg('活动banner不能为空');
            return;
        }

        if(!text) {
            msgAlert.showMsg( '正文不能为空');
            return;
        }
        var formData = new FormData();
        formData.append('uploadFile', files[0]);
        formData.append('title', title);
        formData.append('description', text);
        if (id) {
            formData.append('id', id);
        }

        fetchRequest( {
            url: Api.modifyActivity,
          method: 'POST',
          body: formData
        }).then((data)=>{
            console.log(data)
            if(data) {
                this.props.history.push('/admin/mall');
            }else {
                msgAlert.show('保存失败');
            }
        })

        // fetchRequest({
        //     //'Content-Type': 'application/x-www-form-urlencoded'
        //     headers: {'Content-Type': 'multipart/form-data;charset=utf-8'},
        //     url: Api.modifyMall,
        //     type: 'post',
        //     body: formData,
        // }).then((data)=>{
        //     console.log(data)
        //     alert(100)
        //     //window.location.href = './news.html'
        // }).catch(()=>{

        // });
    }
    onFilesChange = (files) => {
        this.setState({
            files
        }, () => {
            console.log(this.state.files)
        })
    }

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    }
    // onContentChange(text) {
    //     this.state.description = text;
    // }
    renderImg() {
        let childs = this.state.files.map((file) =>{
               return (<div>
                   <img className='files-gallery-item' src={file.preview.url} key={file.id} />
               </div>)
            });
         if(this.state.files.length > 0) {
            return (<div className='files-gallery'>{childs}</div>)
          }else if(this.state.image) {
            return (
                <div className='files-gallery'>
               <div>
                   <img className='files-gallery-item' src={this.state.image} />
               </div>
            </div>)
          }else {
            return ( <div className="file-upload-area">点击此处或者直接拖入图片</div>)
          }
    }
    render(){
        let {description, title, image} = this.state;
        return(
            <LeftTabs  activeIndex={4} history={this.props.history}>
            <div className="form-box">
                <div className="header-title">
                    <img src={require("../../../asset/images/icon/icon_mall.png")}/>
                    <span>商城活动/新增活动</span>
                </div>
                <div className="form-content-box">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>活动标题</label>
                            <input type="text" className="form-control" value={title} onChange={this.onChange.bind(this, 'title')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>活动banner</label>
                            <Files
                                ref='files'
                                className='files-dropzone-gallery'
                                onChange={this.onFilesChange}
                                onError={this.onFilesError}
                                accepts={['image/*']}
                                clickable={true}
                                multiple={false}
                            >
                                {
                                   this.renderImg()
                                }
                            </Files>
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>正文</label>
                            <Editor className="form-control" content={description}  id="mall_description" height="200"  />
                        </div>
                        <div className="form-group">
                            <button type="button" onClick={this.onSave} className="btn btn-primary">保存</button>
                        </div>
                    </form>
                </div>
            </div>
            </LeftTabs>
        )
    }
}

