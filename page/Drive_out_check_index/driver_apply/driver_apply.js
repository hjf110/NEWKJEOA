var app = getApp();

Page({
  data: {
    onclick: true,
    towhat: 0,
    formFuntion: "self_tool_finish",
    id: "",//单据id
    docno: "",//流程编号
    runNumber: "",//单据编号
    vmUser: "",//处理人
    vmDate: "",//处理时间
    is_next: true,//是否在第一个页面显示下一步
    next: "下一步",
    pre: "上一步",
    handle: true,//是否是处理页面
    back: true,//是否是查看页面
    back_b: true,
    zhijian_b: true,
    finish: false,//是否是申请提交页面
    is_License_plate: 0,
    License_plate: "",//车牌号
    d_name: "",//驾驶员姓名
    address: "",//定位的地址
    now_time: "",//当前时间
    test: ["h", "a", "c", "v"],
    img_http: "",//显示图片的网址
    s_y: 0,//滚动条位置
    scrollTop: 0,
    tool_position_type: "",//工具箱位置在哪里(默认右边)
    is_small_car: false,//是否是小车
    items: [
      { name: 'problem', value: 0, text: '无', checked: true },
      { name: 'problem', value: 1, text: '有', }
    ],
    // 显示隐藏部分
    one_show: false,//第一步显示

    //左前部分-------------------

    left_top_show: true,//左前隐藏
    left_top_problem: 0,//左前有无问题(默认0无问题)
    left_top_problem_text: "",
    left_top_problem_type: "",
    left_top_problem_write: true,//左前问题描述区域默认隐藏
    //1.左前轮*******
    left_front_wheel: [],//左前轮提交照片名称数组
    left_front_wheel_showList: [],//左前轮提交照片显示数组
    //2.机油标尺******
    dipstick: [],//机油标尺提交照片名称数组
    dipstick_showList: [],//机油标尺提交照片显示数组
    //3.皮带松紧度*****
    belt_tightness: [],//皮带松紧度提交照片名称数组
    belt_tightness_showList: [],//皮带松紧度提交照片显示数组
    //4.冷却液高度******
    coolant_height: [],//冷却液高度提交照片名称数组
    coolant_height_showList: [],//冷却液高度提交照片显示数组
    //5.机舱漏油情况******
    oil_leak: [],//机舱漏油情况提交照片名称数组
    oil_leak_showList: [],//机舱漏油情况提交照片显示数组
    //6.左前问题照片
    one_problem: [],
    one_problem_showList: [],
    //7.处理意见
    oneHandlingOpinions: "",
    oneHandlingOpinions_type: true,


    //左后部分--------------------
    left_bottom_show: true,//左后隐藏
    left_bottom_problem: 0,//左后有无问题(默认0无问题)
    left_bottom_problem_text: "",
    left_bottom_problem_type: "",
    left_bottom_problem_write: true,//左后问题描述区域默认隐藏
    //1.左后轮******
    left_rear_wheel: [],//左后轮提交照片名称数组
    left_rear_wheel_showList: [],//左后轮提交照片显示数组
    //2.左后辅助轮*****
    left_rear_auxiliary_wheel: [],//左后辅助轮提交照片名称数组
    left_rear_auxiliary_wheel_showList: [],//左后辅助轮提交照片显示数组
    //3.左传动轴*******
    left_transmission_shaft: [],//左传动轴提交照片名称数组
    left_transmission_shaft_showList: [],//左传动轴提交照片显示数组
    //4.后车牌************
    rear_license_plate: [],//后车牌提交照片名称数组
    rear_license_plate_showList: [],//后车牌提交照片显示数组
    //5.左后问题照片
    two_pic: [],
    two_pic_showList: [],
    //6.处理意见
    twoHandlingOpinions: "",
    twoHandlingOpinions_type: true,


    //右后部分---------------------
    right_bottom_show: true,//右后隐藏
    right_bottom_problem: 0,//右后有无问题(默认0无问题)
    right_bottom_problem_text: "",
    right_bottom_problem_type: "",
    right_bottom_problem_write: true,//右后问题描述区域默认隐藏
    //1.右后轮*********
    right_rear_wheel: [],
    right_rear_wheel_showList: [],
    //2.右传动轴*******
    right_transmission_shaft: [],
    right_transmission_shaft_showList: [],
    //3.右后辅助轮*******
    right_rear_auxiliary_wheel: [],
    right_rear_auxiliary_wheel_showList: [],
    //4.右后问题照片******
    three_pic: [],
    three_pic_showList: [],
    //5.处理意见
    threeHandlingOpinions: "",
    threeHandlingOpinions_type: true,



    //右前部分---------------------
    right_top_show: true,//右后隐藏
    right_top_problem: 0,//右后有无问题(默认0无问题)
    right_top_problem_text: "",
    right_top_problem_type: "",
    right_top_problem_write: true,//右后问题描述区域默认隐藏
    //1.右前轮*******
    right_front_wheel: [],
    right_front_wheel_showList: [],
    //2.前车牌*********
    front_license_plate: [],
    front_license_plate_showList: [],
    //3.雨刷***********
    wiper: [],
    wiper_showList: [],
    //4.右前问题照片
    four_pic: [],
    four_pic_showList: [],
    //5.处理意见
    fourHandlingOpinions: "",
    fourHandlingOpinions_type: true,













    //工具箱一部分---------------------
    tool_one_show: true,//工具箱一隐藏
    tool_one_problem: 0,//工具箱一有无问题(默认0无问题)
    tool_one_problem_text: "",
    tool_one_problem_type: "",
    tool_one_problem_write: true,//工具箱一问题描述区域默认隐藏
    //1.千斤顶********
    lifting_jack: [],
    lifting_jack_showList: [],
    //2.十字套筒*******
    cross_sleeve: [],
    cross_sleeve_showList: [],
    //3.搭电线*********
    wiring: [],
    wiring_showList: [],
    //4.大绑带*********
    big_band: [],
    big_band_showList: [],
    //5.小绑带*******
    small_band: [],
    small_band_showList: [],
    //6.工具箱一(主)问题照片*****
    five_pic: [],
    five_pic_showList: [],
    //7.处理意见
    fiveHandlingOpinions: "",
    fiveHandlingOpinions_type: true,






    //工具箱二部分---------------------
    tool_two_show: true,//工具箱二隐藏
    tool_two_problem: 0,//工具箱二有无问题(默认0无问题)
    tool_two_problem_text: "",
    tool_two_problem_type: "",
    tool_two_problem_write: true,//工具箱二问题描述区域默认隐藏

    //1.千斤顶********
    v_lifting_jack: [],
    v_lifting_jack_showList: [],
    //2.十字套筒*******
    v_cross_sleeve: [],
    v_cross_sleeve_showList: [],
    //3.搭电线*********
    v_wiring: [],
    v_wiring_showList: [],
    //4.大绑带*********
    v_big_band: [],
    v_big_band_showList: [],
    //5.小绑带*******
    v_small_band: [],
    v_small_band_showList: [],
    //6.工具箱一(副)问题照片*****
    v_five_pic: [],
    v_five_pic_showList: [],
    //7.处理意见
    sevenHandlingOpinions: "",
    sevenHandlingOpinions_type: true,









    //自生车内工具部分---------------------
    self_tool_show: true,//自生车内工具隐藏
    self_tool_problem: 0,//自生车内工具有无问题(默认0无问题)
    self_tool_problem_text: "",
    self_tool_problem_type: "",
    self_tool_problem_write: true,//自生车内工具问题描述区域默认隐藏
    //1.头灯******
    headlamp: [],
    headlamp_showList: [],
    //2.搭电宝电量*******
    power_supply: [],
    power_supply_showList: [],
    //3.形象自拍照********
    selfie: [],
    selfie_showList: [],
    //4.自生车内工具问题照片
    six_problem: [],
    six_problem_showList: [],
    //7.处理意见
    sixHandlingOpinions: "",
    sixHandlingOpinions_type: true,


    //质监部分---------------------------------------
    zhijian: true,//质监意见显示隐藏
    qsUser: "",//姓名
    qsDate: "",//处理时间
    qsProblem: "",//处理意见




    tool_type: "",//工具箱位置文字提示

  },
  zhi_jian() {
    this.setData({
      self_tool_show: true,//自车隐藏
      zhijian: false//质监意见显示
    });
  },
  zhi_jian_2() {
    this.setData({
      self_tool_show: false,//自车显示
      zhijian: true//质监意见隐藏
    });
  },
  onShow() {
    // dd.showLoading({
    //   content: '加载中...',
    //   delay: 1000,
    // });
  },
  onLoad(res) {


    var that = this;
    //获取地址的方法
    var d_id = res.id;

    var towhat = res.towhat;


    that.setData({//赋值id
      id: d_id,
      towhat: towhat
    });


    console.log("id为---", d_id);
    var d_type = res.type;




    app.getUserPower(app.urlApi.d_getUserPower, function() {

      //数据开始-------------------------------------------------------------------------------------------------------------------------------
      console.log("type为---", d_type);
      if (d_id == null || d_id == "") {//是提交申请页面
        app.get_position(function(res) {
          console.log(res);
          that.setData({
            address: res
          });
        });
        //获取姓名
        that.setData({
          d_name: app.userinfo.name
        });
        //获取当前时间
        var timestamp = (new Date()).getTime();
        var time = app.getLocalTime(timestamp);
        that.setData({
          now_time: time
        });
        app.ajaxSubmit(app.urlApi.d_check_License_plate, "GET", null, function(res) {
          console.log("验证车牌号返回的信息-----", res);

          // dd.showLoading({
          //   content: '数据加载中'
          // });
          that.setData({
            is_License_plate: 1,
            is_next: false,
            License_plate: res.data.licensePlate

          });
          var ccc = res.data.toolboxLocation;
          var aaa;
          if (ccc == 1) {
            aaa = "左";
            that.setData({
              tool_type: "左侧"
            });
          } else if (ccc == 2) {
            aaa = "右";
            that.setData({
              tool_type: "右侧"
            });
          } else if (ccc == 3) {
            aaa = "左右";
            that.setData({
              tool_type: "左侧"
            });
          } else if (ccc == 4) {
            aaa = "后";
            that.setData({
              tool_type: "后备箱"
            });
          }
          // var aaa = "右"
          if (aaa == "后") {
            that.setData({
              is_small_car: true
            });
          }
          that.setData({
            tool_position_type: aaa
          });
          console.log("工具箱位置---", that.data.tool_position_type);
          //dd.hideLoading();
        }, true)
      } else if (d_id != null && d_id != "") {//是查看页面

        //dd.hideLoading();
        // dd.showLoading({
        //   content: '数据加载中...'
        // });

        that.setData({
          is_next: false,
          next: "下一页",
          pre: "上一页",
          finish: true
        });


        if (d_type == 1) {//是处理页面
          that.setData({
            handle: false,
            formFuntion: "handle_info"
          });
        } else {
          that.setData({//是查看页面
            back: false,
            back_b: false
          });
        }
        //获取值(赋值)
        app.ajaxSubmit(app.urlApi.d_select_byid, "GET", { id: d_id }, function(res) {
          console.log("根据id获得的数据为-----", res);
          console.log(1111);
          // dd.showLoading({
          //   content: '数据加载中...'
          // });
          var aa = res.data;
          app.ajaxSubmit(app.urlApi.d_check_License_plate, "GET", { licensePlate: aa.licensePlate }, function(res) {
            console.log("验证车牌号返回的信息-----", res);

            // dd.showLoading({
            //   content: '数据加载中...'
            // });


            that.setData({
              is_License_plate: 1,
              is_next: false
            });
            var ccc = res.data.toolboxLocation;
            var aaa;
            if (ccc == 1) {
              aaa = "左";
              that.setData({
                tool_type: "左侧"
              });
            } else if (ccc == 2) {
              aaa = "右";
              that.setData({
                tool_type: "右侧"
              });
            } else if (ccc == 3) {
              aaa = "左右";
              that.setData({
                tool_type: "左侧"
              });
            } else if (ccc == 4) {
              aaa = "后";
              that.setData({
                tool_type: "后备箱"
              });
            }

            // var aaa = "右"
            if (aaa == "后") {
              that.setData({
                is_small_car: true
              });
            }
            that.setData({
              tool_position_type: aaa
            });
            console.log("工具箱位置---", that.data.tool_position_type);
            //dd.hideLoading();
          }, true);





          //赋值基础信息和照片
          that.setData({
            vmUser: aa.vmUser,//车管处理人
            vmDate: app.getLocalTime(aa.vmDate),//车管处理时间
            docno: aa.docno,//流程编号
            runNumber: aa.runNumber,//单据编号
            d_name: aa.createUser.loginName,//姓名
            now_time: app.getLocalTime(aa.createDate),//检查时间
            address: aa.location,//位置
            License_plate: aa.licensePlate,//车牌号
            left_front_wheel_showList: app.getimgUrl(aa.leftFrontWheel),//左前轮
            dipstick_showList: app.getimgUrl(aa.dipstick),//机油标尺度
            belt_tightness_showList: app.getimgUrl(aa.beltTightness),//皮带松紧度
            coolant_height_showList: app.getimgUrl(aa.coolantHeight),//冷却液高度
            oil_leak_showList: app.getimgUrl(aa.oilLeak),//机箱漏油情况

            lifting_jack_showList: app.getimgUrl(aa.liftingJack),//千斤顶(主)
            cross_sleeve_showList: app.getimgUrl(aa.crossSleeve),//十字套筒(主)
            wiring_showList: app.getimgUrl(aa.wiring),//搭电线(主)
            big_band_showList: app.getimgUrl(aa.bigBand),//大绑带(主)
            small_band_showList: app.getimgUrl(aa.smallBand),//小绑带(主)

            left_rear_wheel_showList: app.getimgUrl(aa.leftRearWheel),//左后轮
            left_rear_auxiliary_wheel_showList: app.getimgUrl(aa.leftRearAuxiliaryWheel),//左后辅助轮
            left_transmission_shaft_showList: app.getimgUrl(aa.leftTransmissionShaft),//左传动轴
            rear_license_plate_showList: app.getimgUrl(aa.rearLicensePlate),//后车牌

            right_rear_wheel_showList: app.getimgUrl(aa.rightRearWheel),//右后轮
            right_transmission_shaft_showList: app.getimgUrl(aa.rightTransmissionShaft),//右传动轴
            right_rear_auxiliary_wheel_showList: app.getimgUrl(aa.rightRearAuxiliaryWheel),//右后辅助轮

            right_front_wheel_showList: app.getimgUrl(aa.rightFrontWheel),//右前轮
            front_license_plate_showList: app.getimgUrl(aa.frontLicensePlate),//前车牌
            wiper_showList: app.getimgUrl(aa.wiper),//雨刷

            v_lifting_jack_showList: app.getimgUrl(aa.assLiftingJack),//副千斤顶
            v_cross_sleeve_showList: app.getimgUrl(aa.assCrossSleeve),//副十字套筒
            v_wiring_showList: app.getimgUrl(aa.assWiring),//副搭电线
            v_big_band_showList: app.getimgUrl(aa.assBigBand),//副大绑带
            v_small_band_showList: app.getimgUrl(aa.assSmallBand),//副小绑带

            headlamp_showList: app.getimgUrl(aa.headlamp),//头灯
            power_supply_showList: app.getimgUrl(aa.powerSupply),//搭电宝电量
            selfie_showList: app.getimgUrl(aa.selfie),//形象自拍照

          });
          //问题部分
          //1
          if (aa.oneProblem == null || aa.oneProblem == "") {
            that.setData({
              left_top_problem_type: "无问题"
            });
          } else {
            that.setData({
              left_top_problem_write: false,
              left_top_problem_type: "有问题",
              left_top_problem_text: aa.oneProblem,
              one_problem_showList: app.getimgUrl(aa.onePic),//p1问题照片
            });
          }
          //2
          if (aa.twoProblem == null || aa.twoProblem == "") {
            that.setData({
              left_bottom_problem_type: "无问题"
            });
          } else {
            that.setData({
              left_bottom_problem_write: false,
              left_bottom_problem_type: "有问题",
              left_bottom_problem_text: aa.twoProblem,
              two_pic_showList: app.getimgUrl(aa.twoPic),//左后问题照片
            });
          }
          //3
          if (aa.threeProblem == null || aa.threeProblem == "") {
            that.setData({
              right_bottom_problem_type: "无问题"
            });
          } else {
            that.setData({
              right_bottom_problem_write: false,
              right_bottom_problem_type: "有问题",
              right_bottom_problem_text: aa.threeProblem,
              three_pic_showList: app.getimgUrl(aa.threePic),//右后问题照片
            });
          }
          //4
          if (aa.fourProblem == null || aa.fourProblem == "") {
            that.setData({
              right_top_problem_type: "无问题"
            });
          } else {
            that.setData({
              right_top_problem_write: false,
              right_top_problem_type: "有问题",
              right_top_problem_text: aa.fourProblem,
              four_pic_showList: app.getimgUrl(aa.fourPic),//右前问题照片
            });
          }
          //5
          if (aa.fiveProblem == null || aa.fiveProblem == "") {
            that.setData({
              tool_one_problem_type: "无问题"
            });
          } else {
            that.setData({
              tool_one_problem_write: false,
              tool_one_problem_type: "有问题",
              tool_one_problem_text: aa.fiveProblem,
              five_pic_showList: app.getimgUrl(aa.fivePic),//工具箱(主)问题照片
            });
          }
          //6
          if (aa.sixProblem == null || aa.sixProblem == "") {
            that.setData({
              self_tool_problem_type: "无问题"
            });
          } else {
            that.setData({
              self_tool_problem_write: false,
              self_tool_problem_type: "有问题",
              self_tool_problem_text: aa.sixProblem,
              six_problem_showList: app.getimgUrl(aa.sixPic),//形象自拍照问题照片
            });
          }
          //7
          if (aa.sevenProblem == null || aa.sevenProblem == "") {
            that.setData({
              tool_two_problem_type: "无问题"
            });
          } else {
            that.setData({
              tool_two_problem_write: false,
              tool_two_problem_type: "有问题",
              tool_two_problem_text: aa.sevenProblem,
              v_five_pic_showList: app.getimgUrl(aa.sevenPic),//P7补充照片
            });
          }
          if (d_type == null || d_type == "") {//是否是查看页面
            that.setData({
              qsUser: aa.qsUser,
              qsDate: app.getLocalTime(aa.qsDate),
              qsProblem: aa.qsProblem
            });
            //处理意见赋值
            if (aa.oneHandlingOpinions != null && aa.oneHandlingOpinions != "") {
              that.setData({
                oneHandlingOpinions_type: false,
                oneHandlingOpinions: aa.oneHandlingOpinions
              });
            } else if (aa.twoHandlingOpinions != null && aa.twoHandlingOpinions != "") {
              that.setData({
                twoHandlingOpinions_type: false,
                twoHandlingOpinions: aa.twoHandlingOpinions
              });
            } else if (aa.threeHandlingOpinions != null && aa.threeHandlingOpinions != "") {
              that.setData({
                threeHandlingOpinions_type: false,
                threeHandlingOpinions: aa.threeHandlingOpinions
              });
            } else if (aa.fourHandlingOpinions != null && aa.fourHandlingOpinions != "") {
              that.setData({
                fourHandlingOpinions_type: false,
                fourHandlingOpinions: aa.fourHandlingOpinions
              });
            } else if (aa.fiveHandlingOpinions != null && aa.fiveHandlingOpinions != "") {
              that.setData({
                fiveHandlingOpinions_type: false,
                fiveHandlingOpinions: aa.fiveHandlingOpinions
              });
            } else if (aa.sevenHandlingOpinions != null && aa.sevenHandlingOpinions != "") {
              that.setData({
                sevenHandlingOpinions_type: false,
                sevenHandlingOpinions: aa.sevenHandlingOpinions
              });
            } else if (aa.sixHandlingOpinions != null && aa.sixHandlingOpinions != "") {
              that.setData({
                sixHandlingOpinions_type: false,
                sixHandlingOpinions: aa.sixHandlingOpinions
              });
            }
          }
          // var yourString = "12, 25, 24, 234, 234";
          // var result = yourString.split(",");
          // console.log("分割后的字符串为----", result);
          console.log(222222);
          //  dd.hideLoading();//隐藏加载框
        }, true)
      }

      var img_url = app.urlApi.url_http;
      console.log("img的http地址----", img_url);
      //赋值图片网址
      that.setData({
        img_http: img_url
      });
      //数据结束****************************************************************************************************************************************************
    });
  },
  //车牌号双向绑定
  License_plate_value(e) {
    console.log(e.detail.value);
    this.setData({
      License_plate: e.detail.value
    });
  },
  //检查车牌号
  check_License_plate() {
    var that = this;
    var lp = this.data.License_plate;
    app.ajaxSubmit(app.urlApi.d_check_License_plate, "GET", { licensePlate: lp }, function(res) {
      console.log("验证车牌号返回的信息-----", res);

      that.setData({
        is_License_plate: 1,
        is_next: false
      });
      var ccc = res.data.toolboxLocation;
      var aaa;
      if (ccc == 1) {
        aaa = "左";
      } else if (ccc == 2) {
        aaa = "右";
      } else if (ccc == 3) {
        aaa = "左右";
      } else if (ccc == 4) {
        aaa = "后";
      }


      // var aaa = "右"
      if (aaa == "后") {
        this.setData({
          is_small_car: true
        });
      }
      that.setData({
        tool_position_type: aaa
      });
      console.log("工具箱位置---", that.data.tool_position_type);

    }, true)
  },
  //通用照片看,拍,删方法/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*//*//
  yl: function(res) {//图片浏览
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
  takePhoto(res) {//拍照
    console.log("成功后-----res", res);
    var that = this;
    var val_a = res.currentTarget.dataset['vala'];//照片名称数组
    var val_b = res.currentTarget.dataset['valb'];//照片显示数组
    var type = res.currentTarget.dataset['type'];//照片类型
    // console.log("成功后-----test", test);
    app.takePhoto(val_a, val_b, function(res, res2) {
      console.log("成功后-----one", res);
      console.log("成功后-----two", res2);
      var ccc = res;
      var ddd = res2;
      //左后部分---------------------------------------
      if (type == "a1") {//左后轮照片
        that.setData({
          left_rear_wheel: ccc,
          left_rear_wheel_showList: ddd
        });
      } else if (type == "a2") {//左后辅助轮照片
        that.setData({
          left_rear_auxiliary_wheel: ccc,
          left_rear_auxiliary_wheel_showList: ddd
        });
      } else if (type == "a3") {//左后辅助轮照片
        that.setData({
          left_transmission_shaft: ccc,
          left_transmission_shaft_showList: ddd
        });
      } else if (type == "a4") {//左车牌照片
        that.setData({
          rear_license_plate: ccc,
          rear_license_plate_showList: ddd
        });
      } else if (type == "aa5") {//左后问题照片
        that.setData({
          two_pic: ccc,
          two_pic_showList: ddd
        });
      }
      //右后部分------------------------------------
      else if (type == "b1") {//右后轮照片
        that.setData({
          right_rear_wheel: ccc,
          right_rear_wheel_showList: ddd
        });
      } else if (type == "b2") {//右后传动轴照片
        that.setData({
          right_transmission_shaft: ccc,
          right_transmission_shaft_showList: ddd
        });
      } else if (type == "b3") {//右后辅助轮照片
        that.setData({
          right_rear_auxiliary_wheel: ccc,
          right_rear_auxiliary_wheel_showList: ddd
        });
      } else if (type == "bb4") {//右后问题照片
        that.setData({
          three_pic: ccc,
          three_pic_showList: ddd
        });
      }
      //右前部分-----------------------------------
      else if (type == "c1") {//右前轮照片
        that.setData({
          right_front_wheel: ccc,
          right_front_wheel_showList: ddd
        });
      } else if (type == "c2") {//前车牌照片
        that.setData({
          front_license_plate: ccc,
          front_license_plate_showList: ddd
        });
      } else if (type == "c3") {//雨刷照片
        that.setData({
          wiper: ccc,
          wiper_showList: ddd
        });
      } else if (type == "cc4") {//右前问题照片
        that.setData({
          four_pic: ccc,
          four_pic_showList: ddd
        });
      }
      //工具箱一(主)-------------------------------------------
      else if (type == "d1") {//千斤顶照片
        that.setData({
          lifting_jack: ccc,
          lifting_jack_showList: ddd
        });
      } else if (type == "d2") {//十字套筒照片
        that.setData({
          cross_sleeve: ccc,
          cross_sleeve_showList: ddd
        });
      } else if (type == "d3") {//搭电线照片
        that.setData({
          wiring: ccc,
          wiring_showList: ddd
        });
      } else if (type == "d4") {//大绑带照片
        that.setData({
          big_band: ccc,
          big_band_showList: ddd
        });
      } else if (type == "d5") {//小绑带照片
        that.setData({
          small_band: ccc,
          small_band_showList: ddd
        });
      } else if (type == "dd6") {//工具箱一(主)问题照片
        that.setData({
          five_pic: ccc,
          five_pic_showList: ddd
        });
      }
      //工具箱二(副)-------------------------------------------
      else if (type == "e1") {//千斤顶照片
        that.setData({
          v_lifting_jack: ccc,
          v_lifting_jack_showList: ddd
        });
      } else if (type == "e2") {//十字套筒照片
        that.setData({
          v_cross_sleeve: ccc,
          v_cross_sleeve_showList: ddd
        });
      } else if (type == "e3") {//搭电线照片
        that.setData({
          v_wiring: ccc,
          v_wiring_showList: ddd
        });
      } else if (type == "e4") {//大绑带照片
        that.setData({
          v_big_band: ccc,
          v_big_band_showList: ddd
        });
      } else if (type == "e5") {//小绑带照片
        that.setData({
          v_small_band: ccc,
          v_small_band_showList: ddd
        });
      } else if (type == "ee6") {//工具箱一(主)问题照片
        that.setData({
          v_five_pic: ccc,
          v_five_pic_showList: ddd
        });
      }
      //自生车内工具-------------------------------------------------
      else if (type == "f1") {//头灯照片
        that.setData({
          headlamp: ccc,
          headlamp_showList: ddd
        });
      } else if (type == "f2") {//搭电宝电量照片
        that.setData({
          power_supply: ccc,
          power_supply_showList: ddd
        });
      } else if (type == "f3") {//形象自拍照片
        that.setData({
          selfie: ccc,
          selfie_showList: ddd
        });
      } else if (type == "ff4") {//自生车内工具问题照片
        that.setData({
          six_problem: ccc,
          six_problem_showList: ddd
        });
      }
      //左前部分---------------------------------------------------------
      else if (type == "zz6") {//左前问题照片
        that.setData({
          one_problem: ccc,
          one_problem_showList: ddd
        });
      } else if (type == "z1") {//左前轮照片
        that.setData({
          left_front_wheel: ccc,
          left_front_wheel_showList: ddd
        });
      } else if (type == "z2") {//机油标尺照片
        that.setData({
          dipstick: ccc,
          dipstick_showList: ddd
        });
      } else if (type == "z3") {//皮带松紧度照片
        that.setData({
          belt_tightness: ccc,
          belt_tightness_showList: ddd
        });
      } else if (type == "z4") {//冷却液高度照片
        that.setData({
          coolant_height: ccc,
          coolant_height_showList: ddd
        });
      } else if (type == "z5") {//机舱漏油情况照片
        that.setData({
          oil_leak: ccc,
          oil_leak_showList: ddd
        });
      }


    });


    // console.log("图片地址---", this.data.coolant_height);
    // console.log("图片展示地址---", this.data.coolant_height_showList);
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
    //左后部分---------------------------------------
    if (type == "a1") {//左后轮照片
      that.setData({
        left_rear_wheel: imglist,
        left_rear_wheel_showList: imglist_show
      });
    } else if (type == "a2") {//左后辅助轮照片
      that.setData({
        left_rear_auxiliary_wheel: imglist,
        left_rear_auxiliary_wheel_showList: imglist_show
      });
    } else if (type == "a3") {//左后辅助轮照片
      that.setData({
        left_transmission_shaft: imglist,
        left_transmission_shaft_showList: imglist_show
      });
    } else if (type == "a4") {//后车牌照片
      that.setData({
        rear_license_plate: imglist,
        rear_license_plate_showList: imglist_show
      });
    } else if (type == "aa5") {//左后问题照片
      that.setData({
        two_pic: imglist,
        two_pic_showList: imglist_show
      });
    }
    //右后部分---------------------------------------------
    else if (type == "b1") {//右后轮照片
      that.setData({
        right_rear_wheel: imglist,
        right_rear_wheel_showList: imglist_show
      });
    } else if (type == "b2") {//右后轮照片
      that.setData({
        right_transmission_shaft: imglist,
        right_transmission_shaft_showList: imglist_show
      });
    } else if (type == "b3") {//右后辅助轮照片
      that.setData({
        right_rear_auxiliary_wheel: imglist,
        right_rear_auxiliary_wheel_showList: imglist_show
      });
    } else if (type == "bb4") {//右后问题照片
      that.setData({
        three_pic: imglist,
        three_pic_showList: imglist_show
      });
    }
    //右前部分-----------------------------------
    else if (type == "c1") {//右前轮照片
      that.setData({
        right_front_wheel: imglist,
        right_front_wheel_showList: imglist_show
      });
    } else if (type == "c2") {//前车牌照片
      that.setData({
        front_license_plate: imglist,
        front_license_plate_showList: imglist_show
      });
    } else if (type == "c3") {//雨刷照片
      that.setData({
        wiper: imglist,
        wiper_showList: imglist_show
      });
    } else if (type == "cc4") {//右前问题照片
      that.setData({
        four_pic: imglist,
        four_pic_showList: imglist_show
      });
    }
    //工具箱一(主)-------------------------------------------
    else if (type == "d1") {//千斤顶照片
      that.setData({
        lifting_jack: imglist,
        lifting_jack_showList: imglist_show
      });
    } else if (type == "d2") {//十字套筒照片
      that.setData({
        cross_sleeve: imglist,
        cross_sleeve_showList: imglist_show
      });
    } else if (type == "d3") {//搭电线照片
      that.setData({
        wiring: imglist,
        wiring_showList: imglist_show
      });
    } else if (type == "d4") {//大绑带照片
      that.setData({
        big_band: imglist,
        big_band_showList: imglist_show
      });
    } else if (type == "d5") {//小绑带照片
      that.setData({
        small_band: imglist,
        small_band_showList: imglist_show
      });
    } else if (type == "dd6") {//工具箱一(主)问题照片
      that.setData({
        five_pic: imglist,
        five_pic_showList: imglist_show
      });
    }
    //工具箱二(副)-------------------------------------------
    else if (type == "e1") {//千斤顶照片
      that.setData({
        v_lifting_jack: imglist,
        v_lifting_jack_showList: imglist_show
      });
    } else if (type == "e2") {//十字套筒照片
      that.setData({
        v_cross_sleeve: imglist,
        v_cross_sleeve_showList: imglist_show
      });
    } else if (type == "e3") {//搭电线照片
      that.setData({
        v_wiring: imglist,
        v_wiring_showList: imglist_show
      });
    } else if (type == "e4") {//大绑带照片
      that.setData({
        v_big_band: imglist,
        v_big_band_showList: imglist_show
      });
    } else if (type == "e5") {//小绑带照片
      that.setData({
        v_small_band: imglist,
        v_small_band_showList: imglist_show
      });
    } else if (type == "ee6") {//工具箱二(副)问题照片
      that.setData({
        v_five_pic: imglist,
        v_five_pic_showList: imglist_show
      });
    }
    //自生车内工具-------------------------------------------------
    else if (type == "f1") {//头灯照片
      that.setData({
        headlamp: imglist,
        headlamp_showList: imglist_show
      });
    } else if (type == "f2") {//搭电宝电量照片
      that.setData({
        power_supply: imglist,
        power_supply_showList: imglist_show
      });
    } else if (type == "f3") {//形象自拍照片
      that.setData({
        selfie: imglist,
        selfie_showList: imglist_show
      });
    } else if (type == "ff4") {//自生车内工具问题照片
      that.setData({
        six_problem: imglist,
        six_problem_showList: imglist_show
      });
    }
    //左前部分---------------------------------------------------------
    else if (type == "zz6") {//左前问题照片
      that.setData({
        one_problem: imglist,
        one_problem_showList: imglist_show
      });
    } else if (type == "z1") {//左前轮照片
      that.setData({
        left_front_wheel: imglist,
        left_front_wheel_showList: imglist_show
      });
    } else if (type == "z2") {//机油标尺照片
      that.setData({
        dipstick: imglist,
        dipstick_showList: imglist_show
      });
    } else if (type == "z3") {//皮带松紧度照片
      that.setData({
        belt_tightness: imglist,
        belt_tightness_showList: imglist_show
      });
    } else if (type == "z4") {//冷却液高度照片
      that.setData({
        coolant_height: imglist,
        coolant_height_showList: imglist_show
      });
    } else if (type == "z5") {//机舱漏油情况照片
      that.setData({
        oil_leak: imglist,
        oil_leak_showList: imglist_show
      });
    }


    // console.log("删除后的图片数组为-------", this.data.left_front_wheel);
    // console.log("删除后的图片展示数组为-------", this.data.left_front_wheel_showList);
  },

  ///*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*//*/*//*//



  one_next() {//第一块点击了下一步
    this.setData({
      one_show: true,//第一步隐藏显示
      left_top_show: false//左前显示
    });
    this.setData({
      scrollTop: 0
    });
  },




  // 左前模块-------------------------------------------------------开始--------------
  //1.左前轮++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  yl_left_front_wheel_list: function(res) {//左前轮图片浏览
    var idx = res.currentTarget.dataset['index'];
    var that = this;
    console.log("索引值", idx);
    console.log(this.data.left_front_wheel);
    console.log(this.data.left_front_wheel[idx]);
    dd.previewImage({
      current: idx,
      urls: this.data.left_front_wheel_showList
    });
  },
  takePhoto_left_front_wheel_list() {//左前轮拍照
    var that = this;
    app.takePhoto(this.data.left_front_wheel, this.data.left_front_wheel_showList, function(res, res2) {
      console.log("成功后-----one", res);
      console.log("成功后-----two", res2);

      that.setData({
        left_front_wheel: res,
        left_front_wheel_showList: res2
      });

    });
    console.log("图片地址---", this.data.left_front_wheel);
    console.log("图片展示地址---", this.data.left_front_wheel);
  },
  delect_left_front_wheel(res) {//左前照片删除
    var idx = res.currentTarget.dataset['index'];
    var that = this;
    console.log("索引值", idx);
    var imglist = this.data.left_front_wheel;
    console.log("imglist的长度", imglist.length);
    var imglist_show = this.data.left_front_wheel_showList;
    console.log("imglist_show的长度", imglist_show.length);
    imglist = app.del(idx, imglist);
    imglist_show = app.del(idx, imglist_show);

    that.setData({
      left_front_wheel: imglist,
      left_front_wheel_showList: imglist_show
    });
    console.log("删除后的图片数组为-------", this.data.left_front_wheel);
    console.log("删除后的图片展示数组为-------", this.data.left_front_wheel_showList);
  },
  //2.机油标尺+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  yl_dipstick_showList: function(res) {//左前轮图片浏览
    var idx = res.currentTarget.dataset['index'];
    var that = this;
    console.log("索引值", idx);
    console.log(this.data.dipstick_showList);
    console.log(this.data.dipstick_showList[idx]);
    dd.previewImage({
      current: idx,
      urls: this.data.dipstick_showList
    });
  },
  takePhoto_dipstick() {//左前轮拍照
    var that = this;
    app.takePhoto(this.data.dipstick, this.data.dipstick_showList, function(res, res2) {
      console.log("成功后-----one", res);
      console.log("成功后-----two", res2);

      that.setData({
        dipstick: res,
        dipstick_showList: res2
      });

    });
    console.log("图片地址---", this.data.dipstick);
    console.log("图片展示地址---", this.data.dipstick_showList);
  },
  delect_dipstick(res) {//左前照片删除
    var idx = res.currentTarget.dataset['index'];
    var that = this;
    console.log("索引值", idx);
    var imglist = this.data.dipstick;
    var imglist_show = this.data.dipstick_showList;
    // console.log("imglist的长度", imglist.length);

    // console.log("imglist_show的长度", imglist_show.length);
    imglist = app.del(idx, imglist);
    imglist_show = app.del(idx, imglist_show);

    that.setData({
      dipstick: imglist,
      dipstick_showList: imglist_show
    });
    // console.log("删除后的图片数组为-------", this.data.left_front_wheel);
    // console.log("删除后的图片展示数组为-------", this.data.left_front_wheel_showList);
  },
  //3.皮带松紧度+++++++++++++++++++++++++++++++++++++++++++++++++
  yl_belt_tightness_showList: function(res) {//图片浏览
    var idx = res.currentTarget.dataset['index'];
    var that = this;
    console.log("索引值", idx);
    console.log(this.data.belt_tightness_showList);
    console.log(this.data.belt_tightness_showList[idx]);
    dd.previewImage({
      current: idx,
      urls: this.data.belt_tightness_showList
    });
  },
  takePhoto_belt_tightness() {//拍照
    var that = this;
    app.takePhoto(this.data.belt_tightness, this.data.belt_tightness_showList, function(res, res2) {
      console.log("成功后-----one", res);
      console.log("成功后-----two", res2);

      that.setData({
        belt_tightness: res,
        belt_tightness_showList: res2
      });

    });
    console.log("图片地址---", this.data.belt_tightness);
    console.log("图片展示地址---", this.data.belt_tightness_showList);
  },
  delect_belt_tightness(res) {//删除
    var idx = res.currentTarget.dataset['index'];
    var that = this;
    console.log("索引值", idx);
    var imglist = this.data.belt_tightness;
    var imglist_show = this.data.belt_tightness_showList;
    // console.log("imglist的长度", imglist.length);

    // console.log("imglist_show的长度", imglist_show.length);
    imglist = app.del(idx, imglist);
    imglist_show = app.del(idx, imglist_show);

    that.setData({
      belt_tightness: imglist,
      belt_tightness_showList: imglist_show
    });
    // console.log("删除后的图片数组为-------", this.data.left_front_wheel);
    // console.log("删除后的图片展示数组为-------", this.data.left_front_wheel_showList);
  },
  //4.冷却液高度++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  yl_coolant_height_showList: function(res) {//图片浏览
    var idx = res.currentTarget.dataset['index'];
    var that = this;
    console.log("索引值", idx);
    console.log(this.data.coolant_height_showList);
    console.log(this.data.coolant_height_showList[idx]);
    dd.previewImage({
      current: idx,
      urls: this.data.coolant_height_showList
    });
  },
  takePhoto_coolant_height() {//拍照
    var that = this;
    app.takePhoto(this.data.coolant_height, this.data.coolant_height_showList, function(res, res2) {
      console.log("成功后-----one", res);
      console.log("成功后-----two", res2);

      that.setData({
        coolant_height: res,
        coolant_height_showList: res2
      });

    });
    console.log("图片地址---", this.data.coolant_height);
    console.log("图片展示地址---", this.data.coolant_height_showList);
  },
  delect_coolant_height(res) {//删除
    var idx = res.currentTarget.dataset['index'];
    var that = this;
    console.log("索引值", idx);
    var imglist = this.data.coolant_height;
    var imglist_show = this.data.coolant_height_showList;
    // console.log("imglist的长度", imglist.length);

    // console.log("imglist_show的长度", imglist_show.length);
    imglist = app.del(idx, imglist);
    imglist_show = app.del(idx, imglist_show);

    that.setData({
      coolant_height: imglist,
      coolant_height_showList: imglist_show
    });
    // console.log("删除后的图片数组为-------", this.data.left_front_wheel);
    // console.log("删除后的图片展示数组为-------", this.data.left_front_wheel_showList);
  },
  //5.机舱漏油情况+++++++++++++++++++++++++++++++++++++++++++++++++++++
  yl_oil_leak_showList: function(res) {//图片浏览
    var idx = res.currentTarget.dataset['index'];
    var that = this;
    // console.log("索引值", idx);
    // console.log(this.data.oil_leak_showList);
    // console.log(this.data.oil_leak_showList[idx]);
    dd.previewImage({
      current: idx,
      urls: this.data.oil_leak_showList
    });
  },
  takePhoto_oil_leak() {//拍照
    var that = this;
    app.takePhoto(this.data.oil_leak, this.data.oil_leak_showList, function(res, res2) {
      console.log("成功后-----one", res);
      console.log("成功后-----two", res2);

      that.setData({
        oil_leak: res,
        oil_leak_showList: res2
      });

    });
    // console.log("图片地址---", this.data.coolant_height);
    // console.log("图片展示地址---", this.data.coolant_height_showList);
  },
  delect_oil_leak(res) {//删除
    var idx = res.currentTarget.dataset['index'];
    var that = this;
    console.log("索引值", idx);
    var imglist = this.data.oil_leak;
    var imglist_show = this.data.oil_leak_showList;
    // console.log("imglist的长度", imglist.length);

    // console.log("imglist_show的长度", imglist_show.length);
    imglist = app.del(idx, imglist);
    imglist_show = app.del(idx, imglist_show);

    that.setData({
      oil_leak: imglist,
      oil_leak_showList: imglist_show
    });
    // console.log("删除后的图片数组为-------", this.data.left_front_wheel);
    // console.log("删除后的图片展示数组为-------", this.data.left_front_wheel_showList);
  },

  //+++++++++++++++++++++++++++++++++++++
  //逻辑部分**********************
  left_top_problem_click(e) {//左前点击了有无问题
    console.log('你选择的框架是：', e.detail.value);
    var res = e.detail.value;
    var that = this;
    if (res == 0) {//选择了无问题
      that.setData({
        one_problem: [],
        one_problem_showList: [],
        left_top_problem_text: "",
        left_top_problem_write: true,//问题模块隐藏
        left_top_problem: 0//状态变为无问题
      });
    } else if (res == 1) {//选择了有问题
      that.setData({
        left_top_problem_write: false,//问题模块显示
        left_top_problem: 1//状态变为有问题
      });
    }
  },
  left_top_pre() {//左前点击了上一步
    this.setData({
      s_y: 0,
      one_show: false,//第一步显示
      left_top_show: true//左前隐藏
    });
    console.log("s_y-----", this.data.s_y);
  },
  left_top_next() {//左前点击了下一步
    var res = this.data.tool_position_type;
    if (res == "右") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        left_top_show: true,//左前隐藏
        left_bottom_show: false//左后显示
      });
    } else if (res == "左") {//如果工具箱在左边
      this.setData({
        scrollTop: 0,
        left_top_show: true,//左前隐藏
        tool_one_show: false//工具箱一显示
      });
    } else if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        left_top_show: true,//左前隐藏
        tool_one_show: false//工具箱一显示
      });
    } else if (res == "后") {//如果工具箱在后备箱
      this.setData({
        scrollTop: 0,
        left_top_show: true,//左前隐藏
        left_bottom_show: false//左后显示
      });
    }
  },
  //左前模块----------------------------------------------------------结束----------------

  // 左后模块-------------------------------------------------------开始--------------
  left_bottom_problem_click(e) {//左后点击了有无问题
    console.log('你选择的框架是：', e.detail.value);
    var res = e.detail.value;
    var that = this;
    if (res == 0) {//选择了无问题
      that.setData({
        left_bottom_problem_text: "",
        two_pic: [],
        two_pic_showList: [],
        left_bottom_problem_write: true,//问题模块隐藏
        left_bottom_problem: 0//状态变为无问题
      });
    } else if (res == 1) {//选择了有问题
      that.setData({
        left_bottom_problem_write: false,//问题模块显示
        left_bottom_problem: 1//状态变为有问题
      });
    }
  },
  left_bottom_pre() {//左后点击了上一步
    var res = this.data.tool_position_type;
    if (res == "右") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        left_top_show: false,//左前显示
        left_bottom_show: true,//左后隐藏
      });
    } else if (res == "左") {//如果工具箱在左边
      this.setData({
        scrollTop: 0,
        tool_one_show: false,//工具箱一显示
        left_bottom_show: true,//左后隐藏
      });
    } else if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        tool_one_show: false,//工具箱一显示
        left_bottom_show: true,//左后隐藏
      });
    } else if (res == "后") {//如果工具箱在后备箱
      this.setData({
        scrollTop: 0,
        left_top_show: false,//左前显示
        left_bottom_show: true,//左后隐藏
      });
    }
  },
  left_bottom_next() {//左前点击了下一步
    var res = this.data.tool_position_type;
    if (res == "右") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        left_bottom_show: true,//左后隐藏
        right_bottom_show: false//右后显示
      });
    } else if (res == "左") {//如果工具箱在左边
      this.setData({
        scrollTop: 0,
        left_bottom_show: true,//左后隐藏
        right_bottom_show: false//右后显示
      });
    } else if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        left_bottom_show: true,//左后隐藏
        right_bottom_show: false//右后显示
      });
    } else if (res == "后") {//如果工具箱在后备箱
      this.setData({
        scrollTop: 0,
        left_bottom_show: true,//左后隐藏
        tool_one_show: false//工具箱一显示
      });
    }
  },
  //左后模块----------------------------------------------------------结束----------------

  // 右后模块-------------------------------------------------------开始--------------
  right_bottom_problem_click(e) {//左后点击了有无问题
    console.log('你选择的框架是：', e.detail.value);
    var res = e.detail.value;
    var that = this;
    if (res == 0) {//选择了无问题
      that.setData({
        right_bottom_problem_text: "",
        three_pic: [],
        three_pic_showList: [],
        right_bottom_problem_write: true,//问题模块隐藏
        right_bottom_problem: 0//状态变为无问题
      });
    } else if (res == 1) {//选择了有问题
      that.setData({
        right_bottom_problem_write: false,//问题模块显示
        right_bottom_problem: 1//状态变为有问题
      });
    }
  },
  right_bottom_pre() {//右后点击了上一步
    var res = this.data.tool_position_type;
    if (res == "右") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        left_bottom_show: false,//左后显示
        right_bottom_show: true//右后隐藏
      });
    } else if (res == "左") {//如果工具箱在左边
      this.setData({
        scrollTop: 0,
        left_bottom_show: false,//左后显示
        right_bottom_show: true//右后隐藏
      });
    } else if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        left_bottom_show: false,//左后显示
        right_bottom_show: true//右后隐藏
      });
    } else if (res == "后") {//如果工具箱在后备箱
      this.setData({
        scrollTop: 0,
        tool_one_show: false,//工具箱一显示
        right_bottom_show: true//右后隐藏
      });
    }
  },
  right_bottom_next() {//右后点击了下一步
    var res = this.data.tool_position_type;
    if (res == "右") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        right_bottom_show: true,//右后隐藏
        tool_one_show: false//工具箱一显示
      });
    } else if (res == "左") {//如果工具箱在左边
      this.setData({
        scrollTop: 0,
        right_bottom_show: true,//右后隐藏
        right_top_show: false//右前显示
      });
    } else if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        right_bottom_show: true,//右后隐藏
        tool_two_show: false//工具箱二显示
      });
    } else if (res == "后") {//如果工具箱在后备箱
      this.setData({
        scrollTop: 0,
        right_bottom_show: true,//右后隐藏
        right_top_show: false//右前显示
      });
    }
  },

  //右后模块----------------------------------------------------------结束----------------


  // 右前模块-------------------------------------------------------开始------------------
  right_top_problem_click(e) {//左后点击了有无问题
    console.log('你选择的框架是：', e.detail.value);
    var res = e.detail.value;
    var that = this;
    if (res == 0) {//选择了无问题
      that.setData({
        right_top_problem_text: "",
        four_pic: [],
        four_pic_showList: [],
        right_top_problem_write: true,//问题模块隐藏
        right_top_problem: 0//状态变为无问题
      });
    } else if (res == 1) {//选择了有问题
      that.setData({
        right_top_problem_write: false,//问题模块显示
        right_top_problem: 1//状态变为有问题
      });
    }
  },
  right_top_pre() {//右前点击了上一步
    var res = this.data.tool_position_type;
    if (res == "右") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        tool_one_show: false,//工具箱一显示
        right_top_show: true,//右前隐藏
      });
    } else if (res == "左") {//如果工具箱在左边
      this.setData({
        scrollTop: 0,
        right_bottom_show: false,//右后显示
        right_top_show: true,//右前隐藏
      });
    } else if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        tool_two_show: false,//工具箱二显示
        right_top_show: true,//右前隐藏
      });
    } else if (res == "后") {//如果工具箱在后备箱
      this.setData({
        scrollTop: 0,
        right_bottom_show: false,//右后显示
        right_top_show: true,//右前隐藏
      });
    }
  },
  right_top_next() {//右前点击了下一步
    var that = this;
    var res = this.data.tool_position_type;
    if (res == "右") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        right_top_show: true,//右前隐藏
        self_tool_show: false//自车工具显示
      });
    } else if (res == "左") {//如果工具箱在左边
      this.setData({
        scrollTop: 0,
        right_top_show: true,//右前隐藏
        self_tool_show: false//自生车内工具箱显示
      });
    } else if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        right_top_show: true,//右前隐藏
        self_tool_show: false//自车工具显示
      });
    } else if (res == "后") {//如果工具箱在后备箱
      this.setData({
        scrollTop: 0,
        right_top_show: true,//右前隐藏
        self_tool_show: false//自生车内工具箱显示
      });
    }
    var qqq = this.data.qsUser;
    if (qqq != null && qqq != "") {
      that.setData({
        back_b: true,
        zhijian_b: false
      });
    }
  },
  //右前模块----------------------------------------------------------结束----------------

  // 工具箱一模块-------------------------------------------------------开始------------------
  tool_one_problem_click(e) {//工具箱一点击了有无问题
    console.log('你选择的框架是：', e.detail.value);
    var res = e.detail.value;
    var that = this;
    if (res == 0) {//选择了无问题
      that.setData({
        tool_one_problem_text: "",
        five_pic: [],
        five_pic_showList: [],
        tool_one_problem_write: true,//问题模块隐藏
        tool_one_problem: 0//状态变为无问题
      });
    } else if (res == 1) {//选择了有问题
      that.setData({
        tool_one_problem_write: false,//问题模块显示
        tool_one_problem: 1//状态变为有问题
      });
    }
  },
  tool_one_pre() {//左后点击了上一步
    var res = this.data.tool_position_type;
    if (res == "右") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        right_bottom_show: false,//右后显示
        tool_one_show: true//工具箱一隐藏
      });
    } else if (res == "左") {//如果工具箱在左
      this.setData({
        scrollTop: 0,
        left_top_show: false,//左前显示
        tool_one_show: true//工具箱一隐藏
      });
    } else if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        left_top_show: false,//左前显示
        tool_one_show: true//工具箱一隐藏
      });
    } else if (res == "后") {//如果工具箱在后备箱
      this.setData({
        scrollTop: 0,
        left_bottom_show: false,//左后显示
        tool_one_show: true//工具箱一隐藏
      });
    }
  },
  tool_one_next() {//工具箱一点击了下一步
    var res = this.data.tool_position_type;
    if (res == "右") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        tool_one_show: true,//工具箱一隐藏
        right_top_show: false//右前显示
      });
    } else if (res == "左") {//如果工具箱在左边
      this.setData({
        scrollTop: 0,
        tool_one_show: true,//工具箱一隐藏
        left_bottom_show: false//左后显示
      });
    } else if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        tool_one_show: true,//工具箱一隐藏
        left_bottom_show: false//左后显示
      });
    } else if (res == "后") {//如果工具箱在后备箱
      this.setData({
        scrollTop: 0,
        tool_one_show: true,//工具箱一隐藏
        right_bottom_show: false//右后显示
      });
    }
  },
  //工具箱一模块----------------------------------------------------------结束----------------


  // 工具箱二模块-------------------------------------------------------开始------------------
  tool_two_problem_click(e) {//工具箱一点击了有无问题
    console.log('你选择的框架是：', e.detail.value);
    var res = e.detail.value;
    var that = this;
    if (res == 0) {//选择了无问题
      that.setData({
        tool_two_problem_text: "",
        v_five_pic: [],
        v_five_pic_showList: [],
        tool_two_problem_write: true,//问题模块隐藏
        tool_two_problem: 0//状态变为无问题
      });
    } else if (res == 1) {//选择了有问题
      that.setData({
        tool_two_problem_write: false,//问题模块显示
        tool_two_problem: 1//状态变为有问题
      });
    }
  },
  tool_two_pre() {//左后点击了上一步
    var res = this.data.tool_position_type;

    if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        right_bottom_show: false,//右后显示
        tool_two_show: true//工具箱二隐藏
      });
    }
  },
  tool_two_next() {//工具箱一点击了下一步
    var res = this.data.tool_position_type;


    if (res == "左右") {//如果工具箱在左边和右边
      this.setData({
        scrollTop: 0,
        tool_two_show: true,//工具箱二隐藏
        right_top_show: false//右前显示
      });
    }
  },
  //工具箱二模块----------------------------------------------------------结束----------------


  // 自生车内工具模块-------------------------------------------------------开始------------------
  self_tool_problem_click(e) {// 自生车内工具点击了有无问题
    console.log('你选择的框架是：', e.detail.value);
    var res = e.detail.value;
    var that = this;
    if (res == 0) {//选择了无问题
      that.setData({
        self_tool_problem_text: "",
        six_problem: [],
        six_problem_showList: [],
        self_tool_problem_write: true,//问题模块隐藏
        self_tool_problem: 0//状态变为无问题
      });
    } else if (res == 1) {//选择了有问题
      that.setData({
        self_tool_problem_write: false,//问题模块显示
        self_tool_problem: 1//状态变为有问题
      });
    }
  },
  self_tool_pre() {// 自生车内工具点击了上一步
    var res = this.data.tool_position_type;
    if (res == "右") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        right_top_show: false,//右前显示
        self_tool_show: true//自生车内工具隐藏
      });
    } else if (res == "左") {//如果工具箱在右边
      this.setData({
        scrollTop: 0,
        right_top_show: false,//右前显示
        self_tool_show: true//自生车内工具隐藏
      });
    } else if (res == "左右") {//如果工具箱在右边和左边
      this.setData({
        scrollTop: 0,
        right_top_show: false,//右前显示
        self_tool_show: true//自生车内工具隐藏
      });
    } else if (res == "后") {//如果工具箱在后备箱
      this.setData({
        scrollTop: 0,
        right_top_show: false,//右前显示
        self_tool_show: true//自生车内工具隐藏
      });
    }
  },
  come_back() {
    // console.log("延迟调用============");
    dd.navigateBack({
      delta: 1
    })
  },
  handle_info(e) {
    var tw = this.data.towhat;
    dd.hideLoading();
    dd.showLoading({
      content: '提交中...'
    });
    var that = this;
    console.log("点击了提交");

    var res = e.detail.value;

    res.id = that.data.id;
    res.docno = that.data.docno;
    res.runNumber = that.data.runNumber;

    console.log("获得的值为-----", res);
    app.ajaxSubmit(app.urlApi.d_save, "POST", res, function(res) {
      console.log("成功", res);
      // dd.alert({ content: "成功" });
      dd.hideLoading();

      dd.vibrate({
        success: () => {
          // dd.alert({ title: '震动起来了' });
        }
      });
      dd.alert({ title: '提交成功', content: '', buttonText: '我知道了' });
      // dd.showToast({
      //   content: '提交成功,请稍等',
      //   duration: 1000,
      //   success: () => {
      //     // dd.navigateTo({
      //     //   url: '/page/promotion_index/promotion_index'
      //     // })
      //   },
      // });
      var timeOut = setTimeout(function() {
        console.log("延迟调用============");
        if (tw == 1) {
          dd.navigateBack({
            delta: 1
          })
        } else {
          dd.reLaunch({
            url: "/page/component/index"
          })
        }
      }, 1000)
    }, true, true);












  },
  self_tool_finish(e) {//检查完成

    dd.showLoading({
      content: '请稍后...',
      delay: 2000,
    });

    console.log("点击了完成");

    var res = e.detail.value;
    console.log("获得的值为-----", res);


    var tw = this.data.towhat;

    //左前部分-------------------
    //1.左前轮*******
    res.leftFrontWheel = app.tihuan(this.data.left_front_wheel);
    //2.机油标尺******
    res.dipstick = app.tihuan(this.data.dipstick);
    //3.皮带松紧度*****
    res.beltTightness = app.tihuan(this.data.belt_tightness);
    //4.冷却液高度******
    res.coolantHeight = app.tihuan(this.data.coolant_height);
    //5.机舱漏油情况******
    res.oilLeak = app.tihuan(this.data.oil_leak);
    //6.左前问题照片
    res.onePic = app.tihuan(this.data.one_problem);


    //左后部分--------------------
    //1.左后轮******
    res.leftRearWheel = app.tihuan(this.data.left_rear_wheel);
    //2.左后辅助轮*****
    res.leftRearAuxiliaryWheel = app.tihuan(this.data.left_rear_auxiliary_wheel);
    //3.左传动轴*******
    res.leftTransmissionShaft = app.tihuan(this.data.left_transmission_shaft);
    //4.后车牌************
    res.rearLicensePlate = app.tihuan(this.data.rear_license_plate);
    //5.左后问题照片
    res.twoPic = app.tihuan(this.data.two_pic);

    //右后部分---------------------
    //1.右后轮*********
    res.rightRearWheel = app.tihuan(this.data.right_rear_wheel);
    //2.右传动轴*******
    res.rightTransmissionShaft = app.tihuan(this.data.right_transmission_shaft);
    //3.右后辅助轮*******
    res.rightRearAuxiliary_wheel = app.tihuan(this.data.right_rear_auxiliary_wheel);
    //4.右后问题照片******
    res.threePic = app.tihuan(this.data.three_pic);

    //右前部分---------------------
    //1.右前轮*******
    res.rightFrontWheel = app.tihuan(this.data.right_front_wheel);
    //2.前车牌*********
    res.frontLicensePlate = app.tihuan(this.data.front_license_plate);
    //3.雨刷***********
    res.wiper = app.tihuan(this.data.wiper);
    //4.右前问题照片
    res.fourPic = app.tihuan(this.data.four_pic);




    //工具箱一部分---------------------
    //1.千斤顶********
    res.liftingJack = app.tihuan(this.data.lifting_jack);
    //2.十字套筒*******
    res.crossSleeve = app.tihuan(this.data.cross_sleeve);
    //3.搭电线*********
    res.wiring = app.tihuan(this.data.wiring);
    //4.大绑带*********
    res.bigBand = app.tihuan(this.data.big_band);
    //5.小绑带*******
    res.smallBand = app.tihuan(this.data.small_band);
    //6.工具箱一(主)问题照片*****
    res.fivePic = app.tihuan(this.data.five_pic);




    //工具箱二部分---------------------
    //1.千斤顶********
    res.assLiftingJack = app.tihuan(this.data.v_lifting_jack);
    //2.十字套筒*******
    res.assCrossSleeve = app.tihuan(this.data.v_cross_sleeve);
    //3.搭电线*********
    res.assWiring = app.tihuan(this.data.v_wiring);
    //4.大绑带*********
    res.assBigBand = app.tihuan(this.data.v_big_band);
    //5.小绑带*******
    res.assSmallBand = app.tihuan(this.data.v_small_band);
    //6.工具箱一(副)问题照片*****
    res.sevenPic = app.tihuan(this.data.v_five_pic);



    //自生车内工具部分---------------------
    //1.头灯******
    res.headlamp = app.tihuan(this.data.headlamp);
    //2.搭电宝电量*******
    res.powerSupply = app.tihuan(this.data.power_supply);
    //3.形象自拍照********
    res.selfie = app.tihuan(this.data.selfie);
    //4.自生车内工具问题照片
    res.sixPic = app.tihuan(this.data.six_problem);

    var that = this;
    var tt = this.data.tool_position_type;

    if (tt == "后") {
      dd.hideLoading();
      //左前-----------------
      if (res.leftFrontWheel == null || res.leftFrontWheel == "") {
        dd.alert({ title: '左前轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左前轮未拍摄', duration: 1000 });
      } else if (res.dipstick == null || res.dipstick == "") {
        dd.alert({ title: '机油标尺未拍摄', content: '', buttonText: '我知道了' });
        //dd.showToast({ content: '机油标尺未拍摄', duration: 1000 });
      } else if (res.beltTightness == null || res.beltTightness == "") {
        dd.alert({ title: '皮带松紧度未拍摄', content: '', buttonText: '我知道了' });
        //dd.showToast({ content: '皮带松紧度未拍摄', duration: 1000 });
      } else if (res.coolantHeight == null || res.coolantHeight == "") {
        dd.alert({ title: '冷却液高度未拍摄', content: '', buttonText: '我知道了' });
        //dd.showToast({ content: '冷却液高度未拍摄', duration: 1000 });
      } else if (res.oilLeak == null || res.oilLeak == "") {
        dd.alert({ title: '机舱漏油情况未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '机舱漏油情况未拍摄', duration: 1000 });
      } else if (that.data.left_top_problem == 1 && (res.oneProblem == null || res.oneProblem == "")) {
        dd.alert({ title: '左侧机舱内检查问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左前问题描述未填写', duration: 1000 });
      } else if (that.data.left_top_problem == 1 && (res.onePic == null || res.onePic == "")) {
        dd.alert({ title: '左侧机舱内检查问题照片未拍摄', content: '', buttonText: '我知道了' });
        //dd.showToast({ content: '左前问题照片未拍摄', duration: 1000 });
      }
      //左后部分--------------------
      else if (res.leftRearWheel == null || res.leftRearWheel == "") {
        dd.alert({ title: '左后轮未拍摄', content: '', buttonText: '我知道了' });
        //dd.showToast({ content: '左后轮未拍摄', duration: 1000 });
      } else if (res.rearLicensePlate == null || res.rearLicensePlate == "") {
        dd.alert({ title: '后车牌未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '后车牌未拍摄', duration: 1000 });
      } else if (that.data.left_bottom_problem == 1 && (res.twoProblem == null || res.twoProblem == "")) {
        dd.alert({ title: '左侧后部问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左后问题描述未填写', duration: 1000 });
      } else if (that.data.left_bottom_problem == 1 && (res.twoPic == null || res.twoPic == "")) {
        dd.alert({ title: '左侧后部问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左后问题照片未拍摄', duration: 1000 });
      }
      //右后部分---------------------
      else if (res.rightRearWheel == null || res.rightRearWheel == "") {
        dd.alert({ title: '右后轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右后轮未拍摄', duration: 1000 });
      } else if (that.data.right_bottom_problem == 1 && (res.threeProblem == null || res.threeProblem == "")) {
        dd.alert({ title: '右侧后部问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右后问题描述未填写', duration: 1000 });
      } else if (that.data.right_bottom_problem == 1 && (res.threePic == null || res.threePic == "")) {
        dd.alert({ title: '右侧后部问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: 'P3问题照片未拍摄', duration: 1000 });
      }
      //右前部分---------------------
      else if (res.rightFrontWheel == null || res.rightFrontWheel == "") {
        dd.alert({ title: '右前轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右前轮未拍摄', duration: 1000 });
      } else if (res.frontLicensePlate == null || res.frontLicensePlate == "") {
        dd.alert({ title: '前车牌未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '前车牌未拍摄', duration: 1000 });
      } else if (res.wiper == null || res.wiper == "") {
        dd.alert({ title: '雨刷未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '雨刷未拍摄', duration: 1000 });
      } else if (that.data.right_top_problem == 1 && (res.fourProblem == null || res.fourProblem == "")) {
        dd.alert({ title: '右侧前脸问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右前问题描述未填写', duration: 1000 });
      } else if (that.data.right_top_problem == 1 && (res.fourPic == null || res.fourPic == "")) {
        dd.alert({ title: '右侧前脸问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右前问题照片未拍摄', duration: 1000 });
      }
      //工具箱一部分---------------------
      else if (res.liftingJack == null || res.liftingJack == "") {
        dd.alert({ title: '千斤顶未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '千斤顶未拍摄', duration: 1000 });
      } else if (res.crossSleeve == null || res.crossSleeve == "") {
        dd.alert({ title: '十字套筒未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '十字套筒未拍摄', duration: 1000 });
      } else if (res.wiring == null || res.wiring == "") {
        dd.alert({ title: '搭电线未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '搭电线未拍摄', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.fiveProblem == null || res.fiveProblem == "")) {
        dd.alert({ title: that.data.tool_type + '工具箱内问题描述未填写', content: '', buttonText: '我知道了' });
        //dd.showToast({ content: '工具箱问题描述未填写', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.fivePic == null || res.fivePic == "")) {
        dd.alert({ title: that.data.tool_type + '工具箱内问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '工具箱问题照片未拍摄', duration: 1000 });
      }
      //自生车内工具部分---------------------
      else if (res.headlamp == null || res.headlamp == "") {
        dd.alert({ title: '头灯未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '头灯未拍摄', duration: 1000 });
      } else if (res.powerSupply == null || res.powerSupply == "") {
        dd.alert({ title: '搭电宝电量未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '搭电宝电量未拍摄', duration: 1000 });
      } else if (res.selfie == null || res.selfie == "") {
        dd.alert({ title: '形象自拍照未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '形象自拍照未拍摄', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.sixProblem == null || res.sixProblem == "")) {
        dd.alert({ title: '辅助工具及员工形象问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '自车工具箱问题描述未填写', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.sixPic == null || res.sixPic == "")) {
        dd.alert({ title: '辅助工具及员工形象问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '自车工具箱问题照片未拍摄', duration: 1000 });
      } else {
        if (that.data.onclick == true) {
          // dd.hideLoading();
          dd.showLoading({
            content: '正在提交中',
            delay: 1000,
          });
          that.setData({
            onclick: false
          });
          console.log("获得的所有数据-----", res);
          app.ajaxSubmit(app.urlApi.d_add, "POST", res, function(res) {
            // dd.hideLoading();
            console.log("成功", res);
            // dd.alert({ content: "成功" });
            dd.vibrate({
              success: () => {
                // dd.alert({ title: '震动起来了' });
              }
            });
            dd.alert({ title: '成功', content: '提交成功', buttonText: '我知道了' });
            // dd.showToast({
            //   content: '提交成功,请稍等',
            //   duration: 1000,
            //   success: () => {
            //     // dd.navigateTo({
            //     //   url: '/page/promotion_index/promotion_index'
            //     // })
            //   },
            // });
            var timeOut = setTimeout(function() {
              console.log("延迟调用============");
              dd.hideLoading();
              // dd.redirectTo({
              //   url: '/page/Drive_out_check_index/Drive_out_check_index'
              // })
              dd.navigateBack({
                delta: 1
              })

            }, 500)

          }, true, true);
        } else {
          dd.showLoading({
            content: '请勿重复提交',
            delay: 1000,
          });
        }
      }
    } else if (tt == "左" || tt == "右") {
      dd.hideLoading();
      //左前-----------------
      if (res.leftFrontWheel == null || res.leftFrontWheel == "") {
        dd.alert({ title: '左前轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左前轮未拍摄', duration: 1000 });
      } else if (res.dipstick == null || res.dipstick == "") {
        dd.alert({ title: '机油标尺未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '机油标尺未拍摄', duration: 1000 });
      } else if (res.beltTightness == null || res.beltTightness == "") {
        dd.alert({ title: '皮带松紧度未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '皮带松紧度未拍摄', duration: 1000 });
      } else if (res.coolantHeight == null || res.coolantHeight == "") {
        dd.alert({ title: '冷却液高度未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '冷却液高度未拍摄', duration: 1000 });
      } else if (res.oilLeak == null || res.oilLeak == "") {
        dd.alert({ title: '机舱漏油情况未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '机舱漏油情况未拍摄', duration: 1000 });
      } else if (that.data.left_top_problem == 1 && (res.oneProblem == null || res.oneProblem == "")) {
        dd.alert({ title: '左侧机舱问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左前问题描述未填写', duration: 1000 });
      } else if (that.data.left_top_problem == 1 && (res.onePic == null || res.onePic == "")) {
        dd.alert({ title: '左侧机舱问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左前问题照片未拍摄', duration: 1000 });
      }
      //左后部分--------------------
      else if (res.leftRearWheel == null || res.leftRearWheel == "") {
        dd.alert({ title: '左后轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左后轮未拍摄', duration: 1000 });
      } else if (res.leftRearAuxiliaryWheel == null || res.dipstleftRearAuxiliaryWheelick == "") {
        dd.alert({ title: '左后辅助轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左后辅助轮未拍摄', duration: 1000 });
      } else if (res.leftTransmissionShaft == null || res.leftTransmissionShaft == "") {
        dd.alert({ title: '左传动轴未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左传动轴未拍摄', duration: 1000 });
      } else if (res.rearLicensePlate == null || res.rearLicensePlate == "") {
        dd.alert({ title: '后车牌未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '后车牌未拍摄', duration: 1000 });
      } else if (that.data.left_bottom_problem == 1 && (res.twoProblem == null || res.twoProblem == "")) {
        dd.alert({ title: '左侧后部问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左后问题描述未填写', duration: 1000 });
      } else if (that.data.left_bottom_problem == 1 && (res.twoPic == null || res.twoPic == "")) {
        dd.alert({ title: '左侧后部问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左后问题照片未拍摄', duration: 1000 });
      }
      //右后部分---------------------
      else if (res.rightRearWheel == null || res.rightRearWheel == "") {
        dd.alert({ title: '右后轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右后轮未拍摄', duration: 1000 });
      } else if (res.rightTransmissionShaft == null || res.rightTransmissionShaft == "") {
        dd.alert({ title: '右传动轴未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右传动轴未拍摄', duration: 1000 });
      } else if (res.rightRearAuxiliary_wheel == null || res.rightRearAuxiliary_wheel == "") {
        dd.alert({ title: '右后辅助轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右后辅助轮未拍摄', duration: 1000 });
      } else if (that.data.right_bottom_problem == 1 && (res.threeProblem == null || res.threeProblem == "")) {
        dd.alert({ title: '右侧后部问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右后问题描述未填写', duration: 1000 });
      } else if (that.data.right_bottom_problem == 1 && (res.threePic == null || res.threePic == "")) {
        dd.alert({ title: '右侧后部问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右后问题照片未拍摄', duration: 1000 });
      }
      //右前部分---------------------
      else if (res.rightFrontWheel == null || res.rightFrontWheel == "") {
        dd.alert({ title: '右前轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右前轮未拍摄', duration: 1000 });
      } else if (res.frontLicensePlate == null || res.frontLicensePlate == "") {
        dd.alert({ title: '前车牌未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '前车牌未拍摄', duration: 1000 });
      } else if (res.wiper == null || res.wiper == "") {
        dd.alert({ title: '雨刷未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '雨刷未拍摄', duration: 1000 });
      } else if (that.data.right_top_problem == 1 && (res.fourProblem == null || res.fourProblem == "")) {
        dd.alert({ title: '右侧前脸问题描述未填写', content: '', buttonText: '我知道了' });
        //dd.showToast({ content: '右前问题描述未填写', duration: 1000 });
      } else if (that.data.right_top_problem == 1 && (res.fourPic == null || res.fourPic == "")) {
        dd.alert({ title: '右侧前脸问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右前问题照片未拍摄', duration: 1000 });
      }
      //工具箱一部分---------------------
      else if (res.liftingJack == null || res.liftingJack == "") {
        dd.alert({ title: '千斤顶未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '千斤顶未拍摄', duration: 1000 });
      } else if (res.crossSleeve == null || res.crossSleeve == "") {
        dd.alert({ title: '十字套筒未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '十字套筒未拍摄', duration: 1000 });
      } else if (res.wiring == null || res.wiring == "") {
        dd.alert({ title: '搭电线未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '搭电线未拍摄', duration: 1000 });
      } else if (res.bigBand == null || res.bigBand == "") {
        dd.alert({ title: '大绑带未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '大绑带未拍摄', duration: 1000 });
      } else if (res.smallBand == null || res.smallBand == "") {
        dd.alert({ title: '小绑带未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '小绑带未拍摄', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.fiveProblem == null || res.fiveProblem == "")) {
        dd.alert({ title: that.data.tool_type + '问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '工具箱问题描述未填写', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.fivePic == null || res.fivePic == "")) {
        dd.alert({ title: that.data.tool_type + '问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '工具箱问题照片未拍摄', duration: 1000 });
      }
      //自生车内工具部分---------------------
      else if (res.headlamp == null || res.headlamp == "") {
        dd.alert({ title: '头灯未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '头灯未拍摄', duration: 1000 });
      } else if (res.powerSupply == null || res.powerSupply == "") {
        dd.alert({ title: '搭电宝电量未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '搭电宝电量未拍摄', duration: 1000 });
      } else if (res.selfie == null || res.selfie == "") {
        dd.alert({ title: '形象自拍照未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '形象自拍照未拍摄', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.sixProblem == null || res.sixProblem == "")) {
        dd.alert({ title: '辅助工具及员工形象问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '自车工具箱问题描述未填写', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.sixPic == null || res.sixPic == "")) {
        dd.alert({ title: '辅助工具及员工形象问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '自车工具箱问题照片未拍摄', duration: 1000 });
      } else {
        // dd.hideLoading();
        if (that.data.onclick == true) {
          // dd.hideLoading();
          dd.showLoading({
            content: '正在提交中',
            delay: 1000,
          });
          that.setData({
            onclick: false
          });
          console.log("获得的所有数据-----", res);
          app.ajaxSubmit(app.urlApi.d_add, "POST", res, function(res) {
            // dd.hideLoading();
            console.log("成功", res);
            // dd.alert({ content: "成功" });
            dd.vibrate({
              success: () => {
                // dd.alert({ title: '震动起来了' });
              }
            });
            dd.alert({ title: '成功', content: '提交成功', buttonText: '我知道了' });
            // dd.showToast({
            //   content: '提交成功,请稍等',
            //   duration: 1000,
            //   success: () => {
            //     // dd.navigateTo({
            //     //   url: '/page/promotion_index/promotion_index'
            //     // })
            //   },
            // });
            var timeOut = setTimeout(function() {
              console.log("延迟调用============");
              dd.hideLoading();
              // dd.redirectTo({
              //   url: '/page/Drive_out_check_index/Drive_out_check_index'
              // })
              dd.navigateBack({
                delta: 1
              })

            }, 500)

          }, true, true);
        } else {
          dd.showLoading({
            content: '请勿重复提交',
            delay: 1000,
          });
        }
      }
    } else if (tt == "左右") {
      dd.hideLoading();
      //左前-----------------
      if (res.leftFrontWheel == null || res.leftFrontWheel == "") {
        dd.alert({ title: '左前轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左前轮未拍摄', duration: 1000 });
      } else if (res.dipstick == null || res.dipstick == "") {
        dd.alert({ title: '机油标尺未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '机油标尺未拍摄', duration: 1000 });
      } else if (res.beltTightness == null || res.beltTightness == "") {
        dd.alert({ title: '皮带松紧度未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '皮带松紧度未拍摄', duration: 1000 });
      } else if (res.coolantHeight == null || res.coolantHeight == "") {
        dd.alert({ title: '冷却液高度未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '冷却液高度未拍摄', duration: 1000 });
      } else if (res.oilLeak == null || res.oilLeak == "") {
        dd.alert({ title: '机舱漏油情况未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '机舱漏油情况未拍摄', duration: 1000 });
      } else if (that.data.left_top_problem == 1 && (res.oneProblem == null || res.oneProblem == "")) {
        dd.alert({ title: '左侧机箱问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左前问题描述未填写', duration: 1000 });
      } else if (that.data.left_top_problem == 1 && (res.onePic == null || res.onePic == "")) {
        dd.alert({ title: '左侧机箱问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左前问题照片未拍摄', duration: 1000 });
      }
      //左后部分--------------------
      else if (res.leftRearWheel == null || res.leftRearWheel == "") {
        dd.alert({ title: '左后轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左后轮未拍摄', duration: 1000 });
      } else if (res.leftRearAuxiliaryWheel == null || res.dipstleftRearAuxiliaryWheelick == "") {
        dd.alert({ title: '左后辅助轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左后辅助轮未拍摄', duration: 1000 });
      } else if (res.leftTransmissionShaft == null || res.leftTransmissionShaft == "") {
        dd.alert({ title: '左传动轴未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左传动轴未拍摄', duration: 1000 });
      } else if (res.rearLicensePlate == null || res.rearLicensePlate == "") {
        dd.alert({ title: '后车牌未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '后车牌未拍摄', duration: 1000 });
      } else if (that.data.left_bottom_problem == 1 && (res.twoProblem == null || res.twoProblem == "")) {
        dd.alert({ title: '左侧后部问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左后问题描述未填写', duration: 1000 });
      } else if (that.data.left_bottom_problem == 1 && (res.twoPic == null || res.twoPic == "")) {
        dd.alert({ title: '左侧后部问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '左后问题照片未拍摄', duration: 1000 });
      }
      //右后部分---------------------
      else if (res.rightRearWheel == null || res.rightRearWheel == "") {
        dd.alert({ title: '右后轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右后轮未拍摄', duration: 1000 });
      } else if (res.rightTransmissionShaft == null || res.rightTransmissionShaft == "") {
        dd.alert({ title: '右传动轴未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右传动轴未拍摄', duration: 1000 });
      } else if (res.rightRearAuxiliary_wheel == null || res.rightRearAuxiliary_wheel == "") {
        dd.alert({ title: '右后辅助轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右后辅助轮未拍摄', duration: 1000 });
      } else if (that.data.right_bottom_problem == 1 && (res.threeProblem == null || res.threeProblem == "")) {
        dd.alert({ title: '右侧后部问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右后问题描述未填写', duration: 1000 });
      } else if (that.data.right_bottom_problem == 1 && (res.threePic == null || res.threePic == "")) {
        dd.alert({ title: '右侧后部问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右后问题照片未拍摄', duration: 1000 });
      }
      //右前部分---------------------
      else if (res.rightFrontWheel == null || res.rightFrontWheel == "") {
        dd.alert({ title: '右前轮未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右前轮未拍摄', duration: 1000 });
      } else if (res.frontLicensePlate == null || res.frontLicensePlate == "") {
        dd.alert({ title: '前车牌未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '前车牌未拍摄', duration: 1000 });
      } else if (res.wiper == null || res.wiper == "") {
        dd.alert({ title: '雨刷未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '雨刷未拍摄', duration: 1000 });
      } else if (that.data.right_top_problem == 1 && (res.fourProblem == null || res.fourProblem == "")) {
        dd.alert({ title: '右侧前脸问题描述未填写', content: '', buttonText: '我知道了' });
        //dd.showToast({ content: '右前问题描述未填写', duration: 1000 });
      } else if (that.data.right_top_problem == 1 && (res.fourPic == null || res.fourPic == "")) {
        dd.alert({ title: '右侧前脸问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '右前问题照片未拍摄', duration: 1000 });
      }
      //工具箱一部分---------------------
      else if (res.liftingJack == null || res.liftingJack == "") {
        dd.alert({ title: '千斤顶未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '千斤顶未拍摄', duration: 1000 });
      } else if (res.crossSleeve == null || res.crossSleeve == "") {
        dd.alert({ title: '十字套筒未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '十字套筒未拍摄', duration: 1000 });
      } else if (res.wiring == null || res.wiring == "") {
        dd.alert({ title: '搭电线未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '搭电线未拍摄', duration: 1000 });
      } else if (res.bigBand == null || res.bigBand == "") {
        dd.alert({ title: '大绑带未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '大绑带未拍摄', duration: 1000 });
      } else if (res.smallBand == null || res.smallBand == "") {
        dd.alert({ title: '小绑带未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '小绑带未拍摄', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.fiveProblem == null || res.fiveProblem == "")) {
        dd.alert({ title: that.data.tool_type + '问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '工具箱问题描述未填写', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.fivePic == null || res.fivePic == "")) {
        dd.alert({ title: that.data.tool_type + '问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '工具箱问题照片未拍摄', duration: 1000 });
      }
      //工具箱二部分---------------------
      else if (res.assLiftingJack == null || res.assLiftingJack == "") {
        dd.alert({ title: '千斤顶未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '千斤顶未拍摄', duration: 1000 });
      } else if (res.assCrossSleeve == null || res.assCrossSleeve == "") {
        dd.alert({ title: '十字套筒未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '十字套筒未拍摄', duration: 1000 });
      } else if (res.assWiring == null || res.assWiring == "") {
        dd.alert({ title: '搭电线未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '搭电线未拍摄', duration: 1000 });
      } else if (res.assBigBand == null || res.assBigBand == "") {
        dd.alert({ title: '大绑带未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '大绑带未拍摄', duration: 1000 });
      } else if (res.assSmallBand == null || res.assSmallBand == "") {
        dd.alert({ title: '小绑带未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '小绑带未拍摄', duration: 1000 });
      } else if (that.data.tool_two_problem == 1 && (res.sevenProblem == null || res.sevenProblem == "")) {
        dd.alert({ title: '右侧工具箱内问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '工具箱问题描述未填写', duration: 1000 });
      } else if (that.data.tool_two_problem == 1 && (res.sevenPic == null || res.sevenPic == "")) {
        dd.alert({ title: '右侧工具箱内问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '工具箱问题照片未拍摄', duration: 1000 });
      }
      //自生车内工具部分---------------------
      else if (res.headlamp == null || res.headlamp == "") {
        dd.alert({ title: '头灯未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '头灯未拍摄', duration: 1000 });
      } else if (res.powerSupply == null || res.powerSupply == "") {
        dd.alert({ title: '搭电宝电量未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '搭电宝电量未拍摄', duration: 1000 });
      } else if (res.selfie == null || res.selfie == "") {
        dd.alert({ title: '形象自拍照未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '形象自拍照未拍摄', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.sixProblem == null || res.sixProblem == "")) {
        dd.alert({ title: '辅助工具及员工形象问题描述未填写', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '自车工具箱问题描述未填写', duration: 1000 });
      } else if (that.data.tool_one_problem == 1 && (res.sixPic == null || res.sixPic == "")) {
        dd.alert({ title: '辅助工具及员工形象问题照片未拍摄', content: '', buttonText: '我知道了' });
        // dd.showToast({ content: '自车工具箱问题照片未拍摄', duration: 1000 });
      } else {
        if (that.data.onclick == true) {
          // dd.hideLoading();
          dd.showLoading({
            content: '正在提交中',
            delay: 1000,
          });
          that.setData({
            onclick: false
          });
          console.log("获得的所有数据-----", res);
          app.ajaxSubmit(app.urlApi.d_add, "POST", res, function(res) {
            // dd.hideLoading();
            console.log("成功", res);
            // dd.alert({ content: "成功" });
            dd.vibrate({
              success: () => {
                // dd.alert({ title: '震动起来了' });
              }
            });
            dd.alert({ title: '成功', content: '提交成功', buttonText: '我知道了' });
            // dd.showToast({
            //   content: '提交成功,请稍等',
            //   duration: 1000,
            //   success: () => {
            //     // dd.navigateTo({
            //     //   url: '/page/promotion_index/promotion_index'
            //     // })
            //   },
            // });
            var timeOut = setTimeout(function() {
              console.log("延迟调用============");
              dd.hideLoading();
              // dd.redirectTo({
              //   url: '/page/Drive_out_check_index/Drive_out_check_index'
              // })
              dd.navigateBack({
                delta: 1
              })

            }, 500)

          }, true, true);
        } else {
          dd.showLoading({
            content: '请勿重复提交',
            delay: 1000,
          });
        }
      }
    }

    // else if (tt == "左" || tt == "右") {
    //   //左前-----------------
    //   if (res.leftFrontWheel == null || res.leftFrontWheel == "") {
    //     dd.showToast({ content: '左前轮未拍摄', duration: 1000 });
    //   } else if (res.dipstick == null || res.dipstick == "") {
    //     dd.showToast({ content: '机油标尺未拍摄', duration: 1000 });
    //   } else if (res.beltTightness == null || res.beltTightness == "") {
    //     dd.showToast({ content: '皮带松紧度未拍摄', duration: 1000 });
    //   } else if (res.coolantHeight == null || res.coolantHeight == "") {
    //     dd.showToast({ content: '冷却液高度未拍摄', duration: 1000 });
    //   } else if (res.oilLeak == null || res.oilLeak == "") {
    //     dd.showToast({ content: '机舱漏油情况未拍摄', duration: 1000 });
    //   } else if (that.data.left_top_problem == 1 && (res.oneProblem == null || res.oneProblem == "")) {
    //     dd.showToast({ content: '左前问题描述未填写', duration: 1000 });
    //   } else if (that.data.left_top_problem == 1 && (res.onePic == null || res.onePic == "")) {
    //     dd.showToast({ content: '左前问题照片未拍摄', duration: 1000 });
    //   }
    //   //左后部分--------------------
    //   else if (res.leftRearWheel == null || res.leftRearWheel == "") {
    //     dd.showToast({ content: '左后轮未拍摄', duration: 1000 });
    //   } else if (res.leftRearAuxiliaryWheel == null || res.dipstleftRearAuxiliaryWheelick == "") {
    //     dd.showToast({ content: '左后辅助轮未拍摄', duration: 1000 });
    //   } else if (res.leftTransmissionShaft == null || res.leftTransmissionShaft == "") {
    //     dd.showToast({ content: '左传动轴未拍摄', duration: 1000 });
    //   } else if (res.rearLicensePlate == null || res.rearLicensePlate == "") {
    //     dd.showToast({ content: '后车牌未拍摄', duration: 1000 });
    //   } else if (that.data.left_bottom_problem == 1 && (res.twoProblem == null || res.twoProblem == "")) {
    //     dd.showToast({ content: '左后问题描述未填写', duration: 1000 });
    //   } else if (that.data.left_bottom_problem == 1 && (res.twoPic == null || res.twoPic == "")) {
    //     dd.showToast({ content: '左后问题照片未拍摄', duration: 1000 });
    //   }
    //   //右后部分---------------------
    //   else if (res.rightRearWheel == null || res.rightRearWheel == "") {
    //     dd.showToast({ content: '右后轮未拍摄', duration: 1000 });
    //   } else if (res.rightTransmissionShaft == null || res.rightTransmissionShaft == "") {
    //     dd.showToast({ content: '右传动轴未拍摄', duration: 1000 });
    //   } else if (res.rightRearAuxiliary_wheel == null || res.rightRearAuxiliary_wheel == "") {
    //     dd.showToast({ content: '右后辅助轮未拍摄', duration: 1000 });
    //   } else if (that.data.right_bottom_problem == 1 && (res.threeProblem == null || res.threeProblem == "")) {
    //     dd.showToast({ content: '右后问题描述未填写', duration: 1000 });
    //   } else if (that.data.right_bottom_problem == 1 && (res.threePic == null || res.threePic == "")) {
    //     dd.showToast({ content: '右后问题照片未拍摄', duration: 1000 });
    //   }
    //   //右前部分---------------------
    //   else if (res.rightFrontWheel == null || res.rightFrontWheel == "") {
    //     dd.showToast({ content: '右前轮未拍摄', duration: 1000 });
    //   } else if (res.frontLicensePlate == null || res.frontLicensePlate == "") {
    //     dd.showToast({ content: '前车牌未拍摄', duration: 1000 });
    //   } else if (res.wiper == null || res.wiper == "") {
    //     dd.showToast({ content: '雨刷未拍摄', duration: 1000 });
    //   } else if (that.data.right_top_problem == 1 && (res.fourProblem == null || res.fourProblem == "")) {
    //     dd.showToast({ content: '右前问题描述未填写', duration: 1000 });
    //   } else if (that.data.right_top_problem == 1 && (res.fourPic == null || res.fourPic == "")) {
    //     dd.showToast({ content: '右前问题照片未拍摄', duration: 1000 });
    //   }
    //   //自生车内工具部分---------------------
    //   else if (res.headlamp == null || res.headlamp == "") {
    //     dd.showToast({ content: '头灯未拍摄', duration: 1000 });
    //   } else if (res.powerSupply == null || res.powerSupply == "") {
    //     dd.showToast({ content: '搭电宝电量未拍摄', duration: 1000 });
    //   } else if (res.selfie == null || res.selfie == "") {
    //     dd.showToast({ content: '形象自拍照未拍摄', duration: 1000 });
    //   } else if (that.data.tool_one_problem == 1 && (res.sixProblem == null || res.sixProblem == "")) {
    //     dd.showToast({ content: '自车工具箱问题描述未填写', duration: 1000 });
    //   } else if (that.data.tool_one_problem == 1 && (res.sixPic == null || res.sixPic == "")) {
    //     dd.showToast({ content: '自车工具箱问题照片未拍摄', duration: 1000 });
    //   } 

    // else {
    //   console.log("获得的所有数据-----", res);
    //   app.ajaxSubmit(app.urlApi.d_add, "POST", res, function(res) {
    //     console.log("成功", res);
    //     // dd.alert({ content: "成功" });
    //     dd.vibrate({
    //       success: () => {
    //         // dd.alert({ title: '震动起来了' });
    //       }
    //     });
    //     dd.showToast({
    //       content: '提交成功,请稍等',
    //       duration: 1000,
    //       success: () => {
    //         // dd.navigateTo({
    //         //   url: '/page/promotion_index/promotion_index'
    //         // })
    //       },
    //     });
    //     var timeOut = setTimeout(function() {
    //       console.log("延迟调用============");
    //       dd.redirectTo({
    //         url: '/page/Drive_out_check_index/Drive_out_check_index'
    //       })
    //     }, 1000)



    //   }, true, true);
    // }
    // }


    // console.log("获得的所有数据-----", res);
    // app.ajaxSubmit(app.urlApi.d_add, "POST", res, function(res) {
    //   console.log("成功", res);
    //   // dd.alert({ content: "成功" });
    //   dd.vibrate({
    //     success: () => {
    //       // dd.alert({ title: '震动起来了' });
    //     }
    //   });
    //   dd.showToast({
    //     content: '提交成功,请稍等',
    //     duration: 1000,
    //     success: () => {
    //       // dd.navigateTo({
    //       //   url: '/page/promotion_index/promotion_index'
    //       // })
    //     },
    //   });
    //   var timeOut = setTimeout(function() {
    //     console.log("延迟调用============");
    //     dd.redirectTo({
    //       url: '/page/Drive_out_check_index/Drive_out_check_index'
    //     })
    //   }, 1000)



    // }, true, true);









  }
  //自生车内工具模块----------------------------------------------------------结束----------------



});
