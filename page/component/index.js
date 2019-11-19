import lifecycle from '/util/lifecycle';
var app = getApp();

Page({
  ...lifecycle,

  data: {
    edition: "v1.3.2.12",
    pageName: 'component/index',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    arr: {
      onItemTap: 'onGridItemTap',
      list: []
    },
  },
  onLoad(res) {
    var that = this;
    var cccc;
    app.ajaxSubmit(app.urlApi.banben, "GET", null, function(res) {
      console.log("获得的数据----", res);
      console.log("网址获得的版本----", res.v);
      cccc = res.v;
      console.log("本地获得的版本----", that.data.edition);
      if (res.v == that.data.edition) {
        console.log("新的----");
        var bb =
          [{
            icon: '/image/up.png',
            title: '员工晋升流程',
            entitle: 'Promotion',
            page: '/page/promotion_index/promotion_index',
          }
            , {
            icon: '/image/carcheck.png',
            title: '出车检查流程',
            entitle: 'Promotion',
            page: '/page/Drive_out_check_index/Drive_out_check_index',
          }
            , {
            icon: '/image/qingjia.png',
            title: '员工请假流程',
            entitle: 'Promotion',
            page: '/page/leave_index/leave_index',
          }
            , {
            icon: '/image/cizhi.png',
            title: '员工离职流程',
            entitle: 'Promotion',
            page: '/page/resign_index/resign_index',
          }
            , {
            icon: '/image/wenze.png',
            title: '问责督办流程',
            entitle: 'Promotion',
            page: '/page/complain_index/complain_index',
          }
            , {
            icon: '/image/newcarcheck.png',
            title: '新车检查问题反馈',
            entitle: 'Promotion',
            page: '/page/carInspectionIndex/carInspectionIndex',
          }
            , {
            icon: '/image/shigu.png',
            title: '新车检查装卸事故',
            entitle: 'Promotion',
            page: '/page/carDockIndex/carDockIndex',
          }
            , {
            icon: '/image/newcarcheck.png',
            title: '自车交通事故',
            entitle: 'Promotion',
            page: '/page/carAccidentIndex/carAccidentIndex',
          }
            , {
            icon: '/image/newcarcheck.png',
            title: '旧车装卸事故',
            entitle: 'Promotion',
            page: '/page/carAccidentOld/carAccidentOld',
          }

            //   , {
            //   icon: '/image/newcarcheck.png',
            //   title: '库存管理',
            //   entitle: 'Promotion',
            //   page: '/page/Inventory_management_index/Inventory_management_index',
            // }
          ]
        that.setData({
          "arr.list": bb
        });

        app.ajaxSubmit(app.urlApi.c_getUserPower, "GET", null, function(res) {
          console.log("得的权限数据车管----", res);
          // app.userinfo.arr = res.data;//存入权限
          // console.log("获得的arr-------------------------", app.userinfo.arr);
          // var aa = res.data[0];
          var type = 0;
          for (var i = 0; i < res.length; i++) {
            var ccc = res[i].children;
            for (var j = 0; j < ccc.length; j++) {
              // console.log("SSS---", ccc[j].id);
              var jjj = ccc[j].id
              if (jjj == 107) {
                type = 1;
              }
            }
          }
          if (type == 1) {
            let aa = that.data.arr.list;
            //  console.log(aa);
            let cc = {}
            aa.push({
              icon: '/image/carguanli.png',
              title: '车辆管理',
              entitle: 'Promotion',
              page: '/page/carManageIndex/carManageIndex',
            });
            that.setData({
              "arr.list": aa
            });
          }
        }, true, false, true, false);
      } else {
        console.log("老的----");
        dd.alert({
          title: '您不是最新的版本,新版本为' + cccc,
          content: '请退出结束应用程序,重进',
          buttonText: '我知道了',
          success: () => {
            // dd.alert({
            //   title: '用户点击了「我知道了」',
            // });
          },
        });



      }
    }, true, false, true, false);
  },
  onGridItemTap(e) {
    console.log(11111111111111111);
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    console.log(page);
    dd.navigateTo({ url: page });
  },
});

