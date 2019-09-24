var app = getApp();

Page({
  data: {
    zsbm: false,
    id: "",
    name: "",//姓名
    sex: "",//性别
    nativePlace: "",//籍贯
    birthday: "",//出生日期
    education: "",//学历
    major: "",//专业
    graduateSchool: "",//毕业学校
    graduateTime: "",//毕业时间
    hiredate: "",//入职时间
    workingSeniority: "",//工作年限
    post: "",//现岗位
    level: "",//现级别
    application: "",//申请岗位
    selfAssessment: "",//自我评价
    text_yj: ""
  },
  onLoad(res) {

    var that = this;
    var id = res.id;
    dd.showLoading({
      content: '数据加载中'
    });
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

          app.ajaxSubmit(app.urlApi.p_getUserPower, "GET", null, function(res) {
            console.log("得到权限", res);
            app.userinfo.arr = res.data;//存入权限
            console.log("获得的arr-------------------------", app.userinfo.arr);




            that.setData({
              id: id
            });
            // dd.alert({ content: 'id为----' + id });
            // dd.alert({ content: 'jsessionid为----' + app.userinfo.jsessionid });
            console.log("id为----", id);
            // console.log("name为----", name);
            app.ajaxSubmit(app.urlApi.p_select_byid, "GET", { id: id }, function(res) {
              console.log("得到的列表为", res);
              var aa = res.data;



              var docno = aa.docno;
              var arrList = app.userinfo.arr
              for (var i = 0; i < arrList.length; i++) {
                if (arrList[i].docno == docno) {
                  var ccc = arrList[i];
                  var abc = [];
                  var def = {};
                  def.docno = ccc.docno;
                  def.nodeName = ccc.nodeName;
                  def.nodeNum = ccc.nodeNum;
                  def.nodePattern = ccc.nodePattern;
                  def.station = ccc.station
                  abc.push(def);
                  app.userinfo.arr = abc;
                }
              }
              console.log("获得的arr权限-------------------------", app.userinfo.arr);




              var sex = aa.sex;
              var name = aa.createUser.loginName;
              that.setData({
                name: name
              });
              var nativePlace = aa.nativePlace;
              var birthday = app.getLocalTime(aa.birthday, true);
              var education = aa.education;
              var major = aa.major;
              var graduateSchool = aa.graduateSchool;
              var graduateTime = app.getLocalTime(aa.graduateTime, true);
              var hiredate = app.getLocalTime(aa.hiredate, true);
              var workingSeniority = aa.workingSeniority;
              var post = aa.post;
              var level = aa.level;
              var application = aa.application;
              var selfAssessment = aa.selfAssessment;

              var decideDate = app.getLocalTime(aa.decideDate);
              var decideUser = aa.decideUser;
              var departmentalOpinion = aa.departmentalOpinion;



              that.setData({
                sex: sex
              });
              that.setData({
                nativePlace: nativePlace
              });
              that.setData({
                birthday: birthday
              });
              that.setData({
                education: education
              });
              that.setData({
                major: major
              });
              that.setData({
                graduateSchool: graduateSchool
              });
              that.setData({
                graduateTime: graduateTime
              });
              that.setData({
                hiredate: hiredate
              });
              that.setData({
                workingSeniority: workingSeniority
              });
              that.setData({
                post: post
              });
              that.setData({
                level: level
              });
              that.setData({
                application: application
              });
              that.setData({
                selfAssessment: selfAssessment
              });


              if (decideUser != null && decideUser != "") {
                that.setData({
                  zsbm: true
                });
              }

              dd.hideLoading();



              // that.setData({
              //   list: list_sp
              // });

            }, true, false);






          }, true, false);

        });
        /*{
            authCode: 'hYLK98jkf0m' //string authCode
        }*/
      },
      fail: function(err) {
        console.log(err);
      }
    });



  },
  get_textarea_value: function(e) {//否定意见的值双向绑定
    console.log(e);
    this.setData({
      text_yj: e.detail.value
    });
    console.log("否定意见的值:", this.data.text_yj);
  },
  yes_tj: function(res) {
    dd.hideLoading();
    dd.showLoading({
      content: '请稍后...',
      delay: 3000,
    });
    var that = this;
    if (this.data.text_yj == null || this.data.text_yj == "") {
      dd.hideLoading();
      dd.alert({
        title: '信息',
        content: '请填写审批意见',
        buttonText: '确定',
      });
    } else if (app.strlen(this.data.text_yj) < 60) {
      dd.hideLoading();
      dd.alert({
        title: '提示信息',
        content: '意见不能少于30个字',
        buttonText: '确定',
      });
    } else {
      dd.hideLoading();
      dd.showLoading({
        content: '提交中...',
        delay: 3000,
      });
      console.log("点击了同意");
      var node = app.userinfo.arr[0].nodeNum;
      app.ajaxSubmit(app.urlApi.p_bm_tongyong + "?applyType=true&node=" + node, "POST", { departmentalOpinion: that.data.text_yj, id: that.data.id }, function(res) {
        console.log("得到的列表为", res);
        // dd.alert({
        //   title: '信息',
        //   content: '提交成功,点击确定返回',
        //   buttonText: '确定',
        //   success: () => {
        //     dd.navigateTo({
        //       url: '/page/promotion_index/promotion_index'
        //     })
        //   }
        // });



        dd.vibrate({
          success: () => {
            // dd.alert({ title: '震动起来了' });
          }
        });
        dd.showToast({
          content: '审批成功,请稍等',
          duration: 1000,
          success: () => {
            // dd.navigateTo({
            //   url: '/page/promotion_index/promotion_index'
            // })
          },
        });
        var timeOut = setTimeout(function() {
          console.log("延迟调用============");
          dd.redirectTo({
            url: '/page/promotion_index/promotion_index'
          })
        }, 1000)
      }, true, true);
    }

  },
  no_tj: function(res) {
    console.log("点击了不同意");
    var that = this;
    if (this.data.text_yj == null || this.data.text_yj == "") {
      dd.alert({
        title: '信息',
        content: '请填写审批意见',
        buttonText: '确定',
      });
    } else if (app.strlen(this.data.text_yj) < 60) {
      dd.alert({
        title: '提示信息',
        content: '意见不能少于30个字',
        buttonText: '确定',
      });
    } else {

      console.log("点击了同意");
      var node = app.userinfo.arr[0].nodeNum;
      app.ajaxSubmit(app.urlApi.p_bm_tongyong + "?applyType=false&node=" + node, "POST", { departmentalOpinion: that.data.text_yj, id: that.data.id, refusalReason: that.data.text_yj }, function(res) {
        console.log("得到的列表为", res);
        // dd.alert({
        //   title: '信息',
        //   content: '提交成功,点击确定返回',
        //   buttonText: '确定',
        //   success: () => {
        //     dd.navigateTo({
        //       url: '/page/promotion_index/promotion_index'
        //     })
        //   }
        // });
        dd.vibrate({
          success: () => {
            // dd.alert({ title: '震动起来了' });
          }
        });
        dd.showToast({
          content: '审批成功,请稍等',
          duration: 1000,
          success: () => {
            // dd.navigateTo({
            //   url: '/page/promotion_index/promotion_index'
            // })
          },
        });
        var timeOut = setTimeout(function() {
          console.log("延迟调用============");
          dd.redirectTo({
            url: '/page/promotion_index/promotion_index'
          })
        }, 1000)
      }, true, true);
    }
  }
});
