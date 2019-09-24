import lifecycle from '/util/lifecycle';

var app = getApp();

Page({
  ...lifecycle,
  data: {
    pageName: 'urea_index/urea_index',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    arr: "",
  },
  onLoad(res) {


    // {
    //   onItemTap: 'onGridItemTap',
    //     //页面--------------------------------------------------------------------------------------
    //     list: [{
    //       icon: '/image/form.png',
    //       title: '晋升申请',
    //       entitle: '',
    //       page: '/page/promotion_index/promotion_apply/promotion_apply',
    //     }, {
    //       icon: '/image/feedback.png',
    //       title: '部门审批',
    //       entitle: '',
    //       page: '/page/urea_approval/urea_approval?id=40',
    //     }, {
    //       icon: '/image/feedback.png',
    //       title: '指挥中心意见',
    //       entitle: '',
    //       page: '/page/Warehouse/Warehouse',
    //     }, {
    //       icon: '/image/feedback.png',
    //       title: '财务部意见',
    //       entitle: '',
    //       page: '/page/Warehouse/Warehouse',
    //     }, {
    //       icon: '/image/feedback.png',
    //       title: '质检部意见',
    //       entitle: '',
    //       page: '/page/Warehouse/Warehouse',
    //     }, {
    //       icon: '/image/feedback.png',
    //       title: '人事行政部意见',
    //       entitle: '',
    //       page: '/page/Warehouse/Warehouse',
    //     }, {
    //       icon: '/image/feedback.png',
    //       title: '车管部意见',
    //       entitle: '',
    //       page: '/page/Warehouse/Warehouse',
    //     }, {
    //       icon: '/image/feedback.png',
    //       title: '副总审批',
    //       entitle: '',
    //       page: '/page/Warehouse/Warehouse',
    //     }, {
    //       icon: '/image/feedback.png',
    //       title: '总经理审批',
    //       entitle: '',
    //       page: '/page/Warehouse/Warehouse',
    //     }],
    // }





    console.log("得到的id:", res);
    var that = this;
    app.ajaxSubmit(app.urlApi.p_getUserPower, "GET", null, function(res) {
      console.log("得到权限", res);
      app.userinfo.arr = res.data;//存入权限
      var one = 0;
      var two = 0;
      var three = 0;
      var four = 0;
      var cccc = app.userinfo.arr;
      for (var i = 0; i < cccc.length; i++) {
        if (cccc[i].nodeNum == 1) {
          one = 1;
        } else if (cccc[i].nodeNum == 2) {
          two = 1;
        } else if (cccc[i].nodeNum == 3) {
          two = 1;
        } else if (cccc[i].nodeNum == 4) {
          four = 1;
        }
      }



      console.log("获得的arr-------------------------", app.userinfo.arr);
      var aa = res.data[0];
      if (one == 1 && two == 0 && four == 0) {
        var bb =
        {
          onItemTap: 'onGridItemTap',
          list: [{
            icon: '/image/shenq.png',
            title: '晋升申请',
            entitle: '',
            page: '/page/promotion_index/promotion_apply_needing/promotion_apply_needing',
          }, {
            icon: '/image/jilu.png',
            title: '申请记录',
            entitle: '',
            page: '/page/promotion_index/promotion_apply/list/list',
          }]
        };
        that.setData({
          arr: bb
        });
      } else if (one == 1 && two == 1 && four == 0) {
        var bb =
        {
          onItemTap: 'onGridItemTap',
          list: [{
            icon: '/image/shenq.png',
            title: '晋升申请',
            entitle: '',
            page: '/page/promotion_index/promotion_apply_needing/promotion_apply_needing',
          }, {
            icon: '/image/jilu.png',
            title: '申请记录',
            entitle: '',
            page: '/page/promotion_index/promotion_apply/list/list',
          }, {
            icon: '/image/chuli.png',
            title: '审批/意见',
            entitle: '',
            page: '/page/promotion_index/promotion_section/list/list',
          }]
        };
        that.setData({
          arr: bb
        });
      } else if (one == 1 && two == 1 && four == 1) {
        var bb =
        {
          onItemTap: 'onGridItemTap',
          list: [{
            icon: '/image/form.png',
            title: '晋升申请',
            entitle: '',
            page: '/page/promotion_index/promotion_apply_needing/promotion_apply_needing',
          }, {
            icon: '/image/form.png',
            title: '申请记录',
            entitle: '',
            page: '/page/promotion_index/promotion_apply/list/list',
          }, {
            icon: '/image/chuli.png',
            title: '审批/意见',
            entitle: '',
            page: '/page/promotion_index/promotion_section/list/list',
          }, {
            icon: '/image/chuli.png',
            title: '总经理审批',
            entitle: '',
            page: '/page/promotion_index/promotion_zong_jin_li/list/list',
          }]
        };
        that.setData({
          arr: bb
        });

      } else if (one == 0 && two == 1 && four == 0) {
        var bb =
        {
          onItemTap: 'onGridItemTap',
          list: [{
            icon: '/image/chuli.png',
            title: '审批/意见',
            entitle: '',
            page: '/page/promotion_index/promotion_section/list/list',
          }]
        };
        that.setData({
          arr: bb
        });
      } else if (one == 0 && two == 0 && four == 1) {
        var bb =
        {
          onItemTap: 'onGridItemTap',
          list: [{
            icon: '/image/chuli.png',
            title: '总经理审批',
            entitle: '',
            page: '/page/promotion_index/promotion_zong_jin_li/list/list',
          }]
        };
        that.setData({
          arr: bb
        });
      }





    }, true, false);


  },
  onGridItemTap(e) {
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    dd.navigateTo({ url: page });
  },
});