let app = getApp();




var content = null;
var touchs = [];
var canvasw = 0;
var canvash = 0;




//获取系统信息
dd.getSystemInfo({
  success: function(res) {
    canvasw = res.windowWidth + 1400;
    canvash = canvasw * 11 / 16;
  },
});




Page({
  data: {
    isbb: false,
    ishb: false,
    i: 0,//判断是否重复提交,
    submitLoading: false,

    allHidden: false,
    name: "",//申请人姓名
    job: "",//岗位
    leaveReason: "",//请假事由文本
    specificTime: "",
    startTime: "",
    endTime: "",
    Qjvalue: 0,//请假选择器的值
    list: [],//请假类别
    specific: [
      { name: 1, value: '是', checked: false },
      { name: 0, value: '否', checked: true },
    ],//是否补班
    relief: [
      { name: 1, value: '是', checked: false },
      { name: 0, value: '否', checked: true },
    ],//是否换班

    // specificTime: null,//补班时间
    reliefPerson: null,//换班时间
    // startTime: null,//请假开始时间
    // endTime: null,//请假结束时间
    countDate: null,//请假天数


    // isChange: false,//补办
    // isClass: false,//换班
    isSpecificHidden: true,//是否补班
    isReliefHidden: true,//是否换班
    isStart: false,//是否存在开始时间
    isEnd: false,//是否存在结束时间
    isCountDateHidden: true,//是否显示请假天数

    createPic: "",//签字照片
    signImage: "",//签字显示照片
  },
  onLoad() {


    //签字功能参数---------------------------------------------------

    //获得Canvas的上下文
    content = dd.createCanvasContext('firstCanvas');
    //设置线的颜色
    content.setStrokeStyle("#000000");
    //设置线的宽度
    content.setLineWidth(5);
    //设置线两端端点样式更加圆润
    content.setLineCap('round');
    //设置两条线连接处更加圆润
    content.setLineJoin('round');

    //--------------------------------------------------------------------





    dd.showLoading({
      content: '请稍等...'
    });

    var that = this;

    that.setData({
      list: []//请假类别
    });

    //获取人员岗位信息
    app.ajaxSubmit(app.urlApi.p_getUserInfo, "GET", null, function(res) {

      var info = res.data;
      console.log("得到人员信息为", info);
      that.setData({
        name: info.name,
        job: info.position
      });


      dd.hideLoading();

    }, true);


    //获取请假类别
    app.ajaxSubmit(app.urlApi.zidian, "GET", { type: "leave_category" }, function(res) {
      console.log("获得的请假类别是", res);
      let bb = that.data.list;
      let aa = res.data;
      console.log(aa);
      // for (var i = 0; i < aa.length; i++) { //循环遍历请假类别数组
      //   console.log(aa[i]);
      //   bb.push(aa[i].label);
      // }
      bb.push("请选择请假类别")
      aa.forEach(function(element) {
        console.log(element);
        bb.push(element.label);
      });
      console.log(bb);
      that.setData({
        list: bb
      });

    }, true, false)



  },


  //请假类别
  onChange(e) {
    console.log(e.detail.value);

    this.setData({
      Qjvalue: e.detail.value,
    });
  },


  //请假事由
  // get_textarea_value(e) {
  //   console.log(e.detail.value);
  //   this.setData({
  //     value: e.detail.value,
  //   });
  // },



  //是否补班
  radioChangeSupplementary(e) {
    var that = this;
    console.log('是否补班：', e.detail.value);
    if (e.detail.value == 1) {//补班
      that.setData({
        isSpecificHidden: false,//hidden为false，显示补班时间
        ishb: true,
        reliefPerson: ""
      });
      // dd.datePicker({//补班时间的获取
      //   currentDate: "",
      //   success: (res) => {
      //     that.setData({
      //       specificTime: res.date,
      //     });
      //     // dd.alert({
      //     //   title: '确认补办时间: ' + JSON.stringify(res)
      //     // });
      //   },
      // });
    }
    else if (e.detail.value == 0) {//不补班
      this.setData({
        isSpecificHidden: true,//hidden为true，不显示补班时间
        specificTime: '',//清空补班时间
        ishb: false,
      });
    }
    console.log(this.data.specificTime);
  },


  //是否换班
  radioChangeRelief(e) {
    var that = this;
    console.log('是否换班：', e.detail.value);
    if (e.detail.value == 1) {//换班
      this.setData({
        isReliefHidden: false,//hidden为false，显示换班时间
        isbb: true,
        specificTime: ""
      });
    }
    else if (e.detail.value == 0) {//不换班
      this.setData({
        isReliefHidden: true,//hidden为true，不显示换班时间
        reliefPerson: '',//清空换班人员
        isbb: false,
      });
    }
  },




  //请假开始时间
  startDatePicker() {
    const that = this;
    console.log();
    let qjtype = that.data.Qjvalue;
    if (qjtype != 0) {
      dd.datePicker({
        currentDate: app.getLocalTime(new Date(), true),
        startDate: app.getLocalTime(new Date(), true),
        endDate: "2100-01-01",
        success: (res) => {

          let aa2 = false;

          console.log("请假的类型为", qjtype)
          let nowdate = app.getLocalTime(new Date(), true);
          if (qjtype == 4 || qjtype == 2) {
            aa2 = true;
          } else {
            let cc = app.DateMinus(nowdate, res.date);
            console.log("时间====", cc);
            if (cc >= 2) {
              aa2 = true;

            }
          }

          if (aa2 == true) {
            that.setData({
              startTime: res.date,
              isStart: true,
            });
            /******************* 如果结束时间已经存在 ******************/
            let isEndExit = this.data.isEnd;
            if (isEndExit == true) {//判断有结束
              that.setData({
                isCountDateHidden: false,//如果请假开始于结束时间都存在,则请假天数的隐藏为false，
              });
              //赋值请假天数
              let aa = app.DateMinus(res.date, that.data.endTime) + 1;
              console.log('开始时间：' + res.date);
              console.log('结束时间：' + that.data.endTime);
              if (aa < 1) {
                dd.alert({ title: '请假时间有误,请仔细查看', buttonText: '好的' });
                // dd.showToast({
                //   content: '请假时间有误,请仔细查看',
                //   duration: 2000
                // });
                setTimeout(function() {
                  dd.hideToast();
                }, 2000);
              } else {
                this.setData({
                  datenum: aa
                })
              }
            }
          } else {
            dd.alert({ title: '请提前两天请假', buttonText: '好的' });
            // dd.showToast({ content: '', duration: 2000 });
            that.setData({
              startTime: "",
            });
          }
          /*************************** **************************/
          // dd.alert({
          //   title: '请假开始时间: ' + JSON.stringify(res)
          // });
        },
      });
    } else {
      dd.alert({ title: '请先选择请假类别', buttonText: '好的' });
    }
  },

  //请假结束时间
  endDatePicker() {


    const that = this;
    console.log();
    let startTime = that.data.startTime;
    console.log(startTime);
    let qjtype = that.data.Qjvalue;
    if (qjtype != 0) {
      if (startTime != "" && startTime != null) {
        dd.datePicker({
          currentDate: app.getLocalTime(new Date(), true),
          startDate: app.getLocalTime(new Date(), true),
          endDate: "2100-01-01",
          success: (res) => {
            this.setData({
              endTime: res.date,
              isEnd: true,
            });
            //*************** 如果请假开始与结束时间都存在，则显示请假天数**************/
            let isStartExit = this.data.isStart;
            if (isStartExit == true) {//判断有开始
              this.setData({
                isCountDateHidden: false,//如果请假开始于结束时间都存在,则请假天数的隐藏为false，
              });
              //赋值请假天数
              let aa = app.DateMinus(this.data.startTime, res.date) + 1;
              console.log('开始时间：' + this.data.startTime);
              console.log('结束时间：' + res.date);
              if (aa < 1) {
                dd.alert({ title: '请假时间有误,请仔细查看', buttonText: '好的' });
                // dd.showToast({
                //   content: '请假时间有误,请仔细查看',
                //   duration: 2000,
                //   success: () => {
                //   },
                // });
                setTimeout(function() {
                  dd.hideToast();
                }, 2000);
              } else {
                this.setData({
                  datenum: aa
                })
              }
            }
            /****************************** **************************************/
            // dd.alert({
            //   title: '请假结束时间: ' + JSON.stringify(res)
            // });

            // //赋值请假天数
            // let aa = app.DateMinus(this.data.startTime, res.date) + 1;
            // if (aa < 1) {
            //   dd.showToast({
            //     content: '请假时间有误,请仔细查看',
            //     duration: 2000,
            //     success: () => {

            //     },
            //   });
            //   setTimeout(function() {
            //     dd.hideToast();
            //   }, 2000);
            // } else {
            //   this.setData({
            //     datenum: aa
            //   })
            // }



          },
        });
      } else {
        dd.alert({ title: '请先选择请假开始时间', buttonText: '好的' });
      }
    } else {
      dd.alert({ title: '请先选择请假类别', buttonText: '好的' });
    }
  },

  //提交方法
  onSubmit(e) {
    // dd.showLoading({
    //   content: '提交中请稍后...'
    // });
    const that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let leaveCategory = that.data.Qjvalue;//请假的类别
    console.log("请假类别是----", leaveCategory);
    let res = e.detail.value;
    res.leaveCategory = leaveCategory;//赋值请假类别
    res.leaveTime = "" + that.data.startTime + "到" + that.data.endTime + "";//赋值请假时间
    res.createPic = that.data.createPic;
    console.log("获得的值是----", res);
    console.log("获得的请假事由的长度为----", res.leaveReason.length);
    if (res.leaveCategory == 0) {
      dd.alert({ title: '请选择请假类别', buttonText: '好的' });
      // dd.showToast({ content: '请选择请假类别', duration: 2000 });
    } else if (res.leaveReason == "" || res.leaveReason == null) {
      dd.alert({ title: '请填写请假事由', buttonText: '好的' });
      // dd.showToast({ content: '请填写请假事由', duration: 2000 });
    } else if (res.leaveReason.length < 30) {
      dd.alert({ title: '请假事由不得小于30个字', buttonText: '好的' });
      // dd.showToast({ content: '请填写请假事由', duration: 2000 });
    } else if (that.data.startTime == "" || that.data.startTime == null || that.data.endTime == "" || that.data.endTime == null) {
      dd.alert({ title: '请选择请假时间', buttonText: '好的' });
      // dd.showToast({ content: '请选择请假时间', duration: 2000 });
    } else if (res.shiftDuty == 1 && res.supplementaryClass == 1) {
      dd.alert({ title: '换班和补班只能二选一', buttonText: '好的' });
      // dd.showToast({ content: '换班和补班只能二选一', duration: 2000 });
    } else if (res.shiftDuty == 1 && (res.shiftDutyPerson == null || res.shiftDutyPerson == "")) {
      dd.alert({ title: '请选择换班人员', buttonText: '好的' });
      // dd.showToast({ content: '请选择换班人员', duration: 2000 });
    } else if (res.supplementaryClass == 1 && (res.supplementaryClassTime == null || res.supplementaryClassTime == "")) {
      dd.alert({ title: '请选择补班时间', buttonText: '好的' });
      // dd.showToast({ content: '请选择补班时间', duration: 2000 });
    } else if (res.createPic == "" || res.createPic == null) {
      dd.alert({ title: '请签字', buttonText: '好的' });
      // dd.showToast({ content: '请签字', duration: 2000 });
    } else if (that.data.i == 1) {
      dd.alert({ title: '请勿重复提交', buttonText: '好的' });
      // dd.showToast({ content: '请勿重复提交', duration: 2000 });
    } else {
      console.log("成功");
      that.setData({
        i: 1,//判断是否重复提交,
        submitLoading: true,
      });
      dd.showLoading({
        content: '提交中请稍后...'
      });
      app.ajaxSubmit(app.urlApi.le_add, "POST", res, function(e) {//提交申请
        console.log("请假提交后返回的信息--", e)


        dd.showToast({ content: '提交成功', duration: 2000 });


        var timeOut = setTimeout(function() {
          dd.hideLoading();//隐藏加载框
          console.log("延迟调用============");
          dd.navigateBack({
            delta: 2
          })
        }, 1000)



      }, true, true);
    }







  },
  //重置方法
  //签字功能---------------------------------------------------------------------------------------开始-------------------
  onReady() {
    // 页面加载完成
    this.setData({
      is_hidden: true
    });
  },
  // onPageScroll: function (e) {
  //   console.log(e);
  //   if (e.scrollTop < 0) {
  //     dd.pageScrollTo({
  //       scrollTop: 0
  //     })
  //   }
  // },
  // 画布的触摸移动开始手势响应
  start: function(event) {
    // console.log("触摸开始", event.changedTouches[0].x)
    // console.log("触摸开始", event.changedTouches[0].y)
    //获取触摸开始的 x,y
    let point = { x: event.changedTouches[0].x, y: event.changedTouches[0].y }
    touchs.push(point)
  },
  // 画布的触摸移动手势响应
  move: function(e) {
    // console.log("移动中--x", e.touches[0].x);
    // console.log("移动中--y", e.touches[0].y);
    let point = { x: e.touches[0].x, y: e.touches[0].y }
    touchs.push(point);
    // console.log("touchs----", touchs);
    if (touchs.length >= 2) {
      this.draw(touchs)
    }
  },
  // 画布的触摸移动结束手势响应
  end: function(e) {
    //console.log("触摸结束", e);
    // console.log("画布属性--------------", content);
    //清空轨迹数组
    for (let i = 0; i < touchs.length; i++) {
      touchs.pop()
    }

  },
  // 画布的触摸取消响应
  cancel: function(e) {
    //console.log("触摸取消" + e)
  },
  // 画布的长按手势响应
  tap: function(e) {
    // console.log("长按手势" + e)
  },

  error: function(e) {
    // console.log("画布触摸错误" + e)
  },
  //绘制
  draw: function(touchs) {

    //console.log("touchs>>>>>", touchs);
    // content.clearRect(0, 0, canvasw, canvash);
    let point1 = touchs[0];
    let point2 = touchs[1];
    touchs.shift();
    // console.log("point1----", point1);
    // console.log("point2----", point2);
    //   //获得Canvas的上下文
    // content = dd.createCanvasContext('firstCanvas');
    // //设置线的颜色
    // content.setStrokeStyle("#000000");
    // //设置线的宽度
    // content.setLineWidth(5);
    // //设置线两端端点样式更加圆润
    // content.setLineCap('round');
    // //设置两条线连接处更加圆润
    // content.setLineJoin('round');


    content.moveTo(point1.x, point1.y);
    content.lineTo(point2.x, point2.y);

    content.stroke();
    content.draw(true);
    // console.log("2132132132132132132132132132132132323232321323213213----");
  },
  //清除操作
  clearClick: function() {
    //console.log("宽-------------", canvasw);
    // console.log("高--------------", canvash);
    //清除画布

    content.beginPath();
    content.clearRect(0, 0, canvasw, canvash);
    content.closePath();
    //content.fillStyle="#000000";  
    // content.beginPath();  
    // content.fillRect(0,0,canvasw,canvash);  
    // content.closePath();  

    content.draw(true);
  },
  //保存签字图片--------------------------------------------------
  saveClick: function() {
    var that = this
    dd.canvasToTempFilePath({
      canvasId: 'firstCanvas',
      success: function(res) {

        dd.showLoading({
          content: '请稍等...'
        });
        //打印图片路径
        console.log(res.filePath);
        //这里可上传图片---------------------------------------
        dd.uploadFile({
          url: app.urlApi.upload_img,
          fileType: 'image',
          fileName: 'test',
          header: {
            'Cookie': 'JSESSIONID=' + app.userinfo.jsessionid
          },
          filePath: res.filePath,
          success: (e) => {


            console.log(e);

            var cc = JSON.parse(e.data);
            if (cc.success == true) {//上传图片成功

              console.log("签字的图片地址--", cc.data.url);


              dd.hideLoading();
              //显示图片---------------------------------------------
              that.setData({
                is_hidden: true,//隐藏签字控件
                allHidden: false,//整个页面显示
                signImage: res.filePath,
                createPic: cc.data.url
              });

            } else if (cc.success == false) {//上传失败

              dd.showToast({
                type: 'fail',
                content: cc.message,
                duration: 1000
              });

            } else {
              // dd.alert({ content: re.message });
              // dd.redirectTo({
              //   url: '/page/err/err?msg=未知错误'
              // });
              dd.showToast({
                type: 'fail',
                content: "未知错误,请联系管理员",
                duration: 1000
              });
            }

          },
        });


      }
    })
  },
  //点击签字按钮
  to_qz: function() {

    this.setData({
      is_hidden: false,//显示签字控件
      allHidden: true,//整个页面隐藏
    });

  },
  //点击关闭遮罩
  closeZZ() {
    this.clearClick();
    this.setData({
      is_hidden: true,//显示签字控件
      allHidden: false,//整个页面隐藏
    });

  },
  //签字功能---------------------------------------------------------------------------------------结束-------------------




  //补班时间
  supplementaryClassDatePicker() {
    dd.datePicker({
      startDate: '1950-1-1',
      success: (res) => {
        this.setData({
          specificTime: res.date,
        });
      },
    });
  },

  // //换班时间
  // reliefDatePicker(){
  //   dd.datePicker({
  //     startDate: '1950-1-1',
  //       success: (res) => {
  //         this.setData({
  //           reliefTime: res.date,
  //         });
  //         dd.alert({
  //           title: 'datePicker response: ' + JSON.stringify(res)
  //         });
  //       },
  //   });
  // },



});
