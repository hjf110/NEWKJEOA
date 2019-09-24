

var app = getApp();

Page({
  data: {
    zh: false,
    cw: false,
    zj: false,
    rs: false,
    cg: false,
    fz: false,
    hang: false,//杭州显隐
    hu: false,//湖州显隐
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

    decideDate: "",//直属部门审批时间
    decideUser: "",//直属部门审批人
    departmentalOpinion: "",//直属部门审批意见

    vgm: "",//副总审批意见
    vgmDate: "",//副总审批时间
    vgmUser: "",//副总姓名

    finance: "",//财务意见
    financeDate: "",//财务填写时间
    financeUser: "",//财务姓名

    qs: "",//质检意见
    qsDate: "",//质检填写时间
    qsUser: "",//质检姓名

    tcc: "",//指挥中心意见
    tccDate: "",//指挥中心填写时间
    tccUser: "",//指挥中心姓名

    hr: "",//人事意见
    hrDate: "",//人事填写时间
    hrUser: "",//人事姓名


    vm: "",//车管意见
    vmDate: "",//车管填写时间
    vmUser: "",//车管姓名


    hangzhou: "",//杭州公司意见
    hangzhouDate: "",//杭州公司填写时间
    hangzhouUser: "",//杭州公司姓名


    huzhou: "",//湖州公司意见
    huzhouDate: "",//湖州公司填写时间
    huzhouUser: "",//湖州公司姓名




    text_yj: ""
  },
  onLoad(res) {
    var that = this;
    var id = res.id;
    dd.showLoading({
      content: '数据加载中'
    });
    //  dd.showLoading({
    //   content: '财务'
    // });

    //----------------------------------------------------------------------------------------------------------------------------------------------
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

              var vgmDate = app.getLocalTime(aa.vgmDate);
              var vgmUser = aa.vgmUser;
              var vgm = aa.vgm;


              var financeDate = app.getLocalTime(aa.financeDate);
              var financeUser = aa.financeUser;
              var finance = aa.finance;

              var qsDate = app.getLocalTime(aa.qsDate);
              var qsUser = aa.qsUser;
              var qs = aa.qs;


              var tccDate = app.getLocalTime(aa.tccDate);
              var tccUser = aa.tccUser;
              var tcc = aa.tcc;


              var hrDate = app.getLocalTime(aa.hrDate);
              var hrUser = aa.hrUser;
              var hr = aa.hr;


              var vmDate = app.getLocalTime(aa.vmDate);
              var vmUser = aa.vmUser;
              var vm = aa.vm;



              var hangzhouDate = app.getLocalTime(aa.hangzhouDate);
              var hangzhouUser = aa.hangzhouUser;
              var hangzhou = aa.hangzhou;


              var huzhouDate = app.getLocalTime(aa.huzhouDate);
              var huzhouUser = aa.huzhouUser;
              var huzhou = aa.huzhou;


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



              that.setData({
                decideDate: decideDate
              });
              that.setData({
                decideUser: decideUser
              });
              that.setData({
                departmentalOpinion: departmentalOpinion
              });



              if (vgmUser == null || vgmUser == "") {
                that.setData({
                  fz: true
                });

              } else {
                that.setData({
                  vgmDate: vgmDate
                });
                that.setData({
                  vgmUser: vgmUser
                });
                that.setData({
                  vgm: vgm
                });
              }


              if (financeUser == null || financeUser == "") {
                that.setData({
                  cw: true
                });

              } else {
                that.setData({
                  financeDate: financeDate
                });
                that.setData({
                  financeUser: financeUser
                });
                that.setData({
                  finance: finance
                });
              }


              if (qsUser == null || qsUser == "") {
                that.setData({
                  zj: true
                });

              } else {
                that.setData({
                  qsDate: qsDate
                });
                that.setData({
                  qsUser: qsUser
                });
                that.setData({
                  qs: qs
                });
              }


              if (tccUser == null || tccUser == "") {
                that.setData({
                  zh: true
                });

              } else {
                that.setData({
                  tccDate: tccDate
                });
                that.setData({
                  tccUser: tccUser
                });
                that.setData({
                  tcc: tcc
                });
              }



              if (hrUser == null || hrUser == "") {


                // that.setData({
                //   rs: true
                // });


              } else {

                that.setData({
                  rs: true
                });
                // that.setData({
                //   hrDate: hrDate
                // });
                // that.setData({
                //   hrUser: hrUser
                // });
                // that.setData({
                //   hr: hr
                // });
              }


              if (vmUser == null || vmUser == "") {
                that.setData({
                  cg: true
                });

              } else {
                that.setData({
                  vmDate: vmDate
                });
                that.setData({
                  vmUser: vmUser
                });
                that.setData({
                  vm: vm
                });
              }




              if (hangzhouUser == null || hangzhouUser == "") {
                that.setData({
                  hang: true
                });
              } else {
                that.setData({
                  hangzhouDate: hangzhouDate
                });
                that.setData({
                  hangzhouUser: hangzhouUser
                });
                that.setData({
                  hangzhou: hangzhou
                });
              }

              if (huzhouUser == null || huzhouUser == "") {
                that.setData({
                  hu: true
                });
              } else {
                that.setData({
                  huzhouDate: huzhouDate
                });
                that.setData({
                  huzhouUser: huzhouUser
                });
                that.setData({
                  huzhou: huzhou
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
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  },
  get_textarea_value: function(e) {//否定意见的值双向绑定
    console.log(e);
    this.setData({
      text_yj: e.detail.value
    });
    console.log("否定意见的值:", this.data.text_yj);
  },
  tj: function(res) {
    console.log("提交了意见为:", this.data.text_yj);

    var that = this;
    if (this.data.text_yj == null || this.data.text_yj == "") {
      dd.alert({
        title: '信息',
        content: '请填写意见',
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

      var station = encodeURI(app.userinfo.arr[0].station);
      // var station = app.userinfo.arr[0].station;
      console.log("station-----", station);
      app.ajaxSubmit(app.urlApi.p_bum_yijian + "?station=" + station + "", "POST", { hr: that.data.text_yj, id: that.data.id }, function(res) {
        console.log("得到的列表为", res);
        dd.alert({
          title: '信息',
          content: '提交成功,点击确定返回',
          buttonText: '确定',
          success: () => {
            dd.navigateTo({
              url: '/page/promotion_index/promotion_index'
            })
          }
        });
      }, true, true);
    }

  },
  //--------------------------------------------------修改的地方------------------------------------------
  yes_tj: function(res) {
    dd.hideLoading();
    dd.showLoading({
      content: '请稍后...'
    });
    console.log("提交了意见为:", this.data.text_yj);
    var that = this;
    if (this.data.text_yj == null || this.data.text_yj == "") {
      dd.hideLoading();
      dd.alert({
        title: '信息',
        content: '请填写意见',
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
        content: '提交中...'
      });
      console.log("点击了同意");
      var station = encodeURI(app.userinfo.arr[0].station);
      // var station = app.userinfo.arr[0].station;
      console.log("station-----", station);
      app.ajaxSubmit(app.urlApi.p_bum_yijian + "?station=" + station + "", "POST", { hr: "同意:" + that.data.text_yj, id: that.data.id }, function(res) {
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
        dd.hideLoading();

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
    dd.hideLoading();
    dd.showLoading({
      content: '请稍后...'
    });
    console.log("提交了意见为:", this.data.text_yj);
    var that = this;
    if (this.data.text_yj == null || this.data.text_yj == "") {
      dd.hideLoading();
      dd.alert({
        title: '信息',
        content: '请填写意见',
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
        content: '提交中...'
      });
      console.log("点击了不同意");
      var station = encodeURI(app.userinfo.arr[0].station);
      // var station = app.userinfo.arr[0].station;
      console.log("station-----", station);
      app.ajaxSubmit(app.urlApi.p_bum_yijian + "?station=" + station + "", "POST", { hr: "不同意:" + that.data.text_yj, id: that.data.id }, function(res) {
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
        dd.hideLoading();
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
