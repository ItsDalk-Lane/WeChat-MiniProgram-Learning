// 问题数据
const questions = [
  // 外向/内向 (E/I) 问题1-6
  {
    id: 1,
    dimension: ['E', 'I'],
    question: "下课休息时，我通常会怎么做？",
    optionA: "和很多朋友一起玩耍",
    optionB: "和一两个好朋友安静地聊天"
  },
  {
    id: 2,
    dimension: ['E', 'I'],
    question: "认识新朋友时，我会：",
    optionA: "主动打招呼，说很多话",
    optionB: "等待别人先和我说话"
  },
  {
    id: 3,
    dimension: ['E', 'I'],
    question: "当我有好消息要分享时：",
    optionA: "告诉很多人，分享我的喜悦",
    optionB: "只告诉几个最亲近的人"
  },
  {
    id: 4,
    dimension: ['E', 'I'],
    question: "班级活动中，我喜欢：",
    optionA: "参与热闹的团体游戏",
    optionB: "独立完成一个任务"
  },
  {
    id: 5,
    dimension: ['E', 'I'],
    question: "周末时，我更喜欢：",
    optionA: "参加朋友聚会，和大家一起玩",
    optionB: "在家里做自己喜欢的事情"
  },
  {
    id: 6,
    dimension: ['E', 'I'],
    question: "在新环境中，我会：",
    optionA: "很快就融入，认识新朋友",
    optionB: "慢慢地适应，观察周围"
  },
  
  // 感觉/直觉 (S/N) 问题7-12
  {
    id: 7,
    dimension: ['S', 'N'],
    question: "听故事时，我更注意：",
    optionA: "故事中发生了什么具体事情",
    optionB: "想象故事背后的含义"
  },
  {
    id: 8,
    dimension: ['S', 'N'],
    question: "画画时，我喜欢：",
    optionA: "画我看到的真实事物",
    optionB: "创造一些新的、想象中的事物"
  },
  {
    id: 9,
    dimension: ['S', 'N'],
    question: "学习新知识时，我更喜欢：",
    optionA: "学习具体的事实和细节",
    optionB: "思考知识之间的联系"
  },
  {
    id: 10,
    dimension: ['S', 'N'],
    question: "在游乐场时，我通常会：",
    optionA: "按照说明玩游戏设施",
    optionB: "尝试发明新的玩法"
  },
  {
    id: 11,
    dimension: ['S', 'N'],
    question: "听一首新歌时，我关注：",
    optionA: "歌词和节奏",
    optionB: "歌曲让我想象的画面和感受"
  },
  {
    id: 12,
    dimension: ['S', 'N'],
    question: "看书时，我喜欢：",
    optionA: "有很多事实和细节的书",
    optionB: "充满想象和创意的书"
  },
  
  // 思考/情感 (T/F) 问题13-18
  {
    id: 13,
    dimension: ['T', 'F'],
    question: "当我和朋友有不同意见时：",
    optionA: "用逻辑解释我的想法",
    optionB: "考虑大家的感受，避免争论"
  },
  {
    id: 14,
    dimension: ['T', 'F'],
    question: "做决定时，我通常会：",
    optionA: "选择最合理的方案",
    optionB: "选择让大家都开心的方案"
  },
  {
    id: 15,
    dimension: ['T', 'F'],
    question: "当朋友难过时，我会：",
    optionA: "分析问题，帮他找解决方法",
    optionB: "表达理解和安慰"
  },
  {
    id: 16,
    dimension: ['T', 'F'],
    question: "小组作业时，我关注：",
    optionA: "高效完成任务",
    optionB: "确保所有人都能参与"
  },
  {
    id: 17,
    dimension: ['T', 'F'],
    question: "阅读故事时，我更关注：",
    optionA: "人物行为的动机和故事逻辑",
    optionB: "故事中的情感和共鸣"
  },
  {
    id: 18,
    dimension: ['T', 'F'],
    question: "给朋友提意见时，我会：",
    optionA: "直接指出问题，提供客观评价",
    optionB: "注意对方的感受，婉转表达"
  },
  
  // 判断/知觉 (J/P) 问题19-24
  {
    id: 19,
    dimension: ['J', 'P'],
    question: "做作业时，我通常：",
    optionA: "提前计划好时间，按计划完成",
    optionB: "临近交作业时才开始做"
  },
  {
    id: 20,
    dimension: ['J', 'P'],
    question: "我的书包和桌子：",
    optionA: "整齐有序，东西都有固定位置",
    optionB: "有点乱，但我知道东西在哪里"
  },
  {
    id: 21,
    dimension: ['J', 'P'],
    question: "周末出去玩时，我喜欢：",
    optionA: "提前计划好要去哪里、做什么",
    optionB: "随机决定，看心情即兴安排"
  },
  {
    id: 22,
    dimension: ['J', 'P'],
    question: "关于学校规则，我认为：",
    optionA: "应该严格遵守规则",
    optionB: "有些情况下可以灵活变通"
  },
  {
    id: 23,
    dimension: ['J', 'P'],
    question: "玩新游戏时，我会：",
    optionA: "先仔细读规则说明",
    optionB: "边玩边学习规则"
  },
  {
    id: 24,
    dimension: ['J', 'P'],
    question: "参加活动时，我倾向于：",
    optionA: "按照时间表行动",
    optionB: "根据当时的情况随机应变"
  }
];

module.exports = {
  questions: questions
}; 