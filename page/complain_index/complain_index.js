import lifecycle from '/util/lifecycle';

var app=getApp();


Page({
  ...lifecycle,
  data: {
    // pageName:'resign_index/resign_index',
    // pageInfo:{
    //   pageId:0,
    // },
    // curIndex:0,
    arr:"",
  },
  onLoad(res) {
    var that = this;
    //获取问责督办流程的权限
    app.ajaxSubmit(app.urlApi.cp_getUserPower,"GET",null,function(res){/******************权限接口*****************/
      console.log(res);
      app.userinfo.arr=res.data;//存入权限
      let qx = res.data[0];//读取存入的权限
      console.log("获取的权限---",qx);
      let ym;
      if(qx.nodeNum == 1){ //申请人
        //if(qx.station == 2 ){
          ym={
            onItemTap: 'onGridItemTap',
            list: [{
              icon: '/image/shenq.png',
              title: '问责申请',
              entitle: '',
              page: '/page/complain_index/complainNeed/complainNeed',
            } , {
              icon: '/image/jilu.png',
              title: '申请记录',
              entitle: '',
              page: '/page/complain_index/complain_apply/list/list',
            } , {
              icon: '/image/shensu.png',
              title: '申诉列表',
              entitle: '',
              page: '/page/complain_index/complain_respondent/list/list',
            // } , {
            //   icon: '/image/jilu.png',
            //   title: '问责督办记录',
            //   entitle: '',
            //   page: '/page/complain_index/complain_approval/list/list',
            } ,
            ]
          }
      }
      else if( (qx.nodeNum == 2) || (qx.nodeNum == 3 ) ){ //质监||总经理
        ym={
          onItemTap: 'onGridItemTap',
          list: [{
              icon: '/image/jilu.png',
              title: '问责督办记录',
              entitle: '',
              page: '/page/complain_index/complain_approval/list/list',
            } ,
          ]
        }
      }
    
      that.setData({
        arr: ym,
      });

    },true,false);
  },
  
  
  onGridItemTap(e) {
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    dd.navigateTo({ url: page });
  },
    

    
});
