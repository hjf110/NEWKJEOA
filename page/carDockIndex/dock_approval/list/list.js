
var app = getApp();

Page({
  data: {
    onshow: 0,
    type_src: "/image/type1.png",
    array: ['未处理', '已处理', '全部'],
    index: 0,
    s_refer: "",//审批状态
    page: 1,
    limit: 10,
    lastinfo: "请稍等......",
    lasttype: 0,
    list: []
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var i = e.detail.value;
    this.setData({
      index: i,
    });
    if (i == 0) {
      this.setData({
        s_refer: "",
        type_src: "/image/type1.png"
      });
    } else if (i == 1) {
      this.setData({
        s_refer: 1,
        type_src: "/image/type2.png"
      });
    } else if (i == 2) {
      this.setData({
        s_refer: 2,
        type_src: ""
      });
    }
    this.setData({
      list: [],
      page: 1,
      limit: 10,
      lasttype: 0
    });
    var that = this;
    console.log("s_arr123", JSON.stringify(app.userinfo.arr));
    var arr_p = JSON.stringify(app.userinfo.arr);
    app.ajaxSubmit(app.urlApi.nci_list, "POST", { page: this.data.page, limit: this.data.limit, s_arr: arr_p, s_refer: this.data.s_refer }, function(res) {
      console.log("得到的列表为", res);
      var aa = res.data;
      var list_sp = that.data.list;
      var c = 0;
      for (var i = 0; i < aa.length; i++) {
        c++;
        var bb = {};
        bb["id"] = aa[i].id;
        bb["runNumber"] = aa[i].runNumber;
        bb["loginName"] = aa[i].createUser.loginName;
        // bb["application"] = aa[i].application;
        bb["createDate"] = app.getLocalTime(aa[i].createDate);
        list_sp.push(bb);

      }
      if (c < 10 && c != 0) {
        that.setData({
          lastinfo: "没有更多了"
        });
      } else if (c == 10) {
        that.setData({
          lastinfo: "请稍等......"
        });
      } else if (c == 0) {
        that.setData({
          lastinfo: "无数据"
        });
      }
      console.log("list数据--", list_sp);
      that.setData({
        list: list_sp
      });

    }, true, false, true);

  },

  onShow() {
    // 页面显示
    var that = this;
    if (this.data.onshow != 0) {
      console.log("进去了")
      that.setData({
        list: [],
        page: 1,
        limit: 10,
        lasttype: 0
      });


      var that = this;
      console.log("s_arr", JSON.stringify(app.userinfo.arr));
      var arr_p = JSON.stringify(app.userinfo.arr);
      app.ajaxSubmit(app.urlApi.nci_list, "POST", { page: this.data.page, limit: this.data.limit, s_arr: arr_p, s_refer: this.data.s_refer }, function(res) {
        console.log("得到的列表为", res);
        var aa = res.data;
        var list_sp = that.data.list;
        var c = 0;
        for (var i = 0; i < aa.length; i++) {
          c++;
          var bb = {};
          bb["id"] = aa[i].id;
          bb["runNumber"] = aa[i].runNumber;
          bb["loginName"] = aa[i].createUser.loginName;
          bb["application"] = aa[i].application;
          bb["createDate"] = app.getLocalTime(aa[i].createDate);
          list_sp.push(bb);

        }
        if (c < 10 && c != 0) {
          that.setData({
            lastinfo: "没有更多了"
          });
        } else if (c == 10) {
          that.setData({
            lastinfo: "请稍等......"
          });
        } else if (c == 0) {
          that.setData({
            lastinfo: "无数据"
          });
        }
        console.log("list数据--", list_sp);
        that.setData({
          list: list_sp
        });

      }, true, false, true);

    }

  },
  onLoad() {
    this.setData({
      list: [],
      page: 1,
      limit: 10,
      lasttype: 0
    });


    var that = this;
    console.log("s_arr", JSON.stringify(app.userinfo.arr));
    var arr_p = JSON.stringify(app.userinfo.arr);
    app.ajaxSubmit(app.urlApi.nci_list, "POST", { page: this.data.page, limit: this.data.limit, s_arr: arr_p, s_refer: this.data.s_refer }, function(res) {
      console.log("得到的列表为", res);
      var aa = res.data;
      var list_sp = that.data.list;
      var c = 0;
      for (var i = 0; i < aa.length; i++) {
        c++;
        var bb = {};
        bb["id"] = aa[i].id;
        bb["runNumber"] = aa[i].runNumber;
        bb["loginName"] = aa[i].createUser.loginName;
        bb["application"] = aa[i].application;
        bb["createDate"] = app.getLocalTime(aa[i].createDate);
        list_sp.push(bb);

      }
      if (c < 10 && c != 0) {
        that.setData({
          lastinfo: "没有更多了"
        });
      } else if (c == 10) {
        that.setData({
          lastinfo: "请稍等......"
        });
      } else if (c == 0) {
        that.setData({
          lastinfo: "无数据"
        });
      }
      console.log("list数据--", list_sp);
      that.setData({
        list: list_sp
      });
      that.setData({
        onshow: 1
      });
    }, true, false, true);
  },
  next(res) {
    var that = this;
    console.log("进入了下一步")
    if (that.data.lasttype == 0) {
      var p = that.data.page + 1;

      console.log("s_arr", JSON.stringify(app.userinfo.arr));
      console.log("当前页码", p);
      // var arr_p = JSON.stringify(app.userinfo.arr);
      //var cid = app.userinfo.id;
      var arr_p = JSON.stringify(app.userinfo.arr);
      app.ajaxSubmit(app.urlApi.nci_list, "POST", { page: p, limit: this.data.limit, s_arr: arr_p, s_refer: this.data.s_refer }, function(res) {
        console.log("得到的列表为", res);
        var aa = res.data;
        var list_sp = that.data.list;
        if (aa.length > 0) {
          for (var i = 0; i < aa.length; i++) {
            var bb = {};
            bb["id"] = aa[i].id;
            bb["runNumber"] = aa[i].runNumber;
            bb["loginName"] = aa[i].createUser.loginName;
            bb["application"] = aa[i].application;
            bb["createDate"] = app.getLocalTime(aa[i].createDate);
            list_sp.push(bb);

          }
          console.log("list数据--", list_sp);
          that.setData({
            list: list_sp
          });
          if (aa.length > 0) {
            that.setData({
              page: p
            });
          }
          console.log("当前页码", that.data.page);
        } else {
          that.setData({
            lastinfo: "没有更多了",
            lasttype: 1,
          });
        }

      }, true, false, true);
    }

  },
  to_sp(res) {
    console.log(res);
    var id = res.currentTarget.dataset['index'];
    var name = res.currentTarget.dataset['name'];
    // dd.navigateTo({
    //   url: '/page/promotion_index/p_cai_wu/p_cai_wu?id=' + id + "&name=" + name
    // });
    if (this.data.s_refer == "" || this.data.s_refer == null) {
      dd.navigateTo({
        url: '/page/carDockIndex/dock_approval/dock_approval?station=1&id=' + id + ""
      });
    } else {
      dd.navigateTo({
        url: '/page/carDockIndex/dock_approval/dock_approval?type=1&station=1&id=' + id + ""
      });
    }
  }
});
