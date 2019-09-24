import lifecycle from '/util/lifecycle';

var app = getApp();

Page({
  data: {
    id: "",//单子id
    pageName: 'urea_index/urea_index',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    arr: {
      onItemTap: 'onGridItemTap',
      list: [{
        icon: '/image/shenq.png',
        title: '财务交接',
        entitle: '',
        page: '/page/leave_index/handover/cai_wu/cai_wu',
      }, {
        icon: '/image/jilu.png',
        title: '车管交接',
        entitle: '',
        page: '/page/leave_index/handover/che_guan/che_guan',
      }]
    },
  },
  onLoad(res) {
    const that = this;
    //获取请假流程权限
    const id = res.id;
    console.log("id为----",id);
    that.setData({//赋值id
      id: id
    });

  },
  onGridItemTap(e) {
     const that = this;
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    dd.navigateTo({ url: page+"?id="+that.data.id });
  },
});
