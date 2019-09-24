var app = getApp();


Page({
  data: {
    id:"",
    name:"",//姓名
    post: "",//岗位
    mobile: "",//电话号码
    licensePlate:"",//自车牌照
    accidentLocation:"",//车辆地点
    customerUnit:"",//客户单位

    newCarFrameNumberPic: [],//新车车架号照片
    newCarFrameNumberPicShow: [],//新车车架号显示字段
    newCarProblemPic: [],//新车问题照片
    newCarProblemPicShow: [],//新车问题照片显示字段

    allHidden:false,
    
    i: 0,//用来判断是否重复提交
    submitLoading: false,


  },

  onLoad() {

    var that = this;

    dd.showLoading({
      content:'请稍等...',
    });

    
    //获取人员岗位信息
    app.ajaxSubmit(app.urlApi.userInfo,'GET',null,function(res){
      var info = res.data;
      console.log("得到的人员信息为：",info);
      that.setData({
        name: info.name,//姓名
        post: info.position,//岗位
        mobile: info.mobile,//手机号
      });



      dd.hideLoading();
    },true);
    app.ajaxSubmit(app.urlApi.d_check_License_plate, "GET", null, function(res) {
      console.log("验证车牌号返回的信息-----", res);
        that.setData({
          licensePlate: res.data.licensePlate
      });
    });
    app.get_position(function(res) {//地点
          console.log(res);
          that.setData({
            accidentLocation: res,
          });
      });

    that.setData({
      list:[],
    });

  
  
  },




  //提交
  onSubmit(e){
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let res = e.detail.value;
    console.log("岗位---------",that.data.post);
    
    res.licensePlate = that.data.licensePlate;
    res.accidentLocation = that.data.accidentLocation;
    var customerUnit = res.customerUnit;
    res.newCarFrameNumberPic = app.tihuan(that.data.newCarFrameNumberPic);
    res.newCarProblemPic = app.tihuan(that.data.newCarProblemPic);
    res.mobile = that.data.mobile;

    if(customerUnit == "" || customerUnit == null) {
      dd.alert({ title: '请填写客户单位', buttonText: '好的' });
    } else if (that.data.newCarFrameNumberPic.length == 0) {
      dd.showToast({ content: '请拍摄新车车架号照片', duration: 3000 });
    } else if (that.data.newCarProblemPic.length == 0) {
      dd.showToast({ content: '请拍摄新车问题照片', duration: 3000 });
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
      app.ajaxSubmit(app.urlApi.nci_add,"POST",res,function(e){/*****************************申请提交接口******************************/
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
  takePhoto1(res) {//拍照
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
          newCarFrameNumberPic: ccc,
          newCarFrameNumberPicShow: ddd
        });
      }
    },true);
  },
  delect1(res) {//删除
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
        newCarFrameNumberPic: imglist,
        newCarFrameNumberPicShow: imglist_show
      });
    }
  },


  takePhoto2(res) {//拍照
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
          newCarProblemPic: ccc,
          newCarProblemPicShow: ddd
        });
      }
    },true);
  },
  delect2(res) {//删除
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
        newCarProblemPic: imglist,
        newCarProblemPicShow: imglist_show
      });
    }
  },

  ///*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*//*//



});
