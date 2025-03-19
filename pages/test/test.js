// pages/test/test.js
const questionData = require('../../utils/questions.js');

Page({
  data: {
    questions: [],
    currentQuestion: 0,
    totalQuestions: 0,
    selectedAnswers: [],
    scores: {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    },
    animationData: {},
    isLastQuestion: false,
    progressPercent: 0
  },

  onLoad: function() {
    const questions = questionData.questions;
    
    this.setData({
      questions: questions,
      totalQuestions: questions.length,
      selectedAnswers: new Array(questions.length).fill(null),
      isLastQuestion: questions.length === 1,
      progressPercent: 0
    });
    
    // 显示动画
    this.showQuestionAnimation();
  },

  // 显示问题动画
  showQuestionAnimation: function() {
    const animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    
    animation.opacity(0).step();
    this.setData({
      animationData: animation.export()
    });
    
    setTimeout(() => {
      animation.opacity(1).step();
      this.setData({
        animationData: animation.export()
      });
    }, 100);
  },

  // 选择选项
  selectOption: function(e) {
    const option = e.currentTarget.dataset.option;
    const index = this.data.currentQuestion;
    const question = this.data.questions[index];
    const selectedAnswers = this.data.selectedAnswers;
    
    // 保存选择
    selectedAnswers[index] = option;
    
    // 更新分数
    const scores = this.data.scores;
    const dimension = question.dimension;
    
    if (option === 'A') {
      // 如果选A，则给正向维度加分 (E,S,T,J)
      scores[dimension[0]] += 1;
    } else {
      // 如果选B，则给反向维度加分 (I,N,F,P)
      scores[dimension[1]] += 1;
    }
    
    this.setData({
      selectedAnswers: selectedAnswers,
      scores: scores
    });
    
    // 如果是第6, 12, 18题，显示鼓励动画
    if ((index + 1) % 6 === 0 && index + 1 < this.data.totalQuestions) {
      this.showEncouragementAnimation();
    } else {
      // 否则直接进入下一题
      setTimeout(() => {
        this.nextQuestion();
      }, 300);
    }
  },
  
  // 显示鼓励动画
  showEncouragementAnimation: function() {
    wx.showToast({
      title: '做得很棒！继续加油！',
      icon: 'success',
      duration: 1500
    });
    
    setTimeout(() => {
      this.nextQuestion();
    }, 1500);
  },

  // 上一题
  prevQuestion: function() {
    if (this.data.currentQuestion > 0) {
      this.showQuestionAnimation();
      
      setTimeout(() => {
        const prevQuestion = this.data.currentQuestion - 1;
        this.setData({
          currentQuestion: prevQuestion,
          isLastQuestion: false,
          progressPercent: (prevQuestion / this.data.totalQuestions) * 100
        });
      }, 200);
    }
  },

  // 下一题
  nextQuestion: function() {
    if (this.data.currentQuestion < this.data.totalQuestions - 1) {
      this.showQuestionAnimation();
      
      setTimeout(() => {
        const nextQuestion = this.data.currentQuestion + 1;
        this.setData({
          currentQuestion: nextQuestion,
          isLastQuestion: nextQuestion === this.data.totalQuestions - 1,
          progressPercent: (nextQuestion / this.data.totalQuestions) * 100
        });
      }, 200);
    } else {
      // 计算最终结果
      this.calculateResult();
    }
  },

  // 计算结果
  calculateResult: function() {
    const scores = this.data.scores;
    let mbtiType = '';
    
    // 计算E/I维度
    mbtiType += scores.E >= scores.I ? 'E' : 'I';
    
    // 计算S/N维度
    mbtiType += scores.S >= scores.N ? 'S' : 'N';
    
    // 计算T/F维度
    mbtiType += scores.T >= scores.F ? 'T' : 'F';
    
    // 计算J/P维度
    mbtiType += scores.J >= scores.P ? 'J' : 'P';
    
    // 生成结果ID
    const resultId = new Date().getTime().toString();
    
    // 保存结果到本地存储
    const result = {
      id: resultId,
      date: new Date(),
      type: mbtiType,
      scores: this.data.scores
    };
    
    // 获取历史记录
    wx.getStorage({
      key: 'mbti_history',
      success: (res) => {
        let history = res.data || [];
        history.unshift(result);
        
        // 最多保存10条历史记录
        if (history.length > 10) {
          history = history.slice(0, 10);
        }
        
        wx.setStorage({
          key: 'mbti_history',
          data: history
        });
      },
      fail: () => {
        // 如果没有历史记录，创建新的
        wx.setStorage({
          key: 'mbti_history',
          data: [result]
        });
      },
      complete: () => {
        // 导航到结果页面
        wx.navigateTo({
          url: '../result/result?id=' + resultId + '&type=' + mbtiType
        });
      }
    });
  }
}); 