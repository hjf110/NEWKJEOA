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

    //问责人----------------------------------
    id: "",//id
    name: "",//员工姓名
    post: "",//员工岗位
    complainReason: "",//员工问责事由
    //signImageSQ: "",//申请人签字
    //问责人拍照字段***************
    complainEvidencePic: [],//扩展拍照字段
    complainEvidencePicShow: [],//扩展拍照显示字段
    complainEvidenceAudio: "",//申请人上传音频
   
    // //审批
    // yjList: "",//意见列表
    
    //申诉人---------------------------------
    respondent: "",//申诉人姓名
    respondentState: "",//申诉事由
    //申诉人拍照字段***************
    respondentEvidencePic: [],//扩展拍照字段
    respondentEvidencePicShow: [],//扩展拍照显示字段
    respondentStatus: false,//申诉人是否已经处理
    count: 0,//点击申诉的次数

    //音频------------------------------------
    title:'',
    src:'',
    coverImgUrl:'https://s3.music.126.net/m/s/img/disc_default.png?7c9b3adc16f5485c2bfbe8a540534188',
    //count: 0,//点击同意次数

    complainVm:"",///质监部人员名称
    
    //页面的显示隐藏---------------------------
    allHidden: false,//整个页面的隐藏
    is_hidden: false,//签字控件的显示隐藏

    zmPic1Hide: true,
    lyHide: true,//问责人录音
    zmPic2Hide: true,
    ytsmhide: true,//隐藏已经填写的申诉说明框
    isSsuHide: true,//隐藏申诉需要填写的部分的部分
    sshide: false,//是否隐藏申诉说明输入框，拍照，及申诉按钮
    toback: true,//是否隐藏申诉显示框，照片，及返回按钮

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
    console.log("-----------------问责督办申诉页面");
    console.log(res);
    const thisId = res.id;

    
    let manager = dd.getBackgroundAudioManager()
      let events =  ["onPlay","onPause","onStop","onEnded","onTimeUpdate","onError","onWaiting"]
      events.forEach(item => {
        manager[item] = function(event){
          console.log('EVENT:',item, event)
        }
    });

    app.ajaxSubmit(app.urlApi.zidian, "GET", { type: "complain_vm" } , function(res){
      console.log("质监部人员名称",res.data[0].value);
      that.setData({
        complainVm: res.data[0].value,//获取质监部人员名称
      });
    });

    app.getUserPower(app.urlApi.cp_getUserPower,function(){/************************获取问责督办权限*************************/


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
          respondent: infoList.respondentUser.loginName,//赋值被问责人姓名
          complainReason: infoList.complainReason,//赋值问责事由
          //signImageSQ: app.urlApi.url_http + infoList.resignCreatePic,//申请人签字
          docno: infoList.docno,
        });
        //问责人扩展照片有
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
            complainEvidenceAudio: infoList.complainEvidenceAudio,
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
            sshide: true,//隐藏申诉说明输入框，拍照，及申诉按钮
            ytsmhide: false,//显示
            toback: false,
          })
        }else{
          that.setData({
            sshide: false,//显示申诉说明输入框，拍照，及申诉按钮
            ytsmhide: true,//隐藏
            toback: true,
          })
        }
        //申诉人扩展照片有
        if (infoList.respondentEvidencePic != null && infoList.respondentEvidencePic != "") {
          that.setData({
            respondentEvidencePic: infoList.respondentEvidencePic.split(','),
            respondentEvidencePicShow: app.getimgUrl(infoList.respondentEvidencePic),
            zmPic2Hide: false,//显示相关证明照片部分
            toback: false,
          })
        }else{
          that.setData({
            zmPic2Hide: true,//隐藏相关证明照片部分
            toback: true,
          })
        }
        //申诉人上传音频有
        if (infoList.respondentEvidenceAudio != null && infoList.respondentEvidenceAudio != "" &&  infoList.respondentEvidenceAudio != undefined) {
          that.setData({
            respondentEvidenceAudio: infoList.respondentEvidenceAudio,
            title:  infoList.respondentUser.loginName+"申诉.mp3",
            lyHide2: false,//显示播放录音按钮
          })
        }else{
          that.setData({
            lyHide2: true,//隐藏播放录音按钮
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

        //赋值审批意见*************************************************************质监/经理
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
              list2[i].name = "经理审批意见";
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
        


        // console.log("节点---",node);
        // console.log("当前节点信息---",runType.currentNode);
        // console.log("当前工位信息---",station);
            
        // if (runType.currentNode == 2 && node == 2){
        //   if(runType.status == -1 ){
        //       console.log("进入了质监部");
        //       that.setData({
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


        if (runType.currentNode == -1) {//流程结束
          that.setData({//这个状态表示属于查看页面
            islook: true,//是查看
            yjhide: true,//隐藏意见框
            sshide: true,//隐藏申诉按钮
            ytsmhide: false,//显示已填申诉说明
            toback: false,//不隐藏返回按钮
          });
        }

        dd.hideLoading();

      }, true);
      //赋值操作********************************************************************************************************************结束********************************

      
    });

  },
  //音频播放------------------------------------------
  start1() {
    var that = this;
     var url = app.urlApi.url_address;
    if( url == "http://47.111.65.109/" ){
      that.setData({
        src: url + that.data.complainEvidenceAudio,
      });
    }
    else{
      that.setData({
        src: that.data.complainEvidenceAudio,
      });
    }
    let manager = dd.getBackgroundAudioManager()
    manager.title = this.data.title
    manager.coverImgUrl = this.data.coverImgUrl
    manager.src = this.data.src
  },
  start2() {
    var that =this;
     var url = app.urlApi.url_address;
    if( url == "http://47.111.65.109/" ){
      that.setData({
        src: url + that.data.respondentEvidenceAudio,
      });
    }
    else{
      that.setData({
        src: that.data.respondentEvidenceAudio,
      });
    }
    let manager = dd.getBackgroundAudioManager()
    manager.title = this.data.title
    manager.coverImgUrl = this.data.coverImgUrl
    manager.src = this.data.src
  },


  //申诉补充说明
  getRespondentState(e){
    var that = this;
    console.log("被问责人申诉补充说明",e.detail.value);
    that.setData({
      respondentState: e.detail.value,
    });
  },

  //被问责人申诉
  yes_ssty() {
    var that = this;
    console.log("被问责人点了申诉");
    var i = that.data.count;
    console.log("初始的count为",i);
    if(i == 1){
      this.submit("disagree");
      // console.log('form发生了submit事件，携带数据为：');
    }
    else if(i == 0){
      that.setData({
        isSsuHide: false,//不隐藏申诉范围
        count: 1,
      });
      // console.log("点击一次同意之后的count为",that.data.count);
    }
    
  },
  //被问责人承认
  no_crty() {
    var that = this;
    console.log("被问责人点了承认");
    this.submit("identify");
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
    that.setData({
      respondentStatus: true,//申诉人已经处理
    });
    
    var ssSm = that.data.respondentState;//得到申诉说明
    console.log("被问责人申诉补充说明",ssSm);
    var ssPic = app.tihuan(that.data.respondentEvidencePic);//得到申诉人上传照片
    console.log("ssPic--",ssPic);
    var ssStatus = that.data.respondentStatus;
    console.log("被问责人状态是否已处理",ssStatus);
    let i = this.data.i;//得到是否点击的状态

    if( type == "disagree" ){
      console.log("被问责人申诉的提交");
      if (ssSm == "" || ssSm == null) {
        dd.alert({ title: '请输入补充说明', buttonText: '好的' });
      } else if (ssSm.length < 30) {
        dd.alert({ title: '补充说明不得小与30个字', buttonText: '好的' });
      }  else if (i == 1) {
        dd.alert({ title: '已提交,请勿重复提交', buttonText: '好的' });
      }
      // else{
      //   dd.alert({ title: 'okkk', buttonText: '好的' });
      // }
      else {
        that.setData({
          i: 1
        });
        dd.showLoading({
          content: '数据提交中,请稍后...',
          delay: 1000,
        });
        app.ajaxSubmit(app.urlApi.cp_respondent_add + "?type="+type , "POST" , { respondentState: ssSm, respondentEvidencePic: ssPic, respondentStatus: ssStatus, id: that.data.id} , (res) =>{
          console.log("存入的数据",res);
          dd.hideLoading();
          dd.showToast({
            type: 'success',
            content: '操作成功',
            duration: 3000
          });
          that.setData({
            toback: false,
            sshide: true,
          });
          dd.redirectTo({
            url: '/page/complain_index/complain_index'
          })
        },true,true);
      }
    }
    else if( type == "identify"  ){
      console.log("被问责人承认的提交");
      if (i == 1) {
        dd.alert({ title: '已提交,请勿重复提交', buttonText: '好的' });
      }
      // else{
      //   dd.alert({ title: 'okkk', buttonText: '好的' });
      // }
      else {
        that.setData({
          i: 1
        });
        dd.showLoading({
          content: '数据提交中,请稍后...',
          delay: 1000,
        });
        app.ajaxSubmit(app.urlApi.cp_respondent_add + "?type="+type , "POST" , { respondentState: ssSm, respondentEvidencePic: ssPic, respondentStatus: ssStatus, id: that.data.id}  , (res) =>{
          console.log("存入的数据",res);
          dd.hideLoading();
          dd.showToast({
            type: 'success',
            content: '操作成功',
            duration: 3000
          });
          that.setData({
            toback: false,
            sshide: true,
          });
          dd.redirectTo({
            url: '/page/complain_index/complain_index'
          })
        },true,true);
      }
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
        url: '/page/complain_index/complain_index'
      });
    }
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

      if (type == "a1") {//车辆停放位置照片
        that.setData({
          respondentEvidencePic: ccc,
          respondentEvidencePicShow: ddd
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

    if (type == "a1") {//车辆停放位置照片
      that.setData({
        respondentEvidencePic: imglist,
        respondentEvidencePicShow: imglist_show
      });
    }


    // console.log("删除后的图片数组为-------", this.data.left_front_wheel);
    // console.log("删除后的图片展示数组为-------", this.data.left_front_wheel_showList);
  },

  ///*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*//*//


});
