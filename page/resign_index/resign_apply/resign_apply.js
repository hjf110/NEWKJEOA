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
    level: "",//级别
    hiredate: "",//入职时间
    workingSeniority: "",//工作年限

    resignApplyTime:"",//辞职时间
    list:[],//辞职类别
    Lzvalue:'0',//辞职选择器的值
    resignReason:"",//辞职事由文本


    allHidden:false,//
    resignCreatePic: "",//签字照片
    signImage: "",//签字显示照片
    
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

    
    //获取人员岗位信息
    app.ajaxSubmit(app.urlApi.userInfo,'GET',null,function(res){
      var info = res.data;
      let hireDate = app.getLocalTime(info.hiredDate, true);//获取入职时间
      let nowdate = app.getLocalTime(new Date(), true);//获取系统当前时间
      console.log("系统当前时间",nowdate);
      let time = app.DateMinus(hireDate,nowdate);///计算工作年限
      console.log("计算年限",time);
      console.log("得到的人员信息为：",info);
      that.setData({
        name: info.name,//姓名
        post: info.position,//岗位
        // level: info.level,//级别
        hiredate: hireDate,//入职时间
        workingSeniority: time,//工作年限
      });

      dd.hideLoading();
    },true);

    that.setData({
      list:[],
    });
    //获取申请人辞职类别信息
    app.ajaxSubmit(app.urlApi.zidian,"GET",{ type: "resign_category" },function(res){
      console.log("获取的辞职类别是",res);
      let resigncategory = res.data;
      let resignList = that.data.list;
      console.log(resigncategory);
      resignList.push("请选择");
      resigncategory.forEach(function(element){
        console.log(element);
        resignList.push(element.label);
      });
      console.log(resignList);
      that.setData({
        list: resignList,
      });
    },true,false);
  },
  
  //申请辞职时间
  resignApplyDatePicker(e){
    var that = this;
    dd.datePicker({
      currentDate: '',
      success: (res) => {
        let sj = false;
        console.log("工作年限为",that.data.workingSeniority);
        let nowdate = app.getLocalTime(new Date(), true);
        if( that.data.workingSeniority <= 90 ){
          let sjc = app.DateMinus(nowdate, res.date);
          console.log("时间差===",sjc);
          if(sjc >= 3 ){
            sj = true;
          }
        }else{
          let sjc = app.DateMinus(nowdate, res.date);
          console.log("时间差===",sjc);
          if(sjc >= 30 ){
            sj = true;
          }
        }

        if( sj == true ){
          that.setData({
            resignApplyTime: res.date,
          });
        }else {
          if(that.data.workingSeniority <= 90){
            dd.alert({ title: '请提前三天提交离职申请', buttonText: '好的' });
            // dd.showToast({ content: '', duration: 2000 });
            that.setData({
              resignApplyTime: "",
            });
          }else{
            dd.alert({ title: '请提前一个月提交离职申请', buttonText: '好的' });
            // dd.showToast({ content: '', duration: 2000 });
            that.setData({
              resignApplyTime: "",
            });
          }
        }

        
        // dd.alert({
        //   title: 'datePicker response: ' + JSON.stringify(res)
        // });
      }
    });
  },



  //离职原因
  onChange(e){
    console.log(e.detail.value);
    this.setData({
      Lzvalue: e.detail.value,
    });
  },

  //离职事由


  //提交
  onSubmit(e){
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let res = e.detail.value;
    console.log("岗位---------",that.data.post);
    let ResignCategory = that.data.Lzvalue;//获取辞职类别
    console.log("获取的离职类别为----",ResignCategory);
    let ResignApplyTime = that.data.resignApplyTime;
    console.log("获取的申请离职时间----",ResignApplyTime);
    console.log("获取的离职事由---------",that.data.resignReason);
    let ResignReasonLength = res.resignReason.length;
    console.log("获取的离职事由的长度为----",ResignReasonLength);

    res.resignApplyTime = ResignApplyTime;//赋值申请离职时间
    res.resignCategory = ResignCategory;//赋值离职原因
    //res.resignReason//赋值请假事由
    res.resignCreatePic = that.data.resignCreatePic;//赋值签字

    if(res.resignApplyTime == "" || res.resignApplyTime == null) {
      dd.alert({ title: '请选择离职时间', buttonText: '好的' });
    }else if(res.resignCategory == 0 ){
      dd.alert({ title: '请选择离职原因', buttonText: '好的' });
    }else if(res.resignReason == "" || res.resignReason == null){
      dd.alert({ title: '请填写离职事由', buttonText: '好的' });
    }else if (res.resignReason.length < 30) {
      dd.alert({ title: '离职事由不得小于30个字', buttonText: '好的' });
    }else if (res.resignCreatePic == "" || res.resignCreatePic == null) {
      dd.alert({ title: '请签字', buttonText: '好的' });
    }
    else{
      console.log("提交成功");
      that.setData({
        i: 1,
        submitLoading:true,
      });
      dd.showLoading({
        content: '提交中请稍后...'
      });
      app.ajaxSubmit(app.urlApi.re_add,"POST",res,function(e){/*****************************申请提交接口******************************/
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
                resignCreatePic: cc.data.url
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
