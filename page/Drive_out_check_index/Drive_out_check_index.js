
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
    app.ajaxSubmit(app.urlApi.d_getUserPower, "GET", null, function(res) {
      console.log("得到权限", res);
      app.userinfo.arr = res.data;//存入权限
      console.log("获得的arr-------------------------", app.userinfo.arr);
      var aa = res.data[0];
      if (aa.nodeNum == 1) {
        var bb =
        {
          onItemTap: 'onGridItemTap',
          list: [{
            icon: '/image/shenq.png',
            title: '出车检查申请',
            entitle: '',
            page: '/page/Drive_out_check_index/apply_need/apply_need',
          }, {
            icon: '/image/jilu.png',
            title: '申请记录',
            entitle: '',
            page: '/page/Drive_out_check_index/driver_apply/list/list',
          }]
        };
        that.setData({
          arr: bb
        });
      } else if (aa.nodeNum == 2) {
        var bb =
        {
          onItemTap: 'onGridItemTap',
          list: [{
            icon: '/image/chuli.png',
            title: '车管处理',
            entitle: '',
            page: '/page/Drive_out_check_index/driver_apply/listTwo/listTwo',
          }]
        };
        that.setData({
          arr: bb
        });
      } else {
        dd.showToast({
          content: '请去PC端操作',
          duration: 5000,
          success: () => {
            // dd.navigateTo({
            //   url: '/page/promotion_index/promotion_index'
            // })
          },
        });
      }
    }, true, false);




  },
  onGridItemTap(e) {
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    dd.navigateTo({ url: page });
  },
});
