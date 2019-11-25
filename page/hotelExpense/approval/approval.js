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

    type: "",//1是车管进入,2是指挥中心,3是财务,4是质监
    submitLoading: false,


    station: 0,//判断是否是通过通知点进来的
    i: 0,//点击状态0为未点击,1为已点击
    docno: "",//流程序号

    id: "",//id
    name: "",//员工姓名-
    post: "",//员工岗位-

    // 进入人员信息 
    pNode: "",//进入人员节点信息
    pStation: "",//进入人员工位信息


    //申请人申请信息------------------------------
    businessAddress: "",//出差地址
    businessReason: "",//出差事由
    businessTime: "",//出差时间
    reimbursementAmount: "",//报销金额


    //申请人选择的报销方式等信息---------------------------
    invoicePhoto: "",//发票照片
    invoicePhotoShow: [],//发票照片(显示)
    reimbursementType: 1,//报销方式(int)
    expressNo: "",//快递单号
    expressPhoto: "",//快递照片
    expressPhotoShow: [],//快递照片(显示)


    // 财务确认打款需要填的信息---------------------
    paymentMode: "",//打款方式(int)
    paymentAccount: "",//打款账号
    paymentPerson: "",//打款人
    paymentTime: "",//打款时间

    receiptInvoicePhoto: [],//已收发票照片

    paymentState: -1,//打款状态(int)
    expressState: -1,//快递状态(int)


    rushSend: "",//催寄次数
    rushSendTime: "",//最后催寄时间


    formStation: {
      vmApprovalStatus: -1,//车管的单据审核状态
      vmApprovalUser: "",//车管的单据审核人姓名
      vmOktime: "",//车管单据审核完成时间


      fdApprovalStatus: -1,//财务单据完成状态
      fdOktime: "",//财务单据完成时间
      fdApprovalUser: "",//财务填报人员
    },






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

    this.setData({
      station: res.station
    });
    dd.showLoading({
      content: '请稍等...',
    });
    console.log("-----------------自车问题审批页面");
    console.log(res);
    const thisId = res.id;

    app.getUserPower(app.urlApi.stay_getUserPower, function() {/************************获取辞职权限*************************/
      console.log("住宿报销流程权限-----", app.userinfo.arr[0]);
      //赋值操作********************************************************************************************************************开始********************************
      app.ajaxSubmit(app.urlApi.stay_add_select, "GET", { id: thisId }, function(e) {//获得单条记录内容
        console.log("获得的单条记录内容为-------", e);
        var infoList = e.data;
        console.log("infoList-------", infoList);
        //赋值
        that.setData({
          docno: infoList.docno,//流程编号
          id: infoList.id,//赋值id
          name: infoList.createUser.loginName,//赋值姓名
          post: infoList.post,//赋值岗位
          businessTime: infoList.businessTime,//出差时间
          businessAddress: infoList.businessAddress,//出差地址
          businessReason: infoList.businessReason,//出差事由
          reimbursementAmount:infoList.reimbursementAmount//报销金额
        });





        //报销方式
        if (infoList.reimbursementType !== undefined && infoList.reimbursementType !== "" && infoList.reimbursementType !== null) {
          that.setData({
            reimbursementType: infoList.reimbursementType
          })
        };
        //快递单号
        if (infoList.expressNo) {
          that.setData({
            expressNo: infoList.expressNo
          });
        }
        //赋值发票照片
        if (infoList.invoicePhoto) {
          that.setData({
            invoicePhoto: infoList.invoicePhoto,
            invoicePhotoShow: app.getimgUrl(infoList.invoicePhoto),
          })
        }
        //快递照片
        if (infoList.expressPhoto) {
          that.setData({
            expressPhoto: infoList.expressPhoto,
            expressPhotoShow: app.getimgUrl(infoList.expressPhoto),
          })
        };





        //打款方式
        if (infoList.paymentMode !== undefined && infoList.paymentMode !== "" && infoList.paymentMode !== null) {
          that.setData({
            paymentMode: infoList.paymentMode
          })
        };

        //打款账号
        if (infoList.paymentAccount) {
          that.setData({
            paymentAccount: infoList.paymentAccount
          });
        };

        //打款人
        if (infoList.paymentPerson) {
          that.setData({
            paymentPerson: infoList.paymentPerson
          });
        };

        //打款时间
        if (infoList.paymentTime) {
          that.setData({
            paymentTime: app.getLocalTime(infoList.paymentTime)
          });
        };




        //已收发票照片
        if (infoList.receiptInvoicePhoto) {
          that.setData({
            receiptInvoicePhoto: app.getimgUrl(infoList.receiptInvoicePhoto),
          });

          console.log("获得的已拍发票哨片----------",that.data.receiptInvoicePhoto);
        };



        //打款状态
        if (infoList.paymentState !== undefined && infoList.paymentState !== "" && infoList.paymentState !== null) {
          that.setData({
            paymentState: infoList.paymentState
          })
        };
        //快递状态
        if (infoList.expressState !== undefined && infoList.expressState !== "" && infoList.expressState !== null) {
          that.setData({
            expressState: infoList.expressState
          })
        };



        //催寄次数
        if (infoList.rushSend) {
          that.setData({
            rushSend: infoList.rushSend
          });
        };

        //最后催寄时间
        if (infoList.rushSendTime) {
          that.setData({
            rushSendTime: infoList.rushSendTime
          });
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
            console.log("node------", node);
            console.log("station------", station);
            //赋值工位和节点
            that.setData({
              pNode: node,
              pStation: station
            })
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
            let item = list2[i];
            if (list2[i].node == 2) {
              list2[i].name = "车 管 部 审 批";

              that.setData({
                "formStation.vmApprovalStatus": item.approvalStatus
              });


              if (item.approvalStatus != -1) {//说明审核人员审核过了
                that.setData({
                  "formStation.vmApprovalUser": item.approvalUser,
                  "formStation.vmOktime": app.getLocalTime(item.approvalTime, false),
                });

              }


            } else if (list2[i].node == 3) {
              list2[i].name = "财务";

              that.setData({
                "formStation.fdApprovalStatus": item.approvalStatus
              });


              if (item.approvalStatus != -1) {//说明财务人员操作过了
                that.setData({
                  "formStation.fdApprovalUser": item.approvalUser,
                  "formStation.fdOktime": app.getLocalTime(item.approvalTime, false),
                });

              }



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
        } else if (station == 1) {//说明申请人进入
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
  //获取图片
  onGetImg(imgList, type) {
    if (type == "a1") {//发票照片
      this.setData({
        invoicePhotoShow: imgList
      });
    } else if (type == "a2") {//快递照片
      this.setData({
        expressPhotoShow: imgList
      });
    }
  },
  // 更改了报销方式
  reimbursementTypeChange(e) {

    console.log("更改了报销方式----", e);
    this.setData({
      reimbursementType: e.detail.value
    });

    if (e.detail.value == 2) {//选择了现场报销,清空快递单号和照片
      this.setData({
        expressPhoto: "",
        expressNo: ""
      });
    }




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
  yes_dd(e) {
    var that = this;
    console.log("form表单", e.detail.value);
    let val = e.detail.value;
    if (!this.data.invoicePhotoShow.length > 0) {
      dd.alert({ title: '提示', content: '请拍摄发票照片', buttonText: '我知道了' });
    } else if (val.reimbursementType == 1 && !val.expressNo) {
      dd.alert({ title: '提示', content: '请填写快递单号', buttonText: '我知道了' });
    } else if (val.reimbursementType == 1 && !this.data.expressPhotoShow.length > 0) {
      dd.alert({ title: '提示', content: '请拍摄快递照片', buttonText: '我知道了' });
    } else {
      that.setData({
        submitLoading: true
      });
      dd.showLoading({
        content: '数据提交中,请稍后...',
        delay: 1000,
      });

      let valJson = {};
      valJson.id = that.data.id;//id
      valJson.reimbursementType =  val.reimbursementType;//报销类型
      valJson.invoicePhoto=  that.data.invoicePhotoShow.join(",");//发票照片
      if (val.reimbursementType == 1) {//如果是快递报销
          valJson.expressPhoto = that.data.expressPhotoShow.join(",");//快递照片
          valJson.expressNo = val.expressNo;//快递单号
      }

      app.ajaxSubmit(app.urlApi.stay_reim, "POST",valJson , (res, r) => {

        console.log("存入的数据", res);
        if (r) {
          dd.hideLoading();
          dd.showToast({
            type: 'success',
            content: '操作成功',
            duration: 3000
          });
          dd.redirectTo({
            url: '/page/hotelExpense/hotelExpense'
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


      }, true, true);


    }

  },

  //车管审批接口
  submit(type) {
    var that = this;
    console.log('form发生了submit事件', type);
    // var info = app.userinfo.arr;
    // let node;
    // let station;
    // for (let i = 0; i < info.length; i++) {
    //   if (info[i].docno == that.data.docno) {
    //     node = info[i].nodeNum;
    //     station = info[i].station;
    //   }
    // }
    console.log("经理同意的提交");

    that.setData({
      submitLoading: true
    });
    dd.showLoading({
      content: '数据提交中,请稍后...',
      delay: 1000,
    });
    app.ajaxSubmit(app.urlApi.stay_approval + "?applyType=" + type + "&node=" + that.data.pNode + "&station=" + that.data.pStation, "POST", { id: that.data.id }, (res, r) => {
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


    }, true, true);
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
        url: '/page/hotelExpense/hotelExpense'
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
