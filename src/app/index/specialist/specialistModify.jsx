import React from "react";
import Files from 'react-files'
import Editor from '../component/ueditor/ueditor.jsx';
import {fetchRequest} from "../../../components/utils/util.jsx";
import Api from "../../../api/api.jsx";
import msgAlert from "../../../components/msgalert/msgalert.jsx";
import LeftTabs from '../component/leftTabs/leftTabs';

export  default  class SpecialistModifyComp extends React.Component{
    constructor(props){
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state={
            files: [],
            headImage: '',
            chinaName: '',
            englishName: '',
            honor: '',
            achievement: '',
            introduce: '',
            rank: ''
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
            url: Api.getExpertById,
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
                headImage: data.headImage,
                chinaName: data.chinaName,
                englishName: data.englishName,
                honor: data.honor,
                achievement: data.achievement,
                introduce: data.introduce,
                rank: data.rank
            });

        }).catch(()=>{

        });

    }
    onChange(key, e) {
        this.setState({[key]: e.target.value})
        console.log(this.state)
    }
    onSave() {
        let rankRegex = /^\d+$/;
        let { headImage, chinaName, englishName, achievement, files, id, honor, introduce, rank} = this.state;
        let text = UE.getEditor('specialist_achievement').getContent() || '';
        if(!chinaName) {
            msgAlert.showMsg('中文名不能为空');
            return;
        }
        if(files.length == 0 && !headImage) {
            msgAlert.showMsg('缩略图不能为空');
            return;
        }
        if(!englishName) {
            msgAlert.showMsg('英文名不能为空');
            return;
        }
        if(rank &&  !(rankRegex.test(rank))) {
             msgAlert.showMsg('排序只能输入整数');
            return;
        }

        if(!honor) {
            msgAlert.showMsg('头衔不能为空');
            return;
        }
        if(!text) {
            msgAlert.showMsg('主要成就不能为空');
            return;
        }
        if(!introduce) {
            msgAlert.showMsg('其他介绍不能为空');
            return;
        }
        var formData = new FormData();
        formData.append('uploadFile', files[0]);
        formData.append('chinaName', chinaName);
        formData.append('englishName', englishName);
        formData.append('honor', honor);
        formData.append('achievement', text);
        formData.append('introduce', introduce);
        formData.append('rank', rank);
        if (id) {
            formData.append('id', id);
        }
         fetchRequest({
          url: Api.modifyExpert,
          type: 'POST',
          body: formData
        }).then((data)=>{
            if(data){
                this.props.history.push('/admin/specialist');
            }else {
                msgAlert.show('保存失败');
            }
        })

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
    //     this.state.achievement = text;
    // }
    renderImg() {
        let childs = this.state.files.map((file) =>{
               return (<div key={file.id}>
                   <img className='files-gallery-item' src={file.preview.url} key={file.id} />
               </div>)
            });
         if(this.state.files.length > 0) {
            return (<div className='files-gallery'>{childs}</div>)
          }else if(this.state.headImage) {
            return (
                <div className='files-gallery'>
               <div>
                   <img className='files-gallery-item' src={this.state.headImage} />
               </div>
            </div>)
          }else {
            return ( <div className="file-upload-area">点击此处或者直接拖入图片</div>)
          }
    }
    render(){
        let {chinaName, englishName, achievement, rank, introduce,honor , headImage} = this.state;
        return(
            <LeftTabs  activeIndex={1} history={this.props.history}>
            <div className="form-box">
                <div className="header-title">
                    <img src={require("../../../asset/images/icon/icon_spe2.png")}/>
                    <span>专家展示/新增专家</span>
                </div>
                <div className="form-content-box">
                    <form >
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>中文名</label>
                            <input type="text" className="form-control" value={chinaName} onChange={this.onChange.bind(this, 'chinaName')} />
                        </div>
                         <div className="form-group">
                            <label htmlFor=""><em>*</em>英文名</label>
                            <input type="text" className="form-control" value={englishName} onChange={this.onChange.bind(this, 'englishName')} />
                        </div>
                         <div className="form-group">
                            <label htmlFor="">排序</label>
                            <input type="text" className="form-control" value={rank} onChange={this.onChange.bind(this, 'rank')} />
                        </div>
                         <div className="form-group">
                            <label htmlFor=""><em>*</em>头衔</label>
                            <input type="text" className="form-control" value={honor} onChange={this.onChange.bind(this, 'honor')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>缩略图</label>
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
                            <label htmlFor=""><em>*</em>主要成就</label>
                            <Editor className="form-control" content={achievement}  id="specialist_achievement" height="200" />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>其他介绍</label>
                            <textarea className="form-control"  value={introduce} onChange={this.onChange.bind(this, 'introduce')}></textarea>
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

