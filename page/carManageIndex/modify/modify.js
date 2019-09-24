

var app = getApp();


Page({
  data: {
    licensePlate: "",//车牌号
    nameList: [],//包含用户id的list
    onlyNameList: [],//只包含姓名的list
    id: "",//id
    toolList: ["无", "左", "右", "两边", "车辆后备箱"],
    toolboxLocation: "",
    value: [],//滑动选择的值
    nameshow: "",//输入框展示的姓名
    toolNum: "",//工具箱位置
  },
  onLoad(res) {
    var that = this;
    var id = res.id;
    var name = res.name;
    var licensePlate = res.licensePlate;
    var userId = res.userId;


    var toolboxLocation = parseInt(res.toolboxLocation);


    this.setData({
      nameshow: name,
      licensePlate: licensePlate,
      id: id
    });
    var gg = {};
    gg.name = name;
    gg.nameid = userId;

    app.ajaxSubmit(app.urlApi.c_userinfo_list, "GET", null, function(res) {
      console.log("返回的数据---------", res);
      var cc = res.data;
      var dd = [];
      var hh = [];

      let ert = {}
      ert.name = "空";
      ert.nameid = 2000;
      dd.push(ert);
      hh.push("空");


      for (var i = 0; i < cc.length; i++) {
        if (cc[i] != "空") {
          var ee = {};
          ee.name = cc[i].loginName;
          ee.nameid = cc[i].id;
          dd.push(ee);
          hh.push(cc[i].loginName);
        }
      }
      console.log("dd-----", dd);
      console.log("hh-----", hh);
      that.setData({
        nameList: dd,
        onlyNameList: hh,
      });
      console.log("gg----", gg);
      var idx = app.findIndex(dd, gg);
      console.log("idx----", idx);
      var ff = [0, idx];

      console.log("ff-------------------", ff);
      that.setData({
        value: ff,
        toolboxLocation: toolboxLocation
      });






    }, true, false, false);





  },
  onChange(e) {
    console.log(e.detail.value);
    this.setData({
      value: e.detail.value,
    });

    var ccc = e.detail.value;
    var i = ccc[1];
    var bbb = this.data.onlyNameList;
    this.setData({
      nameshow: bbb[i]
    });
    console.log("获得的索引为-----", ccc[1]);

  },
  nameinfo(e) {
    var val = e.detail.value;
    console.log("输入的值----", val);
    var list = this.data.onlyNameList;
    var idx = app.keyWord(list, val);
    console.log("idx---", idx);
    var ccc = [0, idx];
    this.setData({
      value: ccc
    });
  },
  tijiao() {
    var aa = this.data.value;
    var bb = this.data.nameList;
    var i = aa[1];
    var cc = bb[i];
    //var ee = aa[1]
    console.log(cc);
    var id_c = this.data.id;
    var userId = cc.nameid;
    console.log("id为-----", id_c);
    console.log("userId为-----", userId);
    if(userId==2000){
      userId=null;
    }
    app.ajaxSubmit(app.urlApi.c_edit, "POST", { id: parseInt(id_c), belongUser: userId }, function(res) {
      console.log("返回的数据(修改后的res)---------", res);
      dd.vibrate({
        success: () => {
          // dd.alert({ title: '震动起来了' });
        }
      });
      dd.showToast({
        content: '修改成功,请稍等',
        duration: 1000,
        success: () => {
          // dd.navigateTo({
          //   url: '/page/promotion_index/promotion_index'
          // })
        },
      });
      var timeOut = setTimeout(function() {
        console.log("延迟调用============");
        dd.navigateBack({
          delta: 1
        })
      }, 1000)
    }, true, false);
  }
});
