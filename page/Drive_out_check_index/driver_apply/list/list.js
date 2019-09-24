
var app = getApp();

Page({
  data: {
    page: 1,
    limit: 100000000,
    list: []
  },
  onLoad() {
    this.setData({
      list: []
    });


    var that = this;
    console.log("s_arr", JSON.stringify(app.userinfo.arr));
    // var arr_p = JSON.stringify(app.userinfo.arr);
    var cid = app.userinfo.id;
    app.ajaxSubmit(app.urlApi.d_apply_list, "GET", { page: this.data.page, limit: this.data.limit, createId: cid }, function(res) {
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
        // if (aa[i].vmUser == null || aa[i].vmUser == "") {
        //   bb["img1"] = "/image/cgno.png"
        // } else {
        //   bb["img1"] = "/image/cgyes.png"
        // }

        // if (aa[i].qsUser == null || aa[i].qsUser == "") {
        //   bb["img2"] = "/image/zjno.png"
        // } else {
        //   bb["img2"] = "/image/zjyes.png"
        // }

        list_sp.push(bb);
      }
      console.log("list数据--", list_sp);
      that.setData({
        list: list_sp
      });
      console.log("返回的数据为---", aa);
    }, true, false, true);
  },
  next(res) {
    // var that = this;
    // var p = that.data.page + 1;
    // that.setData({
    //   page: p
    // });
    // console.log("s_arr", JSON.stringify(app.userinfo.arr));
    // console.log("当前页码", that.data.page);
    // // var arr_p = JSON.stringify(app.userinfo.arr);
    // var cid = app.userinfo.id;
    // app.ajaxSubmit(app.urlApi.p_apply_list, "GET", { page: that.data.page, limit: that.data.limit, createId: cid }, function(res) {
    //   console.log("得到的列表为", res);
    //   var aa = res.data;
    //   var list_sp = that.data.list;
    //   for (var i = 0; i < aa.length; i++) {
    //     var bb = {};
    //     bb["id"] = aa[i].id;
    //     bb["runNumber"] = aa[i].runNumber;
    //     bb["loginName"] = aa[i].createUser.loginName;
    //     bb["application"] = aa[i].application;
    //     bb["createDate"] = app.getLocalTime(aa[i].createDate);
    //     list_sp.push(bb);

    //   }
    //   console.log("list数据--", list_sp);
    //   that.setData({
    //     list: list_sp
    //   });

    // }, true, false, true);


  },
  to_sp(res) {
    console.log(res);
    var id = res.currentTarget.dataset['index'];
    var name = res.currentTarget.dataset['name'];
    dd.navigateTo({
      url: '/page/Drive_out_check_index/driver_apply/driver_apply?type=1&id=' + id + ""
    });
  }
});
