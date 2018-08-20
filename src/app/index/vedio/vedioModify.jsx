import React from "react";
import Files from 'react-files'
import {fetchRequest} from "../../../components/utils/util.jsx";
import Api from "../../../api/api.jsx";
import msgAlert from "../../../components/msgalert/msgalert.jsx";
import LeftTabs from '../component/leftTabs/leftTabs';

export  default  class VedioModifyComp extends React.Component{
    constructor(props){
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state={
            files: [],
            title: '',
            videoUrl: '',
            image: '',
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
            url: Api.getVedioById,
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
                videoUrl: data.videoUrl,
                image: data.image,
            });

        }).catch(()=>{

        });

    }
    onChange(key, e) {
        this.setState({[key]: e.target.value})
        console.log(this.state)
    }
    onSave() {
        let { title, videoUrl, image, files, id} = this.state;
        if(!title) {
            msgAlert.showMsg('视频标题不能为空');
            return;
        }
        if(files.length == 0 && !image) {
            msgAlert.showMsg('视频缩略图不能为空');
            return;
        }
        if(!videoUrl) {
            msgAlert.showMsg('视频URL不能为空');
            return;
        }

        var formData = new FormData();
        formData.append('uploadFile', files[0]);
        formData.append('title', title);
        formData.append('videoUrl', videoUrl);
        if (id) {
            formData.append('id', id);
        }

         fetchRequest( {
            url:Api.modifyVedio,
          method: 'POST',
          body: formData
        }).then((data)=>{
            console.log(data)
            if(data) {
                this.props.history.push('/admin/vedio');
            }else {
                msgAlert.show('保存失败');
            }
        })

        // fetchRequest({
        //     //'Content-Type': 'application/x-www-form-urlencoded'
        //     headers: {'Content-Type': 'multipart/form-data;charset=utf-8'},
        //     url: Api.modifyVedio,
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
        let {videoUrl, title, image} = this.state;
        return(
            <LeftTabs  activeIndex={6} history={this.props.history}>
            <div className="form-box">
                <div className="header-title">
                    <img src={require("../../../asset/images/icon/icon_vedio2.png")}/>
                    <span>视频管理/新增视频</span>
                </div>
                <div className="form-content-box">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>视频标题</label>
                            <input type="text" className="form-control" value={title} onChange={this.onChange.bind(this, 'title')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>视频缩略图</label>
                            <Files
                                ref='files'
                                className='files-dropzone-gallery'
                                onChange={this.onFilesChange}
                                onError={this.onFilesError}
                                accepts={['image/*']}
                                multiple={false}
                                clickable={true}
                            >
                                {
                                   this.renderImg()
                                }
                            </Files>
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>视频URL</label>
                             <input type="text" className="form-control" value={videoUrl} onChange={this.onChange.bind(this, 'videoUrl')} />
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

