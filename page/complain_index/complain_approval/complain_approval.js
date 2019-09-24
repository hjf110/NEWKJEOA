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

    //投诉人-------------------------------------------
    id: "",//id
    name: "",//员工姓名
    post: "",//员工岗位
    complainReason: "",//员工问责事由
    //拍照字段***************
    complainEvidencePic: [],//扩展拍照字段
    complainEvidencePicShow: [],//扩展拍照显示字段
    complainEvidenceAudio:[],//投诉人录音文件
    //signImageSQ: "",//申请人签字
    
    //申诉人-------------------------------------------
    respondent: "",//申诉人姓名
    respondentState: "",//申诉事由
    //申诉人拍照字段***************
    respondentEvidencePic: [],//扩展拍照字段
    respondentEvidencePicShow: [],//扩展拍照显示字段
    respondentEvidenceAudio: [],//申诉人录音文件
    
    //音频---------------------------------------------
    title:'',
    src:'',
    coverImgUrl:'https://s3.music.126.net/m/s/img/disc_default.png?7c9b3adc16f5485c2bfbe8a540534188',


    //审批---------------------------------------------
    yjList: "",//意见列表

    complainantName:"",//投诉人姓名
    complainantPunishStatus:"",//投诉人处罚状态
    complainantDeduction:"",//投诉人扣除分数
    complainantDeductMoney:"",//投诉人扣除工资
    respondentName:"",//被投诉人姓名
    respondentPunishStatus: "",//被投诉人处罚状态
    respondentDeduction:"",//被投诉人扣除分数
    respondentDeductMoney:"",//被投诉人扣除工资

    //显示隐藏-----------------------------------------
    zmPic1Hide: true,//是否隐藏投诉人补充照片
    lyHide1: true,
    zmPic2Hide: true,//是否隐藏申诉人补充照片
    lyHide2: true,
    zjHidden1: true,//是否隐藏投诉人质监扣分扣钱
    zjHidden2: true,//是否隐藏质监扣分扣钱
    sshide: true,//是否隐藏申诉人
    // qzHidden: false,//签字按钮的显示和影藏

    allHidden: false,//整个页面的隐藏
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
    console.log("-----------------问责督办页面");
    console.log(res);
    const thisId = res.id;
    
    let manager = dd.getBackgroundAudioManager()
      let events =  ["onPlay","onPause","onStop","onEnded","onTimeUpdate","onError","onWaiting"]
      events.forEach(item => {
        manager[item] = function(event){
          console.log('EVENT:',item, event)
        }
    });

    app.getUserPower(app.urlApi.cp_getUserPower,function(){/************************获取问责督办权限*************************/

      console.log("问责督办权限-----",app.userinfo.arr[0]);
      console.log("问责督办登陆姓名--",app.userinfo.name);
      var qx = app.userinfo.arr[0];

      //赋值操作********************************************************************************************************************开始********************************
      app.ajaxSubmit(app.urlApi.cp_add_select, "GET", { id: thisId }, function(e) {//获得单条记录内容
        console.log("获得的单条记录内容为-------", e);
        var infoList = e.data;
        console.log("infoList-------",infoList);

        //赋值
        that.setData({
          id: infoList.id,//赋值id
          name: infoList.createUser.loginName,//赋值姓名
          post: infoList.post,//赋值岗位
          complainReason: infoList.complainReason,//赋值问责事由
          respondent: infoList.respondentUser.loginName,//赋值被投诉人姓名
          respondentState: infoList.respondentState,//赋值申诉说明
          //signImageSQ: app.urlApi.url_http + infoList.resignCreatePic,//申请人签字
          docno: infoList.docno,
        });
        //投诉人扩展照片有
        if (infoList.complainEvidencePic != null && infoList.complainEvidencePic != "") {
          that.setData({
            complainEvidencePic: infoList.complainEvidencePic.split(','),
            complainEvidencePicShow: app.getimgUrl(infoList.complainEvidencePic),
            zmPic1Hide: false,//显示相关证明照片部分
          })
        }else{
          that.setData({
            zmPic1Hide: true,//隐藏相关证明照片部分
          })
        }
        //投诉人上传音频有
        if (infoList.complainEvidenceAudio != null && infoList.complainEvidenceAudio != "" &&  infoList.complainEvidenceAudio != undefined) {
          that.setData({
            complainEvidenceAudio: app.getimgUrl(infoList.complainEvidenceAudio),
            title: infoList.createUser.loginName+"问责.mp3",
            lyHide1: false,//显示播放录音按钮
          })
        }else{
          that.setData({
            lyHide1: true,//隐藏播放录音按钮
          })
        }
        //申诉人申诉说明有
        if (infoList.respondentState != null && infoList.respondentState != "") {
          that.setData({
            respondentState: infoList.respondentState,//赋值申诉说明
            sshide: false,//显示申诉说明
          })
        }else{
          that.setData({
            sshide: true,//隐藏显示申诉说明
          })
        }
        //申诉人扩展照片有
        if (infoList.respondentEvidencePic != null && infoList.respondentEvidencePic != "") {
          that.setData({
            respondentEvidencePic: infoList.respondentEvidencePic.split(','),
            respondentEvidencePicShow: app.getimgUrl(infoList.respondentEvidencePic),
            zmPic2Hide: false,//显示相关证明照片部分
          })
        }else{
          that.setData({
            zmPic2Hide: true,//隐藏相关证明照片部分
          })
        }
        //申诉人上传音频有
        if (infoList.respondentEvidenceAudio != null && infoList.respondentEvidenceAudio != "" &&  infoList.respondentEvidenceAudio != undefined) {
          that.setData({
            respondentEvidenceAudio: app.getimgUrl(infoList.respondentEvidenceAudio),
            title:  infoList.respondentUser.loginName+"申诉.mp3",
            lyHide2: false,//显示播放录音按钮
          })
        }else{
          that.setData({
            lyHide2: true,//隐藏播放录音按钮
          })
        }
        
        //质监扣分扣钱显示--------------------------------------------------------------------------------------------
        //console.log("qx.nodeName,penalizedPersonUser.loginName",qx.nodeName,infoList.penalizedPersonUser.loginName)
        //-----投诉人
        if( infoList.complainantPunishStatus == true){
          that.setData({
            zjHidden1: false,//显示质监扣分扣钱
            complainantName: infoList.createUser.loginName,
            complainantDeduction: infoList.complainantDeduction,//扣分
            complainantDeductMoney: infoList.complainantDeductMoney,//扣钱
          })
        }else{
          that.setData({
            zjHidden1: true,//隐藏质监扣分扣钱
          })
        }
        //-----被投诉人
        if( infoList.respondentPunishStatus == true){
          that.setData({
            zjHidden2: false,//显示质监扣分扣钱
            respondentName: infoList.respondentUser.loginName,
            respondentDeduction: infoList.respondentDeduction,//扣分
            respondentDeductMoney: infoList.respondentDeductMoney,//扣钱
          })
        }else{
          that.setData({
            zjHidden2: true,//隐藏质监扣分扣钱
          })
        }

          
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

        //赋值审批意见*************************************************************质监/申诉人/经理
        let ylist = [];
        let list2 = infoList.dingFlowNodes;
        console.log("数组长度", list2.length);
        if (list2.length > 0) {//说明有审批可以赋值
          for (let i = 0; i < list2.length; i++) {
            console.log("进来了");
            console.log("数据-----", list2[i]);
            if (list2[i].node == 2) {
              list2[i].name = "质监部审批意见";
            } else if (list2[i].node == 3) {
              list2[i].name = "总经办审批意见";
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
          
        console.log("节点---",node);
        console.log("当前节点信息---",runType.currentNode);
        console.log("当前工位信息---",station);
          
        // if (runType.currentNode == 2 && node == 2){
        //   if(runType.status == -1 ){
        //     console.log("进入了质监部");
        //     that.setData({
        //       islook: false,//是操作不是查看
        //       /*sjhide: true,//隐藏允许离职时间*/
        //       yjhide: false,//不隐藏意见框
        //       tjhide: false,//不隐藏提交按钮
        //       sphide: true,//隐藏审批按钮
        //       toback: true,//隐藏返回按钮
        //     });
        //   }
        //   else if(runType.status == 0 ){
        //     console.log("直属部门已处理");
        //     that.setData({
        //       islook: true,//是查看
        //       /*sjhide: false,//不隐藏允许离开时间*/
        //       yjhide: true,//隐藏意见框
        //       tjhide: true,//隐藏提交按钮
        //       sphide: true,//隐藏审批按钮
        //       toback: false,//不隐藏返回按钮
        //     });
        //   }
        // }

          
          // if (station == 1 || station == 2) {//申请人进入
          //   that.setData({//这个状态表示属于查看页面
          //     islook: true,
          //     toback: false,
          //   });
          // }


          if (runType.currentNode == -1) {//流程结束
            that.setData({//这个状态表示属于查看页面
              islook: true,//是查看
              toback: false,//不隐藏返回按钮
            });
          }
          dd.hideLoading();
        }, true,false);
        //赋值操作********************************************************************************************************************结束********************************

    });

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

  start(res) {
    let src = res.currentTarget.dataset['src'];

    console.log(src);

    let manager = dd.getBackgroundAudioManager()
    manager.title = this.data.title
    manager.coverImgUrl = this.data.coverImgUrl
    manager.src = src
  },
  // start2() {
  //   let manager = dd.getBackgroundAudioManager()
  //   manager.title = this.data.title
  //   manager.coverImgUrl = this.data.coverImgUrl
  //   manager.src = this.data.src
  // },

  go_back() {
    let aa = this.data.station;
    if (aa == 1) {
      // 在three页面内 navigateBack，将返回one页面
      dd.navigateBack({
        delta: 1
      })
    } else {
      dd.redirectTo({
        url: '/page/complain_index/complain_index'
      });
    }
  },


});
