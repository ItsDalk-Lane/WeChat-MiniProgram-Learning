// pages/history/history.js
const personalityData = require('../../utils/personalities.js');

Page({
  data: {
    historyList: [],
    isEmpty: true
  },
  
  onLoad: function() {
    this.loadHistoryData();
  },
  
  onShow: function() {
    // 每次显示页面时重新加载数据，确保数据最新
    this.loadHistoryData();
  },
  
  // 加载历史记录数据
  loadHistoryData: function() {
    wx.getStorage({
      key: 'mbti_history',
      success: (res) => {
        const history = res.data || [];
        
        // 处理日期格式
        const formattedHistory = history.map(item => {
          const date = new Date(item.date);
          return {
            ...item,
            formattedDate: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
            personality: personalityData.personalities[item.type]
          };
        });
        
        this.setData({
          historyList: formattedHistory,
          isEmpty: formattedHistory.length === 0
        });
      },
      fail: () => {
        this.setData({
          historyList: [],
          isEmpty: true
        });
      }
    });
  },
  
  // 查看记录详情
  viewDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    const type = e.currentTarget.dataset.type;
    
    wx.navigateTo({
      url: `../result/result?id=${id}&type=${type}`
    });
  },
  
  // 删除记录
  deleteRecord: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.getStorage({
            key: 'mbti_history',
            success: (res) => {
              let history = res.data || [];
              
              // 过滤掉要删除的记录
              history = history.filter(item => item.id !== id);
              
              // 更新存储
              wx.setStorage({
                key: 'mbti_history',
                data: history,
                success: () => {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success'
                  });
                  
                  // 重新加载数据
                  this.loadHistoryData();
                }
              });
            }
          });
        }
      }
    });
  },
  
  // 清空所有记录
  clearAllHistory: function() {
    if (this.data.isEmpty) {
      return;
    }
    
    wx.showModal({
      title: '提示',
      content: '确定要清空所有记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorage({
            key: 'mbti_history',
            success: () => {
              wx.showToast({
                title: '已清空全部记录',
                icon: 'success'
              });
              
              this.setData({
                historyList: [],
                isEmpty: true
              });
            }
          });
        }
      }
    });
  },
  
  // 开始新测试
  startNewTest: function() {
    wx.navigateTo({
      url: '../test/test'
    });
  },
  
  // 返回首页
  backToHome: function() {
    wx.reLaunch({
      url: '../index/index'
    });
  },
  
  // 下拉刷新
  onPullDownRefresh: function() {
    this.loadHistoryData();
    wx.stopPullDownRefresh();
  }
}); 