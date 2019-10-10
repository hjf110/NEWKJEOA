const app = getApp();


Page({
  data: {
    i: false,//用来判断是否重复提交
    form: {
      oname: "",//物料名称
      ospecification: "",//物料规格
      ofitfor: "",//适用车型
      oplocation: "",//产地
      ovender: "",//供应商
      onumber: "",//采购数量
      ounit: "",//单位
      oprice: "",//采购单价
    }


  },
  onLoad() { },
  //提交接口
  submit(e) {
    const _this = this;
    let res = e.detail.value;
    if(res.oname==""||res.oname==null){
      //  dd.showToast({
      //   content: '物料名称不能为空',
      //   duration: 2000,
      // });
      dd.alert({ title: '警告', content: '物料名称不能为空', buttonText: '我知道了'});
    }else if(res.ofitfor==""||res.ofitfor==null){
      //  dd.showToast({
      //   content: '适用车型不能为空',
      //   duration: 2000,
      // });
      dd.alert({ title: '警告', content: '适用车型不能为空', buttonText: '我知道了'});
    }else if(res.onumber==""||res.onumber==null){
      //  dd.showToast({
      //   content: '采购数量不能为空',
      //   duration: 2000,
      // });
      dd.alert({ title: '警告', content: '采购数量不能为空', buttonText: '我知道了'});
    }else if(res.ounit==""||res.ounit==null){
       dd.showToast({
        content: '单位不能为空',
        duration: 2000,
      });
      dd.alert({ title: '警告', content: '单位不能为空', buttonText: '我知道了'});
    }else if(res.oprice==""||res.oprice==null){
      //  dd.showToast({
      //   content: '采购单价不能为空',
      //   duration: 2000,
      // });
       dd.alert({ title: '警告', content: '采购单价不能为空', buttonText: '我知道了'});
    }else if (_this.data.i) {//说明是重复点击了提交按钮
      dd.showToast({
        content: '数据正在提交中,请耐心等待,不要多次点击提交按钮,这是没用的',
        duration: 2000,
      });
    } else {
      _this.setData({//说明是第一次进来,可以提交
        i: true
      });

      app.ajaxSubmit(app.urlApi.st_add_caiGou, "POST", res, function(e) {/*****************************申请提交接口******************************/
        console.log("提交后返回的信息：", e);
        dd.showToast({
          content: '提交成功',
          duration: 2000,
        });
        setTimeout(function() {
          dd.hideLoading();
          console.log("调用延迟");
          dd.navigateBack({//页面跳转回
            delta: 1,
          });
        }, 1000);
      }, true, false);



    }
  }
});
