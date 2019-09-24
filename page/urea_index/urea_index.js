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
    arr: {
      onItemTap: 'onGridItemTap',
      //页面--------------------------------------------------------------------------------------
      list: [{
        icon: '/image/form.png',
        title: '尿素申请',
        entitle: '',
        page: '/page/urea_apply/urea_apply',
      },{
        icon: '/image/feedback.png',
        title: '尿素审批',
        entitle: '',
        page: '/page/urea_approval/urea_approval?id=40',
      },{
        icon: '/image/feedback.png',
        title: '仓库领用',
        entitle: '',
        page: '/page/Warehouse/Warehouse',
      }],
    },
  },
  onLoad(res) {
    console.log("得到的id:", res);
    var that = this;
    app.ajaxSubmit(app.urlApi.urea_getUserPower, "GET", null, function (res) {
      console.log("得到的数据", res);
      
    }, true, false);


  },
  onGridItemTap(e) {
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    dd.navigateTo({ url: page });
  },
});