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
    console.log("--------------------------辞职记录");
    console.log("用户的id为--", cid);
      app.ajaxSubmit(app.urlApi.re_add_list, "GET", { createId: cid }, function(res) {/******************辞职申请列表接口********************/
      console.log("得到的列表为", res);
      var resData = res.data;
      var list_sp = that.data.list;
      for (var i = 0; i < resData.length; i++) {
        var resArr = {};
        resArr["id"] = resData[i].id;
        resArr["runNumber"] = resData[i].runNumber;
        resArr["loginName"] = resData[i].createUser.loginName;
        resArr["createDate"] = app.getLocalTime(resData[i].createDate);
        list_sp.push(resArr);

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
      url: '/page/resign_index/resign_approval/resign_approval?type=1&id=' + id + "",/*******************离职单号对应页面*********************/
    });
  }


});
