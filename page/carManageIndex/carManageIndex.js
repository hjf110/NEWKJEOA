
var app = getApp();

Page({
  data: {
    onShow: false,
    type_src: "/image/type1.png",
    array: ['未审批', '已审批', '全部'],
    index: 0,
    s_refer: "",//审批状态
    page: 1,
    limit: 20,
    list: [],
    lastinfo: "请稍等......",
    lasttype: 0,
    s_key: ""
  },
  nameinfo(e) {
    var val = e.detail.value;
    this.setData({
      s_key: val
    });
  },
  bindPickerChange() {
    //console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      list: [],
      page: 1,
      limit: 20,
      lasttype: 0
    });
    var that = this;
    console.log("s_arr", JSON.stringify(app.userinfo.arr));
    var arr_p = JSON.stringify(app.userinfo.arr);
    app.ajaxSubmit(app.urlApi.c_car_list, "POST", { page: that.data.page, limit: that.data.limit, s_key: that.data.s_key }, function(res) {
      console.log("得到的列表为", res);
      var aa = res.data;
      var list_sp = that.data.list;
      var c = 0;
      for (var i = 0; i < aa.length; i++) {
        c++;
        var bb = {};
        //console.log(aa[i]);
        bb["id"] = aa[i].id;//id
        bb["licensePlate"] = aa[i].licensePlate;//车牌
        bb["belong"] = aa[i].belong;//归属
        bb["motorcycleType"] = aa[i].motorcycleType;//车辆类型
        bb["vehicleBrand"] = aa[i].vehicleBrand;//车辆品牌
        bb["toolboxLocation"] = aa[i].toolboxLocation;//工具箱位置编号
        if (aa[i].updateDate != null && aa[i].updateDate != "") {
          bb["updateDate"] = app.getLocalTime(aa[i].updateDate);//时间
        } else {
          bb["updateDate"] = "空";//时间
        }
        if (bb.toolboxLocation == 1) {
          bb["toolName"] = "左";//工具箱位置
        } else if (bb.toolboxLocation == 2) {
          bb["toolName"] = "右";//工具箱位置
        } else if (bb.toolboxLocation == 3) {
          bb["toolName"] = "两边";//工具箱位置
        } else if (bb.toolboxLocation == 4) {
          bb["toolName"] = "车辆后备箱";//工具箱位置
        }

        //  console.log(aa[i].belongUserInfo);
        if (aa[i].belongUserInfo != null && aa[i].belongUserInfo != "") {
          bb["loginName"] = aa[i].belongUserInfo.loginName;
          bb["userId"] = aa[i].belongUserInfo.id;
        } else {
          bb["loginName"] = "无";
          bb["userId"] = 0;
        }
        // bb["application"] = aa[i].application;
        // bb["createDate"] = app.getLocalTime(aa[i].createDate);
        list_sp.push(bb);

      }

      if (c < 20 && c != 0) {
        that.setData({
          lastinfo: "没有更多了"
        });
      } else if (c == 20) {
        that.setData({
          lastinfo: "请稍等......"
        });
      } else if (c == 0) {
        that.setData({
          lastinfo: "无数据"
        });
      }
      console.log("cccccc--", c);
      console.log("list数据--", list_sp);
      that.setData({
        list: list_sp
      });
    }, true, false, true);

  },
  onShow() {
    // 页面显示
    var that = this;
    if (this.data.onShow == true) {
      that.setData({
        list: [],
        page: 1,
        limit: 20,
        lasttype: 0
      });

      // var that = this;
      console.log("s_arr", JSON.stringify(app.userinfo.arr));
      var arr_p = JSON.stringify(app.userinfo.arr);
      app.ajaxSubmit(app.urlApi.c_car_list, "POST", { page: this.data.page, limit: this.data.limit, s_key: that.data.s_key }, function(res) {
        console.log("得到的列表为", res);
        var aa = res.data;
        var list_sp = that.data.list;
        var c = 0;
        for (var i = 0; i < aa.length; i++) {
          c++;
          var bb = {};
          //console.log(aa[i]);
          bb["id"] = aa[i].id;
          bb["licensePlate"] = aa[i].licensePlate;
          bb["belong"] = aa[i].belong;//归属
          bb["motorcycleType"] = aa[i].motorcycleType;//车辆类型
          bb["vehicleBrand"] = aa[i].vehicleBrand;//车辆品牌
          bb["toolboxLocation"] = aa[i].toolboxLocation;//工具箱位置编号
          if (aa[i].updateDate != null && aa[i].updateDate != "") {
            bb["updateDate"] = app.getLocalTime(aa[i].updateDate);//时间
          } else {
            bb["updateDate"] = "空";//时间
          }

          if (bb.toolboxLocation == 1) {
            bb["toolName"] = "左";//工具箱位置
          } else if (bb.toolboxLocation == 2) {
            bb["toolName"] = "右";//工具箱位置
          } else if (bb.toolboxLocation == 3) {
            bb["toolName"] = "两边";//工具箱位置
          } else if (bb.toolboxLocation == 4) {
            bb["toolName"] = "车辆后备箱";//工具箱位置
          }

          // console.log(aa[i].belongUserInfo);
          if (aa[i].belongUserInfo != null && aa[i].belongUserInfo != "") {
            bb["loginName"] = aa[i].belongUserInfo.loginName;
            bb["userId"] = aa[i].belongUserInfo.id;
          } else {
            bb["loginName"] = "无";
            bb["userId"] = 0;
          }
          // bb["application"] = aa[i].application;
          // bb["createDate"] = app.getLocalTime(aa[i].createDate);
          list_sp.push(bb);

        }
        if (c < 20 && c != 0) {
          that.setData({
            lastinfo: "没有更多了"
          });
        } else if (c == 20) {
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
      lasttype: 0
    });


    var that = this;
    console.log("s_arr", JSON.stringify(app.userinfo.arr));
    var arr_p = JSON.stringify(app.userinfo.arr);
    app.ajaxSubmit(app.urlApi.c_car_list, "POST", { page: this.data.page, limit: this.data.limit, s_key: that.data.s_key }, function(res) {
      console.log("得到的列表为", res);
      var aa = res.data;
      var list_sp = that.data.list;
      var c = 0;
      for (var i = 0; i < aa.length; i++) {
        c++;
        var bb = {};
        //console.log(aa[i]);
        bb["id"] = aa[i].id;
        bb["licensePlate"] = aa[i].licensePlate;
        bb["belong"] = aa[i].belong;//归属
        bb["motorcycleType"] = aa[i].motorcycleType;//车辆类型
        bb["vehicleBrand"] = aa[i].vehicleBrand;//车辆品牌
        bb["toolboxLocation"] = aa[i].toolboxLocation;//工具箱位置编号
        if (aa[i].updateDate != null && aa[i].updateDate != "") {
          bb["updateDate"] = app.getLocalTime(aa[i].updateDate);//时间
        } else {
          bb["updateDate"] = "空";//时间
        }

        if (bb.toolboxLocation == 1) {
          bb["toolName"] = "左";//工具箱位置
        } else if (bb.toolboxLocation == 2) {
          bb["toolName"] = "右";//工具箱位置
        } else if (bb.toolboxLocation == 3) {
          bb["toolName"] = "两边";//工具箱位置
        } else if (bb.toolboxLocation == 4) {
          bb["toolName"] = "车辆后备箱";//工具箱位置
        }

        // console.log(aa[i].belongUserInfo);
        if (aa[i].belongUserInfo != null && aa[i].belongUserInfo != "") {
          bb["loginName"] = aa[i].belongUserInfo.loginName;
          bb["userId"] = aa[i].belongUserInfo.id;
        } else {
          bb["loginName"] = "无";
          bb["userId"] = 0;
        }
        // bb["application"] = aa[i].application;
        // bb["createDate"] = app.getLocalTime(aa[i].createDate);
        list_sp.push(bb);

      }
      if (c < 20 && c != 0) {
        that.setData({
          lastinfo: "没有更多了"
        });
      } else if (c == 20) {
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
        list: list_sp,
        onShow:true
      });
    
    }, true, false, true);
  },
  next(res) {
    var that = this;

    if (that.data.lasttype == 0) {
      var p = that.data.page + 1;

      console.log("s_arr", JSON.stringify(app.userinfo.arr));
      console.log("当前页码", p);
      // var arr_p = JSON.stringify(app.userinfo.arr);
      //var cid = app.userinfo.id;
      var arr_p = JSON.stringify(app.userinfo.arr);
      app.ajaxSubmit(app.urlApi.c_car_list, "POST", { page: p, limit: that.data.limit, s_key: that.data.s_key }, function(res) {
        console.log("得到的列表为", res);
        var aa = res.data;
        var list_sp = that.data.list;
        if (aa.length > 0) {
          for (var i = 0; i < aa.length; i++) {
            var bb = {};
            bb["id"] = aa[i].id;
            bb["licensePlate"] = aa[i].licensePlate;
            bb["toolboxLocation"] = aa[i].toolboxLocation;//工具箱位置编号

            bb["belong"] = aa[i].belong;//归属
            bb["motorcycleType"] = aa[i].motorcycleType;//车辆类型
            bb["vehicleBrand"] = aa[i].vehicleBrand;//车辆品牌

            if (aa[i].updateDate != null && aa[i].updateDate != "") {
              bb["updateDate"] = app.getLocalTime(aa[i].updateDate);//时间
            } else {
              bb["updateDate"] = "空";//时间
            }

            if (bb.toolboxLocation == 1) {
              bb["toolName"] = "左";//工具箱位置
            } else if (bb.toolboxLocation == 2) {
              bb["toolName"] = "右";//工具箱位置
            } else if (bb.toolboxLocation == 3) {
              bb["toolName"] = "两边";//工具箱位置
            } else if (bb.toolboxLocation == 4) {
              bb["toolName"] = "车辆后备箱";//工具箱位置
            }
            console.log(aa[i].belongUserInfo);
            if (aa[i].belongUserInfo != null && aa[i].belongUserInfo != "") {
              bb["loginName"] = aa[i].belongUserInfo.loginName;
              bb["userId"] = aa[i].belongUserInfo.id;
            } else {
              bb["loginName"] = "无";
              bb["userId"] = 0;
            }
            // bb["application"] = aa[i].application;
            // bb["createDate"] = app.getLocalTime(aa[i].createDate);
            list_sp.push(bb);

          }
          console.log("list数据--", list_sp);
          that.setData({
            list: list_sp,
            page: p
          });

        } else {
          that.setData({
            lastinfo: "没有更多了",
            lasttype: 1,
          });
        }
        console.log("当前页码", that.data.page);

      }, true, false, true);
    }

  },
  to_sp(res) {
    console.log(res);
    var id = res.currentTarget.dataset['index'];
    var name = res.currentTarget.dataset['name'];
    var licensePlate = res.currentTarget.dataset['licensePlate'];
    var userId = res.currentTarget.dataset['userId'];
    var toolboxLocation = res.currentTarget.dataset['toolboxLocation'];


    console.log("id--", id);
    console.log("name--", name);
    console.log("licensePlate--", licensePlate);
    console.log("userId--", userId);


    dd.navigateTo({
      url: '/page/carManageIndex/modify/modify?id=' + id + "&name=" + name + "&licensePlate=" + licensePlate + "&userId=" + userId + "&toolboxLocation=" + toolboxLocation
    });
  }
});
