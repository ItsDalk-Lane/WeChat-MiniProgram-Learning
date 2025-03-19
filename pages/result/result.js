// pages/result/result.js
const personalityData = require('../../utils/personalities.js');

Page({
  data: {
    resultId: '',
    type: '',
    personality: null,
    scores: null,
    shareImagePath: '',
    showShareGuide: false,
    animationData: {}
  },
  
  onLoad: function(options) {
    // 从URL参数获取结果ID和性格类型
    const resultId = options.id;
    const type = options.type;
    
    // 获取性格类型描述
    const personality = personalityData.personalities[type];
    
    // 从本地存储读取详细分数
    wx.getStorage({
      key: 'mbti_history',
      success: (res) => {
        const history = res.data || [];
        const result = history.find(item => item.id === resultId);
        
        if (result) {
          this.setData({
            scores: result.scores
          });
        }
      }
    });
    
    this.setData({
      resultId: resultId,
      type: type,
      personality: personality
    });
    
    // 显示欢呼动画
    this.showCelebrationAnimation();
  },
  
  // 显示欢呼动画
  showCelebrationAnimation: function() {
    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
    
    animation.scale(0.8).opacity(0).step();
    this.setData({
      animationData: animation.export()
    });
    
    setTimeout(() => {
      animation.scale(1).opacity(1).step();
      this.setData({
        animationData: animation.export()
      });
    }, 100);
  },
  
  // 返回首页
  backToHome: function() {
    wx.reLaunch({
      url: '../index/index'
    });
  },
  
  // 重新测试
  retakeTest: function() {
    wx.redirectTo({
      url: '../test/test'
    });
  },
  
  // 分享结果
  shareResult: function() {
    // 显示分享指引
    this.setData({
      showShareGuide: true
    });
    
    // 绘制分享图片
    this.drawShareImage();
  },
  
  // 关闭分享指引
  closeShareGuide: function() {
    this.setData({
      showShareGuide: false
    });
  },
  
  // 绘制分享图片
  drawShareImage: function() {
    const ctx = wx.createCanvasContext('shareCanvas');
    const personality = this.data.personality;
    
    // 绘制背景
    ctx.setFillStyle('#B3E5FC');
    ctx.fillRect(0, 0, 300, 450);
    
    // 绘制标题
    ctx.setFillStyle('#6A3DE8');
    ctx.setFontSize(22);
    ctx.setTextAlign('center');
    ctx.fillText('小小性格探险家', 150, 50);
    
    // 绘制结果类型
    ctx.setFillStyle('#333');
    ctx.setFontSize(40);
    ctx.setTextAlign('center');
    ctx.fillText(this.data.type, 150, 110);
    
    // 绘制角色标题
    ctx.setFillStyle('#FF9800');
    ctx.setFontSize(20);
    ctx.setTextAlign('center');
    ctx.fillText(personality.title, 150, 150);
    
    // 绘制分割线
    ctx.beginPath();
    ctx.setLineWidth(2);
    ctx.setStrokeStyle('#E0E0E0');
    ctx.moveTo(50, 170);
    ctx.lineTo(250, 170);
    ctx.stroke();
    
    // 绘制描述（需要进行文本换行）
    ctx.setFillStyle('#333');
    ctx.setFontSize(14);
    ctx.setTextAlign('left');
    this.wrapText(ctx, personality.description, 40, 200, 220, 20);
    
    // 绘制优势标题
    ctx.setFillStyle('#6A3DE8');
    ctx.setFontSize(16);
    ctx.fillText('你的闪光点：', 40, 290);
    
    // 绘制优势内容
    ctx.setFillStyle('#333');
    ctx.setFontSize(14);
    this.wrapText(ctx, personality.strengths, 40, 315, 220, 20);
    
    // 绘制二维码背景
    ctx.setFillStyle('#FFFFFF');
    ctx.fillRect(40, 380, 70, 70);
    
    // 绘制小程序码
    // 注意：实际应用中需要后端生成小程序码
    ctx.setFillStyle('#EEEEEE');
    ctx.fillRect(45, 385, 60, 60);
    ctx.setFillStyle('#333');
    ctx.setFontSize(10);
    ctx.setTextAlign('center');
    ctx.fillText('小程序码', 75, 415);
    
    // 绘制扫码提示
    ctx.setFillStyle('#333');
    ctx.setFontSize(12);
    ctx.setTextAlign('left');
    ctx.fillText('扫码进行你的性格探险！', 120, 410);
    
    // 添加日期
    const date = new Date();
    const dateStr = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    ctx.setFillStyle('#666');
    ctx.setFontSize(12);
    ctx.setTextAlign('center');
    ctx.fillText(dateStr, 150, 440);
    
    // 完成绘制
    ctx.draw(false, () => {
      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'shareCanvas',
          success: (res) => {
            this.setData({
              shareImagePath: res.tempFilePath
            });
          },
          fail: (err) => {
            console.error('生成分享图片失败', err);
          }
        });
      }, 500);
    });
  },
  
  // 文本换行函数
  wrapText: function(ctx, text, x, y, maxWidth, lineHeight) {
    if (!text) return;
    // 将文本按段落分割
    const paragraphs = text.split('\n');
    let currentY = y;
    
    for (let i = 0; i < paragraphs.length; i++) {
      let paragraph = paragraphs[i];
      let words = paragraph.split('');
      let line = '';
      
      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n];
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n];
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      
      ctx.fillText(line, x, currentY);
      currentY += lineHeight;
    }
  },
  
  // 保存分享图片
  saveShareImage: function() {
    if (!this.data.shareImagePath) {
      wx.showToast({
        title: '图片生成中，请稍后再试',
        icon: 'none'
      });
      return;
    }
    
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImagePath,
      success: () => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
        
        this.setData({
          showShareGuide: false
        });
      },
      fail: (err) => {
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          wx.showModal({
            title: '提示',
            content: '需要您授权保存图片到相册',
            showCancel: false,
            confirmText: '去授权',
            success: () => {
              wx.openSetting({
                success: (settingRes) => {
                  if (settingRes.authSetting['scope.writePhotosAlbum']) {
                    this.saveShareImage();
                  }
                }
              });
            }
          });
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          });
        }
      }
    });
  },
  
  // 页面分享
  onShareAppMessage: function() {
    return {
      title: `我是${this.data.personality.title}(${this.data.type})，快来测测你是什么性格吧！`,
      path: '/pages/index/index',
      imageUrl: this.data.shareImagePath
    };
  }
});