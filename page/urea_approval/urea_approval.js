var app = getApp();

Page({
  data: {
    text_no: "",//否定意见
    sp_num: "",//审批数量
    is_hidden: true,//是否隐藏
    auto_height: true,
    imagedata: [],
    grid: {
      list: [],
      columnNum: 3
    },
    id: "",//id
    user_name: "",//申请人---------------------------------------
    urea_Num: "", //申请数量-----------------------------------------
    weizhi: "",//位置---------  显示的信息
    gl: "",//公里数--------------------------------------------------
    sy_num: "",//剩余尿素数量----------------------------------------
    formtext: {
      user_name: "申请人:",
      urea_num: "申请数量:",
      take_photo: "公里数拍照",
      lication: "位置:",
      kilometres: "公里数:",
      urea_rest: "剩余尿素:",
      button_dw: "点击定位",
      button_yes: "同意",
      button_no: "不同意",
      yijian: "否定意见"
    }
  },
  onLoad(res) {
    console.log("得到的id:", res);
    var that = this;
    if(res.id!=null&&res.id!=""){
    app.ajaxSubmit(app.urlApi.select_urea_ly_byid, "GET", { id: res.id }, function (res) {
      console.log("得到的数据", res);
      var aa = res.data;//数据
      that.setData({
        user_name: aa.createUser.loginName,
        urea_Num: aa.ureaNum,
        sy_num: aa.surUreaNum,
        weizhi: aa.location,
        gl: aa.km,
        id: aa.id
      });
    }, true, false);
    }


  },
  no_tongyi: function (e) { //点击不同意按钮
    console.log(e);
    this.setData({
      is_hidden: false
    });
  },
  qx: function (e) {  //点击取消按钮
    console.log(e);
    this.setData({
      is_hidden: true
    });
  },
  get_textarea_value: function (e) {//否定意见的值双向绑定
    console.log(e);
    this.setData({
      text_no: e.detail.value
    });
    console.log("否定意见的值:", this.data.text_no);
  },
  get_sp_num: function (e) {//审批数量的值双向绑定
    console.log(e);
    this.setData({
      sp_num: e.detail.value
    });
    console.log("审批的值:", this.data.sp_num);
  },

  no_tj: function (e) {//不同意(提交)-----------------------------------------------------------------------------------------------------
    console.log("审批的值:", this.data.sp_num);
    console.log("否定意见的值:", this.data.text_no);
    var yj = this.data.text_no;
    if (yj == null || yj == "") {//不同意的时候判断是否填写了不同意的意见
      dd.showToast({
        type: 'fail',
        content: '请输入审批意见',
        duration: 2000
      });
    } else if (this.data.sp_num == null || this.data.sp_num == "") {
      dd.showToast({
        type: 'fail',
        content: '请输入审批数量',
        duration: 2000
      });
    } else {
      this.tijiao(false);
    }
  },
  yes_tj: function (e) {//同意(提交)-------------------------------------------------------------------------------------------------------
    console.log("审批的值:", this.data.sp_num);
    if (this.data.sp_num == null || this.data.sp_num == "") {
      dd.showToast({
        type: 'fail',
        content: '请输入审批数量',
        duration: 2000
      });
    } else {
      this.tijiao(false);
    }
  },
  tijiao: function (res) {
    if (res == true) {
      app.ajaxSubmit(app.urlApi.urea_approval + res, "POST", { id: this.data.id, applyUreaNum: this.data.sp_num }, function (res) {
        console.log("得到的数据", res);

      }, true, true);
    } else if (res == false) {
      app.ajaxSubmit(app.urlApi.urea_approval + res, "POST", { id: this.data.id, applyUreaNum: this.data.sp_num, refusalReason: this.data.text_no }, function (res) {
        console.log("得到的数据", res);

      }, true, true);
    }
  }
});
