var app = getApp();
var a = 1;
Page({
  data: {
    i: 1
  },
  onLoad() {
    dd.showLoading({
      content: '请稍后'
    });
    var that = this;
    that.getUserInfo();
    var timerName = setInterval(function() {
      //循环代码
      if (that.userinfo.jsessionid == null || that.userinfo.jsessionid == "") {
        that.getUserInfo();
      } else {
        dd.redirectTo({
          url: '/page/component/index?msg=' + res.message
        });
      }
    }, 59 * 60 * 1000);
  },
  getUserInfo() {
    var that = this;

    dd.getAuthCode({
      success: function(res) {
        console.log('authCode-----', res);
        console.log('authCode-----', res.authCode);

        //调用登录借口,获取用户信息
        app.ajaxSubmit(app.urlApi.denlu, "GET", { code: res.authCode }, function(res) {
          console.log("2", res);

          //将用户信息存入全局变量
          app.userinfo.jsessionid = res.data.JSESSIONID;
          app.userinfo.id = res.data.id;
          app.userinfo.name = res.data.name;
     

          console.log("3", app.userinfo);
          //成功后跳转页面
          console.log("之前------------", a);
          dd.hideLoading();//隐藏加载loading
          if (a == 1) {
            dd.redirectTo({
              url: '/page/component/index?msg=' + res.message
            });
          };
          a++;
          console.log("之后------------", a);

        });
        /*{
            authCode: 'hYLK98jkf0m' //string authCode
        }*/
      },
      fail: function(err) {
        console.log(err);
      }
    });


  }
});
