Page({
  data: {
    text_yj: ""
  },
  onLoad() { },
  get_textarea_value: function (e) {//否定意见的值双向绑定
    console.log(e);
    this.setData({
      text_yj: e.detail.value
    });
    console.log("否定意见的值:", this.data.text_yj);
  },
  yes_tj:function(res){
    console.log("点击了同意",this.data.text_yj);
  },
  no_tj:function(res){
     console.log("点击了不同意",this.data.text_yj);
  }
});
