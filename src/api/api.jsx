const baseUrl = "http://"+window.location.host;
const prefix = 'api';

module.exports = {
    login:"../mokeJson/login.json",
    getTableData:"../mokeJson/tableJson.json",
    getNewTableData:"../mokeJson/tableJson.json",

    adminLogin: `${baseUrl}/${prefix}/common/manager`,
    getUserList: `${baseUrl}/${prefix}/user/getuserinfos`,
   
    getNewsList: `${baseUrl}/${prefix}/news/getnewsinfos`,
    modifyNews: `${baseUrl}/${prefix}/news/savenewsinfo`,
    getNewsById: `${baseUrl}/${prefix}/news/getnewsinfo`,
    updateNewsById: `${baseUrl}/${prefix}/news/updatenewsinfo`,

    getExpertList:`${baseUrl}/${prefix}/expert/getexpertinfos`,
    modifyExpert:`${baseUrl}/${prefix}/expert/saveexpertinfo`,
    getExpertById:`${baseUrl}/${prefix}/expert/getexpertinfo`,
    updateExpertById:`${baseUrl}/${prefix}/expert/updateexpertinfo`,

    getProductList:`${baseUrl}/${prefix}/product/getproductinfos`,
    getProductById:`${baseUrl}/${prefix}/product/getproductinfo`,
    modifyProduct:`${baseUrl}/${prefix}/product/saveproductinfo`,
    updateProductById:`${baseUrl}/${prefix}/product/updateproductinfo`,

    getActivityList: `${baseUrl}/${prefix}/activity/getactivityinfos`,
    updateActivityById: `${baseUrl}/${prefix}/activity/updateactivityinfo`,
    getActivityById: `${baseUrl}/${prefix}/activity/getactivityinfo`,
    modifyActivity: `${baseUrl}/${prefix}/activity/saveactivityinfo`,

    getBookList: `${baseUrl}/${prefix}/book/getbookinfos`,
    modifyBook: `${baseUrl}/${prefix}/book/savebookinfo`,
    getBookById: `${baseUrl}/${prefix}/book/getbookinfo`,
    updateBookById: `${baseUrl}/${prefix}/book/updatebookinfo`,

    getVedioList: `${baseUrl}/${prefix}/vedio/getvedioinfos`,
    modifyVedio: `${baseUrl}/${prefix}/vedio/savevedioinfo`,
    getVedioById: `${baseUrl}/${prefix}/vedio/getvedioinfo`,
    updateVedioById: `${baseUrl}/${prefix}/vedio/updatevedioinfo`

};

