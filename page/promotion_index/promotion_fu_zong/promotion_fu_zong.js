
var app = getApp();

Page({
  data: {
    zh: false,
    cw: false,
    zj: false,
    rs: false,
    cg: false,
    fz: false,
    tijiao: true,
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



              var name = aa.createUser.loginName;
              that.setData({
                name: name
              });
              var sex = aa.sex;
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



              //流程编号
              var docno = aa.docno;


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
                that.setData({
                  rs: true
                });

              } else {
                that.setData({
                  hrDate: hrDate
                });
                that.setData({
                  hrUser: hrUser
                });
                that.setData({
                  hr: hr
                });
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







              //            hangzhou:false,//杭州显隐
              // huzhou:false,//湖州显隐

              var as = 1;






              if (docno == "201905300001") {//总公司技师
                if (that.data.cw == false && that.data.zj == false && that.data.zh == false && that.data.rs == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040005") {//大区技师
                if (that.data.cw == false && that.data.zj == false && that.data.zh == false && that.data.rs == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040006") {//杭州技师
                if (that.data.cw == false && that.data.zj == false && that.data.zh == false && that.data.rs == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040007") {//湖州技师
                if (that.data.cw == false && that.data.zj == false && that.data.zh == false && that.data.rs == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040008") {//总公司调度
                if (that.data.cw == false && that.data.zj == false && that.data.hang == false && that.data.hu == false && that.data.rs == false && that.data.cg == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906050001") {//总公司话务员
                if (that.data.cw == false && that.data.zj == false && that.data.hang == false && that.data.hu == false && that.data.rs == false && that.data.cg == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040010") {//总公司业务员
                if (that.data.cw == false && that.data.zj == false && that.data.zh == false && that.data.hang == false && that.data.hu == false && that.data.rs == false && that.data.cg == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040011") {//财务部管理岗
                if (that.data.zj == false && that.data.zh == false && that.data.rs == false && that.data.cg == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040012") {//综合部管理岗
                if (that.data.zj == false && that.data.zh == false && that.data.cw == false && that.data.cg == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040013") {//质监部管理岗
                if (that.data.rs == false && that.data.zh == false && that.data.cw == false && that.data.cg == false && that.data.hang == false && that.data.hu == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040014") {//车管部管理岗
                if (that.data.rs == false && that.data.zh == false && that.data.cw == false && that.data.zj == false && that.data.hang == false && that.data.hu == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040015") {//指挥中心管理岗
                if (that.data.rs == false && that.data.cg == false && that.data.cw == false && that.data.zj == false && that.data.hang == false && that.data.hu == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040016") {//杭州公司管理岗
                if (that.data.zh == false && that.data.rs == false && that.data.cg == false && that.data.cw == false && that.data.zj == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              } else if (docno == "201906040017") {//湖州公司管理岗
                if (that.data.zh == false && that.data.rs == false && that.data.cg == false && that.data.cw == false && that.data.zj == false) {
                  that.setData({
                    tijiao: false
                  });
                }
              }




              if (vgmUser != null && vgmUser != "") {
                that.setData({
                  fz: true,
                  tijiao: true
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
    console.log("点击了同意", this.data.text_yj);
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
      if (that.data.tijiao == false) {
        dd.hideLoading();
        dd.showLoading({
          content: '提交中...',
          delay: 3000,
        });
        console.log("点击了同意");
        var node = app.userinfo.arr[0].nodeNum;
        app.ajaxSubmit(app.urlApi.p_bm_tongyong + "?applyType=true&node=" + node, "POST", { vgm: that.data.text_yj, id: that.data.id }, function(res) {
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
            duration: 2000,
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
          }, 2000)




        }, true, true);
      }

    }



  },
  no_tj: function(res) {
    dd.hideLoading();
    dd.showLoading({
      content: '请稍后...',
      delay: 3000,
    });
    console.log("点击了不同意", this.data.text_yj);
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
      if (that.data.tijiao == false) {
        dd.hideLoading();
        dd.showLoading({
          content: '提交中...',
          delay: 3000,
        });
        console.log("点击了同意");
        var node = app.userinfo.arr[0].nodeNum;
        app.ajaxSubmit(app.urlApi.p_bm_tongyong + "?applyType=false&node=" + node, "POST", { vgm: that.data.text_yj, id: that.data.id, refusalReason: that.data.text_yj }, function(res) {
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
  }





});
