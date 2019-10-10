import lifecycle from '/util/lifecycle';

var app = getApp();

Page({
  data: {
    pageName: 'urea_index/urea_index',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    arr: {
       onItemTap: 'onGridItemTap',
       list:[{
                icon: '/image/shenq.png',
                title: '采购申请',
                entitle: '',
                page: '/page/Inventory_management_index/Cai_Gou/add/add',
              }, {
                icon: '/image/zmcl.png',
                title: '领用申请',
                entitle: '',
                page: '/page/Inventory_management_index/Ling_Yong/add/add',
              }, {
                icon: '/image/xiaojia.png',
                title: '调拨申请',
                entitle: '',
                page: '/page/Inventory_management_index/Diao_Bo/add/add',
              }],
    },
  },
  onLoad() {
    var that = this;
    //获取请假流程权限
   

  },
  onGridItemTap(e) {
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    dd.navigateTo({ url: page });
  },
});
