const app = getApp();


Page({
  data: {
    i: false,//用来判断是否重复提交
    form: {
      oname: "",//调拨物料名称
      ospecification: "",//物料规格
      ofitfor: "",//适用车型
      resourceRepo:"",//调出仓库
      destinationRepo:"",//调入仓库
      onumber:"",//调拨数量
      ounit:"",//单位
      oprice:"",//单价
      oplocation:"",//产地
      ovender:"",//供应商
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
    }else if(res.ospecification==""||res.ospecification==null){
      //  dd.showToast({
      //   content: '适用车型不能为空',
      //   duration: 2000,
      // });
      dd.alert({ title: '警告', content: '物料规格不能为空', buttonText: '我知道了'});
    }else if(res.resourceRepo==""||res.resourceRepo==null){
      //  dd.showToast({
      //   content: '适用车型不能为空',
      //   duration: 2000,
      // });
      dd.alert({ title: '警告', content: '调出仓库不能为空', buttonText: '我知道了'});
    }else if(res.destinationRepo==""||res.destinationRepo==null){
      //  dd.showToast({
      //   content: '适用车型不能为空',
      //   duration: 2000,
      // });
      dd.alert({ title: '警告', content: '调入仓库不能为空', buttonText: '我知道了'});
    }else if(res.onumber==""||res.onumber==null){
      //  dd.showToast({
      //   content: '采购数量不能为空',
      //   duration: 2000,
      // });
      dd.alert({ title: '警告', content: '调拨数量不能为空', buttonText: '我知道了'});
    }else {
      _this.setData({//说明是第一次进来,可以提交
        i: true
      });

      app.ajaxSubmit(app.urlApi.st_add_diaoBo, "POST", res, function(e) {/*****************************申请提交接口******************************/
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
