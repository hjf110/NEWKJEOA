

var app = getApp();

Page({
  data: {
    isHaveHiredDate: true,
    isfirst: 0,//是否第一次提交
    info_hiredDate: "",//入职时间
    info_position: "",//现级别
    array: ['请选择现岗位', '管理岗位', '调度岗位', '话席岗位', '业务岗位', '技师岗位'],
    index: 0,
    array_1: ['请选择现级别'],
    index_1: 0,
    array_2: ['请选择申请级别'],
    index_2: 0,
    datenum: "",
    post: "",//现岗位
    level: "",//现级别
    application: "",//申请级别
    username: "",
    datetime: "",
    datetimebiye: "",
    datetimein: "",
    items: [
      { name: 'sex', value: '男', checked: true },
      { name: 'sex', value: '女' }
    ]
  },
  onLoad() {
    var that = this;
    this.setData({
      username: app.userinfo.name
    });
    app.ajaxSubmit(app.urlApi.p_getUserInfo, "GET", null, function(res) {
      console.log("得到人员信息为", res);
      var info = res.data;
      var position = info.position;//现级别
      var hiredDate;//入职时间
      let aa = info.hiredDate;
      if (aa == "" || aa == null || aa == undefined) {
        hiredDate = " ";
        dd.alert({
          title: '错误',
          content: "无法获取入职时间信息，请联系人事",
          buttonText: '确定',
        });
        that.setData({
          isHaveHiredDate: false,
        });
      } else {
        hiredDate = app.getLocalTime(info.hiredDate, true)
      }

      that.setData({
        info_hiredDate: hiredDate,
        info_position: position
      });


      var myDate = new Date;
      var year = myDate.getFullYear(); //获取当前年
      var mon = myDate.getMonth() + 1; //获取当前月
      var date = myDate.getDate(); //获取当前日
      // var h = myDate.getHours();//获取当前小时数(0-23)
      // var m = myDate.getMinutes();//获取当前分钟数(0-59)
      // var s = myDate.getSeconds();//获取当前秒
      var week = myDate.getDay();
      var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

      var d1;
      var d2;
      if (mon < 10) {
        d1 = "0" + mon + "";
      } else {
        d1 = mon;
      }
      if (date < 10) {
        d2 = "0" + date + "";
      } else {
        d2 = date;
      }
      var nowday = year + "-" + d1 + "-" + d2;

      var dddddd = that.DateMinus(hiredDate, nowday);
      console.log("相减后的结果---", dddddd);

      if (that.data.isHaveHiredDate) {
        that.setData({
          datenum: dddddd + "天",
          datetimein: hiredDate
        });
      } else {
        that.setData({
          datenum: "",
          datetimein: hiredDate
        });
      }



    }, true);

  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var i = e.detail.value;
    this.setData({
      index: i,
    });
    var gw = this.data.array[i];
    if (i == 0) {
      this.setData({
        post: ""
      });
    } else {
      this.setData({
        post: gw
      });
    }
    this.setData({
      index_1: 0
    });
    this.setData({
      index_2: 0
    });
    console.log("获得的岗位名称为---", this.data.post);
    var ccc;
    var ddd;
    var yy = this.data.info_position;
    if (i == 1) {
      ccc = ['请选择现级别', '试用期（岗位工资0元）', '实习干事（岗位工资300元）', '初级干事（岗位工资600元）', '二级干事（岗位工资800元）', '一级干事（岗位工资1200元)'];
      // ddd = ['请选择申请级别', '试用期（岗位工资0元）', '实习干事（岗位工资300元）', '初级干事（岗位工资600元）', '二级干事（岗位工资800元）', '一级干事（岗位工资1200元)'];
      if (yy == "试用期") {
        ddd = ['请选择申请级别', '实习干事（岗位工资300元）', '初级干事（岗位工资600元）', '二级干事（岗位工资800元）', '一级干事（岗位工资1200元)', '高级干事（岗位工资1800元）', '部门助理（岗位工资1200元）', '部门主管（岗位工资1800元）', '部门（分公司）副经理（岗位工资2000元）', '部门（分公司）经理（岗位工资2500元）', '公司总经理助理（岗位工资3000元）', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "实习干事") {
        ddd = ['请选择申请级别', '初级干事（岗位工资600元）', '二级干事（岗位工资800元）', '一级干事（岗位工资1200元)', '高级干事（岗位工资1800元）', '部门助理（岗位工资1200元）', '部门主管（岗位工资1800元）', '部门（分公司）副经理（岗位工资2000元）', '部门（分公司）经理（岗位工资2500元）', '公司总经理助理（岗位工资3000元）', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "初级干事") {
        ddd = ['请选择申请级别', '二级干事（岗位工资800元）', '一级干事（岗位工资1200元)', '高级干事（岗位工资1800元）', '部门助理（岗位工资1200元）', '部门主管（岗位工资1800元）', '部门（分公司）副经理（岗位工资2000元）', '部门（分公司）经理（岗位工资2500元）', '公司总经理助理（岗位工资3000元）', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "二级干事") {
        ddd = ['请选择申请级别', '一级干事（岗位工资1200元)', '高级干事（岗位工资1800元）', '部门助理（岗位工资1200元）', '部门主管（岗位工资1800元）', '部门（分公司）副经理（岗位工资2000元）', '部门（分公司）经理（岗位工资2500元）', '公司总经理助理（岗位工资3000元）', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "一级干事") {
        ddd = ['请选择申请级别', '高级干事（岗位工资1800元）', '部门助理（岗位工资1200元）', '部门主管（岗位工资1800元）', '部门（分公司）副经理（岗位工资2000元）', '部门（分公司）经理（岗位工资2500元）', '公司总经理助理（岗位工资3000元）', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "高级干事") {
        ddd = ['请选择申请级别', '部门助理（岗位工资1200元）', '部门主管（岗位工资1800元）', '部门（分公司）副经理（岗位工资2000元）', '部门（分公司）经理（岗位工资2500元）', '公司总经理助理（岗位工资3000元）', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "部门助理") {
        ddd = ['请选择申请级别', '部门主管（岗位工资1800元）', '部门（分公司）副经理（岗位工资2000元）', '部门（分公司）经理（岗位工资2500元）', '公司总经理助理（岗位工资3000元）', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "部门主管") {
        ddd = ['请选择申请级别', '部门（分公司）副经理（岗位工资2000元）', '部门（分公司）经理（岗位工资2500元）', '公司总经理助理（岗位工资3000元）', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "部门（分公司）副经理") {
        ddd = ['请选择申请级别', '部门（分公司）经理（岗位工资2500元）', '公司总经理助理（岗位工资3000元）', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "部门（分公司）经理") {
        ddd = ['请选择申请级别', '公司总经理助理（岗位工资3000元）', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "公司总经理助理") {
        ddd = ['请选择申请级别', '公司副总经理（岗位工资3500元）', '公司总经理（岗位工资5000元）'];
      } else if (yy == "公司副总经理") {
        ddd = ['请选择申请级别', '公司总经理（岗位工资5000元）'];
      } else {
        ddd = ['请选择正确的岗位'];
        dd.showToast({
          content: '请选择正确的岗位',
          duration: 1000,
        });
      }
    } else if (i == 2) {
      ccc = ['请选择现级别', '试用期（岗位工资0元）', '初级调度员（岗位工资800元）', '中级调度员（岗位工资1100元）', '高级调度员（岗位工资1300元）'];
      if (yy == "试用期") {
        ddd = ['请选择申请级别', '初级调度员（岗位工资800元）', '中级调度员（岗位工资1100元）', '高级调度员（岗位工资1300元）', '调度师（岗位工资1500元)'];
      } else if (yy == "初级调度员") {
        ddd = ['请选择申请级别', '中级调度员（岗位工资1100元）', '高级调度员（岗位工资1300元）', '调度师（岗位工资1500元)'];
      } else if (yy == "中级调度员") {
        ddd = ['请选择申请级别', '高级调度员（岗位工资1300元）', '调度师（岗位工资1500元)'];
      } else if (yy == "高级调度员") {
        ddd = ['请选择申请级别', '调度师（岗位工资1500元)'];
      } else {
        ddd = ['请选择正确的岗位'];
        dd.showToast({
          content: '请选择正确的岗位',
          duration: 1000,
        });
      }
    } else if (i == 3) {
      ccc = ['请选择现级别', '试用期（岗位工资0元）', '实习话务员（岗位工资300元）', '初级话务员（岗位工资600元）', '二级话务员（岗位工资800元）', '一级话务员（岗位工资1100元）', '高级话务员（岗位工资1300元）'];
      if (yy == "试用期") {
        ddd = ['请选择申请级别', '实习话务员（岗位工资300元）', '初级话务员（岗位工资600元）', '二级话务员（岗位工资800元）', '一级话务员（岗位工资1100元）', '高级话务员（岗位工资1300元）', '话务师（岗位工资1500元）'];
      } else if (yy == "实习话务员") {
        ddd = ['请选择申请级别', '初级话务员（岗位工资600元）', '二级话务员（岗位工资800元）', '一级话务员（岗位工资1100元）', '高级话务员（岗位工资1300元）', '话务师（岗位工资1500元）'];
      } else if (yy == "初级话务员") {
        ddd = ['请选择申请级别', '二级话务员（岗位工资800元）', '一级话务员（岗位工资1100元）', '高级话务员（岗位工资1300元）', '话务师（岗位工资1500元）'];
      } else if (yy == "二级话务员") {
        ddd = ['请选择申请级别', '一级话务员（岗位工资1100元）', '高级话务员（岗位工资1300元）', '话务师（岗位工资1500元）'];
      } else if (yy == "一级话务员") {
        ddd = ['请选择申请级别', '高级话务员（岗位工资1300元）', '话务师（岗位工资1500元）'];
      } else if (yy == "高级话务员") {
        ddd = ['请选择申请级别', '话务师（岗位工资1500元）'];
      } else {
        ddd = ['请选择正确的岗位'];
        dd.showToast({
          content: '请选择正确的岗位',
          duration: 1000,
        });
      }
    } else if (i == 4) {
      ccc = ['请选择现级别', '试用期（岗位工资0元）', '实习业务员（岗位工资300元）', '初级业务员（岗位工资600元）', '业务员（岗位工资800元）', '业务经理（岗位工资1100元）', '高级业务经理（岗位工资1300元）'];
      if (yy == "试用期") {
        ddd = ['请选择申请级别', '实习业务员（岗位工资300元）', '初级业务员（岗位工资600元）', '业务员（岗位工资800元）', '业务经理（岗位工资1100元）', '高级业务经理（岗位工资1300元）', '特级业务经理（岗位工资1500元）'];
      } else if (yy == "实习业务员") {
        ddd = ['请选择申请级别', '初级业务员（岗位工资600元）', '业务员（岗位工资800元）', '业务经理（岗位工资1100元）', '高级业务经理（岗位工资1300元）', '特级业务经理（岗位工资1500元）'];
      } else if (yy == "初级业务员") {
        ddd = ['请选择申请级别', '业务员（岗位工资800元）', '业务经理（岗位工资1100元）', '高级业务经理（岗位工资1300元）', '特级业务经理（岗位工资1500元）'];
      } else if (yy == "业务员") {
        ddd = ['请选择申请级别', '业务经理（岗位工资1100元）', '高级业务经理（岗位工资1300元）', '特级业务经理（岗位工资1500元）'];
      } else if (yy == "业务经理") {
        ddd = ['请选择申请级别', '高级业务经理（岗位工资1300元）', '特级业务经理（岗位工资1500元）'];
      } else if (yy == "高级业务经理") {
        ddd = ['请选择申请级别', '特级业务经理（岗位工资1500元）'];
      } else {
        ddd = ['请选择正确的岗位'];
        dd.showToast({
          content: '请选择正确的岗位',
          duration: 1000,
        });
      }
    } else if (i == 5) {
      ccc = ['请选择现级别', '试用期（岗位工资0元）', '实习级技师（岗位工资300元）', '初级技师（岗位工资600元）', '二级技师（岗位工资800元）', '一级技师（岗位工资1100元）', '高级技师（岗位工资1300元）'];
      if (yy == "试用期") {
        ddd = ['请选择申请级别', '实习级技师（岗位工资300元）', '初级技师（岗位工资600元）', '二级技师（岗位工资800元）', '一级技师（岗位工资1100元）', '高级技师（岗位工资1300元）', '特级技师（岗位工资1500元）'];
      } else if (yy == "实习级技师") {
        ddd = ['请选择申请级别', '初级技师（岗位工资600元）', '二级技师（岗位工资800元）', '一级技师（岗位工资1100元）', '高级技师（岗位工资1300元）', '特级技师（岗位工资1500元）'];
      } else if (yy == "初级技师") {
        ddd = ['请选择申请级别', '二级技师（岗位工资800元）', '一级技师（岗位工资1100元）', '高级技师（岗位工资1300元）', '特级技师（岗位工资1500元）'];
      } else if (yy == "二级技师") {
        ddd = ['请选择申请级别', '一级技师（岗位工资1100元）', '高级技师（岗位工资1300元）', '特级技师（岗位工资1500元）'];
      } else if (yy == "一级技师") {
        ddd = ['请选择申请级别', '高级技师（岗位工资1300元）', '特级技师（岗位工资1500元）'];
      } else if (yy == "高级技师") {
        ddd = ['请选择申请级别', '特级技师（岗位工资1500元）'];
      } else {
        ddd = ['请选择正确的岗位'];
        dd.showToast({
          content: '请选择正确的岗位',
          duration: 1000,
        });
      }
    } else if (i == 0) {
      ccc = ['请选择现级别'];
      ddd = ['请选择申请级别'];
    }
    this.setData({
      array_1: ccc
    });
    this.setData({
      array_2: ddd
    });
  },
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var i = e.detail.value;
    this.setData({
      index_1: i,
    });
    var gw = this.data.array_1[i];
    if (i == 0) {
      this.setData({
        level: ""
      });
    } else {
      this.setData({
        level: gw
      });
    };
    this.setData({
      index_2: 0
    });
    var ddd;
    var xx = this.data.index;
    var yy = this.data.index_1;
    if (xx == 1) {
      if (yy == 1) {
        ddd = ['请选择申请级别', '实习干事（岗位工资300元）', '初级干事（岗位工资600元）', '二级干事（岗位工资800元）', '一级干事（岗位工资1200元)', '高级干事（岗位工资1800元）'];
      } else if (yy == 2) {
        ddd = ['请选择申请级别', '初级干事（岗位工资600元）', '二级干事（岗位工资800元）', '一级干事（岗位工资1200元)', '高级干事（岗位工资1800元）'];
      } else if (yy == 3) {
        ddd = ['请选择申请级别', '二级干事（岗位工资800元）', '一级干事（岗位工资1200元)', '高级干事（岗位工资1800元）'];
      } else if (yy == 4) {
        ddd = ['请选择申请级别', '一级干事（岗位工资1200元)', '高级干事（岗位工资1800元）'];
      } else if (yy == 5) {
        ddd = ['请选择申请级别', '高级干事（岗位工资1800元）'];
      }
    } else if (xx == 2) {
      if (yy == 1) {
        ddd = ['请选择申请级别', '初级调度（岗位工资800元）', '中级调度（岗位工资1100元）', '高级调度（岗位工资1300元）', '调度师（岗位工资1500元)'];
      } else if (yy == 2) {
        ddd = ['请选择申请级别', '中级调度（岗位工资1100元）', '高级调度（岗位工资1300元）', '调度师（岗位工资1500元)'];
      } else if (yy == 3) {
        ddd = ['请选择申请级别', '高级调度（岗位工资1300元）', '调度师（岗位工资1500元)'];
      } else if (yy == 4) {
        ddd = ['请选择申请级别', '调度师（岗位工资1500元)'];
      }

    } else if (xx == 3) {
      if (yy == 1) {
        ddd = ['请选择申请级别', '实习话务员（岗位工资300元）', '初级话务员（岗位工资600元）', '二级话务员（岗位工资800元）', '一级话务员（岗位工资1100元）', '高级话务员（岗位工资1300元）', '话务师（岗位工资1500元）'];
      } else if (yy == 2) {
        ddd = ['请选择申请级别', '初级话务员（岗位工资600元）', '二级话务员（岗位工资800元）', '一级话务员（岗位工资1100元）', '高级话务员（岗位工资1300元）', '话务师（岗位工资1500元）'];
      } else if (yy == 3) {
        ddd = ['请选择申请级别', '二级话务员（岗位工资800元）', '一级话务员（岗位工资1100元）', '高级话务员（岗位工资1300元）', '话务师（岗位工资1500元）'];
      } else if (yy == 4) {
        ddd = ['请选择申请级别', '一级话务员（岗位工资1100元）', '高级话务员（岗位工资1300元）', '话务师（岗位工资1500元）'];
      } else if (yy == 5) {
        ddd = ['请选择申请级别', '高级话务员（岗位工资1300元）', '话务师（岗位工资1500元）'];
      } else if (yy == 6) {
        ddd = ['请选择申请级别', '话务师（岗位工资1500元）'];
      }
    } else if (xx == 4) {
      if (yy == 1) {
        ddd = ['请选择申请级别', '实习业务员（岗位工资300元）', '初级业务员（岗位工资600元）', '业务员（岗位工资800元）', '业务经理（岗位工资1100元）', '高级业务经理（岗位工资1300元）', '特级业务经理（岗位工资1500元）'];
      } else if (yy == 2) {
        ddd = ['请选择申请级别', '初级业务员（岗位工资600元）', '业务员（岗位工资800元）', '业务经理（岗位工资1100元）', '高级业务经理（岗位工资1300元）', '特级业务经理（岗位工资1500元）'];
      } else if (yy == 3) {
        ddd = ['请选择申请级别', '业务员（岗位工资800元）', '业务经理（岗位工资1100元）', '高级业务经理（岗位工资1300元）', '特级业务经理（岗位工资1500元）'];
      } else if (yy == 4) {
        ddd = ['请选择申请级别', '业务经理（岗位工资1100元）', '高级业务经理（岗位工资1300元）', '特级业务经理（岗位工资1500元）'];
      } else if (yy == 5) {
        ddd = ['请选择申请级别', '高级业务经理（岗位工资1300元）', '特级业务经理（岗位工资1500元）'];
      } else if (yy == 6) {
        ddd = ['请选择申请级别', '特级业务经理（岗位工资1500元）'];
      }
    } else if (xx == 5) {
      if (yy == 1) {
        ddd = ['请选择申请级别', '实习级（岗位工资300元）', '初级（岗位工资600元）', '二级（岗位工资800元）', '一级（岗位工资1100元）', '高级（岗位工资1300元）', '特级（岗位工资1500元）'];
      } else if (yy == 2) {
        ddd = ['请选择申请级别', '初级（岗位工资600元）', '二级（岗位工资800元）', '一级（岗位工资1100元）', '高级（岗位工资1300元）', '特级（岗位工资1500元）'];
      } else if (yy == 3) {
        ddd = ['请选择申请级别', '二级（岗位工资800元）', '一级（岗位工资1100元）', '高级（岗位工资1300元）', '特级（岗位工资1500元）'];
      } else if (yy == 4) {
        ddd = ['请选择申请级别', '一级（岗位工资1100元）', '高级（岗位工资1300元）', '特级（岗位工资1500元）'];
      } else if (yy == 5) {
        ddd = ['请选择申请级别', '高级（岗位工资1300元）', '特级（岗位工资1500元）'];
      } else if (yy == 6) {
        ddd = ['请选择申请级别', '特级（岗位工资1500元）'];
      }
    } else if (xx == 0) {
      ddd = ['请选择申请级别'];
    }


    this.setData({
      array_2: ddd
    });





    console.log("获得的级别名称为---", this.data.level);
  },
  bindPickerChange3(e) {
    console.log('申請職位picker发送选择改变，携带值为', e.detail.value);
    var i = e.detail.value;
    this.setData({
      index_2: i,
    });
    var gw = this.data.array_2[i];
    if (i == 0) {
      this.setData({
        application: ""
      });
    } else {
      this.setData({
        application: gw
      });
    }
    console.log("获得的申请级别名称为---", this.data.application);
  },
  get_time: function(res) {
    var that = this;
    dd.datePicker({
      format: 'yyyy-MM-dd',
      startDate: '1900-10-9',
      endDate: '2066-10-9',
      success: (res) => {
        that.setData({
          datetime: res.date
        });
      },
    });
  },
  get_time_biye: function(res) {
    var that = this;
    dd.datePicker({
      format: 'yyyy-MM-dd',
      startDate: '1900-10-9',
      endDate: '2066-10-9',
      success: (res) => {
        that.setData({
          datetimebiye: res.date
        });
      },
    });
  },
  get_time_in: function(res) {


    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    // var h = myDate.getHours();//获取当前小时数(0-23)
    // var m = myDate.getMinutes();//获取当前分钟数(0-59)
    // var s = myDate.getSeconds();//获取当前秒
    var week = myDate.getDay();
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

    var d1;
    var d2;
    if (mon < 10) {
      d1 = "0" + mon + "";
    } else {
      d1 = mon;
    }
    if (date < 10) {
      d2 = "0" + date + "";
    } else {
      d2 = date;
    }
    var nowday = year + "-" + d1 + "-" + d2;

    console.log(nowday);
    var that = this;
    dd.datePicker({
      format: 'yyyy-MM-dd',
      startDate: '1900-10-9',
      endDate: '2066-10-9',
      success: (res) => {

        var dddddd = that.DateMinus(res.date, nowday);
        console.log("相减后的结果---", dddddd);

        that.setData({
          datenum: dddddd + "天"
        });

        that.setData({
          datetimein: res.date
        });
      },
    });
  },
  DateMinus(date1, date2) {//date1:小日期   date2:大日期
    var sdate = new Date(date1);
    var now = new Date(date2);
    var days = now.getTime() - sdate.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
  },
  formsubmit: function(e) {
    var that = this;
    // dd.showLoading({
    //   content: '请稍后...',
    //   delay: 2000,
    // });
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var aa = e.detail.value;
    aa.sex = aa.__unknown_for_control_1;
    console.log('form发生了submit事件，携带数据为：', aa);

    console.log("自我评价字数为-------", app.strlen(aa.selfAssessment));

    if (!that.data.isHaveHiredDate) {
      dd.alert({
        title: '错误',
        content: "无法获取入职时间信息，请联系人事",
        buttonText: '确定',
      });
    } else if (aa.sex == null || aa.sex == "") {
      dd.alert({
        title: '提示信息',
        content: '请选择性别',
        buttonText: '确定',
      });
    } else if (aa.nativePlace == null || aa.nativePlace == "") {
      dd.alert({
        title: '提示信息',
        content: '请填写籍贯',
        buttonText: '确定',
      });
    } else if (aa.birthday == null || aa.birthday == "") {
      dd.alert({
        title: '提示信息',
        content: '请填写出生日期',
        buttonText: '确定',
      });
    } else if (aa.education == null || aa.education == "") {
      dd.alert({
        title: '提示信息',
        content: '请填写学历',
        buttonText: '确定',
      });
    }
    //  else if (aa.major == null || aa.major == "") {
    //   dd.alert({
    //     title: '提示信息',
    //     content: '请填写专业',
    //     buttonText: '确定',
    //   });
    // }
    else if (aa.hiredate == null || aa.hiredate == "") {
      dd.alert({
        title: '提示信息',
        content: '请填写入职时间',
        buttonText: '确定',
      });
    } else if (aa.workingSeniority == null || aa.workingSeniority == "") {
      dd.alert({
        title: '提示信息',
        content: '请填写工作年限',
        buttonText: '确定',
      });
    } else if (aa.post == null || aa.post == "") {
      dd.alert({
        title: '提示信息',
        content: '请填写现岗位',
        buttonText: '确定',
      });
    } else if (aa.level == null || aa.level == "") {
      dd.alert({
        title: '提示信息',
        content: '请填写现级别',
        buttonText: '确定',
      });
    } else if (aa.application == null || aa.application == "") {
      dd.alert({
        title: '提示信息',
        content: '请填写申请职级',
        buttonText: '确定',
      });
    } else if (aa.selfAssessment == null || aa.selfAssessment == "") {
      dd.alert({
        title: '提示信息',
        content: '请填写自我评价',
        buttonText: '确定',
      });
    } else if (app.strlen(aa.selfAssessment) < 200) {
      dd.alert({
        title: '提示信息',
        content: '自我评价不能少于100字',
        buttonText: '确定',
      });
    } else if (this.data.isfirst == 1) {
      dd.showToast({
        content: '请勿重复提交',
        duration: 1000,
      });
    } else {
      // dd.hideLoading();
      dd.showLoading({
        content: '正在提交中',
        delay: 3000,
      });
      that.setData({
        isfirst: 1
      })
      console.log(aa);
      app.ajaxSubmit(app.urlApi.p_add, "POST", aa, function(res) {
        console.log("得到权限", res);
        dd.hideLoading();
        dd.vibrate({
          success: () => {
            // dd.alert({ title: '震动起来了' });
          }
        });
        dd.showToast({
          content: '提交成功,请稍等',
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
        // dd.alert({
        //   title: '信息',
        //   content: '提交成功,点击确定返回',
        //   buttonText: '确定',
        //   complete: () => {
        //     dd.navigateTo({
        //       url: '/page/promotion_index/promotion_index'
        //     })
        //   }
        // });
      }, true, true);
    }
  }
});
