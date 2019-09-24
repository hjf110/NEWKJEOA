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
    station: 0,//判断是否是通过通知点进来的
    i: 0,//点击状态0为未点击,1为已点击
    docno: "",//流程序号

    id: "",//id
    name: "",//员工姓名-
    post: "",//员工岗位-
    hiredate: "",//员工入职时间-
    workingSeniority: "",//员工工作年限-
    resignCategory: "",//离职类别-
    resignReason: "",//离职事由
    resignApplyTime: "",//申请的离职时间
    signImageSQ: "",//申请人签字
   
    resignTime: "",//允许离职时间
    approvalOpinion: "",//审批意见
    yjList: "",//意见列表

    count: 0,//点击同意次数
    // createPic: "",//签字照片
    // signImage: "",//签字显示照片
    
    allHidden: false,//整个页面的隐藏
    is_hidden: false,//签字控件的显示隐藏
    // qzHidden: false,//签字按钮的显示和影藏

    txsjhide: true,//是否隐藏填写允许离职时间
    cksjhide: true,//是否隐藏查看允许离职时间
    yjhide: true,//是否隐藏意见输入框
    tjhide: true,//是否隐藏提交按钮
    sphide: true,//是否隐藏审批按钮
    toback: true,//是否影藏返回按钮

    islook: false,//是否是查看操作
  },


  onLoad(res) {
    var that = this;

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
      content:'请稍等...',
    });
    console.log("-----------------离职审批页面");
    console.log(res);

    
    /*if (res.type == 1) {
      that.setData({
        islook: true,
        toback: false,
      });
    }
    that.setData({
      yjhide: true,//意见框和同意不同意的按钮隐藏
    });
    console.log("res.type",res.type);
    if (res.station == 1) {
      that.setData({
        station: 1,
      });
    }*/


    const thisId = res.id;
    app.getUserPower(app.urlApi.re_getUserPower,function(){/************************获取辞职权限*************************/

      console.log("辞职权限-----",app.userinfo.arr[0]);
      /*if(app.userinfo.arr[0].nodeNum == 1){//权限为申请人
        that.setData({
          islook: true,
          toback: false,
        });
      }
      else if(app.userinfo.arr[0].nodeNum == 2){//权限为直属
        that.setData({
          islook: true,
          toback: false,
        });
      }else if(app.userinfo.arr[0].nodeNum == 3){//权限为经理或者观察
        that.setData({
          islook: true,
          toback: false,
        });
      }*/

      app.ajaxSubmit(app.urlApi.zidian,"GET",{ type: "resign_category" }, function(e1){
        console.log("获得的请假类别是", e1);


        var reList = e1.data;
        console.log("得到的请假类别-------", reList);

        //赋值操作********************************************************************************************************************开始********************************
        app.ajaxSubmit(app.urlApi.re_add_select, "GET", { id: thisId }, function(e) {//获得单条记录内容
          console.log("获得的单条记录内容为-------", e);
          var infoList = e.data;
          console.log("infoList-------",infoList);
          let resonapplytime = app.getLocalTime(infoList.resignApplyTime,true);
          let hiretime = app.getLocalTime(infoList.hiredate,true);
          let resigntime = app.getLocalTime(infoList.resignTime,true);
          console.log("离职申请时间-------",resonapplytime);
          //赋值
          that.setData({
            id: infoList.id,//赋值id
            name: infoList.createUser.loginName,//赋值姓名
            post: infoList.post,//赋值岗位
            hiredate: hiretime,//入职时间
            workingSeniority: infoList.workingSeniority,//工作年限
            resignApplyTime: resonapplytime,//赋值申请请假时间
            resignReason: infoList.resignReason,//赋值请假事由
            signImageSQ: app.urlApi.url_http + infoList.resignCreatePic,//申请人签字
            resignTime: resigntime,//赋值允许离职时间
            docno: infoList.docno,
          });


          //赋值离职类别
          reList.forEach(function(element) {
            if (element.value == infoList.resignCategory) {
              that.setData({
                resignCategory: element.label
              });
            }
          });
          console.log("得到的离职类别是-------", that.data.resignCategory);

          
          var runType = infoList.dingFlowRun;
          console.log("dingFlowRun------",runType);

          var info = app.userinfo.arr;
          let node;
          let station;
          for (let i = 0; i < info.length; i++) {
            if (info[i].docno == that.data.docno) {
              node = info[i].nodeNum;
              station = info[i].station;
            }
          }
          console.log("info-------",info);

          //赋值审批意见*************************************************************
          let ylist = [];
          let list2 = infoList.dingFlowNodes;
          console.log("数组长度", list2.length);
          if( node == 1){
            if (list2.length > 1) {//说明有审批可以赋值
              for (let i = 0; i < list2.length; i++) {
                console.log("进来了");
                console.log("数据-----", list2[i]);
                if (list2[i].node == 2) {
                  list2[i].name = "直属部门审批";
                } else if (list2[i].node == 3) {
                  list2[i].name = "总 经 理 审 批";
                }
                if (list2[i].node == node && list2[i].approvalStatus != -1) {
                  that.setData({//这个状态表示属于查看页面
                    islook: true,
                    toback: false,
                  });
                }
                if(list2[i].node == 3 && list2[i].station == 16 && list2[i].approvalStatus == 0){//经理同意了
                    that.setData({
                      cksjhide: false,//不隐藏时间
                    })
                  }
                  else if(list2[i].node == 3 && list2[i].station == 16 && list2[i].approvalStatus == 1){//经理不同意
                    that.setData({
                      cksjhide: true,//隐藏时间
                      resignTime: "",
                    })
                  }
                list2[i].time = app.getLocalTime(list2[i].approvalTime);
                console.log("数据-----", list2[i]);
                if(list2[i].approvalStatus != -1 && list2[i].node != 2){
                  ylist.push(list2[i]);//添加入新的数组
                }
                /*if (list2[i].approvalStatus != -1 && list2[i].node != 5) {
                  ylist.push(list2[i]);//添加入新的数组
                }*/
              }
              that.setData({
                yjList: ylist,
              });
              console.log("结束了");
            }
          }
          else{
            if (list2.length > 1) {//说明有审批可以赋值
              for (let i = 0; i < list2.length; i++) {
                console.log("进来了");
                console.log("数据-----", list2[i]);
                if (list2[i].node == 2) {
                  list2[i].name = "直属部门审批";
                } else if (list2[i].node == 3) {
                  list2[i].name = "总 经 理 审 批";
                }
                if (list2[i].node == node && list2[i].approvalStatus != -1) {
                  that.setData({//这个状态表示属于查看页面
                    islook: true,
                    toback: false,
                  });
                }
                if(list2[i].node == 3 && list2[i].station == 16 && list2[i].approvalStatus == 0){//经理同意了
                  that.setData({
                    cksjhide: false,//不隐藏时间
                  })
                }
                else if(list2[i].node == 3 && list2[i].station == 16 && list2[i].approvalStatus == 1){//经理不同意
                  that.setData({
                    cksjhide: true,//隐藏时间
                    resignTime: "",
                  })
                }
                list2[i].time = app.getLocalTime(list2[i].approvalTime);
                console.log("数据-----", list2[i]);
                if (list2[i].approvalStatus != -1 && list2[i].node != 5) {
                  ylist.push(list2[i]);//添加入新的数组
                }
              }
              that.setData({
                yjList: ylist,
              });
              console.log("结束了");
            }
          }
          
          console.log("节点---",node);
          console.log("当前节点信息---",runType.currentNode);
          console.log("当前工位信息---",station);
          
          if (runType.currentNode == 2 && node == 2){
            if(runType.status == -1 ){
              console.log("进入了直属部门处理");
              that.setData({
                islook: false,//是操作不是查看
                /*sjhide: true,//隐藏允许离职时间*/
                yjhide: false,//不隐藏意见框
                tjhide: false,//不隐藏提交按钮
                sphide: true,//隐藏审批按钮
                toback: true,//隐藏返回按钮
              });
            }
            else if(runType.status == 0 ){
              console.log("直属部门已处理");
              that.setData({
                islook: true,//是查看
                /*sjhide: false,//不隐藏允许离开时间*/
                yjhide: true,//隐藏意见框
                tjhide: true,//隐藏提交按钮
                sphide: true,//隐藏审批按钮
                toback: false,//不隐藏返回按钮
              });
            }
          }

          if (runType.currentNode == 3 && node == 3 && station == 16){
            if(runType.status == -1 ){
              console.log("进入了经理处理");
              that.setData({
                islook: false,//是操作不是查看
                /*sjhide: false,//不隐藏允许离开时间*/
                yjhide: false,//不隐藏意见框
                tjhide: true,//隐藏提交按钮
                sphide: false,//不隐藏审批按钮
                toback: true,//隐藏返回按钮
              });
            }
            else if(runType.status == 0 ){
              console.log("经理已同意");
              that.setData({
                islook: true,//是查看
                /*sjhide: false,//不隐藏允许离开时间*/
                yjhide: true,//隐藏意见框
                tjhide: true,//隐藏提交按钮
                sphide: true,//隐藏审批按钮
                toback: false,//不隐藏返回按钮
              });
            }
            else if(runType.status == 1 ){
              console.log("经理不同意");
              that.setData({
                islook: true,//是查看
                /*sjhide: false,//不隐藏允许离开时间*/
                yjhide: true,//隐藏意见框
                tjhide: true,//隐藏提交按钮
                sphide: true,//隐藏审批按钮
                toback: false,//不隐藏返回按钮
              });
            }
          }
          if (runType.currentNode == 1 ){//申请人进入
            that.setData({
              islook: true,//是查看
              yjhide: true,//隐藏意见框
              tjhide: true,//隐藏提交按钮
              sphide: true,//隐藏审批按钮
              toback: false,//不隐藏返回按钮
            });
          }
          
          // if (station == 1 || station == 2) {//申请人进入
          //   that.setData({//这个状态表示属于查看页面
          //     islook: true,
          //     toback: false,
          //   });
          // }


          if (runType.currentNode == -1) {//流程结束
            that.setData({//这个状态表示属于查看页面
              islook: true,//是查看
              yjhide: true,//隐藏意见框
              tjhide: true,//隐藏提交按钮
              sphide: true,//隐藏审批按钮
              toback: false,//不隐藏返回按钮
            });
          }
          dd.hideLoading();
        }, true);
        //赋值操作********************************************************************************************************************结束********************************

      },true,false);

    });

  },

  //获取允许离职时间
  resignDatePicker(e){
    var that = this;
    dd.datePicker({
      currentDate: '',
      success: (res) => {
        that.setData({
          resignTime: res.date,
        });
      }
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

  //直属部门点击了提交
  zs_tj() {
    this.submit1(true);
  },
  //经理同意了
  yes_ty() {
    var that = this;
    console.log("经理点击了同意");
    var i = that.data.count;
    console.log("初始的count为",i);
    if(i == 1){
      this.submit(true);
      // console.log('form发生了submit事件，携带数据为：');
    }
    else if(i == 0){
      that.setData({
        txsjhide: false,//不隐藏时间
        count: 1,
        resignTime: "",
      });
      dd.alert({ title: '请选择允许员工离开的时间', buttonText: '好的' });
      console.log("点击一次同意之后的count为",that.data.count);
    }
    
  },
  //经理不同意
  no_ty() {
    var that = this;
    console.log("经理点了不同意");
    that.setData({
        txsjhide: true,//隐藏时间
        resignTime: "",
      });
    this.submit(false);
    // dd.alert({ title: 'You click reset' });
  },
  

  submit(type){
    var that = this;
    console.log('form发生了submit事件',type);
    var info = app.userinfo.arr;
    let node;
    let station;
    for (let i = 0; i < info.length; i++) {
      if (info[i].docno == that.data.docno) {
        node = info[i].nodeNum;
        station = info[i].station;
      }
    }
    
    let yj = that.data.approvalOpinion;//得到意见
    let i = this.data.i;//得到是否点击的状态

    if( type == true ){
      console.log("经理同意的提交");
      let sj = app.getLocalTime(that.data.resignTime,true);//得到时间
      console.log("选择的允许离开时间为--",sj);
      if (yj == "" || yj == null) {
        dd.alert({ title: '请输入审批意见', buttonText: '好的' });
      } else if (yj.length < 30) {
        dd.alert({ title: '审批意见不得小与30个字', buttonText: '好的' });
      } else if(sj == "" || sj == null){
        dd.alert({ title: '请选择允许员工离开的时间', buttonText: '好的' });
      } else if (i == 1) {
        dd.alert({ title: '已提交,请勿重复提交', buttonText: '好的' });
      }
      else {
        that.setData({
          i: 1
        });
        dd.showLoading({
          content: '数据提交中,请稍后...',
          delay: 1000,
        });
        app.ajaxSubmit(app.urlApi.re_apply + "?applyType="+type + "&node="+node + "&station="+station, "POST" , { approvalOpinions: yj,resignTime: sj,id: that.data.id} , (res) =>{
          console.log("存入的数据",res);
          dd.hideLoading();
          dd.showToast({
            type: 'success',
            content: '操作成功',
            duration: 3000
          });
          // let gw = that.data.station;
          // if (gw == 1) {//申请人的工位
          //   dd.navigateBack({
          //     delta: 1
          //   })
          // } 
          // else {
            dd.redirectTo({
              url: '/page/resign_index/resign_index'
            })
          // }
        },true,true);
      }
    }
    else if( type == false ){
      console.log("经理不同意的提交");
      let sj = app.getLocalTime(that.data.resignTime);//得到时间
      console.log("选择的允许离开时间为--",sj);
      if (yj == "" || yj == null) {
        dd.alert({ title: '请输入审批意见', buttonText: '好的' });
      } else if (yj.length < 30) {
        dd.alert({ title: '审批意见不得小与30个字', buttonText: '好的' });
      } else if (i == 1) {
        dd.alert({ title: '已提交,请勿重复提交', buttonText: '好的' });
      }
      else {
        that.setData({
          i: 1
        });
        dd.showLoading({
          content: '数据提交中,请稍后...',
          delay: 1000,
        });
        app.ajaxSubmit(app.urlApi.re_apply + "?applyType="+type + "&node="+node + "&station="+station, "POST" , { approvalOpinions: yj,id: that.data.id} , (res) =>{
          console.log("存入的数据",res);
          dd.hideLoading();
          dd.showToast({
            type: 'success',
            content: '操作成功',
            duration: 3000
          });
          dd.redirectTo({
            url: '/page/resign_index/resign_index'
          })
        },true,true);
      }
    }
  },

  submit1(type){
    var that = this;
    var info = app.userinfo.arr;
    let node;
    let station;
    for (let i = 0; i < info.length; i++) {
      if (info[i].docno == that.data.docno) {
        node = info[i].nodeNum;
        station = info[i].station;
      }
    }
    that.setData({
      txsjhide: true,//隐藏时间
      resignTime: "",//清空时间
    });
    let yj = that.data.approvalOpinion;//得到意见
    let i = this.data.i;//得到是否点击的状态
    if (yj == "" || yj == null) {
      dd.alert({ title: '请输入审批意见', buttonText: '好的' });
    } else if (yj.length < 30) {
      dd.alert({ title: '审批意见不得小与30个字', buttonText: '好的' });
    } else if (i == 1) {
      dd.alert({ title: '已提交,请勿重复提交', buttonText: '好的' });
    }else {
      that.setData({
        i: 1
      });
      dd.showLoading({
        content: '数据提交中,请稍后...',
        delay: 1000,
      });
      app.ajaxSubmit(app.urlApi.re_apply + "?applyType="+type + "&node="+node + "&station="+station, "POST" , { approvalOpinions: yj, id: that.data.id} , (res) =>{
        dd.hideLoading();
        dd.showToast({
          type: 'success',
          content: '操作成功',
          duration: 3000
        });
        // let gw = that.data.station;
        // if (gw == 1) {//申请人的工位
        //   dd.navigateBack({
        //     delta: 1
        //   })
        // } 
        // else {
          dd.redirectTo({
            url: '/page/resign_index/resign_index'
          })
        // }
      },true,true);
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
        url: '/page/resign_index/resign_index'
      });
    }
  },


});
