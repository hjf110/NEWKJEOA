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
    id:"",
    name:"",//姓名
    post: "",//岗位

    //被投诉用户
    nameList: [],//包含用户id的list
    onlyNameList: [],//只包含姓名的list
    idxValue: [],//滑动选择的值
    showname: "",//输入框展示的被投诉人姓名
    respondent: "",//提交时的被投诉人id
    complainReason: "",//申诉事由文本
    
    complainEvidencePic: [],//扩展拍照字段
    complainEvidencePicShow: [],//扩展拍照显示字段

    complainVm: "",//质监部人员名称

    allHidden:false,//
    complainCreatePic: "",//签字照片
    //signImage: "",//签字显示照片
    
    i: 0,//用来判断是否重复提交
    submitLoading: false,


  },

  onLoad() {

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

    
    //获取人员岗位信息接口/*********************************************/
    app.ajaxSubmit(app.urlApi.userInfo,'GET',null,function(res){
      var info = res.data;
      console.log("得到的人员信息为：",info);
      that.setData({
        name: info.name,//姓名
        post: info.position,//岗位
      });
      
      dd.hideLoading();
    },true);

    app.ajaxSubmit(app.urlApi.zidian, "GET", { type: "complain_vm" } , function(res){
      console.log("质监部人员名称",res.data[0].value);
      that.setData({
        complainVm: res.data[0].value,//获取质监部人员名称
      });
    });

    //获取被投诉人的人员名单
    app.ajaxSubmit(app.urlApi.cp_userinfo_list, "GET", null, function(res) {/*************选择被投诉人接口************/
      console.log("返回的数据---------", res);
      var resData = res.data;
      var namelist = []; //返回的姓名对应id的数组
      var onlynamelist = []; //返回的姓名数组

      let ert = {}
      ert.name = "空";
      ert.nameid = 2000;
      namelist.push(ert);
      onlynamelist.push("空");

      for (var i = 0; i < resData.length; i++) {
        if (resData[i] != "空") {
          var nameArrList = {};
          nameArrList.name = resData[i].loginName;
          nameArrList.nameid = resData[i].id;
          namelist.push(nameArrList);
          onlynamelist.push(resData[i].loginName);
          //console.log("nameArrList---",nameArrList.name,nameArrList.nameid);
        }
      }
      console.log("namelist-----", namelist);
      console.log("onlynamelist-----", onlynamelist);
      that.setData({
        nameList: namelist,
        onlyNameList: onlynamelist,
      });
    }, true, false, false);
    
  },
  onChange(e) {
    console.log(e.detail.value);
    this.setData({
      idxValue: e.detail.value,
    });
    var xzIdx = e.detail.value;
    var i = xzIdx[0];
    var onlyNameList = this.data.onlyNameList;
    var nameidlist = this.data.nameList;
    this.setData({
      showname: onlyNameList[i],
      respondent: nameidlist[i].nameid,
    });
    console.log("获得的索引为-----", xzIdx[0]);
    console.log("获得的nameid为-----", nameidlist[i].nameid);
  },
  nameinfo(e) {
    var val = e.detail.value;
    console.log("输入的值----", val);
    var list = this.data.onlyNameList;
    var nameidlist = this.data.nameList;
    var idx = app.keyWord(list, val);
    if(val == "" || val == null){
      idx = 0;
    }
    console.log("idx---", idx);
    console.log("获得的nameid--",nameidlist[idx].nameid);
    var srIdx = [idx];
    this.setData({
      idxValue: srIdx,
      respondent: nameidlist[idx].nameid,
    });
  },

  //


  //提交
  onSubmit(e){
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let res = e.detail.value;
    console.log("岗位---------",that.data.post);

    let complainReasonLength = res.complainReason.length;
    console.log("获取的问责事由的长度为----",complainReasonLength);
    console.log("问责事由内容----",res.complainReason);

    res.complainEvidencePic = app.tihuan(that.data.complainEvidencePic);//图片


    if(res.respondent == "" || res.respondent == null || res.respondent == 0){
      dd.alert({ title: '请选择被问责对象', buttonText: '好的' });
    }else if(res.complainReason == "" || res.complainReason == null){
      dd.alert({ title: '请填写问责事由', buttonText: '好的' });
    }else if(complainReasonLength <30 ){
      dd.alert({ title: '问责事由不得小于30个字', buttonText: '好的' });
    }//else if (res.complainCreatePic == "" || res.complainCreatePic == null) {
    //   dd.alert({ title: '请签字', buttonText: '好的' });
    // }
    // else{
    //   dd.alert({ title: 'okkk', buttonText: '好的' });
    // }
    else{
      console.log("提交成功");
      that.setData({
        i: 1,
        submitLoading:true,
      });
      dd.showLoading({
        content: '提交中请稍后...'
      });
      app.ajaxSubmit(app.urlApi.cp_add,"POST",res,function(e){/*****************************申请提交接口******************************/
        console.log("提交后返回的信息：",e);
        dd.showToast({
          content: '提交成功',
          duration: 2000,
        });
        setTimeout( function() {
          dd.hideLoading();
          console.log("调用延迟");
          dd.navigateBack({//页面跳转回
            delta: 2,
          });
        },1000);
      },true,true);
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
    app.takePhoto(val_a, val_b,function(res, res2) {
      console.log("成功后-----one", res);
      console.log("成功后-----two", res2);
      var ccc = res;
      var ddd = res2;

      if (type == "a1") {//车辆停放位置照片
        that.setData({
          complainEvidencePic: ccc,
          complainEvidencePicShow: ddd
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
        complainEvidencePic: imglist,
        complainEvidencePicShow: imglist_show
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
                complainCreatePic: cc.data.url
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


});
