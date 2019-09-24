var photoSrc = [];
var app = getApp();
Page({
  data: {
    imagedata: [],
    grid: {
      list: [],
      columnNum: 3
    },
    color: "", //位置字体颜色
    longitude: "",
    latitude: "",
    no:"",
    imgsrc: [],
    weizhi: "",//位置
    num: "",//尿素申请数量
    gl: "",//公里数
    sy_num: "",//剩余尿素数量

    title: "尿素领用申请",
    formtext: {
      docno:"流程编号",
      ureaNum: "申请数量",
      kmPic: "公里数拍照",
      location: "位置",
      km: "公里数:",
      surUreaNum: "剩余尿素:",
      button_dw: "点击定位",
      button_text: "提交申请"
    }
  },
  onLoad() {
    this.get_code();
    this.dw();
    //var location = this.data.longitude + "," + this.data.latitude;
    console.log(location);
  },
  dianji: function () {
    this.dw();
  },
  dw: function () {
    var that = this;
    dd.getLocation({
      success(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        var location = res.longitude + "," + res.latitude;
        // dd.alert({ content:  res.longitude });
        // dd.alert({ content:  res.latitude });
        console.log(res.longitude);
        console.log(res.latitude);
        that.get_dw(location, that);
        // Content-Type为application/x-www-form-urlencoded即默认的接口请求方式
        // dd.httpRequest({
        //   url: 'https://restapi.amap.com/v3/geocode/regeo',
        //   method: 'GET',
        //   data: {
        //     key: '0abf3872e824123987c26d0a22624b9e',
        //     location: location,
        //   },
        //   dataType: 'json',
        //   success: function (res) {
        //     console.log(res);

        //     var a = res.data.regeocode.formatted_address;
        //     var b = res.data.regeocode.addressComponent.streetNumber.street;
        //     var c = res.data.regeocode.addressComponent.streetNumber.number;
        //     // dd.alert({a});
        //     that.setData({
        //       weizhi: a + b + c
        //     });
        //   },
        //   fail: function (res) {
        //     // dd.alert({ content: 'fail' });
        //   },
        //   complete: function (res) {
        //     // dd.alert({ content: 'complete' });
        //   }
        // });

      },
      fail() {
        dd.alert({ title: '定位失败' });
      }
    })

  },
  dw2: function () {
    var location = this.data.longitude + "," + this.data.latitude;
    dd.alert({ title: '定位失败' });
    // console.log(location);
    this.get_dw(location);

  },
  //获得定位的方法
  get_dw: function (location, that) {
    console.log(location);
    dd.httpRequest({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      method: 'GET',
      data: {
        key: '0abf3872e824123987c26d0a22624b9e',
        location: location,
      },
      dataType: 'json',
      success: function (res) {
        console.log("高德----------------------------");
        console.log(res);
        console.log("------------------------------------");

        var a = res.data.regeocode.formatted_address;
        var b = res.data.regeocode.addressComponent.streetNumber.street;
        var c = res.data.regeocode.addressComponent.streetNumber.number;
        //dd.alert({ a });
        that.setData({
          weizhi: a + b + c
        });
      },
      fail: function (res) {
        // dd.alert({ content: 'fail' });
        console.log("地图失败");
        console.log(res);
      },
      complete: function (res) {
        // dd.alert({ content: 'complete' });
      }
    });
  },
  get_code: function () {
    console.log("3333333333333");
    dd.getAuthCode({
      success: function (res) {
        console.log("得到的code是:");
        console.log(res);

        dd.httpRequest({
          url: 'http://vvwvv.iask.in/login/ding/e',
          method: 'GET',

          data: {
            code: res
          },
          dataType: 'json',
          success: function (res) {
            console.log("返回的消息是:");
            console.log(res);


          },
          fail: function (res) {
            console.log("失败:");
            console.log(res);
          },
          complete: function (res) {

          }
        });
        /*{
            authCode: 'hYLK98jkf0m' //string authCode
        }*/
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },
  bindKeyInput(e) {
    this.setData({
      num: e.detail.value
    });
  },
  bc(e) {
    this.setData({
      gl: e.detail.value
    });
  },
  cc(e) {
    this.setData({
      sy_num: e.detail.value
    });
  },
  xx(e) {
    this.setData({
      no: e.detail.value
    });
  },
  //上传图片----------------------------------------------------------------------------------------------------------------------
  takePhoto(res) {
    var that = this;
    //console.log(11111111111111111111111111111111111111111111111111111);
    dd.chooseImage({//选择图片
      count: 9,
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
              dd.uploadFile({//上传图片------------------------------------------------------------------------------------------
                url: 'http://dd.ubertech.cn/file/upload/',
                fileType: 'image',
                fileName: 'test',
                header: {
                  "Cookie": 'JSESSIONID='+app.userinfo.jsessionid
                },
                filePath: listimage.filePaths[i],
                success: (res) => {
                  console.log("上传成功返回--",res);
                  var imglist = that.data.imagedata;
                  var cc = JSON.parse(res.data);
                  // console.log("数据----",cc);
                  console.log("数据---21212-",cc.data.url);
                  imglist.push(cc.data.url);
                  that.setData({
                    imagedata: imglist
                  });

                },
                fail: (res) => {
                  console.log('------------------------------------------------------',res);

                }
              });

              // var imglist = that.data.imagedata;//获得图片数组
              // imglist.push(listimage.filePaths[i]);
              // that.setData({
              //   imagedata: imglist, //更新图片数组
              // });
              //显示图片--------
              var a = {};
              a["icon"] = listimage.filePaths[i];
              list.push(a);

            }
            //显示图片--------
            console.log(list);
            var b = {}
            b["list"] = list;
            b["columnNum"] = that.data.grid.columnNum
            console.log(b);
            //显示图片--------
            that.setData({
              grid: b
            });

          }
        });

      },
    });
  },
  //浏览图片-----------------------------------------------------------------------------------------
  handleItemTap(e) {
    // dd.showToast({
    //   content: `第${e.currentTarget.dataset.index}个Item`,
    //   success: (res) => {

    //   },
    // });
    var url = [];
    var that = this;
    for (var i = 0; i < this.data.grid.list.length; i++) {
      url.push(this.data.grid.list[i].icon);
    };

    console.log(url);

    dd.previewImage({
      current: e.currentTarget.dataset.index,
      urls: url
    });
  },
  ylan: function (res) {
    var idx = res.currentTarget.dataset['index'];
    console.log(idx);
    console.log(this.data.imgsrc);
    console.log(this.data.imgsrc[idx]);
    dd.previewImage({
      current: idx,
      urls: this.data.imgsrc
    });
  },
  //提交方法--------------------------------------------------------------------------------------
  formsubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);

    // console.log('尿素申请数量：', this.data.num);
    // console.log('位置：', this.data.weizhi);
    // console.log('公里数：', this.data.gl);
    // console.log('剩余数量：', this.data.sy_num);
    console.log("img-data"+this.data.imagedata);
    var img = this.tihuan(this.data.imagedata);//转换图片数组
    console.log("img-data"+img);
    //console.log(e.detail.value);
    e.detail.value.kmPic=this.tihuan(this.data.imagedata);
     console.log(e.detail.value);

    
  app.ajaxSubmit(app.urlApi.add_urea_ly,"POST",e.detail.value,function(res){
     dd.alert({content: JSON.stringify(res)});
  },true,true);




    // dd.httpRequest({
    //   headers:{'Cookie':'JSESSIONID='+app.userinfo.jsessionid,'Content-Type': 'application/json'},
    //   url: 'http://dd.ubertech.cn/ding/flow/run/urea/submit',
    //   method: 'POST',
    //   data:JSON.stringify(e.detail.value),
    //   dataType:'json',
    //   success: function(res) {
    //     dd.alert({content: JSON.stringify(res)});
    //   },
    //   fail: function(res) {
    //     dd.alert({content: 'fail'});
    //   }
    // });
    console.log('图片路径数组：', this.data.imagedata);


    console.log('替换后', img);

  },
  //转换图片数组的方法------------------------------------------------------------------------------
  tihuan(res) {
    var a = res;
    a = a.toString();
    a = a.replace("[", " ");
    a = a.replace("]", " ");
    return a;
  }


});
