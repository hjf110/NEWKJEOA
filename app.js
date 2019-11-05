// var url = "http://eoa.4008882662.cn/";//正式服务器
var url = "http://dd.ubertech.cn/";//测试服务器1
// var url = "http://47.111.65.109/"//测试服务器2
// var url = "http://vvwvv.iask.in/"//花生壳服务器
var URLSTOCK = "http://101.132.151.68:80/";//库存管理测试环境

var tttt;

App({
  //接口地址
  urlApi: {
    url_address: url,
    url_http: url,//测试环境
    // url_http: "",//正式环境
    upload_img: url + "file/upload/",//通用上传图片接口
    denlu: url + "login/ding/e",//登录接口
    zidian: url + "ding/flow/api/getDicts",//获取字典表中的数据
    banben: "http://eoa.4008882662.cn/static/banben.html",//获取版本号
    userInfo: url + "ding/flow/api/getDingUserInfo",//获取用户基础信息

    add_urea_ly: url + "ding/flow/run/urea/submit", //尿素领用申请提交
    select_urea_ly_byid: url + "ding/flow/run/urea/queryOne",//根据id查询尿素领用信息
    urea_approval: url + "ding/flow/run/urea/queryOne?applyType=",//尿素审批接口
    urea_getUserPower: url + "ding/flow/api/getUserPower?table=ding_flow_run_urea",//获取尿素操作权限接口
    //员工晋升流程接口*************
    p_getUserPower: url + "ding/flow/api/getUserPower?table=ding_flow_run_appraise", //获取员工晋升权限接口
    p_getUserInfo: url + "ding/flow/api/getDingUserInfo",//获取用户职位信息
    p_add: url + "ding/flow/run/appraise/submit", //职位晋升申请提交
    p_list: url + "ding/flow/run/appraise/listData", //职位晋升列表
    p_select_byid: url + "ding/flow/run/appraise/queryOne", //根据id查询相应信息
    p_bm_tongyong: url + "ding/flow/run/appraise/apply", //审批通用接口
    p_bum_yijian: url + "ding/flow/run/appraise/carbon", //各部门意见填写
    p_apply_list: url + "ding/flow/run/appraise/querySome", //申请人列表
    //出车检查接口******************
    d_getUserPower: url + "ding/flow/api/getUserPower?table=ding_flow_run_check_out",//获取出车检查权限接口
    d_list: url + "ding/flow/run/checkout/list", //出车检查列表查询
    d_add: url + "ding/flow/run/checkout/submit", //新增出车检查记录
    d_check: url + "ding/flow/run/checkout/apply", //考核人员审批接口
    d_save: url + "ding/flow/run/checkout/save", //部门意见提交接口
    d_select_byid: url + "ding/flow/run/checkout/queryOne", //根据id查询记录
    d_apply_list: url + "ding/flow/run/checkout/querySome", //根据申请人id查询他提交的记录列表
    d_check_License_plate: url + "ding/flow/run/checkout/queryLicensePlate", //检查车牌号是否存在
    //车辆管理模块******************
    c_getUserPower: url + "admin/system/user/getUserMenu",//获取用户车辆管理权限
    c_car_list: url + "ding/car/list",//所有车辆列表
    c_userinfo_list: url + "ding/car/getDeptUserList",//所有人员列表
    c_edit: url + "ding/car/edit",//车辆管理编辑接口
    c_cf: url + "ding/flow/run/checkout/controlQueryOne",//根据id获取处罚数据
    //员工请假流程**********************
    le_getUserPower: url + "ding/flow/api/getUserPower?table=ding_flow_run_leave",//员工请假权限接口
    le_add: url + "ding/flow/run/leave/submit",//请假单据首次提交
    le_add_list: url + "ding/flow/run/leave/querySome",//申请人单据列表
    le_add_select: url + "ding/flow/run/leave/queryOne",//申请人单条记录查询
    le_add_ws: url + "ding/flow/run/leave/againList",//申请人填报资料列表
    le_add_bc: url + "ding/flow/run/leave/supplyList",//申请人补充照片列表接口
    le_add_xj: url + "ding/flow/run/leave/claimingList",//申请人销假填资料列表
    le_list: url + "ding/flow/run/leave/list",//审批记录列表
    le_apply: url + "ding/flow/run/leave/apply",//审批通用接口
    le_saveAndOff: url + "ding/flow/run/leave/save",//保存和销假接口(type=save为申请人提交工单照片,type=claiming为销假接口)
    //员工离职流程**********************
    re_getUserPower: url + "ding/flow/api/getUserPower?table=ding_flow_run_resign",//员工辞职权限接口
    re_add: url + "ding/flow/run/resign/submit",//离职单据首次提交（离职申请）
    re_add_list: url + "ding/flow/run/resign/querySome",//申请人单据列表（离职申请记录）
    re_add_select: url + "ding/flow/run/resign/queryOne",//申请人单条记录查询(离职审批页面)根据id获取
    re_list: url + "ding/flow/run/resign/list",//审批记录列表
    re_apply: url + "ding/flow/run/resign/apply",//审批通用接口
    //问责督办流程**********************
    cp_getUserPower: url + "ding/flow/api/getUserPower?table=ding_flow_run_complain",//问责督办权限接口
    cp_userinfo_list: url + "ding/flow/api/getDingUserList",//所有人员列表
    cp_add: url + "ding/flow/run/complain/submit",//问责单据首次提交（问责申请）
    cp_add_list: url + "ding/flow/run/complain/querySome",//问责申请人单据列表（问责申请记录列表）
    cp_add_select: url + "ding/flow/run/complain/queryOne",//问责申请人单条记录查询(问责审批页面)根据id获取
    cp_respondent_list: url + "ding/flow/run/complain/respondent_query",//申诉单据列表(问责审批页面)
    cp_respondent_add: url + "ding/flow/run/complain/state",//申诉人申诉提交
    cp_list: url + "ding/flow/run/complain/list",//审批记录列表（问责督办流程状态）
    //新车检查问题反馈*******************
    nci_getUserPower: url + "/ding/flow/api/getUserPower?table=ding_flow_run_new_car_inspection",//新车检查权限
    nci_add: url + "ding/flow/run/newCarInspection/submit",//问题反馈单据首次提交（反馈申请）
    nci_add_list: url + "ding/flow/run/newCarInspection/querySome",//问题反馈申请人单据列表（反馈申请记录列表）
    nci_add_select: url + "ding/flow/run/newCarInspection/queryOne",//问题反馈申请人单条记录查询，根据id获取
    nci_list: url + "ding/flow/run/newCarInspection/list",//审批单据列表(问题反馈审批页面)
    nci_apply: url + "ding/flow/run/newCarInspection/apply",//审批通用接口
    //新车检查装卸问题********
    ncd_getUserPower: url + "ding/flow/api/getUserPower?table=ding_flow_run_new_car_dock",//新车检查装卸权限
    ncd_add: url + "ding/flow/run/newCarDock/submit",//申请单据首次提交（反馈申请）
    ncd_add_list: url + "ding/flow/run/newCarDock/querySome",//申请人单据列表（反馈申请记录列表）
    ncd_add_select: url + "ding/flow/run/newCarDock/queryOne",//申请人单条记录查询，根据id获取
    ncd_list: url + "ding/flow/run/newCarDock/list",//审批单据列表(问题反馈审批页面)
    ncd_apply: url + "ding/flow/run/newCarDock/apply",//审批通用接口
    ncd_con: url + "ding/flow/run/newCarDock/controlIsKnow",//审批通用接口

    //自车交通事故*************************************************************
    sfc_getUserPower:url+"ding/flow/api/getUserPower?table=ding_flow_run_self_car_accident",//自车交通事故权限
    sfc_add:url+"ding/flow/run/selfCarAccident/submit",//提交自车交通事故
    sfc_add_list:url+"ding/flow/run/selfCarAccident/querySome",//查看自己的申请记录
    sfc_add_select:url+"ding/flow/run/selfCarAccident/queryOne",//根据id查询单条记录
    sfc_list:url+"ding/flow/run/selfCarAccident/list",//申请记录列表查询(审批人用)
    sfc_vm_ok:url+"ding/flow/run/selfCarAccident/vmInstruct",//车管确认(任务继续还是任务取消)
    sfc_dd_ok:url+"ding/flow/run/selfCarAccident/controlIsKnow",//指挥中心确认(确认已知晓)
    


    //库存管理模块
    st_add_caiGou: URLSTOCK + "order/add",//添加采购订单接口
    st_add_diaoBo: URLSTOCK + "FlittingBill/create",//添加调拨订单接口
    st_add_lingYong: URLSTOCK + "spareBill/create",//添加领用订单接口
  },
  //保存的用户信息
  userinfo: {
    jsessionid: "",//sessionID
    id: "",//id
    name: "",//姓名
    arr: []
  },
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', dd.getSystemInfoSync());
    console.log('SDKVersion', dd.SDKVersion);















  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    hasLogin: false,
  },


  //tool工具*******************************************************************************************************************************************************开始==============================
  //通用请求方法(可以通过全局变量调用)
  ajaxSubmit(urlAddress, type, Data, successMethod, cookie, Json, islist, ismsg) {
    var that = this;
    var headers = {};
    var idata = Data;
    var list_is = false;
    var msg = true;


    if (cookie == true) {
      headers["token"] = that.userinfo.jsessionid;
    }
    if (Json == true) {
      headers["Content-Type"] = "application/json;charset=UTF-8";
      idata = JSON.stringify(Data);
    } else {
      //  headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    // if (cookie == true && Json == true) {
    //   headers = { 'token': that.userinfo.jsessionid, 'Content-Type': 'application/json;charset=UTF-8' };
    //   idata = JSON.stringify(Data);
    // }


    if (islist == true) {
      var list_is = true;
    }


    if (ismsg == false) {
      msg = false;
    }


    console.log("接口请求地址---", urlAddress);
    console.log("接口请求类型---", type);
    console.log("接口请求数据---", idata);
    console.log("接口请求头数据---", headers);

    dd.httpRequest({
      url: urlAddress,
      method: type,
      headers: headers,
      data: idata,
      dataType: 'json',
      success: function(res) {
        var re = res.data;
        //var re2 = res;
        if (list_is == false) {
          if (re.success == true || re.status == 200) {
            successMethod(re, true);
          } else if (re.success == false) {
            successMethod(re, false);
            dd.alert({ content: re.message });
            if (msg == true) {
              dd.alert({ content: re.message });
            }
          } else {
            successMethod(re, false);
            dd.alert({ content: "未知错误" });
            if (msg == true) {
              dd.alert({ content: "未知错误" });
            }
          }
        } else if (list_is == true) {
          successMethod(re);
        }
      },
      fail: function(res) {
        successMethod(res, false);
        dd.alert({ content: '请求失败--请求头=' + JSON.stringify(headers) + "网址=" + urlAddress + "" + "参数----" + JSON.stringify(Data) });
        // dd.alert({ content: idata });
        console.log(res);
      },
      complete: function(res) {
        // dd.alert({ content: 'complete' });
        console.log("1", res);
      }
    });
  },


  //通用拍照图片上传接口///////////////////////////////////////////////////////////////////////////////////
  takePhoto(imgList, showList, successMethod, isXc) {
    var that = this;
    var xc = false;
    var list;

    if (isXc == true) {
      var xc = true;
    }
    if (xc == false) {
      list = ['camera'];
    } else if (xc == true) {
      list = ['camera', 'album'];
    }

    //console.log(res);
    console.log("开始选择照片-----");
    dd.chooseImage({//选择图片
      count: 9,
      sourceType: list,
      success: (res) => {
        dd.showLoading({
          content: '请稍等...'
        });
        console.log(res.filePaths.length);
        var listimage = res.filePaths;
        console.log(listimage)
        for (var i = 0; i < listimage.length; i++) {
          var aaa = listimage[i];
          console.log("上传之前----", aaa);
          var ggg = [];
          ggg.push(aaa);
          //这里开始填写上传图片----------------------------------------------------------
          dd.compressImage({
            filePaths: ggg,
            compressLevel: 1,
            success: (res) => {
              var hhh = res.filePaths[0];
              console.log("压缩-------------------", res.filePaths[0]);
              console.log("文件上传地址---" + that.urlApi.upload_img);
              dd.uploadFile({//上传图片
                url: that.urlApi.upload_img,
                fileType: 'image',
                fileName: 'test',
                header: {
                  'token': that.userinfo.jsessionid
                },
                filePath: res.filePaths[0],
                success: (res) => {

                  console.log(res);
                  aaa = hhh;
                  var cc = JSON.parse(res.data);
                  if (cc.success == true) {
                    console.log("数据cc----", cc);
                    console.log("图片地址--", cc.data.url);
                    var aList = imgList;
                    var bList = showList;
                    console.log("第一个---", aList);
                    console.log("第二个---", bList);
                    aList.push(cc.data.url);
                    // var json = {};
                    // var img_url = that.urlApi.url_http + cc.data.url;
                    var img_url = aaa;
                    // json["img_db"] = cc.data.url;
                    bList.push(img_url);
                    console.log("赋值后-----aList", aList);
                    console.log("赋值后-----bList", bList);
                    successMethod(aList, bList);
                    dd.hideLoading();//隐藏加载框
                    // dd.showToast({
                    //   content: "成功",
                    //   duration: 1000
                    // });
                  } else if (cc.success == false) {
                    // dd.alert({ content: re.message });
                    // dd.redirectTo({
                    //   url: '/page/err/err?msg=' + cc.message
                    // });
                    dd.showToast({
                      type: 'fail',
                      content: cc.message,
                      duration: 1000
                    });
                  } else {
                    // dd.alert({ content: re.message });
                    // dd.redirectTo({
                    //   url: '/page/err/err?msg=未知错误'
                    // });
                    dd.showToast({
                      type: 'fail',
                      content: "未知错误,请联系管理员",
                      duration: 1000
                    });
                  }




                },
                fail: (res) => {
                  console.log(res);
                }
              });
            },
            fail: (res) => {
              console.log(res);
            }
          });
        }
      },
    });
  },
  // getLocalTime(nS) {
  //   return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17);
  // },
  add0(m) { return m < 10 ? '0' + m : m },
  getLocalTime(shijianchuo, isdate) {
    var aa = false;
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    if (isdate == true) {
      aa = true;
    }
    if (aa == false) {
      tttt = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
      return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);

    } else if (aa == true) {
      tttt = y + '-' + this.add0(m) + '-' + this.add0(d);
      return y + '-' + this.add0(m) + '-' + this.add0(d);
    }
  },

  EncodeUtf8(s1) {
    var s = escape(s1);
    var sa = s.split("%");
    var retV = "";
    if (sa[0] != "") {
      retV = sa[0];
    }
    for (var i = 1; i < sa.length; i++) {
      if (sa[i].substring(0, 1) == "u") {
        retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));

      }
      else retV += "%" + sa[i];
    }

    return retV;
  },

  //转换图片数组的方法------------------------------------------------------------------------------
  tihuan(res) {
    var a = res;
    a = a.toString();
    a = a.replace("[", " ");
    a = a.replace("]", " ");
    return a;
  },


  //逗号分割并返回图片地址数组
  getimgUrl(res) {
    const _that = this;
    let ttttt = this.getLocalTime(new Date());
    var thetime = '2019-06-18 14:48:04';
    var d = new Date(Date.parse(thetime.replace(/-/g, "/")));
    var d2 = new Date(Date.parse(ttttt.replace(/-/g, "/")));
    // var curDate = new Date();
    //console.log("时间---",tttt);
    let uuu;
    if (d2 < d) {
      uuu = url;
      // alert("小于当前时间");
    } else {
      // var uuu="";
      // uuu = "";
      uuu = _that.urlApi.url_http;
      // alert("大于当前时间");
    }



    // var uuu = url;
    console.log("图片数组-----", res);
    var zzz = [];
    if (res != null && res != "") {
      if (res.indexOf(",") != -1) {
        //console.log(11111111);
        var result = res.split(",");
        for (var i = 0; i < result.length; i++) {
          var iu = uuu + result[i];
          zzz.push(iu);
        };
      } else {
        //console.log(222222222);
        var iu = uuu + res;
        zzz.push(iu);
      }
    } else {
      zzz.push("qweqwe");
    }
    console.log("图片数组-----", zzz);
    return zzz;
  },


  //判断字符串长度
  strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      //单字节加1 
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      }
      else {
        len += 2;
      }
    }
    return len;
  },


  //根据索引值删除数组中的元素
  del(n, res) {　//n表示第几项，从0开始算起。
    //prototype为对象原型，注意这里为对象增加自定义方法的方法。
    if (n < 0)　//如果n<0，则不进行任何操作。
      return res;
    else
      return res.slice(0, n).concat(res.slice(n + 1, res.length));
  },

  //数组中模糊查询
  keyWord(list, key) {
    var len = list.length;
    var index;
    for (var i = 0; i < len; i++) {
      //如果字符串中不包含目标字符会返回-1
      if (list[i].indexOf(key) >= 0) {
        index = i;
      }
    }
    return index;
  },

  findIndex(arr, obj) {
    let index = null;
    let key = Object.keys(obj)[0];
    arr.every(function(value, i) {
      if (value[key] === obj[key]) {
        index = i;
        return false;
      }
      return true;
    });
    return index;
  },

  // 单页面获取用户
  getUserPower(url, successMethod) {
    // dd.showLoading({
    //   content: '加载中...',
    //   delay: 1000,
    // });
    var that = this;
    if (that.userinfo.jsessionid == null || that.userinfo.jsessionid == "") {
      //----------------------------------------------------------------------------------------------------------------------------------------------
      dd.getAuthCode({
        success: function(res) {
          //调用登录借口,获取用户信息
          that.ajaxSubmit(that.urlApi.denlu, "GET", { code: res.authCode }, function(res) {
            //将用户信息存入全局变量
            that.userinfo.jsessionid = res.data.JSESSIONID;
            that.userinfo.id = res.data.id;
            that.userinfo.name = res.data.name;
            if (url != null && url != "") {
              that.ajaxSubmit(url, "GET", null, function(res) {
                console.log("得到权限", res);
                that.userinfo.arr = res.data;//存入权限
                console.log("获得的arr-------------------------", that.userinfo.arr);
                successMethod();
              }, true, false);
            } else {
              successMethod();
            }

          });
          /*{
              authCode: 'hYLK98jkf0m' //string authCode
          }*/
        },
        fail: function(err) {
          console.log(err);
        }
      });
      //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    } else {
      successMethod();
    }


  },
  //定位方法
  get_position(successMethod) {//获得详细位置
    dd.getLocation({
      success(res) {
        // that.setData({
        //   longitude: res.longitude,
        //   latitude: res.latitude
        // });
        var location = res.longitude + "," + res.latitude;
        // dd.alert({ content:  res.longitude });
        // dd.alert({ content:  res.latitude });
        console.log(res.longitude);
        console.log(res.latitude);
        // that.get_dw(location, that);
        // Content-Type为application/x-www-form-urlencoded即默认的接口请求方式
        dd.httpRequest({
          url: 'https://restapi.amap.com/v3/geocode/regeo',
          method: 'GET',
          data: {
            key: '0abf3872e824123987c26d0a22624b9e',
            location: location,
          },
          dataType: 'json',
          success: function(res) {
            console.log(res);

            var a = res.data.regeocode.formatted_address;
            var b = res.data.regeocode.addressComponent.streetNumber.street;
            var c = res.data.regeocode.addressComponent.streetNumber.number;
            // dd.alert({a});
            successMethod(a);
          },
          fail: function(res) {
            dd.alert({ content: res });
          },
          complete: function(res) {
            // dd.alert({ content: 'complete' });
          }
        });

      },
      fail() {
        dd.alert({ title: '定位失败' });
      }
    })
  },
  //两个天数相减
  DateMinus(date1, date2) {//date1:小日期   date2:大日期
    var sdate = new Date(date1);
    var now = new Date(date2);
    var days = now.getTime() - sdate.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
  }
  //设置自定义过期时间cookie********************
  // setCookie(name, value, time) {
  //   // var msec = this.getMsec(time); //获取毫秒
  //   // var exp = new Date();
  //   // exp.setTime(exp.getTime() + msec * 1);
  //   document.cookie = name + "=" + escape(value);
  // },
  // //将字符串时间转换为毫秒,1秒=1000毫秒
  // getMsec(DateStr) {
  //   var timeNum = DateStr.substring(0, DateStr.length - 1) * 1; //时间数量
  //   var timeStr = DateStr.substring(DateStr.length - 1, DateStr.length); //时间单位前缀，如h表示小时
  //   if (timeStr == "s") //20s表示20秒
  //   {
  //     return timeNum * 1000;
  //   }
  //   else if (timeStr == "h") //12h表示12小时
  //   {
  //     return timeNum * 60 * 60 * 1000;
  //   }
  //   else if (timeStr == "d") {
  //     return timeNum * 24 * 60 * 60 * 1000; //30d表示30天
  //   }
  // },
  // //获得cookie**********************************
  // getCookie(name) {
  //   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
  //   if (arr = document.cookie.match(reg)) {
  //     return unescape(arr[2]);
  //   }
  //   else {
  //     return null;
  //   }
  // },
  // //删除cookie**********************************
  // delCookie(name) {
  //   var exp = new Date();
  //   exp.setTime(exp.getTime() - 1);
  //   var cval = getCookie(name);
  //   if (cval != null) {
  //     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  //   }
  // },
  //tool工具*******************************************************************************************************************************************************结束=============================


});
