

var app = getApp();//获取全局变量

var content = null;
var touchs = [];
var canvasw = 0;
var canvash = 0;


//获取系统信息
dd.getSystemInfo({
  success: function (res) {
    canvasw = res.windowWidth + 1400;
    canvash = canvasw * 11 / 16;
  },
});

Page({
  data: {
    imgsrc_ns: [],
    imgsrc_ren: [],
    signImage: '',
    imgsrc_ns_list: [],//尿素照片上传成功后返回的地址数组--------------------
    imgsrc_ren_list: [],//领用人照片上传成功后返回的地址数组-----------------
    signImage_url: [],//签字图片上传后返回的地址-------------------------------------------
    is_gundong: false,
    is_hidden: false,
    b_hidden: false,
    all_hidden: false,
    y_hidden: true,
    grid: {
      list: [],
      columnNum: 3
    },
  },
  onLoad() {


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


  },
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
  start: function (event) {
    console.log("触摸开始", event.changedTouches[0].x)
    console.log("触摸开始", event.changedTouches[0].y)
    //获取触摸开始的 x,y
    let point = { x: event.changedTouches[0].x, y: event.changedTouches[0].y }
    touchs.push(point)
  },
  // 画布的触摸移动手势响应
  move: function (e) {
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
  end: function (e) {
    console.log("触摸结束", e);
    console.log("画布属性--------------", content);
    //清空轨迹数组
    for (let i = 0; i < touchs.length; i++) {
      touchs.pop()
    }

  },
  // 画布的触摸取消响应
  cancel: function (e) {
    console.log("触摸取消" + e)
  },
  // 画布的长按手势响应
  tap: function (e) {
    console.log("长按手势" + e)
  },

  error: function (e) {
    console.log("画布触摸错误" + e)
  },
  //绘制
  draw: function (touchs) {

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
  clearClick: function () {
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
  saveClick: function () {
    var that = this
    dd.canvasToTempFilePath({
      canvasId: 'firstCanvas',
      success: function (res) {
        //打印图片路径
        console.log(res.filePath);
        //这里可上传图片---------------------------------------









        //显示图片---------------------------------------------
        that.setData({
          signImage: res.filePath
        });

        that.setData({
          is_gundong: false
        });
        that.setData({
          b_hidden: true
        });
        that.setData({
          is_hidden: true
        });
        that.setData({
          y_hidden: false
        });
      }
    })
  },
  //预览尿素照片 ------------------------------------------------------------
  ylan_ns: function (res) {
    var idx = res.currentTarget.dataset['index'];
    console.log("索引值", idx);
    console.log(this.data.imgsrc_ns);
    console.log(this.data.imgsrc_ns[idx]);
    dd.previewImage({
      current: idx,
      urls: this.data.imgsrc_ns
    });
  },
  //预览领用人照片----------------------------------------------------------
  ylan_ren: function (res) {
    var idx = res.currentTarget.dataset['index'];
    console.log(idx);
    console.log(this.data.imgsrc_ren);
    console.log(this.data.imgsrc_ren[idx]);
    dd.previewImage({
      current: idx,
      urls: this.data.imgsrc_ren
    });
  },
  //拍摄尿素照片-----------------------------------------------------------
  takePhoto_ns(res) {
    var that = this;
    console.log(res);
    //console.log(11111111111111111111111111111111111111111111111111111);
    dd.chooseImage({//选择图片
      count: 9,
      // sourceType:['camera'],
      success: (res) => {
        var list = that.data.grid.list;
        // photoSrc.push(res.filePaths[0])
        console.log(res.filePaths.length);
        var listimage;
        dd.compressImage({//压缩图片
          filePaths: res.filePaths,
          compressLevel: 1,
          success: (res) => {
            var listimage = res
            console.log("压缩后的图片", listimage);
            console.log("压缩后的图片张数", listimage.filePaths.length);
            for (var i = 0; i < listimage.filePaths.length; i++) {
              //这里开始填写上传图片----------------------------------------------------------
              // dd.uploadFile({//上传图片
              //   url: 'http://dd.ubertech.cn/file/upload/',
              //   fileType: 'image',
              //   fileName: 'test',
              //   header: {
              //     "Cookie": "JSESSIONID=4fe01875-4a87-422f-aa4a-2d7dd16aecfd;"
              //   },
              //   filePath: listimage.filePaths[i],
              //   success: (res) => {
              //     console.log(res);
              //     var imglist_ns = that.data.imgsrc_ns_list;
              //     var cc = JSON.parse(res.data);
              //     // console.log("数据----",cc);
              //     // console.log("数据---21212-",cc.data.url);
              //     imgsrc_ns_list.push(cc.data.url);
              //     that.setData({
              //       imgsrc_ns_list: imglist_ns
              //     });

              //   },
              //   fail: (res) => {
              //     console.log(res);
              //   }
              // });
              //----------------------------------------------------------------------------



              //显示照片----------------------------------------------------------------
              var imglist = that.data.imgsrc_ns;
              // var cc = JSON.parse(res.data);
              // console.log("数据----",cc);
              // console.log("数据---21212-",cc.data.url);
              imglist.push(listimage.filePaths[i]);
              console.log("尿素数量照片---", imglist);
              that.setData({
                imgsrc_ns: imglist
              });


              // var a = {};
              // a["icon"] = listimage.filePaths[i];
              // list.push(a);

            }

            // console.log(list);
            // var b = {}
            // b["list"] = list;
            // b["columnNum"] = that.data.grid.columnNum
            // console.log(b);
            // that.setData({
            //   grid: b
            // });

          }
        });
      },
    });
  },

  //拍摄领用人照片-------------------------------------------------------------------
  takePhoto_ren(res) {
    var that = this;
    //console.log(11111111111111111111111111111111111111111111111111111);
    dd.chooseImage({//选择图片
      count: 9,
      sourceType: ['camera'],
      success: (res) => {
        var list = that.data.grid.list;
        // photoSrc.push(res.filePaths[0])
        console.log(res.filePaths.length);
        var listimage;

        dd.compressImage({//压缩图片
          filePaths: res.filePaths,
          compressLevel: 1,
          success: (res) => {
            var listimage = res
            console.log("压缩后的图片", listimage);
            console.log("压缩后的图片张数", listimage.filePaths.length);
            for (var i = 0; i < listimage.filePaths.length; i++) {
            
              // dd.uploadFile({//上传图片
              //   url: 'http://dd.ubertech.cn/file/upload/',
              //   fileType: 'image',
              //   fileName: 'test',
              //   header: {
              //     "Cookie": "JSESSIONID=4fe01875-4a87-422f-aa4a-2d7dd16aecfd;"
              //   },
              //   filePath: listimage.filePaths[i],
              //   success: (res) => {
              //     console.log(res);
              //     var imglist = that.data.imgsrc_ren;
              //     var cc = JSON.parse(res.data);
              //     // console.log("数据----",cc);
              //     // console.log("数据---21212-",cc.data.url);
              //     imglist.push(cc.data.url);
              //     that.setData({
              //       imgsrc_ren: imglist
              //     });

              //   },
              //   fail: (res) => {
              //     console.log(res);
              //   }
              // });



              //显示照片----------------------------------------------------------------
              var imglist = that.data.imgsrc_ren;
              // var cc = JSON.parse(res.data);
              // console.log("数据----",cc);
              // console.log("数据---21212-",cc.data.url);
              imglist.push(listimage.filePaths[i]);
              console.log("领用人照片---", imglist);
              that.setData({
                imgsrc_ren: imglist
              });

              // var a = {};
              // a["icon"] = listimage.filePaths[i];
              // list.push(a);

            }
            // console.log(list);
            // var b = {}
            // b["list"] = list;
            // b["columnNum"] = that.data.grid.columnNum
            // console.log(b);
            // that.setData({
            //   grid: b
            // });

          }
        });
      },
    });
  },

  to_qz: function () {
    this.setData({
      is_gundong: true
    });
    this.setData({
      y_hidden: false
    });

    this.setData({
      is_hidden: false
    });
    this.setData({
      all_hidden: true
    });
  },
  no_qz: function () {
    this.setData({
      is_hidden: true
    });
  }
  , ok_submit: function () {//提交------------------------------------------------------------------------------------------------------
    console.log(this.data.signImage_url);//签字图片服务器地址-----------------------------
    console.log(this.data.imgsrc_ns_list);//尿素图片服务器地址-----------------------------
    console.log(this.data.imgsrc_ren_list);//领用人图片服务器地址-----------------------------
    var ns_imglist = app.tihuan(this.data.imgsrc_ns_list);//装换逗号隔开模式
    var ren_imglist = app.tihuan(this.data.imgsrc_ren_list);//装换逗号隔开模式
    console.log(ns_imglist);//尿素图片服务器地址-----------------------------
    console.log(ren_imglist);//领用人图片服务器地址-----------------------------

  }

});
