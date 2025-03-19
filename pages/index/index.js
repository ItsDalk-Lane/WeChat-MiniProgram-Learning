// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    // 初始状态
    title: '性格小探险',
    subtitle: '探索你的性格，发现你的闪光点'
  },
  
  onLoad: function() {
    console.log('性格小探险小程序已加载');
    
    // 显示欢迎动画效果
    this.showWelcomeAnimation();
  },
  
  // 显示欢迎动画
  showWelcomeAnimation: function() {
    // 此处可以添加欢迎动画逻辑，如果需要
  },
  
  // 开始探索按钮点击事件
  onGuestMode: function() {
    wx.showToast({
      title: '开始性格探索!',
      icon: 'success',
      duration: 1500
    });
    
    // 跳转到性格测试页面
    wx.navigateTo({
      url: '../test/test'
    });
  },
  
  // 认识性格按钮点击事件
  onStartExplore: function() {
    wx.showToast({
      title: '了解性格类型',
      icon: 'success',
      duration: 1500
    });
    
    // 跳转到历史记录页面
    wx.navigateTo({
      url: '../history/history'
    });
  }
});
