import lifecycle from '/util/lifecycle';

var app = getApp();

Page({
  data: {
    pageName: 'urea_index/urea_index',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    arr: "",
  },
  onLoad() {
    var that = this;
    //获取请假流程权限
    app.ajaxSubmit(app.urlApi.le_getUserPower, "GET", null, function(res) {
      console.log(res);
      app.userinfo.arr = res.data;//存入权限
      let aa = res.data[0];//读取存入的权限
      console.log("获得的权限---", aa);
      let bb;
      if (aa.nodeNum == 1) {//申请
        // console.log("进来了");
        if (aa.station == 2) {
          bb =
            {
              onItemTap: 'onGridItemTap',
              list: [{
                icon: '/image/shenq.png',
                title: '请假申请',
                entitle: '',
                page: '/page/leave_index/applyNeed/applyNeed',
              }, {
                icon: '/image/zmcl.png',
                title: '相关证明拍照',
                entitle: '',
                page: '/page/leave_index/extendPic/list/list',
              }, {
                icon: '/image/xiaojia.png',
                title: '销假',
                entitle: '',
                page: '/page/leave_index/sellingOff/list/list',
              }, {
                icon: '/image/jilu.png',
                title: '申请记录',
                entitle: '',
                page: '/page/leave_index/apply/list/list',
              }]
            };
        } else {
          bb =
            {
              onItemTap: 'onGridItemTap',
              list: [{
                icon: '/image/shenq.png',
                title: '请假申请',
                entitle: '',
                page: '/page/leave_index/applyNeed/applyNeed',
              }, {
                icon: '/image/jiaojie.png',
                title: '请假交接',
                entitle: '',
                page: '/page/leave_index/handover/list/list',
              }, {
                icon: '/image/zmcl.png',
                title: '相关证明拍照',
                entitle: '',
                page: '/page/leave_index/extendPic/list/list',
              }, {
                icon: '/image/xiaojia.png',
                title: '销假',
                entitle: '',
                page: '/page/leave_index/sellingOff/list/list',
              }, {
                icon: '/image/jilu.png',
                title: '申请记录',
                entitle: '',
                page: '/page/leave_index/apply/list/list',
              }]
            };
        }
      } else if (aa.nodeNum == 2 || aa.nodeNum == 3 || aa.nodeNum == 4) {//审批
        // console.log("进来了");
        bb =
          {
            onItemTap: 'onGridItemTap',
            list: [{
              icon: '/image/chuli.png',
              title: '审批/意见',
              entitle: '',
              page: '/page/leave_index/approval/list/list',
            }]
          };
      } else if (aa.nodeNum == 5) {//质监
        // console.log("进来了");
        bb =
          {
            onItemTap: 'onGridItemTap',
            list: [{
              icon: '/image/chuli.png',
              title: '质监审核',
              entitle: '',
              page: '/page/leave_index/approval/list/list',
            }]
          };
      }



      that.setData({
        arr: bb
      });
    }, true, false);

  },
  onGridItemTap(e) {
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    dd.navigateTo({ url: page });
  },
});
