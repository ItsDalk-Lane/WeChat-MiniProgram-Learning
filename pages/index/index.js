// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    message: '我的第一个微信小程序'
  },
  onLoad: function() {
    console.log('页面加载完成');
  },
  onTap: function() {
    wx.showToast({
      title: '你点击了按钮!',
      icon: 'success',
      duration: 2000
    });
  }
});
