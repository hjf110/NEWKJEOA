let app = getApp();


//-------------------------------
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
//----------------------------------


Page({

  data: {

    type: 1,//1是车管进入,2是指挥中心,3是财务,4是质监
    submitLoading: false,


    station: 0,//判断是否是通过通知点进来的
    i: 0,//点击状态0为未点击,1为已点击
    docno: "",//流程序号

    id: "",//id
    name: "",//员工姓名-
    post: "",//员工岗位-
    mobile: "",//员工电话
    licensePlate: "",//自车牌照
    accidentLocation: "",//车辆地点
    customerUnit:"",//客户单位
    carPanoramaPic: [],//事故车全景照片
    carPanoramaPicShow: [],//事故车全景照片显示字段
    carProblemPic: [],//事故车受损部位照片
    carProblemPicShow: [],//事故车受损部位照片显示字段

    approvalOpinion: "",//审批意见
    yjList: "",//意见列表

    callHidden: true,//是否隐藏拨号按钮

    vmIns: '',//车管
    taskStatus: '',//车管是否点击了任务继续或任务取消
    controlStatus: '', //调度知晓状态
    payStatus: '', //财务状态



    vmStaffKpi: "", //技师KPI扣分
    vmStaffDeductionMoney: "", //技师处罚金额
    vmStaffPayRatio: "", //技师承担赔付比例
    vmStaffPayMoney: "", //技师赔付金额








    yjhide: true,//是否隐藏意见输入框
    sphide: true,//是否隐藏审批按钮
    toback: true,//是否影藏返回按钮
    ddhide: true,//是否隐藏调度按钮

    allHidden: false,//整个页面的隐藏
    is_hidden: false,//签字控件的显示隐藏
    islook: false,//是否是查看操作
  },


  onLoad(res) {
    var that = this;


    dd.showLoading({
      content: '请稍等...',
    });
    console.log("-----------------自车问题审批页面");
    console.log(res);
    const thisId = res.id;

    app.getUserPower(app.urlApi.oac_getUserPower, function() {/************************获取辞职权限*************************/
      console.log("自车问题权限-----", app.userinfo.arr[0]);
      //赋值操作********************************************************************************************************************开始********************************
      app.ajaxSubmit(app.urlApi.oac_add_select, "GET", { id: thisId }, function(e) {//获得单条记录内容
        console.log("获得的单条记录内容为-------", e);
        var infoList = e.data;
        console.log("infoList-------", infoList);
        //赋值
        that.setData({
          id: infoList.id,//赋值id
          name: infoList.createUser.loginName,//赋值姓名
          post: infoList.post,//赋值岗位
          mobile: infoList.mobile,//赋值员工电话
          licensePlate: infoList.licensePlate,//自车牌照
          accidentLocation: infoList.accidentLocation,//车辆地点
          // customerUnit: infoList.customerUnit,//客户单位
          docno: infoList.docno,
          vmIns: infoList.vmIns,//车管姓名
          vmStaffKpi: infoList.vmStaffKpi, //技师KPI扣分
          vmStaffDeductionMoney: infoList.vmStaffDeductionMoney, //技师处罚金额
          vmStaffPayRatio: infoList.vmStaffPayRatio, //技师承担赔付比例
          vmStaffPayMoney: infoList.vmStaffPayMoney, //技师赔付金额
          customerUnit:infoList.customerUnit,//客户单位
        });

        //事故车全景照片有
        if (infoList.carPanoramaPic !== null && infoList.carPanoramaPic !== "") {
          that.setData({
            carPanoramaPicShow: app.getimgUrl(infoList.carPanoramaPic),
          })
        }
        //事故车受损照片有
        if (infoList.carProblemPic !== null && infoList.carProblemPic !== "") {
          that.setData({
            carProblemPicShow: app.getimgUrl(infoList.carProblemPic),
          })
        };

        if (infoList.taskStatus !== undefined && infoList.taskStatus !== "" && infoList.taskStatus !== null) {
          that.setData({
            taskStatus: infoList.taskStatus
          })
        };
        if (infoList.controlStatus !== undefined && infoList.controlStatus !== "" && infoList.controlStatus !== null) {
          that.setData({
            controlStatus: infoList.controlStatus
          })
        };
        if (infoList.payStatus !== undefined && infoList.payStatus !== "" && infoList.payStatus !== null) {
          that.setData({
            payStatus: infoList.payStatus
          })
        };


        var runType = infoList.dingFlowRun;
        console.log("dingFlowRun------", runType);
        var info = app.userinfo.arr;
        let node;
        let station;
        for (let i = 0; i < info.length; i++) {
          if (info[i].docno == that.data.docno) {
            node = info[i].nodeNum;
            station = info[i].station;
          }
        }
        console.log("info-------", info);

        //赋值审批意见*************************************************************
        let ylist = [];
        let list2 = infoList.dingFlowNodes;
        console.log("数组长度", list2.length);
        if (list2.length > 0) {//说明有审批可以赋值
          for (let i = 0; i < 1; i++) {
            console.log("进来了");
            console.log("数据-----", list2[i]);
            if (list2[i].node == 2) {
              list2[i].name = "车 管 部 审 批";




            } else if (list2[i].node == 3) {
              list2[i].name = "指 挥 中 心 审 批";



            }


            list2[i].time = app.getLocalTime(list2[i].approvalTime);
            console.log("数据-----", list2[i]);
            if (list2[i].approvalStatus != -1) {
              ylist.push(list2[i]);//添加入新的数组
            }
          }
          that.setData({
            yjList: ylist
          });
          console.log(that.data.yjList);
          console.log("进来了");
        }

        console.log("节点---", node);
        console.log("当前节点信息---", runType.currentNode);
        console.log("当前工位信息---", station);


        let peopleType;
        if (station == 3) {//说明是车管进入
          peopleType = 1;
        } else if (station == 20) {//说明是调度进入
          peopleType = 2;
        } else if (station == 8) {//说明是财务进入
          peopleType = 3;
        } else {//其它都是查看
          peopleType = 4;
        }

        //  赋值角色
        that.setData({
          type: peopleType
        })














        dd.hideLoading();
      }, true);
      //赋值操作********************************************************************************************************************结束********************************

      // }, true, false)

    });
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
      approvalOpinion: val,
    })
    console.log("审批意见为--", val);
  },

  callUser() {
    var that = this;
    dd.showCallMenu({
      phoneNumber: that.data.mobile, // 期望拨打的电话号码
      code: '+86', // 国家代号，中国是+86
      showDingCall: true, // 是否显示钉钉电话
      success: function(res) {
      },
      fail: function(err) {
        dd.alert({ title: '无法呼叫该用户', buttonText: '好的' });
      }
    });
  },


  //车管点击了任务继续
  yes_ty() {
    console.log("车管点击了任务继续");
    this.submit(true);
  },
  //车管点击了任务取消
  no_ty() {
    console.log("车管点击了任务取消");
    this.submit(false);
  },
  //调度知晓了
  yes_dd() {
    var that = this;
    console.log("调度员点击了知晓");
    app.ajaxSubmit(app.urlApi.oac_dd_ok, "GET", { id: that.data.id}, (res, r) => {

      console.log("存入的数据", res);
      if (r) {
        dd.hideLoading();
        dd.showToast({
          type: 'success',
          content: '操作成功',
          duration: 3000
        });
        dd.redirectTo({
          url: '/page/carAccidentOld/carAccidentOld'
        })
        that.setData({
          submitLoading: false,
        });
        // setTimeout(function() {
        //   dd.hideLoading();
        //   console.log("调用延迟");
        //   dd.navigateBack({//页面跳转回
        //     delta: 2,
        //   });
        // }, 1000);
      } else {
        dd.hideLoading();
        that.setData({
          submitLoading: false,
        });
      }


    }, true, false);








  },


  submit(type) {
    var that = this;
    console.log('form发生了submit事件', type);
    var info = app.userinfo.arr;
    let node;
    let station;
    for (let i = 0; i < info.length; i++) {
      if (info[i].docno == that.data.docno) {
        node = info[i].nodeNum;
        station = info[i].station;
      }
    }

    // let yj = that.data.approvalOpinion;//得到意见
    // let i = this.data.i;//得到是否点击的状态

    console.log("经理同意的提交");
    // if (yj == "" || yj == null) {
    //   dd.alert({ title: '请输入审批意见', buttonText: '好的' });
    // } else if (yj.length < 30) {
    //   dd.alert({ title: '审批意见不得小与30个字', buttonText: '好的' });
    // } else if (i == 1) {
    //   dd.alert({ title: '已提交,请勿重复提交', buttonText: '好的' });
    // }
    // else {
    that.setData({
      submitLoading: true
    });
    dd.showLoading({
      content: '数据提交中,请稍后...',
      delay: 1000,
    });
    app.ajaxSubmit(app.urlApi.oac_vm_ok, "GET", { id: that.data.id, ins: type }, (res, r) => {

      console.log("存入的数据", res);
      if (r) {
        dd.hideLoading();
        dd.showToast({
          type: 'success',
          content: '操作成功',
          duration: 3000
        });
        dd.redirectTo({
          url: '/page/carAccidentOld/carAccidentOld'
        })
        that.setData({
          submitLoading: false,
        });
        // setTimeout(function() {
        //   dd.hideLoading();
        //   console.log("调用延迟");
        //   dd.navigateBack({//页面跳转回
        //     delta: 2,
        //   });
        // }, 1000);
      } else {
        dd.hideLoading();
        that.setData({
          submitLoading: false,
        });
      }


    }, true, false);
    // }
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
        url: '/page/carAccidentOld/carAccidentOld'
      });
    }
  },

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


});
