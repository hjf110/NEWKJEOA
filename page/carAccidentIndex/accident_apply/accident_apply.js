var app = getApp();


Page({
  data: {
    id: "",
    name: "",//姓名
    post: "",//岗位
    mobile: "",//电话号码
    licensePlate: "",//自车牌照
    accidentLocation: "",//车辆地点
    carPanoramaPic: [],//事故车全景照片
    carProblemPic: [],//事故车受损部位照片
    allHidden: false,
    i: 0,//用来判断是否重复提交
    submitLoading: false,
  },

  onLoad() {
    var that = this;
    dd.showLoading({
      content: '请稍等...',
    });
    //获取人员岗位信息
    app.ajaxSubmit(app.urlApi.userInfo, 'GET', null, function(res) {
      var info = res.data;
      console.log("得到的人员信息为：", info);
      that.setData({
        name: info.name,//姓名
        post: info.position,//岗位
        mobile: info.mobile,//手机号
      });
      dd.hideLoading();
    }, true);

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



  },
  onGetImg(imgList, type) {
    if (type == "a1") {//事故全景照片
      this.setData({
        carPanoramaPic: imgList
      });
    } else if (type == "a2") {//事故车受损部位照片
      this.setData({
        carProblemPic: imgList
      });
    }
  },
  //提交
  onSubmit(e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let res = e.detail.value;
    console.log("岗位---------", that.data.post);

    res.licensePlate = that.data.licensePlate;
    res.accidentLocation = that.data.accidentLocation;
    //res.accident=that.data.acvalue;
    var customerUnit = res.customerUnit;
    //res.carFrameNumberPic = app.tihuan(that.data.carFrameNumberPic);
    res.carPanoramaPic = app.tihuan(that.data.carPanoramaPic);
    res.carProblemPic = app.tihuan(that.data.carProblemPic);
    res.mobile = that.data.mobile;

    if (that.data.carPanoramaPic.length == 0) {
      dd.alert({ title: '提示', content: '请拍摄事故车全景照片', buttonText: '我知道了' });
      //dd.showToast({ type: 'fail', content: '请拍摄事故车全景照片', duration: 3000 });
    } else if (that.data.carPanoramaPic.length < 3) {
      dd.alert({ title: '提示', content: '事故车全景照片不得少于三张', buttonText: '我知道了' });
    } else if (that.data.carProblemPic.length == 0) {
      dd.alert({ title: '提示', content: '请拍摄事故车受损部位照片', buttonText: '我知道了' });
      //dd.showToast({ content: '请拍摄事故车受损部位照片', duration: 3000 });
    } else if (that.data.carProblemPic.length < 3) {
      dd.alert({ title: '提示', content: '事故车受损部位照片不得少于三张', buttonText: '我知道了' });
      //dd.showToast({ content: '事故车受损部位照片不得少于三张', buttonText: '好的' });
    }
    else {
      console.log("提交成功");
      that.setData({
        submitLoading: true,
      });
      app.ajaxSubmit(app.urlApi.sfc_add, "POST", res, function(e, r) {/*****************************申请提交接口******************************/
        console.log("提交后返回的信息：", e);
        if (r) {
          dd.showToast({
            content: '提交成功',
            duration: 2000,
          });
          setTimeout(function() {
            dd.hideLoading();
            console.log("调用延迟");
            dd.navigateBack({//页面跳转回
              delta: 2,
            });
          }, 1000);
        } else {
          dd.hideLoading();
          that.setData({
            submitLoading: false,
          });
        }
      }, true, true);
    }

  },





});
