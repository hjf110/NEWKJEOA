Page({
  data: {
    text:"好的"
  },
  onLoad() {},
  onCounterPlusOne(data,type){       
    console.log("照片为----"+data.join(","));
    console.log("照片类型为----"+type);
  }
});
