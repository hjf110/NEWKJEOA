Page({
  data: {
    msg:""
  },
  onLoad(res) {
     console.log(res);
     //获得错误信息-------------------------------------------
     this.setData({
       msg:res.msg
     });
  },
});
