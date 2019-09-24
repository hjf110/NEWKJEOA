
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
    //签字功能参数***************************
    is_hidden: false,//签字控件显示和隐藏
    qzHidden: true,//点击签字按钮
    tjhide: true,//销假提交按钮
    allHidden: false,//整个页面隐藏
    isjiaojie: true,//先隐藏交接入口

    islook: false,//是否是查看操作
    toback: true,//是否显示返回按钮


    CwShow: true,//财务部分显示和隐藏
    CgShow: true,//车管部分显示和隐藏
    KzShow: true,//扩展照片部分显示和隐藏
    XjShow: true,//销假部分显示和隐藏
    isCwQr: true,//财务确认人和确认时间显示和隐藏

    isCwhave: false,//财务交接按钮显示隐藏
    isCghave: false,//车管交接按钮显示隐藏


    station: 0,//判断是否是通过通知点进来的

    yjhide: false,//意见框和同意不同意的按钮显示隐藏
    kouHidden: true,//扣分扣钱和确定按钮显示和隐藏
    i: 0,//点击状态0为未点击,1为已点击
    yjList: "",//审批意见列表

    id: "",//id
    name: "",//员工姓名-
    post: "",//员工岗位-
    leaveCategory: "",//请假类别-
    leaveReason: "",//请假事由
    leaveTime: "",//请假时间
    leaveDays: "",//请假天数
    signImage22: "",//申请人签字


    supplementaryClass: "",//是否补班
    supplementaryClassTime: "",//补班时间

    shiftDuty: "",//是否换班
    shiftDutyUser: "",//换班人员
    deductionShow: "",//扣分显示
    deductMoneyShow: "",//扣钱显示


    isSpecificHidden: true,//是否隐藏补班时间
    isReliefHidden: true,//是否隐藏换班人员
    isSchedulingStatus: true,//是否隐藏排班修改

    specific: [  //排班表是否已修改
      { name: 1, value: '是', checked: false },
      { name: 0, value: '否', checked: true },
    ],
    iszh: true,//是否是指挥中心

    approvalOpinion: "",//审批意见
    deduction: "",//扣分
    deductMoney: "",//扣钱
    schedulingStatusValue: "",
    schedulingStatus: "",//排班表是否安排

    kouInputHidden: "",//如果扣分扣钱有值就显示
    //销假******************************************
    xjHidden: true,//销假显示扣分扣钱
    claimingRemarks: "",//销假备注
    claimingPic: "",//销假签字图片
    claimingRemarks: "",//销假备注
    //车管和财务字段
    //现金上缴图片************************************************
    moneyList: [],//现金上缴图片数组
    moneyListShow: [],//现金上缴图片显示数组

    //工单上缴图片************************************************
    danList: [],//工单上缴图片数组
    danListShow: [],//工单上缴显示数组

    //车辆停放位置拍照**********************************************
    vehiclePic: [],//车辆位置拍照图片数组
    vehiclePicShow: [],//车辆位置拍照显示数组
    vehicleLocation: "",//车辆停好时的定位

    //扩展拍照字段**************************************************
    claimingSupplyPic: [],//扩展拍照字段
    claimingSupplyPicShow: [],//扩展拍照显示字段

    claimingTime: "",//销假时间
    claimingLocation: "",//销假地点
    financialTime: "",
    vehicleTime: "",
    vehicleLocation: "",
    financialPic: "",//签字图片地址
    signImage: "",//签字图片显示地址

    createPic: "",//申请人签字

    docno: "",//流程序号
  },
  onLoad(res) {
    const that = this;
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

    if (res.type == 1) {
      that.setData({
        islook: true,
        toback: false,
      });
    }
    that.setData({
      yjhide: true,//意见框和同意不同意的按钮隐藏
    });



    if (res.station == 1) {
      that.setData({
        station: 1
      });
    }



    dd.showLoading({
      content: '数据加载中请稍后...'
    });





    console.log(res);
    const thisId = res.id;
    app.getUserPower(app.urlApi.le_getUserPower, function() {//通知点进去时先登录
      //获取请假类别
      if (app.userinfo.arr[0].nodeNum == 1) {
        that.setData({
          islook: true,
          toback: false,
        });
      }

      app.ajaxSubmit(app.urlApi.zidian, "GET", { type: "leave_category" }, function(e1) {
        console.log("获得的请假类别是", e1);
        const leList = e1.data;
        console.log("得到的请假类别---", leList);

        //赋值操作********************************************************************************************************************开始********************************
        app.ajaxSubmit(app.urlApi.le_add_select, "GET", { id: thisId }, function(e) {//获得单条记录内容
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
              shiftDutyUser: infoList.shiftDutyPerson
            });
          }





          //赋值排班修改
          if (infoList.schedulingStatus == false) {
            that.setData({
              schedulingStatus: "否",
              isSchedulingStatus: false
            });
          } else if (infoList.schedulingStatus == true) {
            that.setData({
              schedulingStatus: "是",
              isSchedulingStatus: false
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
            createPic: app.urlApi.url_http + infoList.createPic,//申请人签字
            docno: infoList.docno
          })

          console.log("扣分扣钱的值为---", infoList.deduction);
          //赋值扣分扣钱
          if (infoList.deduction != null && infoList.deduction != "") {
            that.setData({
              deductionShow: infoList.deduction,//扣分显示
              deductMoneyShow: infoList.deductMoney,//扣钱显示
              xjHidden: false,
            });
            that.setData({//这个状态表示属于查看页面
              islook: true,
              toback: false,
            });
          }


          const info = app.userinfo.arr
          // console.log(app.userinfo.arr[0]);
          let node;
          let station;
          for (let i = 0; i < info.length; i++) {
            if (info[i].docno == that.data.docno) {
              node = info[i].nodeNum;
              station = info[i].station;
            }
          }




          //赋值财务确认人和确认时间
          if (infoList.financeStaff != null && infoList.financeStaff != "") {
            that.setData({
              financeStaff: infoList.financeStaff,
              financeDate: app.getLocalTime(infoList.financeDate),
              isCwQr: false
            })
          }





          //赋值审批意见*************************************************************
          let ylist = [];
          let list2 = infoList.dingFlowNodes;
          console.log("数组长度", list2.length);
          if (list2.length > 0) {//说明有审批可以赋值
            for (let i = 0; i < list2.length; i++) {
              console.log("进来了");
              console.log("数据-----", list2[i]);
              if (infoList.leaveType == 1) {//如果是技师请假
                if (list2[i].node == 2) {
                  list2[i].name = "车管审批提醒与建议";
                } else if (list2[i].node == 3) {
                  list2[i].name = "指挥中心审批提醒与建议";
                } else if (list2[i].node == 4) {
                  list2[i].name = "总经理审批提醒与建议";
                }


              } else if (infoList.leaveType == 2) {//如果是行政人员请假
                if (list2[i].node == 2) {
                  list2[i].name = "直属部门审批提醒与建议";
                } else if (list2[i].node == 3) {
                  list2[i].name = "总经理审批提醒与建议";
                }
              }


              if (list2[i].node == node && list2[i].approvalStatus != -1) {
                that.setData({//这个状态表示属于查看页面
                  islook: true,
                  toback: false,
                });
              }

              list2[i].time = app.getLocalTime(list2[i].approvalTime);
              console.log("数据-----", list2[i]);
              if (list2[i].approvalStatus != -1 && list2[i].node != 5) {
                ylist.push(list2[i]);//添加入新的数组
              }
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
              moneyListShow: app.getimgUrl(infoList.cashSurrender)

            })
          }

          if (infoList.workOrder != null && infoList.workOrder != "") {//现金上缴照片有
            that.setData({
              danList: infoList.workOrder.split(','),
              danListShow: app.getimgUrl(infoList.workOrder),
            })
          }

          if (infoList.financialTime != null && infoList.financialTime != "") {//财务财务交接时间
            console.log("是否有财务交接时间----", infoList.financialPic);
            that.setData({
              signImage: app.urlApi.url_http + infoList.financialPic,
              financialPic: infoList.financialPic,
              financialTime: app.getLocalTime(infoList.financialTime),
              CwShow: false,
              isCwhave: true
            })
          }


          if (infoList.vehiclePic != null && infoList.vehiclePic != "") {//车辆停放照片有
            that.setData({
              vehiclePic: infoList.vehiclePic.split(','),
              vehiclePicShow: app.getimgUrl(infoList.vehiclePic),
              vehicleTime: app.getLocalTime(infoList.vehicleTime),
              vehicleLocation: infoList.vehicleLocation,
              CgShow: false,
              isCghave: true
            })
          }

          if (infoList.claimingSupplyPic != null && infoList.claimingSupplyPic != "") {//扩展照片有
            that.setData({
              claimingSupplyPic: infoList.claimingSupplyPic.split(','),
              claimingSupplyPicShow: app.getimgUrl(infoList.claimingSupplyPic),
              KzShow: false
            })
          }


          if (infoList.claimingLocation != null && infoList.claimingLocation != "") {//销假有
            that.setData({
              claimingLocation: infoList.claimingLocation,//销假定位
              claimingTime: app.getLocalTime(infoList.claimingTime),//销假时间
              claimingRemarks: infoList.claimingRemarks,//销假备注
              XjShow: false
            })
          }





          //**************************************************************************************************** */
          //判断是否是质监要来填写扣分和扣钱
          const runType = infoList.dingFlowRun;//节点运转到哪一步的信息
          // console.log("权限是---------", app.userinfo.arr[0]);
          if (runType.currentNode == 5 && runType.status == -1 && node == 5) {//这个状态说明这个单子正出于质监填写中,隐藏审批意见框和同意不同意的按钮
            console.log("进了质检处理");
            console.log("infoList.claimingSupplyPic---------------", infoList.claimingSupplyPic);
            if (infoList.claimingSupplyPic == null || infoList.claimingSupplyPic == "" || infoList.claimingSupplyPic == undefined) {//扩展照片有
              console.log("没有图片");
              dd.confirm({
                title: '温馨提示',
                content: '该申请人未拍摄补充照片',
                confirmButtonText: '继续',
                cancelButtonText: '取消',
                success: (result) => {
                  console.log(result);
                  if (result.confirm) {
                    that.setData({
                      yjhide: true,//意见框和同意不同意的按钮隐藏
                      kouHidden: false,//扣分扣钱和确定按钮显示
                    });
                  } else {
                    that.setData({
                      yjhide: true,//意见框和同意不同意的按钮隐藏
                      kouHidden: true,//扣分扣钱和确定按钮显示
                      toback: false,//返回按钮显示
                    });
                  }
                },
                fail: () => {
                  console.log("fail");

                }
              });


            } else {
              console.log("有图片");
              that.setData({
                yjhide: true,//意见框和同意不同意的按钮隐藏
                kouHidden: false,//扣分扣钱和确定按钮显示
              });
            }

          } else {
            that.setData({
              yjhide: false,//意见框和同意不同意的按钮隐藏
              kouHidden: true,//扣分扣钱和确定按钮显示
            });
          }

          if (runType.currentNode == 3 && runType.status == -1 && station == 4) {//这个状态说明正出于指挥中心填写中
            console.log("进了质监");
            that.setData({  //显示排班修改
              iszh: false
            });
          }

          //显示两个交接的按钮
          if (runType.currentNode == 5 && runType.status == -1 && station == 1 && that.data.leaveDays > 3) {
            that.setData({
              isjiaojie: false,
              islook: true,
              toback: false,
            });
          }
          // if (that.data.isCwhave == true && that.data.isCghave == true) {
          //   that.setData({
          //     isjiaojie: true,
          //     islook: true,
          //     toback: false,
          //   });
          // }

          if (station == 1 || station == 2) {//申请人进入

            that.setData({//这个状态表示属于查看页面
              islook: true,
              toback: false,
            });
          }


          if (runType.currentNode == -1) {//流程结束

            that.setData({//这个状态表示属于查看页面
              islook: true,
              toback: false,
            });
          }
          dd.hideLoading();
          // if (runType.currentNode == -1 && runType.status == 0) {//这个状态说明这条单子正出于销假状态
          //   that.setData({
          //     yjhide: true,//意见框和同意不同意的按钮隐藏
          //     deductionShow:infoList.deduction,//扣分显示
          //     deductMoneyShow:infoList.deductMoney,//扣钱显示
          //     xjHidden:false,
          //     qzHidden:false,
          //   });

          // }



        }, true);
        //赋值操作********************************************************************************************************************结束********************************



      }, true, false)





    });
  },

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
    console.log("触摸开始", event.changedTouches[0].x)
    console.log("触摸开始", event.changedTouches[0].y)
    //获取触摸开始的 x,y
    let point = { x: event.changedTouches[0].x, y: event.changedTouches[0].y }
    touchs.push(point)
  },
  // 画布的触摸移动手势响应
  move: function(e) {
    console.log("移动中--x", e.touches[0].x);
    console.log("移动中--y", e.touches[0].y);
    let point = { x: e.touches[0].x, y: e.touches[0].y }
    touchs.push(point);
    console.log("touchs----", touchs);
    if (touchs.length >= 2) {
      this.draw(touchs)
    }
  },
  // 画布的触摸移动结束手势响应
  end: function(e) {
    console.log("触摸结束", e);
    console.log("画布属性--------------", content);
    //清空轨迹数组
    for (let i = 0; i < touchs.length; i++) {
      touchs.pop()
    }

  },
  // 画布的触摸取消响应
  cancel: function(e) {
    console.log("触摸取消" + e)
  },
  // 画布的长按手势响应
  tap: function(e) {
    console.log("长按手势" + e)
  },

  error: function(e) {
    console.log("画布触摸错误" + e)
  },
  //绘制
  draw: function(touchs) {

    console.log("touchs>>>>>", touchs);
    // content.clearRect(0, 0, canvasw, canvash);
    let point1 = touchs[0];
    let point2 = touchs[1];
    touchs.shift();
    console.log("point1----", point1);
    console.log("point2----", point2);
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
    console.log("2132132132132132132132132132132132323232321323213213----");
  },
  //清除操作
  clearClick: function() {
    console.log("宽-------------", canvasw);
    console.log("高--------------", canvash);
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

              console.log("图片地址--", cc.data.url);



              //显示图片---------------------------------------------
              that.setData({
                is_hidden: true,//隐藏签字控件
                allHidden: false,//整个页面显示
                qzHidden: true,//点击签字按钮
                tjhide: false,//销假提交按钮
                signImage: res.filePath
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
  //签字功能---------------------------------------------------------------------------------------结束-------------------

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


  //跳转到财务交接页面
  to_cw() {
    dd.navigateTo({ url: "/page/leave_index/handover/cai_wu/cai_wu" + "?id=" + this.data.id });
  },
  //跳转到车管交接页面
  to_cg() {
    dd.navigateTo({ url: "/page/leave_index/handover/che_guan/che_guan" + "?id=" + this.data.id });
  },

  //获取审批意见
  approvalOpinionGet(e) {
    this.setData({
      approvalOpinion: e.detail.value,
    });
  },
  //赋值审批意见
  approvalValue(e) {
    let val = e.detail.value;
    this.setData({
      approvalOpinion: val
    })
    console.log("意见为--", val);
  },
  //赋值扣分
  approvalValue1(e) {
    let val = e.detail.value;
    this.setData({
      deduction: val
    })
    console.log("扣分为--", val);
  },
  //赋值扣钱
  approvalValue2(e) {
    let val = e.detail.value;
    this.setData({
      deductMoney: val
    })
    console.log("扣钱为--", val);
  },
  radioChange: function(e) {//赋值排版修改状态
    console.log('你选择的框架是：', e.detail.value);
    this.setData({
      schedulingStatusValue: e.detail.value
    });
  },
  //质监点了提交
  zj_tj() {
    this.submit2(true);
  },
  //同意了
  yes_ty() {

    console.log("点击了同意")

    this.submit(true);
    // console.log('form发生了submit事件，携带数据为：');
  },
  //不同意
  on_ty() {

    console.log("点了不同意")
    this.submit(false);
    // dd.alert({ title: 'You click reset' });
  },
  submit(type) {
    const that = this;
    const info = app.userinfo.arr
    // console.log(app.userinfo.arr[0]);
    let node;
    let station;
    for (let i = 0; i < info.length; i++) {
      if (info[i].docno == that.data.docno) {
        node = info[i].nodeNum;
        station = info[i].station;
      }
    }
    let yj = this.data.approvalOpinion;//得到意见
    let i = this.data.i;//得到是否点击的状态
    console.log("排班表的值", that.data.schedulingStatusValue);
    if (station == 4 && (that.data.schedulingStatusValue === "" || that.data.schedulingStatusValue === null || that.data.schedulingStatusValue === 0)) {
      dd.alert({ title: '排班表必须要修改', buttonText: '好的' });
      // dd.showToast({ content: '', duration: 3000 });
    } else if (yj == "" || yj == null) {
      dd.alert({ title: '请输入审批意见', buttonText: '好的' });
      // dd.showToast({ content: '请输入审批意见', duration: 3000 });
    } else if (yj.length < 30) {
      dd.alert({ title: '审批意见不能小于30个字', buttonText: '好的' });
      // dd.showToast({ content: '请输入审批意见', duration: 3000 });
    } else if (i == 1) {
      dd.alert({ title: '已提交,请勿重复提交', buttonText: '好的' });
      // dd.showToast({ content: '已提交,请勿重复提价', duration: 3000 });
    } else {
      that.setData({
        i: 1
      });
      dd.showLoading({
        content: '数据提交中,请稍后...',
        delay: 10000
      });
      app.ajaxSubmit(app.urlApi.le_apply + "?applyType=" + type + "&node=" + node + "&station=" + station, "POST", { approvalOpinions: yj, id: that.data.id, schedulingStatus: that.data.schedulingStatusValue }, (res) => {
        dd.hideLoading();
        dd.showToast({
          type: 'success',
          content: '操作成功',
          duration: 3000
        });

        let aa = that.data.station;
        if (aa == 1) {
          // 在three页面内 navigateBack，将返回one页面
          dd.navigateBack({
            delta: 1
          })
        } else {
          dd.redirectTo({
            url: '/page/leave_index/leave_index'
          })
        }


      }, true, true);
    }
  },
  submit2(type) {
    const that = this;
    const info = app.userinfo.arr;
    console.log(info);
    // console.log(app.userinfo.arr[0]);
    let node;
    let station;
    for (let i = 0; i < info.length; i++) {
      if (info[i].docno == that.data.docno) {
        node = info[i].nodeNum;
        station = info[i].station;
      }
    }
    let yj = this.data.approvalOpinion;//得到意见
    let i = this.data.i;//得到是否点击的状态
    if (that.data.deduction == "" || that.data.deduction == null) {
      dd.showToast({ content: '请输入扣多少分', duration: 3000 });
    } else if (that.data.deductMoney == "" || that.data.deductMoney == null) {
      dd.showToast({ content: '请输入扣多少钱', duration: 3000 });
    } else if (i == 1) {
      dd.showToast({ content: '提交中,请勿重复提交', duration: 3000 });
    } else {
      that.setData({
        i: 1
      });
      dd.showLoading({
        content: '数据提交中,请稍后...',
        delay: 10000
      });
      app.ajaxSubmit(app.urlApi.le_apply + "?applyType=" + type + "&node=" + node + "&station=" + station, "POST",
        {
          id: that.data.id,
          deduction: that.data.deduction,
          deductMoney: that.data.deductMoney
        },
        (res) => {
          dd.hideLoading();
          dd.showToast({
            type: 'success',
            content: '操作成功',
            duration: 3000
          });
          let aa = this.data.station;
          if (aa == 1) {
            // 在three页面内 navigateBack，将返回one页面
            dd.navigateBack({
              delta: 1
            })
          } else {
            dd.redirectTo({
              url: '/page/leave_index/leave_index'
            })
          }
        }, true, true);
    }
  },
  go_back() {
    let aa = this.data.station;
    if (aa == 1) {
      // 在three页面内 navigateBack，将返回one页面
      dd.navigateBack({
        delta: 1
      })
    } else {
      dd.redirectTo({
        url: '/page/leave_index/leave_index'
      })
    }

  }


});
