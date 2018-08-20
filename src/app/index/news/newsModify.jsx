import React from "react";
import Files from 'react-files'
import Editor from '../component/ueditor/ueditor.jsx';
import {fetchRequest} from "../../../components/utils/util.jsx";
import Api from "../../../api/api.jsx";
import msgAlert from "../../../components/msgalert/msgalert.jsx";
import LeftTabs from '../component/leftTabs/leftTabs';

export  default  class NewsModifyComp extends React.Component{
    constructor(props){
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.onContentChange = this.onContentChange.bind(this);
        this.state={
            files: [],
            title: '',
            introduce: '',
            image: '',
            description: '',
        }
    }
    componentDidMount() {
        this.getData();
    }
    search() {
        this.state.pageNum = 1;
        this.getData();
    }
    getData() {
        let params = this.props.location.params ;
        let id = params ? params.id : '';
        if (!id) return;
        fetchRequest({
            url: Api.getNewsById,
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
                introduce: data.introduce,
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
        let { title, introduce, image,description, files, id} = this.state;
        let text = UE.getEditor('news_description').getContent() || '';
        if(!title) {
            msgAlert.showMsg( '新闻标题不能为空');
            return;
        }
        if(files.length == 0 && !image) {
            msgAlert.showMsg( '新闻缩略图不能为空');
            return;
        }
        if(!introduce) {
            msgAlert.showMsg('摘要不能为空');
            return;
        }

        if(!text) {
            msgAlert.showMsg('正文不能为空');
            return;
        }
        var formData = new FormData();
        formData.append('uploadFile', files[0]);
        formData.append('title', title);
        formData.append('introduce', introduce);
        formData.append('description', text);
        if (id) {
            formData.append('id', id);
        }
        fetchRequest( {
          url: Api.modifyNews,
          method: 'POST',
          body: formData
        }).then((data)=>{
            console.log(data)
            if(data) {
                this.props.history.push('/admin/news');
            }else {
                msgAlert.show('保存失败');
            }
        })

        // fetchRequest({
        //     //'Content-Type': 'application/x-www-form-urlencoded'
        //     headers: {'Content-Type': 'multipart/form-data;charset=utf-8'},
        //     url: Api.modifyNews,
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
        let {description, title, introduce, image} = this.state;
        

        return(
            <LeftTabs  activeIndex={3} history={this.props.history}>
            <div className="form-box">
                <div className="header-title">
                    <img src={require("../../../asset/images/icon/icon_news2.png")}/>
                    <span>新闻动态/新增新闻</span>
                </div>
                <div className="form-content-box">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>新闻标题</label>
                            <input type="text" className="form-control" value={title} onChange={this.onChange.bind(this, 'title')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>新闻缩略图</label>
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
                            <label htmlFor=""><em>*</em>摘要</label>
                            <textarea className="form-control"  value={introduce} onChange={this.onChange.bind(this, 'introduce')}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>正文</label>
                            <Editor className="form-control" content={description}  id="news_description" height="200"  />
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

