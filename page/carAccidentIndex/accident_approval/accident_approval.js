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

    carPanoramaPic: [],//事故车全景照片
    carPanoramaPicShow: [],//事故车全景照片显示字段
    carProblemPic: [],//事故车受损部位照片
    carProblemPicShow: [],//事故车受损部位照片显示字段

    approvalOpinion: "",//审批意见
    yjList: "",//意见列表

    callHidden: true,//是否隐藏拨号按钮



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

    app.getUserPower(app.urlApi.sfc_getUserPower, function() {/************************获取辞职权限*************************/
      console.log("自车问题权限-----", app.userinfo.arr[0]);
      //赋值操作********************************************************************************************************************开始********************************
      app.ajaxSubmit(app.urlApi.sfc_add_select, "GET", { id: thisId }, function(e) {//获得单条记录内容
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
        });

        //事故车全景照片有
        if (infoList.carPanoramaPic != null && infoList.carPanoramaPic != "") {
          that.setData({
            carPanoramaPicShow: app.getimgUrl(infoList.carPanoramaPic),
          })
        }
        //事故车受损照片有
        if (infoList.carProblemPic != null && infoList.carProblemPic != "") {
          that.setData({
            carProblemPicShow: app.getimgUrl(infoList.carProblemPic),
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
              list2[i].name = "业 务 员 审 批";
            } else if (list2[i].node == 3) {
              list2[i].name = "车 管 部 审 批";
            }
            if (list2[i].node == node && list2[i].approvalStatus != -1) {
              that.setData({//这个状态表示属于查看页面
                islook: true,
                toback: false,
              });
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

        if (runType.currentNode == 2 && node == 2) {
          if (runType.status == -1) {
            console.log("进入了处理");
            that.setData({
              islook: false,//是操作不是查看
              callHidden: false,
              yjhide: false,//不隐藏意见框
              sphide: false,//隐藏审批按钮
              toback: true,//隐藏返回按钮
            });
          }
          else if (runType.status == 0) {//正常处理
            console.log("业务员已处理");
            that.setData({
              islook: true,//是查看
              callHidden: false,
              yjhide: true,//隐藏意见框
              sphide: true,//隐藏审批按钮
              toback: false,//不隐藏返回按钮
            });
          }
          else if (runType.status == 1) {//驳回
            console.log("业务员已处理");
            that.setData({
              islook: true,//是查看
              callHidden: false,
              yjhide: true,//隐藏意见框
              sphide: true,//隐藏审批按钮
              toback: false,//不隐藏返回按钮
            });
          }
        }
        if (runType.currentNode == 4 && node == 4) {
          if (runType.status == 0) {
            console.log("进入了调度处理");
            that.setData({
              islook: false,//是操作不是查看
              callHidden: false,
              // yjhide: true,//隐藏意见框
              // sphide: true,//隐藏审批按钮
              ddhide: false,//不隐藏调度按钮
              toback: true,//隐藏返回按钮
            });
          }
          else if (runType.status == 1) {
            console.log("调度已处理");
            that.setData({
              islook: true,//是查看
              callHidden: false,
              // yjhide: true,//隐藏意见框
              // sphide: true,//隐藏审批按钮
              ddhide: true,//隐藏调度按钮
              toback: false,//不隐藏返回按钮
            });
          }
        }
        if (runType.currentNode == 3 && node == 3) {
          that.setData({
            islook: true,//是操作不是查看
            callHidden: false,
            yjhide: true,//不隐藏意见框
            sphide: true,//不隐藏审批按钮
            toback: false,//不隐藏返回按钮
          });
        }

        if (node == 1) {//申请人进入
          that.setData({
            islook: true,//是查看
            callHidden: true,//隐藏拨号按钮
            yjhide: true,//隐藏意见框
            sphide: true,//隐藏审批按钮
            toback: false,//不隐藏返回按钮
          });
        }

        if (runType.currentNode == -1) {//流程结束
          that.setData({//这个状态表示属于查看页面
            islook: true,//是查看
            yjhide: true,//隐藏意见框
            sphide: true,//隐藏审批按钮
            toback: false,//不隐藏返回按钮
          });
        }
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
    this.submit(true);
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
    app.ajaxSubmit(app.urlApi.sfc_vm_ok, "GET", {id: that.data.id,ins:type}, (res,r) => {
      console.log("存入的数据", res);

      if (r) {
        dd.hideLoading();
        dd.showToast({
          type: 'success',
          content: '操作成功',
          duration: 3000
        });
        dd.redirectTo({
          url: '/page/carDockIndex/carDockIndex'
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


    },true,false);
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
        url: '/page/carDockIndex/carDockIndex'
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
