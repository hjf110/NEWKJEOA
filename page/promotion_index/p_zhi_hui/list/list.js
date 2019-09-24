
var app = getApp();

Page({
  data: {
    type_src: "/image/type1.png",
    array: ['未审批', '已审批','全部'],
    index: 0,
    s_refer: "",//审批状态
    page: 1,
    limit: 10,
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
    }else if (i == 2) {
      this.setData({
        s_refer: 2,
        type_src: ""
      });
    }
    this.setData({
      list: [],
      page: 1,
      limit: 10,
    });
    var that = this;
    console.log("s_arr", JSON.stringify(app.userinfo.arr));
    var arr_p = JSON.stringify(app.userinfo.arr);
    app.ajaxSubmit(app.urlApi.p_list, "POST", { page: this.data.page, limit: this.data.limit, s_arr: arr_p, s_refer: this.data.s_refer }, function(res) {
      console.log("得到的列表为", res);
      var aa = res.data;
      var list_sp = that.data.list;
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

    }, true, false, true);

  },
  onLoad() {
    this.setData({
      list: []
    });


    var that = this;
    console.log("s_arr", JSON.stringify(app.userinfo.arr));
    var arr_p = JSON.stringify(app.userinfo.arr);
    app.ajaxSubmit(app.urlApi.p_list, "POST", { page: this.data.page, limit: this.data.limit, s_arr: arr_p, s_refer: this.data.s_refer }, function(res) {
      console.log("得到的列表为", res);
      var aa = res.data;
      var list_sp = that.data.list;
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

    }, true, false, true);
  },
  next(res) {
    var that = this;
    var p = that.data.page + 1;

    console.log("s_arr", JSON.stringify(app.userinfo.arr));
    console.log("当前页码", p);
    // var arr_p = JSON.stringify(app.userinfo.arr);
    //var cid = app.userinfo.id;
    var arr_p = JSON.stringify(app.userinfo.arr);
    app.ajaxSubmit(app.urlApi.p_list, "POST", { page: p, limit: this.data.limit, s_arr: arr_p, s_refer: this.data.s_refer }, function(res) {
      console.log("得到的列表为", res);
      var aa = res.data;
      var list_sp = that.data.list;
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

    }, true, false, true);


  },
  to_sp(res) {
    console.log(res);
    var id = res.currentTarget.dataset['index'];
    var name = res.currentTarget.dataset['name'];
    // dd.navigateTo({
    //   url: '/page/promotion_index/p_zhi_hui/p_zhi_hui?id=' + id + "&name=" + name
    // });
    if (this.data.s_refer == "" || this.data.s_refer == null) {
      dd.navigateTo({
        url: '/page/promotion_index/p_zhi_hui/p_zhi_hui?id=' + id + "&name=" + name
      })
    } else {
      dd.navigateTo({
        url: '/page/promotion_index/promotion_apply/all/all?id=' + id + "&name=" + name
      })
    }
  }
});
