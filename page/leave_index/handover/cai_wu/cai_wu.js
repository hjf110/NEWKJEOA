
const app = getApp();


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
    finish: false,//是否是完成状态判断标准为财务签过字了不允许修改
    is_hidden: false,//显示签字控件
    allHidden: false,//整个页面隐藏
    back: true,//返回按键显示

    i: 0,//是否重复提交
    submitLoad: false,//提交按钮显示loading

    s1: false,//现金照片是否有
    s2: false,//工单照片是否有
    s3: false,//财务签字是否有

    id: "",//单子id
    name: "",//员工姓名-
    post: "",//员工岗位-
    leaveCategory: "",//请假类别-
    leaveReason: "",//请假事由
    leaveTime: "",//请假时间
    leaveDays: "",//请假天数

    supplementaryClass: "",//是否补班
    supplementaryClassTime: "",//补班时间

    shiftDuty: "",//是否换班
    shiftDutyTime: "",//换班人员
    deductionShow: "",//扣分显示
    deductMoneyShow: "",//扣钱显示

    isSpecificHidden: true,//是否隐藏补班时间
    isReliefHidden: true,//是否隐藏换班人员

    approvalOpinion: "",//审批意见
    deduction: "",//扣分
    deductMoney: "",//扣钱
    kouInputHidden: "",//如果扣分扣钱有值就显示




    //现金上缴图片************************************************
    moneyList: [],//现金上缴图片数组
    moneyListShow: [],//现金上缴图片显示数组

    //工单上缴图片************************************************
    danList: [],//工单上缴图片数组
    danListShow: [],//工单上缴显示数组


    financialPic: "",//签字图片地址
    signImage: "",//签字图片显示地址
    //是否完成
    finish: false,
    time: "",//时间

  },
  onLoad(res100) {

    dd.showLoading({
      content: '请稍后'
    });




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


   


















    const that = this;
    const id = res100.id;




    that.setData({
      id: id
    });
    app.getUserPower(app.urlApi.le_getUserPower, function() {//通知点进去时先登录
      //获取请假类别

      app.ajaxSubmit(app.urlApi.zidian, "GET", { type: "leave_category" }, function(e1) {
        console.log("获得的请假类别是", e1);
        const leList = e1.data;
        console.log("得到的请假类别---", leList);

        //赋值操作********************************************************************************************************************开始********************************
        app.ajaxSubmit(app.urlApi.le_add_select, "GET", { id: id }, function(e) {//获得单条记录内容
          console.log("获得的单条记录内容为--", e);
          const infoList = e.data;


          //赋值是否补班
          if (infoList.supplementaryClass == false) {
            that.setData({
              supplementaryClass: "否"
            });
          } else {
            that.setData({
              isSpecificHidden: false,
              supplementaryClass: "是",
              supplementaryClassTime: infoList.supplementaryClassTime
            });
          }

          //赋值是否换班
          if (infoList.shiftDuty == false) {
            that.setData({
              shiftDuty: "否"
            });
          } else {
            that.setData({
              isReliefHidden: false,
              shiftDuty: "是",
              shiftDutyTime: infoList.shiftDutyTime
            });
          }


          //赋值请假事由
          leList.forEach(function(element) {//赋值请假事由
            if (element.value == infoList.leaveCategory) {
              that.setData({
                leaveCategory: element.label
              });
            }
          });
          console.log("得到的请假类别是----", that.data.leaveCategory);

          that.setData({
            id: infoList.id,//赋值id
            name: infoList.createUser.loginName,//赋值姓名
            post: infoList.post,//赋值岗位
            leaveReason: infoList.leaveReason,//赋值请假事由
            leaveTime: infoList.leaveTime,//赋值请假时间
            leaveDays: infoList.leaveDays,//赋值请假天数

          })


          //赋值审批意见*************************************************************
          let ylist = [];
          let list2 = infoList.dingFlowNodes;
          console.log("数组长度", list2.length);
          if (list2.length > 1) {//说明有审批可以赋值
            for (let i = 0; i < list2.length - 1; i++) {
              console.log("进来了");
              console.log("数据-----", list2[i]);
              if (infoList.leaveType == 1) {//如果是技师请假

                if (list2[i].node == 2) {
                  list2[i].name = "车管审批";
                } else if (list2[i].node == 3) {
                  list2[i].name = "指挥中心审批";
                }
              } else if (infoList.leaveType == 2) {//如果是行政人员请假
                if (list2[i].node == 2) {
                  list2[i].name = "直属部门审批";
                } else if (list2[i].node == 3) {
                  list2[i].name = "总经理审批";
                }
              }
              list2[i].time = app.getLocalTime(list2[i].approvalTime);
              console.log("数据-----", list2[i]);
              ylist.push(list2[i]);//添加入新的数组
            }
            that.setData({
              yjList: ylist
            });
            console.log("进来了");
          }

          //赋值财务的拍照和签字
          if (infoList.cashSurrender != null && infoList.cashSurrender != "") {//现金上缴照片有
            that.setData({
              moneyList: infoList.cashSurrender.split(','),
              moneyListShow: app.getimgUrl(infoList.cashSurrender),
              s1: true
            })
          }

          

          if (infoList.workOrder != null && infoList.workOrder != "") {//现金上缴照片有
            that.setData({
              danList: infoList.workOrder.split(','),
              danListShow: app.getimgUrl(infoList.workOrder),
              s2: true
            })
          }

          if (infoList.financialTime != null && infoList.financialTime != "") {//现金上缴照片有
            console.log("是否有财务照片----", infoList.financialPic);
            that.setData({
              signImage: app.urlApi.url_http + infoList.financialPic,
              financialPic: infoList.financialPic,
              s3: true,
              time:app.getLocalTime(infoList.financialTime)
            })
          } else {
            let time = app.getLocalTime(new Date());//赋值当前时间
            that.setData({
              time: time
            });
          }

          console.log("是否有财务照片----", that.data.s3);
          if (that.data.s3 == true) { //财务签过字了不允许修改了
            that.setData({
              finish: true,
              back: false,//返回按键显示
            });
          }


          dd.hideLoading();

        }, true);
        //赋值操作********************************************************************************************************************结束********************************



      }, true, false);


    });

  },
  //通用照片看,拍,删方法/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*//*//
  yl(res) {//图片浏览
    //var that = this;
    var idx = res.currentTarget.dataset['index'];
    // var type = res.currentTarget.dataset['type'];
    var img_List = res.currentTarget.dataset['imglist']
    // console.log("索引值", idx);
    // console.log(this.data.oil_leak_showList);
    // console.log(this.data.oil_leak_showList[idx]);
    dd.previewImage({
      current: idx,
      urls: img_List
    });
  },
  takePhoto(res) {//拍照
    console.log("成功后-----res", res);
    var that = this;
    var val_a = res.currentTarget.dataset['vala'];//照片名称数组
    var val_b = res.currentTarget.dataset['valb'];//照片显示数组
    var type = res.currentTarget.dataset['type'];//照片类型
    // console.log("成功后-----test", test);
    app.takePhoto(val_a, val_b, function(res, res2) {
      console.log("成功后-----one", res);
      console.log("成功后-----two", res2);
      var ccc = res;
      var ddd = res2;

      if (type == "a1") {//现金上缴照片
        that.setData({
          moneyList: ccc,
          moneyListShow: ddd
        });
      } else if (type == "a2") {//工单上缴照片
        that.setData({
          danList: ccc,
          danListShow: ddd
        });
      }
    },true);


    // console.log("图片地址---", this.data.coolant_height);
    // console.log("图片展示地址---", this.data.coolant_height_showList);
  },
  delect(res) {//删除
    var idx = res.currentTarget.dataset['index'];
    console.log("索引值", idx);
    var that = this;
    var imglist = res.currentTarget.dataset['vala'];//照片名称数组
    var imglist_show = res.currentTarget.dataset['valb'];//照片显示数组
    var type = res.currentTarget.dataset['type'];//照片类型

    imglist = app.del(idx, imglist);
    imglist_show = app.del(idx, imglist_show);

    if (type == "a1") {//现金上缴照片
      that.setData({
        moneyList: imglist,
        moneyListShow: imglist_show
      });
    } else if (type == "a2") {//工单上缴照片
      that.setData({
        danList: imglist,
        danListShow: imglist_show
      });
    }


    // console.log("删除后的图片数组为-------", this.data.left_front_wheel);
    // console.log("删除后的图片展示数组为-------", this.data.left_front_wheel_showList);
  },

  ///*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*//*//


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



              //显示图片---------------------------------------------
              that.setData({
                is_hidden: true,//隐藏签字控件
                allHidden: false,//整个页面显示
                signImage: res.filePath,
                financialPic: cc.data.url
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

  // 确认提交
  ok_tj() {
    const that = this;
    let res = {};//结果的json
    if (that.data.moneyList.length == 0) {
      dd.showToast({ content: '请拍摄现金上缴图片', duration: 3000 });
    } else if (that.data.danList.length == 0) {
      dd.showToast({ content: '请拍摄工单上缴图片', duration: 3000 });
    } else if (that.data.i == 1) {
      dd.showToast({ content: '已提交,请稍等', duration: 3000 });
    } else {
      that.setData({
        i: 1,
        submitLoad: true
      });
      res.cashSurrender = app.tihuan(that.data.moneyList);//现金上缴的图片
      res.workOrder = app.tihuan(that.data.danList);//工单上缴的图片
      res.financialPic = that.data.financialPic;//财务签字照片
      res.financialTime = that.data.time;//财务交接时间
      res.id = that.data.id;//单子id
      console.log(res);
      app.ajaxSubmit(app.urlApi.le_saveAndOff + "?type=save", "POST", res, (e) => {
        console.log(e);
         dd.showToast({
          content: '提交成功'
        });
        // 在three页面内 navigateBack，将返回one页面
        dd.navigateBack({
          delta: 1
        })


      }, true, true);
    }

  },
  go_back() {
    dd.navigateBack({
      delta: 1
    })
  }

});
