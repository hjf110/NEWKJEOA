Page({
  data: {
    check_value: 0,
    button_text:"请仔细阅读",
    color: "#FFFFFF",//选择框颜色
    items: [
      { name: '我已经仔细阅读了', value: 1, text: "我已经仔细阅读了" }
    ],
  },
  onLoad() { },
  onChange(e) {
    var res = e.detail.value;
    console.log(res[0]);
    var that = this;
    if (res[0] == null || res[0] == "") {
      console.log("没选中");
      that.setData({
        color: "#FFFFFF",
        check_value: 0,
        button_text:"请仔细阅读"
      });
    } else if (res[0] == 1) {
      console.log("选中了");
      that.setData({
        color: "#3296FA",
        check_value: 1,
        button_text:"点击申请"
      });

    }
  },
  lower(){
     this.setData({
        check_value: 1,
        button_text:"点击申请"
      });
  },
  tj() {
    var res = this.data.check_value;
    if (res == 0) {
      dd.showToast({
        type: 'fail ',
        content: '请仔细阅读',
        duration: 3000,
        success: () => {
        },
      });
    }else{
       dd.navigateTo({
        url: '/page/Drive_out_check_index/driver_apply/driver_apply'
      });
    }
  }
});
