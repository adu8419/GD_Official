import React from "react";
import Files from 'react-files'
import {fetchRequest} from "../../../components/utils/util.jsx";
import Api from "../../../api/api.jsx";
import msgAlert from "../../../components/msgalert/msgalert.jsx";
import LeftTabs from '../component/leftTabs/leftTabs';

export  default  class ProductModifyComp extends React.Component{
    constructor(props){
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state={
            files: [],
            files2: [],
            name: '',
            standard: '',
            isSale: '',
            type: '0',
            introduce: '',
            bigImage: [],
            smallImage: '',
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
            url: Api.getProductById,
            dataType: 'json',
            type: 'post',
            body:{
                id: id,
                pageSize: 1,
                pageNum: 1,
                status: 1
            },
        }).then((data)=>{
            console.log(data)
            let bimgStr = data.bigImage || '';
            let bigArr = bimgStr ? bimgStr.split('|') : [];
            this.setState({
                id: data.id,
                name: data.name,
                standard: data.standard,
                isSale: data.isSale,
                type: data.type,
                introduce: data.introduce,
                bigImage: bigArr,
                smallImage: data.smallImage
            });

        }).catch(()=>{

        });

    }
    onChange(key, e) {
        this.setState({[key]: e.target.value})
    }
    onSave() {
        let { name,standard,isSale,type, introduce, bigImage, smallImage, files,files2, id} = this.state;
        isSale = '0';
        //验证
        if (!name) {
            msgAlert.showMsg('产品名称不能为空');
            return;
        }
        if (!standard) {
            msgAlert.showMsg('产品规格不能为空');
            return;
        }
        if (!type && type !== 0) {
            msgAlert.showMsg('产品分类不能为空');
            return;
        }
        if (files.length == 0 && !smallImage) {
            msgAlert.showMsg('缩略图不能为空');
            return;
        }
        if (!introduce) {
            msgAlert.showMsg('其他介绍不能为空');
            return;
        }
        if (!isSale && isSale !== 0) {
            msgAlert.showMsg('是否购买必须选择');
            return;
        }

        var formData = new FormData();
        formData.append('uploadFile', files[0]);
        
        console.log(files2, 'files2')
        for(var i = 0; i<files2.length; i++) {
            formData.append('uploadFile', files2[i]);
        }
        formData.append('name', name);
        formData.append('standard', standard);
        formData.append('introduce', introduce);
        formData.append('type', type);
        formData.append('isSale', isSale);
        if (id) {
            formData.append('id', id);
        }


        fetchRequest( {
          url: Api.modifyProduct,
          method: 'POST',
          body: formData
        }).then((data)=>{
            console.log(data)
            if(data) {
                this.props.history.push('/admin/product');
            }else {
                msgAlert.show('保存失败');
            }
        })

        // fetchRequest({
        //     //'Content-Type': 'application/x-www-form-urlencoded'
        //     headers: {'Content-Type': 'multipart/form-data;charset=utf-8'},
        //     url: Api.modifyProduct,
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
    onFilesChange2 = (files) => {
        this.setState({
            files2: files
        }, () => {
            console.log(this.state.files2)
        })
    }

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    filesRemoveAll = () => {
        this.refs.files2.removeFiles()
    }
    onFilesError2 = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    filesRemoveAll2 = () => {
        this.refs.files2.removeFiles()
    }
    renderBigImg() {
        let childs = this.state.files2.map((file) =>{
               return (<div>
                   <img className='files-gallery-item' src={file.preview.url} key={file.id} />
               </div>)
            });

         let bigChilds = this.state.bigImage.map((img) =>{
               return (<div>
                   <img className='files-gallery-item' src={img}  key={img}/>
               </div>)
            });

         if(this.state.files2.length > 0) {
            return (<div className='files-gallery'>{childs}</div>)
          }else if(this.state.bigImage.length > 0) {
            return (<div className='files-gallery'> {bigChilds} </div>)
          }else {
            return ( <div className="file-upload-area">点击此处或者直接拖入图片</div>)
          }
    }

    renderImg() {
        let childs = this.state.files.map((file) =>{
               return (<div>
                   <img className='files-gallery-item' src={file.preview.url} key={file.id} />
               </div>)
            });
         if(this.state.files.length > 0) {
            return (<div className='files-gallery'>{childs}</div>)
          }else if(this.state.smallImage) {
            return (
                <div className='files-gallery'>
               <div>
                   <img className='files-gallery-item' src={this.state.smallImage} />
               </div>
            </div>)
          }else {
            return ( <div className="file-upload-area">点击此处或者直接拖入图片</div>)
          }
    }
    render(){
        let {isSale, type, introduce, standard, name ,image} = this.state;
          let sales = [
                                    {id:1, text: '可购买', value: '1', name: 'isSale'},
                                    {id:2, text: '不可购买', value: '0', name: 'isSale'}
                                ]
        return(
            <LeftTabs  activeIndex={2} history={this.props.history}>
            <div className="form-box">
                <div className="header-title">
                    <img src={require("../../../asset/images/icon/icon_product2.png")}/>
                    <span>产品展示/新增产品</span>
                </div>
                <div className="form-content-box">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>产品名称</label>
                            <input type="text" className="form-control" value={name} onChange={this.onChange.bind(this, 'name')} />
                        </div>
                         <div className="form-group">
                            <label htmlFor=""><em>*</em>产品规格</label>
                            <input type="text" className="form-control" value={standard} onChange={this.onChange.bind(this, 'standard')} />
                        </div>
                         <div className="form-group">
                            <label htmlFor=""><em>*</em>产品分类</label>
                            <select className="form-control" value={type} onChange={this.onChange.bind(this, 'type')}>
                                 <option value="0">其他</option> 
                                <option value="1">儿科</option>   
                                <option value="2">妇科</option>   
                                <option value="3">男科</option>   
                                <option value="4">免疫</option>    
                                <option value="5">维生素</option>  
                                <option value="6">特医食品</option>   
                            </select>       
                          
                        </div>

                        <div className="form-group">
                            <label htmlFor=""><em>*</em>产品缩略图</label>
                            <Files
                                ref='files'
                                className='files-dropzone-gallery'
                                onChange={this.onFilesChange}
                                onError={this.onFilesError}
                                accepts={['image/*']}
                                clickable={true}
                                multiple={false}
                                name="file"
                            >
                                {
                                   this.renderImg()
                                }
                            </Files>
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>产品大图</label>
                            <Files
                                ref='files2'
                                className='files-dropzone-gallery'
                                onChange={this.onFilesChange2}
                                onError={this.onFilesError2}
                                accepts={['image/*']}
                                name="file2"
                                multiple
                                clickable={true}
                            >
                                 {
                                   this.renderBigImg()
                                 }
                            </Files>
                        </div>

                        <div className="form-group">
                            <label htmlFor=""><em>*</em>其他介绍</label>
                            <textarea className="form-control"  value={introduce} onChange={this.onChange.bind(this, 'introduce')}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><em>*</em>能否购买</label>
                            {
                              
                                sales.map((item) => {
                                    let checked = (isSale == item.value );   
                                    console.log(checked)
                                    return (
                                        <span className="radio-box">
                                        <label class="radio-inline">
                                          <input type="radio"  value={item.value} name={item.name} checked={checked} onChange={this.onChange.bind(this, 'isSale')} />
                                          {item.text}
                                         </label>
                                        </span>
                                    )
                                     
                                })
                            }
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

