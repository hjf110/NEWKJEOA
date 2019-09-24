var app = getApp();

Page({
  data: {
    cp: false,
    licensePlate: "",//车牌
    beiUser: "",//被处理人
    handlingOpinions: "",//处理意见
    zxUser: "",//执行人
    zxTime: "",//执行时间
    feng: "",//扣的分数
    deductTime: ""//处罚时间
  },
  one_next() {
    dd.reLaunch({
      url: '/page/component/index'
    })
  },
  onLoad(res) {
    dd.showLoading({
      content: '数据加载中...'
    });
    var that = this;
    var c_id = res.id;
    var type = res.type;//空或null是驾驶,1是车管
    app.getUserPower(null, function() {
      app.ajaxSubmit(app.urlApi.c_cf, "GET", { id: c_id }, function(res) {
        var aa = res.data;
        if (aa.driver != null || aa.driver != "") {//驾驶员
          that.setData({
            cp: false,
            licensePlate: aa.licensePlate,//车牌
            beiUser: aa.driverInfo.loginName,//被处理人
            handlingOpinions: aa.vmReason,//处理意见
            zxUser: aa.vmUser,//执行人
            zxTime: app.getLocalTime(aa.vmDate),//执行时间
            feng: aa.vmDeduct,
            deductTime: app.getLocalTime(aa.deductTime)
          });
        } else if (aa.punishVm != null || aa.punishVm != "") {
          that.setData({
            cp: true,
            // licensePlate: aa.licensePlate,//车牌
            beiUser: aa.punishVmInfo.loginName,//被处理人
            handlingOpinions: aa.qsReason,//处理意见
            zxUser: aa.qsUser,//执行人
            zxTime: app.getLocalTime(aa.qsDate),//执行时间
            feng: aa.qsDeduct,
            deductTime: app.getLocalTime(aa.qsDate)
          });
        }
        dd.hideLoading();
      }, true, false);
    });
  },
});
