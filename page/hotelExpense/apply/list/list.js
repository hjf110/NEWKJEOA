var app = getApp();

Page({
  data: {
    page:1,
    limit:10000,
    list:[],
  },

  onLoad(){
    this.setData({
      list: [],
    });

    var that = this;
    console.log("s_arr",JSON.stringify(app.userinfo.arr));
    var cid = app.userinfo.id;
    console.log("--------------------------自车交通记录");
    console.log("用户的id为--", cid);
      app.ajaxSubmit(app.urlApi.stay_add_list, "GET", { createId: cid }, function(res) {/******************反馈申请列表接口********************/
      console.log("得到的列表为", res);
      var resData = res.data;
      var list_sp = that.data.list;
      var c = 0;
      for (var i = 0; i < resData.length; i++) {
        c++;
        var resArr = {};
        resArr["id"] = resData[i].id;
        resArr["runNumber"] = resData[i].runNumber;
        resArr["loginName"] = resData[i].createUser.loginName;
        resArr["createDate"] = app.getLocalTime(resData[i].createDate);
        list_sp.push(resArr);

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
        list: list_sp,
      });

    }, true, false, true);

  },

  to_sp(res) {
    console.log(res);
    var id = res.currentTarget.dataset['index'];
    var name = res.currentTarget.dataset['name'];
    dd.navigateTo({
      url: '/page/hotelExpense/approval/approval?type=1&id=' + id + "",/*******************反馈单号对应页面*********************/
    });
  }


});
