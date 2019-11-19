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
    //获取自车交通事故的权限
    app.ajaxSubmit(app.urlApi.oac_getUserPower,"GET",null,function(res,r){/*****************************权限接口*******************************/
      console.log(res);
      if(r){
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
              title: '旧车装卸事故申请',
              entitle: '',
              page: '/page/carAccidentOld/apply/apply',
            } , {
              icon: '/image/jilu.png',
              title: '旧车装卸事故申请记录',
              entitle: '',
              page: '/page/carAccidentOld/apply/list/list',
            // } , {
            //   icon: '/image/jilu.png',
            //   title: '离职审批',
            //   entitle: '',
            //   page: '/page/resign_index/resign_approval/list/list',
            } ,
            ]
          }
      }
      else /*if( (qx.nodeNum == 2) || (qx.nodeNum == 3 && qx.station == 16) ) */ { //审批
        ym={
          onItemTap: 'onGridItemTap',
          list: [{
              icon: '/image/jilu.png',
              title: '旧车装卸事故审批',
              entitle: '',
              page: '/page/carAccidentOld/approval/list/list',
            } ,
          ]
        }
      }
    
      that.setData({
        arr: ym,
      });
      }

    },true,false);
  },
  
  
  onGridItemTap(e) {
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    dd.navigateTo({ url: page });
  },
    

    
});
