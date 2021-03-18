// pages/userMessenger/goQrCode/goQrCode.js
const   QR = require("../../../utils/weapp-qrcode.js");
import home from '../../../vendor/home/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeURL:'',
    text: '刷新中',
    flag: 0,
    show: 0,
    time: 60,
    timetext: '有效时间:60s',
    isLoding:false,
    code:0,
  },
   

   	// 手动刷新
     add() { 
      this.getdata()

    },
  // 倒计时
  countdown() {
    const Urtime = setInterval(() => {
      if (this.data.time >= 0) {
        this.setData({
          time:  this.data.time-1,
          timetext : '有效时间:' + this.data.time + 's'
        })
        if (this.data.time < 0 || this.data.flag === 0) {
          this.setData({
            time : 60,
            show : 0
          })
          clearInterval(Urtime)
        }
      }
    }, 1000)
  },

  // 获取二维码
  getdata() {
   this.setData({
    isLoding : true
   })
    home.passQr({
      data: {},
      fail: () => {
        this.setData({
          isLoding : false
         })
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        this.setData({
          isLoding : false
         })
        // console.log(res.data.data.content);
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络出错了',
            icon: 'none'
          })
          return;
        }

        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          return
        }
        this.drawImg(res.data.data.content)
        this.setData({
          text : '刷新成功',
          flag : 0,
          show : 0,
          time : 60,
          code:res.data.code
        })
        const time = setTimeout(() => {
          this.setData({
            text : '手动刷新',
            flag : 1,
            show : 1
          })
         
          this.countdown()
          clearTimeout(time)
        }, 2000)
      }
    })
  },
 // 二维码
 drawImg: function (url){
  let that = this,
      params = url;  // 二维码参数 

  var imgData = QR.drawImg(params, {
      typeNumber: 9,          // 密度
      errorCorrectLevel: 'L', // 纠错等级
      size: 800,              // 白色边框
  })
  
  that.setData({
      qrcodeURL: imgData
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   this.getdata()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})