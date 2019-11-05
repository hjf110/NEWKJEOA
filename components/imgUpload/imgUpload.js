const app = getApp();

Component({
  data: {
    picShow:[],//显示照片
    pic:[],//照片数组
  },
  props: {
    picName:"暂无",
    onGetImg: (data,type) => {
      console.log(data,type);
    },
    picType:"t1",//图片类型
    cameraType:"1",//调用摄像头的类型
    isLookPic:false,//(1为拍照,2为查看照片)是否是查看照片
    LookPic:[],//查看照片数组
  },
  methods: {
    look(res) {//图片浏览
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

    // this.props.getPic(ccc,type);

  },
  takePhoto(res) {//拍照
    console.log("成功后-----res", res);
    var that = this;
    var val_a = res.currentTarget.dataset['vala'];//照片名称数组
    var val_b = res.currentTarget.dataset['valb'];//照片显示数组
    var type = res.currentTarget.dataset['type'];//照片类型
    // console.log("成功后-----test", test);
    let ccType = false;
    if(that.props.cameraType=="1"){
      ccType = true;
    }else if(that.props.cameraType=="2"){
       ccType = false;
    }


    app.takePhoto(val_a, val_b,function(res, res2) {
      console.log("成功后-----one", res);
      console.log("成功后-----two", res2);
      var ccc = res;
      var ddd = res2;

    
        that.setData({
          pic: ccc,
          picShow: ddd
        });
 
       that.props.onGetImg(ccc,type);
       
    },ccType);
  },
  delect(res) {//删除
    var idx = res.currentTarget.dataset['index'];
    console.log("索引值", idx);
    var that = this;
    var imglist = res.currentTarget.dataset['vala'];//照片名称数组
    var imglist_show = res.currentTarget.dataset['valb'];//照片显示数组
    var type = res.currentTarget.dataset['type'];//照片类型

    imglist = app.del(idx, imglist);
    imglist_show = app.del(idx, imglist_show);

  
      that.setData({
        pic: imglist,
        picShow: imglist_show
      });

      that.props.onGetImg(imglist,type);

  
  },
  },
});
