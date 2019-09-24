var app = getApp();


Page({
  data: {
    id:"",
    name:"",//姓名
    post: "",//岗位
    mobile: "",//电话号码
    licensePlate:"",//自车牌照
    accidentLocation:"",//车辆地点
    accident:"",//事故发生地
    acvalue: 0,//请假选择器的值
    list: [],//请假类别
    customerUnit:"",//客户单位

    carFrameNumberPic:[],//事故车车架号照片
    carFrameNumberPicShow:[],//显示字段
    carPanoramaPic:[],//事故车全景照片
    carPanoramaPicShow:[],//事故车全景照片显示字段
    carProblemPic:[],//事故车受损部位照片
    carProblemPicShow:[],//事故车受损部位照片显示字段
 
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

    //获取请假类别
    app.ajaxSubmit(app.urlApi.zidian, "GET", { type: "accident" }, function(res) {
      console.log("获得的事故发生地是", res);
      let bb = that.data.list;
      let aa = res.data;
      console.log(aa);
      // for (var i = 0; i < aa.length; i++) { //循环遍历请假类别数组
      //   console.log(aa[i]);
      //   bb.push(aa[i].label);
      // }
      bb.push("请选择事故发生地")
      aa.forEach(function(element) {
        console.log(element);
        bb.push(element.label);
      });
      console.log(bb);
      that.setData({
        list: bb
      });

    }, true, false)

    that.setData({
      list:[],
    });

  },

  //请假类别
  onChange(e) {
    console.log(e.detail.value);

    this.setData({
      acvalue: e.detail.value,
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
    res.accident=that.data.acvalue;
    var customerUnit = res.customerUnit;
    res.carFrameNumberPic = app.tihuan(that.data.carFrameNumberPic);
    res.carPanoramaPic = app.tihuan(that.data.carPanoramaPic);
    res.carProblemPic = app.tihuan(that.data.carProblemPic);
    res.mobile = that.data.mobile;

    if(that.data.acvalue == 0) {
      dd.alert({ title: '请选择事故发生地', buttonText: '好的' });
    }else if(customerUnit == "" || customerUnit == null) {
      dd.alert({ title: '请填写客户单位', buttonText: '好的' });
    } else if (that.data.carFrameNumberPic.length == 0) {
      dd.showToast({ content: '请拍摄事故车车架号照片', duration: 3000 });
    } else if (that.data.carPanoramaPic.length == 0) {
      dd.showToast({ content: '请拍摄事故车全景照片', duration: 3000 });
    } else if (that.data.carPanoramaPic.length < 3) {
      dd.showToast({ content: '事故车全景照片不得少于三张', buttonText: '好的' });
    }else if (that.data.carProblemPic.length == 0) {
      dd.showToast({ content: '请拍摄事故车受损部位照片', duration: 3000 });
    } else if (that.data.carProblemPic.length < 3) {
      dd.showToast({ content: '事故车受损部位照片不得少于三张', buttonText: '好的' });
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
          carFrameNumberPic: ccc,
          carFrameNumberPicShow: ddd
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
        carFrameNumberPic: imglist,
        carFrameNumberPicShow: imglist_show
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
          carPanoramaPic: ccc,
          carPanoramaPicShow: ddd
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
        carPanoramaPic: imglist,
        carPanoramaPicShow: imglist_show
      });
    }
  },

    takePhoto3(res) {//拍照
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
          carProblemPic: ccc,
          carProblemPicShow: ddd
        });
      }
    },true);
  },
  delect3(res) {//删除
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
        carProblemPic: imglist,
        carProblemPicShow: imglist_show
      });
    }
  },

  ///*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*//*//



});
