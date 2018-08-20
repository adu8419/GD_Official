import React from "react";
import Files from 'react-files'
import Editor from '../component/ueditor/ueditor.jsx';
import {fetchRequest} from "../../../components/utils/util.jsx";
import Api from "../../../api/api.jsx";
import msgAlert from "../../../components/msgalert/msgalert.jsx";
import LeftTabs from '../component/leftTabs/leftTabs';

export  default  class LiteratureModifyComp extends React.Component{
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
            author: '',
            type: '0',
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
            url: Api.getBookById,
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
                author: data.author,
                type: data.type
            });

        }).catch(()=>{

        });

    }
    onChange(key, e) {
        this.setState({[key]: e.target.value})
        console.log(this.state)
    }
    onSave() {
        let { title, introduce, image, files, id, author, type} = this.state;
        let text = UE.getEditor('literature_description').getContent() || '';
        if(!title) {
            msgAlert.showMsg('文献标题不能为空');
            return;
        }
        if(!author) {
            msgAlert.showMsg('作者不能为空');
            return;
        }
        if(files.length == 0 && !image) {
            msgAlert.showMsg( 'PDF文件不能为空');
            return;
        }

        if(!text) {
            msgAlert.showMsg( '摘要不能为空');
            return;
        }
        var formData = new FormData();
        formData.append('uploadFile', files[0]);
        formData.append('title', title);
        formData.append('type', type);
        formData.append('author', author);
        formData.append('introduce', text);

        if (id) {
            formData.append('id', id);
        }

        fetchRequest( {
            url:Api.modifyBook,
          method: 'POST',
          body: formData
        }).then((data)=>{
            console.log(data)
            if(data) {
                this.props.history.push('/admin/literature');
            }else {
                msgAlert.show('保存失败');
            }
        })

        // fetchRequest({
        //     //'Content-Type': 'application/x-www-form-urlencoded'
        //     headers: {'Content-Type': 'multipart/form-data;charset=utf-8'},
        //     url: Api.modifyBook,
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
    //     this.state.introduce = text;
    // }
    renderImg() {
        let childs = this.state.files.map((file) =>{
                console.log(file, 'pdf')
               return (  <div className='file-upload-area' key={file.id}>{file.name}</div>)
            });
         if(this.state.files.length > 0) {
            return (<div className='files-gallery'>{childs}</div>)
          }else if(this.state.image) {
            return (
                   <div className='file-upload-area'>{this.state.image}</div>
                )
          }else {
            return ( <div className="file-upload-area">点击此处或者直接拖入PDF文件</div>)
          }
    }
    render(){
        let {introduce, title, type,author , image} = this.state;
        return(
            <LeftTabs  activeIndex={5} history={this.props.history}>
            <div className="form-box">
                <div className="header-title">
                    <img src={require("../../../asset/images/icon/icon_doc2.png")}/>
                    <span>文献管理/新增文献</span>
                </div>
                <div className="form-content-box">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>文献标题</label>
                            <input type="text" className="form-control" value={title} onChange={this.onChange.bind(this, 'title')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>作者</label>
                            <input type="text" className="form-control" value={author} onChange={this.onChange.bind(this, 'author')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>上传PDF文件</label>
                            <Files
                                ref='files'
                                className='files-dropzone-gallery'
                                onChange={this.onFilesChange}
                                onError={this.onFilesError}
                                accepts={['.pdf']}
                                clickable={true}
                                multiple={false}
                            >
                                {
                                   this.renderImg()
                                }
                            </Files>
                        </div>
                           <div className="form-group">
                            <label htmlFor=""><em>*</em>文献分类</label>
                            <select className="form-control" value={type} onChange={this.onChange.bind(this, 'type')}>
                                <option value="0">其他</option>  
                                <option value="1">临床试验</option>  
                                <option value="2">科普文献</option>  
                                <option value="3">会议文献</option>  
                                <option value="4">产品说明</option>  

                            </select>        
                        </div>

                        <div className="form-group">
                            <label htmlFor=""><em>*</em>摘要</label>
                             <Editor className="form-control" content={introduce}  id="literature_description" height="200"  />
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

