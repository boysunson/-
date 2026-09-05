/* ============================================================
   知航 · 课程数据
   ============================================================ */
window.APP_DATA = (function () {

  // 学科定义
  const disciplines = [
    { id: 'language', name: '语言学习', icon: '🗣️', desc: '英语、日语、韩语等主流外语沉浸式习得', color: 'lang' },
    { id: 'ai', name: 'AI 人工智能', icon: '🤖', desc: '从基础理论到前沿算法，系统掌握人工智能', color: 'ai' },
    { id: 'ai-tools', name: 'AI 工具应用', icon: '🛠️', desc: 'ChatGPT、Midjourney 等主流 AI 工具实战', color: 'ai' },
    { id: 'fengshui', name: '风水学', icon: '☯️', desc: '传统风水文化与现代居住环境科学', color: 'feng' },
    { id: 'realestate', name: '房地产开发', icon: '🏗️', desc: '一级开发与二级开发全流程实务', color: 'real' },
  ];

  // 等级定义
  const levels = ['入门', '初级', '中级', '高级', '精通'];

  // 课程库
  const courses = [
    // ========== 英语 ==========
    {
      id: 'en-basic', disc: 'language', title: '英语入门 · 基础会话', level: 0,
      icon: '🇬🇧', color: 'lang', duration: '20小时', lessons: 12, students: 12840,
      desc: '从零开始掌握日常英语会话，涵盖发音、词汇与基础语法。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '日常问候词汇',
          words: [
            { term: 'Hello', phonetic: '/həˈloʊ/', meaning: '你好', example: 'Hello, nice to meet you.' },
            { term: 'Goodbye', phonetic: '/ɡʊdˈbaɪ/', meaning: '再见', example: 'Goodbye, see you tomorrow.' },
            { term: 'Thank you', phonetic: '/θæŋk juː/', meaning: '谢谢', example: 'Thank you for your help.' },
            { term: 'Sorry', phonetic: '/ˈsɒri/', meaning: '对不起', example: 'Sorry, I am late.' },
            { term: 'Please', phonetic: '/pliːz/', meaning: '请', example: 'Please sit down.' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: 'be 动词与一般现在时',
          question: '选择正确的句子：She ___ a teacher.',
          options: ['am', 'is', 'are', 'be'], answer: 1,
          explain: '主语 She 是第三人称单数，be 动词用 is。'
        },
        {
          id: 'm3', type: 'speak', title: '自我介绍跟读',
          phrase: 'My name is Li Ming. I am from China.',
          translation: '我叫李明，我来自中国。'
        },
        {
          id: 'm4', type: 'listen', title: '听力：日常对话',
          transcript: 'A: Good morning! How are you? B: I am fine, thank you. And you? A: I am great, thanks.',
          question: 'B 回答自己感觉如何？',
          options: ['Not good', 'Fine', 'Tired', 'Sad'], answer: 1
        },
      ]
    },
    {
      id: 'en-ielts', disc: 'language', title: '雅思核心词汇进阶', level: 2,
      icon: '📚', color: 'lang', duration: '40小时', lessons: 24, students: 8920,
      desc: '攻克雅思 7000 核心词汇，配合语境记忆与真题训练。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '学术高频词',
          words: [
            { term: 'analyze', phonetic: '/ˈænəlaɪz/', meaning: '分析', example: 'We need to analyze the data carefully.' },
            { term: 'significant', phonetic: '/sɪɡˈnɪfɪkənt/', meaning: '重要的；显著的', example: 'There is a significant difference.' },
            { term: 'evaluate', phonetic: '/ɪˈvæljueɪt/', meaning: '评估', example: 'The manager will evaluate the proposal.' },
            { term: 'sufficient', phonetic: '/səˈfɪʃənt/', meaning: '足够的', example: 'We have sufficient resources.' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '虚拟语气',
          question: 'If I ___ rich, I would travel the world.',
          options: ['am', 'was', 'were', 'be'], answer: 2,
          explain: '与现在事实相反的虚拟语气，be 动词用 were。'
        },
        {
          id: 'm3', type: 'speak', title: '观点表达',
          phrase: 'From my perspective, education plays a vital role in society.',
          translation: '在我看来，教育在社会中起着至关重要的作用。'
        },
      ]
    },

    // ========== 日语 ==========
    {
      id: 'jp-basic', disc: 'language', title: '日语入门 · 五十音图', level: 0,
      icon: '🇯🇵', color: 'lang', duration: '15小时', lessons: 10, students: 6730,
      desc: '系统学习五十音图，掌握日语发音与基础假名书写。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'あ行假名',
          words: [
            { term: 'あ', phonetic: 'a', meaning: '平假名 a', example: 'ありがとう (谢谢)' },
            { term: 'い', phonetic: 'i', meaning: '平假名 i', example: 'いい (好的)' },
            { term: 'う', phonetic: 'u', meaning: '平假名 u', example: 'うみ (海)' },
            { term: 'え', phonetic: 'e', meaning: '平假名 e', example: 'えき (车站)' },
            { term: 'お', phonetic: 'o', meaning: '平假名 o', example: 'お茶 (茶)' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: 'です 与 ます 体',
          question: '「私は学生___。」应填入？',
          options: ['だ', 'です', 'ます', 'である'], answer: 1,
          explain: '名词谓语句的礼貌体用「です」。'
        },
        {
          id: 'm3', type: 'speak', title: '自我介绍',
          phrase: 'はじめまして、王です。よろしくお願いします。',
          translation: '初次见面，我姓王，请多关照。'
        },
        {
          id: 'm4', type: 'listen', title: '听力：自我介绍',
          transcript: 'はじめまして、田中と申します。東京から来ました。どうぞよろしくお願いします。',
          question: '说话人来自哪里？',
          options: ['大阪', '東京', '京都', '名古屋'], answer: 1
        },
      ]
    },
    {
      id: 'jp-inter', disc: 'language', title: '日语中级 · N3 语法精讲', level: 2,
      icon: '🗾', color: 'lang', duration: '35小时', lessons: 20, students: 4210,
      desc: '掌握 N3 级别语法句型，提升阅读理解与表达能力。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'N3 动词',
          words: [
            { term: '続ける', phonetic: 'つづける', meaning: '继续', example: '勉強を続ける。' },
            { term: '努める', phonetic: 'つとめる', meaning: '努力', example: '目標に向かって努める。' },
            { term: '感じる', phonetic: 'かんじる', meaning: '感觉', example: '寒さを感じる。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '〜ようになる',
          question: '「日本語が話せる___。」表示能力变化应填？',
          options: ['ようになった', 'ようにする', 'ようだ', 'そうだ'], answer: 0,
          explain: '「〜ようになる」表示能力或状态的变化。'
        },
        {
          id: 'm3', type: 'speak', title: '日常表达',
          phrase: '最近、日本語を勉強しているんですが、なかなか上手くなりません。',
          translation: '最近我在学日语，但总是进步不大。'
        },
      ]
    },

    // ========== 韩语 ==========
    {
      id: 'kr-basic', disc: 'language', title: '韩语入门 · 韩文字母', level: 0,
      icon: '🇰🇷', color: 'lang', duration: '12小时', lessons: 8, students: 5120,
      desc: '学习韩文字母（한글）的构成与发音规则。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '基本元音',
          words: [
            { term: 'ㅏ', phonetic: 'a', meaning: '元音 a', example: '아이 (孩子)' },
            { term: 'ㅓ', phonetic: 'eo', meaning: '元音 eo', example: '어머니 (母亲)' },
            { term: 'ㅗ', phonetic: 'o', meaning: '元音 o', example: '오빠 (哥哥)' },
            { term: 'ㅜ', phonetic: 'u', meaning: '元音 u', example: '우유 (牛奶)' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '입니다 敬语',
          question: '「저는 학생___。」应填入？',
          options: ['이에요', '입니다', '이야', '이다'], answer: 1,
          explain: '正式场合名词谓语句用「입니다」。'
        },
        {
          id: 'm3', type: 'speak', title: '问候语',
          phrase: '안녕하세요? 반갑습니다.',
          translation: '你好？很高兴见到你。'
        },
        {
          id: 'm4', type: 'listen', title: '听力：问候',
          transcript: 'A: 안녕하세요? B: 네, 안녕하세요. 만나서 반갑습니다.',
          question: 'B 的回答表达了什么情感？',
          options: ['难过', '高兴', '生气', '惊讶'], answer: 1
        },
      ]
    },

    // ========== AI 人工智能 ==========
    {
      id: 'ai-intro', disc: 'ai', title: '人工智能导论', level: 0,
      icon: '🧠', color: 'ai', duration: '30小时', lessons: 18, students: 15200,
      desc: 'AI 发展简史、核心概念与应用全景，建立人工智能全局认知。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'AI 核心术语',
          words: [
            { term: 'Machine Learning', phonetic: '', meaning: '机器学习', example: 'ML 使计算机从数据中学习规律。' },
            { term: 'Neural Network', phonetic: '', meaning: '神经网络', example: '神经网络是深度学习的基础。' },
            { term: 'Deep Learning', phonetic: '', meaning: '深度学习', example: '深度学习在图像识别中表现优异。' },
            { term: 'NLP', phonetic: '', meaning: '自然语言处理', example: 'NLP 让机器理解人类语言。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '概念辨析',
          question: '以下哪个属于「监督学习」？',
          options: ['聚类分析', '决策树分类', '强化学习', '降维'], answer: 1,
          explain: '决策树分类使用带标签数据训练，属于监督学习。'
        },
        {
          id: 'm3', type: 'case', title: '案例：AI 医疗影像诊断',
          content: `<p>2018 年，Google DeepMind 研发的 AlphaFold 在蛋白质结构预测领域取得突破，解决了困扰生物学界 50 年的难题。</p>
            <blockquote>这是人工智能在科学领域的里程碑式应用。</blockquote>
            <h4>关键技术</h4>
            <p>AlphaFold 结合了深度学习、进化生物学和物理建模，通过大量已知蛋白质结构数据训练神经网络，预测氨基酸序列对应的三维折叠结构。</p>
            <h4>行业影响</h4>
            <p>该技术加速了新药研发进程，帮助科学家更快理解疾病机理，推动个性化医疗发展。</p>`
        },
        {
          id: 'm4', type: 'practice', title: '思考题',
          prompt: '请列举 3 个你日常生活中接触到的 AI 应用，并简述其背后的技术原理。',
          placeholder: '例如：1. 人脸识别解锁 —— 基于卷积神经网络的图像特征提取...'
        },
      ]
    },
    {
      id: 'ai-ml', disc: 'ai', title: '机器学习实战', level: 2,
      icon: '📈', color: 'ai', duration: '50小时', lessons: 30, students: 7800,
      desc: '使用 Python + scikit-learn 实现经典机器学习算法。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '算法术语',
          words: [
            { term: 'Supervised Learning', phonetic: '', meaning: '监督学习', example: '使用带标签数据训练模型。' },
            { term: 'Overfitting', phonetic: '', meaning: '过拟合', example: '模型在训练集表现好但泛化差。' },
            { term: 'Cross-validation', phonetic: '', meaning: '交叉验证', example: '评估模型泛化能力的常用方法。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '算法选择',
          question: '对于二分类问题，以下哪种算法最适合作为基线？',
          options: ['K-Means', '逻辑回归', 'PCA', 'KNN 回归'], answer: 1,
          explain: '逻辑回归是二分类的经典基线算法，简单可解释。'
        },
        {
          id: 'm3', type: 'practice', title: '编程实操',
          prompt: '使用 scikit-learn 训练一个逻辑回归模型，对鸢尾花数据集进行二分类（setosa vs non-setosa），输出准确率。',
          placeholder: 'from sklearn.datasets import load_iris\nfrom sklearn.linear_model import LogisticRegression\n# 请在此编写代码...'
        },
        {
          id: 'm4', type: 'case', title: '案例：信用评分模型',
          content: `<p>某银行使用逻辑回归构建信用评分模型，预测客户违约概率。</p>
            <h4>特征工程</h4>
            <p>模型使用了收入、负债比、历史逾期次数、信用历史长度等 12 个特征。</p>
            <h4>模型评估</h4>
            <p>AUC 达到 0.82，KS 值 0.45，在业务阈值下坏账率降低 30%。</p>`
        },
      ]
    },

    // ========== AI 工具应用 ==========
    {
      id: 'ai-tools-chatgpt', disc: 'ai-tools', title: 'ChatGPT 高效应用指南', level: 1,
      icon: '💬', color: 'ai', duration: '10小时', lessons: 8, students: 21300,
      desc: '掌握 Prompt 工程技巧，让 AI 成为你的高效助手。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'Prompt 术语',
          words: [
            { term: 'Prompt', phonetic: '', meaning: '提示词', example: '给 AI 的指令文本。' },
            { term: 'Few-shot', phonetic: '', meaning: '少样本', example: '在提示中给出几个示例。' },
            { term: 'Context Window', phonetic: '', meaning: '上下文窗口', example: '模型能处理的最大 token 数。' },
            { term: 'Temperature', phonetic: '', meaning: '温度参数', example: '控制输出随机性，0 更确定。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: 'Prompt 技巧',
          question: '想让 AI 输出更确定、可重复的结果，应如何设置 Temperature？',
          options: ['设为 1.0', '设为 0.7', '设为 0.1', '设为 1.5'], answer: 2,
          explain: 'Temperature 越低输出越确定，0.1 适合需要精确答案的场景。'
        },
        {
          id: 'm3', type: 'case', title: '案例：用 ChatGPT 写营销文案',
          content: `<p>一位运营人员通过结构化 Prompt 让 ChatGPT 产出高质量营销文案。</p>
            <blockquote>你是一位资深文案策划，请为一款智能水杯撰写 3 条朋友圈推广文案，要求突出保温 24 小时和健康监测功能，语气年轻活泼，每条不超过 80 字。</blockquote>
            <h4>优化思路</h4>
            <p>通过明确角色设定、功能要点、语气风格和字数限制，AI 输出质量显著提升。</p>`
        },
        {
          id: 'm4', type: 'practice', title: 'Prompt 设计练习',
          prompt: '请设计一个 Prompt，让 AI 帮你将一段技术文档改写成面向小学生的科普文章，要求包含角色设定、内容要求、风格约束。',
          placeholder: '你是一位儿童科普作家，请将以下技术内容改写成适合 10 岁儿童阅读的科普短文...'
        },
      ]
    },
    {
      id: 'ai-tools-midjourney', disc: 'ai-tools', title: 'Midjourney 图像创作', level: 1,
      icon: '🎨', color: 'ai', duration: '12小时', lessons: 10, students: 9650,
      desc: '从参数到风格，掌握 AI 绘画的核心技巧。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'MJ 核心参数',
          words: [
            { term: '--ar', phonetic: '', meaning: '宽高比', example: '--ar 16:9 设置横屏比例。' },
            { term: '--stylize', phonetic: '', meaning: '风格化程度', example: '--s 750 增强艺术风格。' },
            { term: '--chaos', phonetic: '', meaning: '变化程度', example: '--c 50 增加结果多样性。' },
            { term: '--niji', phonetic: '', meaning: '动漫模型', example: '--niji 6 生成动漫风格图。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: 'Prompt 结构',
          question: '一个高质量 Midjourney Prompt 通常不包含以下哪项？',
          options: ['主体描述', '环境与光线', '风格关键词', '完整故事情节'], answer: 3,
          explain: 'MJ Prompt 侧重于视觉元素描述，不需要完整故事情节。'
        },
        {
          id: 'm3', type: 'practice', title: 'Prompt 实操',
          prompt: '请编写一个 Midjourney Prompt，生成「赛博朋克风格的未来城市夜景，霓虹灯闪烁，有飞行汽车，电影感构图」，并设置 16:9 宽高比和高风格化。',
          placeholder: 'cyberpunk futuristic city at night, neon lights, flying cars, cinematic composition --ar 16:9 --s 750 --v 6'
        },
      ]
    },

    // ========== 风水学 ==========
    {
      id: 'feng-intro', disc: 'fengshui', title: '风水学基础', level: 0,
      icon: '☯️', color: 'feng', duration: '25小时', lessons: 15, students: 6890,
      desc: '了解风水文化源流、阴阳五行与八卦基础理论。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '风水基础概念',
          words: [
            { term: '阴阳', phonetic: '', meaning: '宇宙万物对立统一的两面', example: '山为阳，水为阴。' },
            { term: '五行', phonetic: '', meaning: '金木水火土五种基本元素', example: '五行相生相克。' },
            { term: '八卦', phonetic: '', meaning: '乾兑离震巽坎艮坤', example: '先天八卦与后天八卦。' },
            { term: '气', phonetic: '', meaning: '风水的核心概念，生命能量', example: '藏风聚气为吉。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '五行相生',
          question: '五行中「木」生什么？',
          options: ['金', '水', '火', '土'], answer: 2,
          explain: '木生火，火生土，土生金，金生水，水生木。'
        },
        {
          id: 'm3', type: 'case', title: '案例：故宫风水布局',
          content: `<p>北京故宫的选址与布局充分体现了中国传统风水智慧。</p>
            <h4>背山面水</h4>
            <p>故宫北靠景山（人工堆筑的靠山），南望金水河，形成「背山面水」的理想格局，象征「前有照，后有靠」。</p>
            <h4>中轴对称</h4>
            <p>以中轴线为核心，左右对称，体现「中正」思想。太和殿居中至高，象征皇权至上。</p>
            <blockquote>建筑不仅是空间艺术，更是宇宙观的物化表达。</blockquote>`
        },
        {
          id: 'm4', type: 'practice', title: '住宅分析练习',
          prompt: '请描述你目前居住的房屋（或想象中的房屋）朝向、周边环境，尝试用所学风水知识分析其优缺点。',
          placeholder: '我的住宅坐北朝南，北面有靠山（高楼），南面视野开阔...'
        },
      ]
    },
    {
      id: 'feng-home', disc: 'fengshui', title: '家居风水实战', level: 1,
      icon: '🏠', color: 'feng', duration: '20小时', lessons: 12, students: 8120,
      desc: '客厅、卧室、厨房等功能空间的风水布局与化解方法。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '家居风水术语',
          words: [
            { term: '明堂', phonetic: '', meaning: '宅前开阔聚气的空间', example: '客厅宜明亮开阔。' },
            { term: '煞气', phonetic: '', meaning: '不利的能量场', example: '尖角对冲为煞。' },
            { term: '玄关', phonetic: '', meaning: '入户过渡空间', example: '玄关可缓冲气流。' },
            { term: '财位', phonetic: '', meaning: '聚财的方位', example: '客厅对角线为明财位。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '卧室风水',
          question: '卧室床头最不宜朝向哪个方向？',
          options: ['东', '南', '西', '正对房门'], answer: 3,
          explain: '床头正对房门会被气流直冲，且缺乏安全感，应尽量避免。'
        },
        {
          id: 'm3', type: 'case', title: '案例：小户型玄关设计',
          content: `<p>一套 60 ㎡小户型，入户即见客厅，缺乏玄关缓冲。</p>
            <h4>问题</h4>
            <p>气流直冲入宅，形成「穿堂煞」，不利聚气。</p>
            <h4>化解方案</h4>
            <p>在入户处设置半高鞋柜或屏风，既遮挡视线又缓冲气流，同时鞋柜上方可放置绿植增强生机。</p>
            <blockquote>风水的核心是创造舒适、和谐的居住环境。</blockquote>`
        },
      ]
    },

    // ========== 房地产开发 ==========
    {
      id: 're-primary', disc: 'realestate', title: '房地产一级开发实务', level: 1,
      icon: '🏗️', color: 'real', duration: '45小时', lessons: 22, students: 3450,
      desc: '土地一级开发全流程：征地、拆迁、七通一平、土地出让。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '一级开发术语',
          words: [
            { term: '一级开发', phonetic: '', meaning: '土地整理与基础设施建设', example: '政府或授权企业主导。' },
            { term: '七通一平', phonetic: '', meaning: '通路、通水、通电等七项+场地平整', example: '熟地出让的标准。' },
            { term: '征地', phonetic: '', meaning: '依法征收集体土地', example: '需给予合理补偿。' },
            { term: '毛地/净地', phonetic: '', meaning: '未拆迁/已平整的土地', example: '净地出让更利于开发。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '开发流程',
          question: '土地一级开发中，「七通一平」的「一平」指什么？',
          options: ['平整道路', '场地平整', '平整绿化', '平整管线'], answer: 1,
          explain: '「一平」指场地平整，使土地达到施工条件。'
        },
        {
          id: 'm3', type: 'case', title: '案例：某新区一级开发',
          content: `<p>某市新区占地 12 平方公里，由政府授权平台公司实施一级开发。</p>
            <h4>实施步骤</h4>
            <p>1. 编制控制性详细规划；2. 征地拆迁补偿；3. 七通一平基础设施建设；4. 分批次净地出让。</p>
            <h4>经济效益</h4>
            <p>通过土地增值收益，实现基础设施投入回收并反哺城市建设。</p>
            <blockquote>一级开发的核心价值在于「生地变熟地」的增值过程。</blockquote>`
        },
        {
          id: 'm4', type: 'practice', title: '方案测算',
          prompt: '某地块占地 100 亩，征地补偿每亩 50 万元，七通一平成本每亩 30 万元，预计熟地出让每亩 150 万元。请计算一级开发的预期毛利。',
          placeholder: '计算过程：\n征地成本 = 100 × 50 = 5000 万元\n...'
        },
        {
          id: 'm5', type: 'vocab', title: '土地储备与出让',
          words: [
            { term: '土地储备', phonetic: '', meaning: '政府依法取得土地并进行前期开发', example: '土地储备中心负责收储。' },
            { term: '招拍挂', phonetic: '', meaning: '招标、拍卖、挂牌三种出让方式', example: '经营性用地须招拍挂出让。' },
            { term: '出让金', phonetic: '', meaning: '土地使用权出让价款', example: '一次性或分期缴纳。' },
            { term: '土地用途管制', phonetic: '', meaning: '严格按规划用途使用土地', example: '不得擅自改变用途。' },
          ]
        },
        {
          id: 'm6', type: 'case', title: '案例：征地拆迁补偿争议',
          content: `<p>某项目征地中，村民对补偿标准不满引发群体事件，导致项目停滞 8 个月。</p>
            <h4>争议焦点</h4>
            <p>村民认为按区片综合地价补偿偏低，要求按周边商品房市场价补偿；政府坚持按法定标准执行。</p>
            <h4>化解措施</h4>
            <p>1. 引入第三方评估机构重新测算；2. 增设搬迁奖励与就业安置；3. 建立村民代表沟通机制；4. 对房屋面积有争议的进行实测复核。</p>
            <blockquote>征地拆迁的核心是「合法、合理、合情」的平衡。</blockquote>
            <h4>经验教训</h4>
            <p>前期应做充分的社会稳定风险评估，补偿方案需与村民充分协商，避免「先拆后谈」激化矛盾。</p>`
        },
        {
          id: 'm7', type: 'practice', title: '土地出让方式选择',
          prompt: '某宗商业用地位于城市核心区，周边竞争激烈，政府希望实现土地价值最大化。请分析应选择招标、拍卖还是挂牌方式出让，并说明理由及各自适用场景。',
          placeholder: '分析：\n1. 三种方式的特点：...\n2. 本项目适用：...\n3. 理由：...'
        },
      ]
    },
    {
      id: 're-secondary', disc: 'realestate', title: '房地产二级开发全流程', level: 1,
      icon: '🏢', color: 'real', duration: '60小时', lessons: 28, students: 4280,
      desc: '从拿地到交付：规划设计、报批报建、工程管理、营销策划。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '二级开发术语',
          words: [
            { term: '容积率', phonetic: '', meaning: '总建筑面积与用地面积比', example: '容积率越高密度越大。' },
            { term: '五证', phonetic: '', meaning: '土地证、用地规划证、工程规划证、施工证、预售证', example: '五证齐全方可销售。' },
            { term: '去化率', phonetic: '', meaning: '销售率', example: '开盘去化率反映市场认可度。' },
            { term: '建安成本', phonetic: '', meaning: '建筑安装工程成本', example: '占开发成本比重较大。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '报批报建',
          question: '商品房预（销）售必须取得哪一证？',
          options: ['建设工程规划许可证', '建筑工程施工许可证', '商品房预售许可证', '不动产权证'], answer: 2,
          explain: '商品房预售需取得《商品房预售许可证》方可对外销售。'
        },
        {
          id: 'm3', type: 'case', title: '案例：刚需盘快周转策略',
          content: `<p>某房企在三四线城市开发 30 万方刚需住宅，采用「456」快周转模式。</p>
            <h4>核心策略</h4>
            <p>拿地后 4 个月开盘、5 个月现金流回正、6 个月实现盈利。通过标准化产品、前置报建、精准定价实现快速去化。</p>
            <h4>风险控制</h4>
            <p>需确保工程质量与交房标准，避免「高周转」带来的品质投诉。</p>
            <blockquote>房地产开发是资金、资源、时间的综合博弈。</blockquote>`
        },
        {
          id: 'm4', type: 'practice', title: '项目策划',
          prompt: '请为一块容积率 2.5、占地 80 亩的住宅用地设计产品定位（户型配比、目标客群、价格策略），并说明理由。',
          placeholder: '产品定位建议：\n1. 目标客群：...\n2. 户型配比：...\n3. 价格策略：...'
        },
        {
          id: 'm5', type: 'vocab', title: '成本管控术语',
          words: [
            { term: '目标成本', phonetic: '', meaning: '项目全周期成本控制上限', example: '拿地前测算确定。' },
            { term: '动态成本', phonetic: '', meaning: '实时反映的项目成本', example: '需每月复盘调整。' },
            { term: '设计费', phonetic: '', meaning: '规划、建筑、景观等设计费用', example: '约占总成本 2-3%。' },
            { term: '财务费用', phonetic: '', meaning: '融资利息等资金成本', example: '高杠杆项目占比大。' },
          ]
        },
        {
          id: 'm6', type: 'grammar', title: '成本科目',
          question: '以下哪项不属于「开发成本」科目？',
          options: ['土地出让金', '建安工程费', '销售费用', '基础设施费'], answer: 2,
          explain: '销售费用属于期间费用，不计入开发成本。'
        },
        {
          id: 'm7', type: 'case', title: '案例：某项目成本超支管控',
          content: `<p>某住宅项目原目标成本 12 亿，施工过程中超支 8000 万，达 12.8 亿。</p>
            <h4>超支原因</h4>
            <p>1. 设计变更频繁（增加 3500 万）；2. 材料价格上涨未锁价（增加 2500 万）；3. 基坑支护方案调整（增加 2000 万）。</p>
            <h4>管控措施</h4>
            <p>1. 推行「限额设计」，严控设计变更审批；2. 对钢筋、混凝土等主材实行「锁价采购」；3. 建立动态成本月度复盘机制，超支预警及时纠偏。</p>
            <blockquote>成本管控的关键是「事前控制」而非「事后核算」。</blockquote>
            <h4>管控成效</h4>
            <p>通过上述措施，后续阶段将超支控制在 2000 万以内，最终决算较目标成本仅超 1.7%。</p>`
        },
        {
          id: 'm8', type: 'practice', title: '施工节点计划编制',
          prompt: '某高层住宅项目总工期 24 个月，请列出从开工到交付的关键工程节点（至少 8 个），并标注每个节点的合理工期。',
          placeholder: '关键节点：\n1. 桩基工程：3 个月\n2. 地下结构：...'
        },
      ]
    },

    // ===================== 新增课程 =====================

    // ========== 英语：商务英语 ==========
    {
      id: 'en-business', disc: 'language', title: '商务英语实战', level: 2,
      icon: '💼', color: 'lang', duration: '30小时', lessons: 16, students: 9870,
      desc: '掌握职场邮件、会议、谈判等商务场景的英语表达。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '商务高频词',
          words: [
            { term: 'negotiate', phonetic: '/nɪˈɡoʊʃieɪt/', meaning: '谈判', example: 'We need to negotiate the contract terms.' },
            { term: 'deadline', phonetic: '/ˈdedlaɪn/', meaning: '截止日期', example: 'The deadline is next Friday.' },
            { term: 'revenue', phonetic: '/ˈrevənuː/', meaning: '收入', example: 'Our revenue grew by 20%.' },
            { term: 'stakeholder', phonetic: '/ˈsteɪkhoʊldər/', meaning: '利益相关者', example: 'We should align with all stakeholders.' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '商务邮件语气',
          question: '以下哪句最适合正式商务邮件的开头？',
          options: ['Hey, what\'s up?', 'I hope this email finds you well.', 'Yo, listen up.', 'Sup dude?'], answer: 1,
          explain: '正式商务邮件应使用礼貌得体的问候语。'
        },
        {
          id: 'm3', type: 'speak', title: '会议开场',
          phrase: 'Thank you all for joining today. Let\'s get started with the first item on the agenda.',
          translation: '感谢大家参加今天的会议。让我们开始议程的第一项。'
        },
        {
          id: 'm4', type: 'case', title: '案例：跨文化商务谈判',
          content: `<p>一家中国公司与美国合作伙伴进行合同谈判，因文化差异导致沟通障碍。</p>
            <h4>关键差异</h4>
            <p>中方倾向先建立关系再谈细节，美方则希望直接进入条款讨论。</p>
            <blockquote>理解文化语境是国际商务成功的关键。</blockquote>
            <h4>解决方案</h4>
            <p>中方代表先用 10 分钟寒暄建立信任，美方则提前发送议程明确目标，双方各让一步达成共识。</p>`
        },
      ]
    },

    // ========== 英语：高级写作 ==========
    {
      id: 'en-writing', disc: 'language', title: '英语高级写作', level: 3,
      icon: '✍️', color: 'lang', duration: '25小时', lessons: 14, students: 5430,
      desc: '学术论文与高级应用文写作，提升逻辑与表达精准度。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '学术写作词汇',
          words: [
            { term: 'nevertheless', phonetic: '/ˌnevərðəˈles/', meaning: '然而', example: 'Nevertheless, further research is needed.' },
            { term: 'consequently', phonetic: '/ˈkɑːnsəkwentli/', meaning: '因此', example: 'Consequently, the results were inconclusive.' },
            { term: 'hypothesis', phonetic: '/haɪˈpɑːθəsɪs/', meaning: '假设', example: 'Our hypothesis was confirmed.' },
            { term: 'methodology', phonetic: '/ˌmeθəˈdɑːlədʒi/', meaning: '方法论', example: 'The methodology was rigorous.' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '虚拟语气进阶',
          question: '「Had I known earlier, I ___ differently.」应填？',
          options: ['would act', 'would have acted', 'will act', 'acted'], answer: 1,
          explain: '对过去的虚拟，主句用 would have done。'
        },
        {
          id: 'm3', type: 'practice', title: '段落写作',
          prompt: '请用 100 词左右写一段关于「远程办公的利弊」的议论文，要求使用至少 2 个学术连接词。',
          placeholder: 'In recent years, remote work has become increasingly prevalent...'
        },
      ]
    },

    // ========== 日语：N2 语法 ==========
    {
      id: 'jp-n2', disc: 'language', title: '日语 N2 语法精讲', level: 3,
      icon: '🎌', color: 'lang', duration: '40小时', lessons: 24, students: 3890,
      desc: 'N2 级别核心语法句型，配合真题精讲与练习。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'N2 核心词汇',
          words: [
            { term: '到底', phonetic: 'とうてい', meaning: '无论如何也（不）', example: '到底間に合わない。' },
            { term: '案外', phonetic: 'あんがい', meaning: '意外地', example: '案外簡単だった。' },
            { term: '割に', phonetic: 'わりに', meaning: '相比之下', example: '値段の割においしい。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '〜にもかかわらず',
          question: '「大雨___、試合は行われた。」应填？',
          options: ['にもかかわらず', 'につれて', 'にしたがって', 'にとって'], answer: 0,
          explain: '「〜にもかかわらず」表示「尽管…但是…」。'
        },
        {
          id: 'm3', type: 'speak', title: 'N2 句型表达',
          phrase: '一生懸命勉強したにもかかわらず、試験に落ちてしまいました。',
          translation: '尽管拼命学习了，考试还是没及格。'
        },
      ]
    },

    // ========== 韩语：中级 ==========
    {
      id: 'kr-inter', disc: 'language', title: '韩语中级会话', level: 2,
      icon: '🏮', color: 'lang', duration: '28小时', lessons: 16, students: 3210,
      desc: 'TOPIK 中级语法与日常场景会话实战。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '中级词汇',
          words: [
            { term: '경험', phonetic: 'gyeongheom', meaning: '经验', example: '다양한 경험을 쌓다.' },
            { term: '노력', phonetic: 'noryeok', meaning: '努力', example: '노력하면 성공할 거예요.' },
            { term: '기회', phonetic: 'gihoe', meaning: '机会', example: '좋은 기회를 잡다.' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '〜아/어서',
          question: '「배가 고파서 ___」应填？',
          options: ['밥을 먹어요', '밥을 못 먹어요', '밥을 주세요', '배가 불러요'], answer: 0,
          explain: '「-아/어서」表示原因，肚子饿所以吃饭。'
        },
        {
          id: 'm3', type: 'speak', title: '求职自我介绍',
          phrase: '저는 성실하고 책임감이 강한 사람입니다. 어려운 일도 포기하지 않고 노력합니다.',
          translation: '我是一个诚实且责任心强的人。面对困难也不放弃，努力到底。'
        },
      ]
    },

    // ========== 日语：口语实战 ==========
    {
      id: 'jp-speak', disc: 'language', title: '日语口语实战', level: 1,
      icon: '💬', color: 'lang', duration: '18小时', lessons: 12, students: 4560,
      desc: '覆盖购物、出行、餐饮等场景的实用日语口语。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '餐厅用语',
          words: [
            { term: 'メニュー', phonetic: 'menyū', meaning: '菜单', example: 'メニューをください。' },
            { term: '注文', phonetic: 'ちゅうもん', meaning: '点菜', example: '注文をお願いします。' },
            { term: 'お勘定', phonetic: 'おかんじょう', meaning: '买单', example: 'お勘定をお願いします。' },
          ]
        },
        {
          id: 'm2', type: 'speak', title: '餐厅点餐',
          phrase: 'すみません、ラーメンを一つください。お湯もお願いします。',
          translation: '不好意思，请给我一份拉面。再给我一杯热水。'
        },
        {
          id: 'm3', type: 'listen', title: '听力：店员对话',
          transcript: '店員：いらっしゃいませ。何名様ですか？客：二人です。店員：かしこまりました。こちらへどうぞ。',
          question: '客人有几位？',
          options: ['一人', '二人', '三人', '四人'], answer: 1
        },
      ]
    },

    // ========== AI：深度学习 ==========
    {
      id: 'ai-dl', disc: 'ai', title: '深度学习入门', level: 1,
      icon: '🧬', color: 'ai', duration: '45小时', lessons: 26, students: 11200,
      desc: '神经网络、反向传播、CNN/RNN 核心原理与 TensorFlow 实战。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '深度学习术语',
          words: [
            { term: 'Backpropagation', phonetic: '', meaning: '反向传播', example: '训练神经网络的核心算法。' },
            { term: 'Activation Function', phonetic: '', meaning: '激活函数', example: 'ReLU 是最常用的激活函数。' },
            { term: 'CNN', phonetic: '', meaning: '卷积神经网络', example: '擅长处理图像数据。' },
            { term: 'Epoch', phonetic: '', meaning: '轮次', example: '一个 epoch 表示遍历完所有训练数据。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '激活函数选择',
          question: '隐藏层最常用的激活函数是？',
          options: ['Sigmoid', 'Tanh', 'ReLU', 'Softmax'], answer: 2,
          explain: 'ReLU 计算高效且缓解梯度消失，是隐藏层首选。'
        },
        {
          id: 'm3', type: 'case', title: '案例：图像分类模型',
          content: `<p>使用 CNN 构建猫狗图片分类器，准确率达到 95%。</p>
            <h4>网络结构</h4>
            <p>3 个卷积块（Conv+ReLU+MaxPool）+ 2 层全连接，输出 Softmax 二分类。</p>
            <h4>训练技巧</h4>
            <p>数据增强（旋转、翻转）+ Dropout 防止过拟合，使用 Adam 优化器。</p>`
        },
        {
          id: 'm4', type: 'practice', title: 'CNN 实现',
          prompt: '请用伪代码描述一个用于手写数字识别的 CNN 网络结构（输入层→卷积→池化→全连接→输出），说明各层作用。',
          placeholder: '网络结构：\nInput (28x28x1)\n↓ Conv2D(32, 3x3) + ReLU\n...'
        },
      ]
    },

    // ========== AI：计算机视觉 ==========
    {
      id: 'ai-cv', disc: 'ai', title: '计算机视觉实战', level: 2,
      icon: '👁️', color: 'ai', duration: '50小时', lessons: 28, students: 6780,
      desc: '目标检测、图像分割、人脸识别等 CV 核心任务。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'CV 术语',
          words: [
            { term: 'Object Detection', phonetic: '', meaning: '目标检测', example: '定位并识别图像中的物体。' },
            { term: 'IoU', phonetic: '', meaning: '交并比', example: '评估检测框重合度。' },
            { term: 'Semantic Segmentation', phonetic: '', meaning: '语义分割', example: '像素级分类。' },
            { term: 'YOLO', phonetic: '', meaning: '实时目标检测算法', example: 'You Only Look Once。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '检测算法对比',
          question: '以下哪个算法属于一阶段检测器？',
          options: ['R-CNN', 'Fast R-CNN', 'Faster R-CNN', 'YOLO'], answer: 3,
          explain: 'YOLO 一阶段直接预测，速度更快。'
        },
        {
          id: 'm3', type: 'case', title: '案例：自动驾驶感知',
          content: `<p>某自动驾驶公司使用 YOLOv8 实现车辆、行人、交通标志的实时检测。</p>
            <h4>挑战</h4>
            <p>夜间、雨天等恶劣条件下检测精度下降，需数据增强与多模态融合。</p>
            <h4>优化</h4>
            <p>引入红外摄像头数据，训练多模态融合模型，mAP 提升 12%。</p>`
        },
      ]
    },

    // ========== AI：NLP ==========
    {
      id: 'ai-nlp', disc: 'ai', title: 'NLP 自然语言处理', level: 2,
      icon: '📝', color: 'ai', duration: '48小时', lessons: 26, students: 8450,
      desc: '从词向量到 Transformer，掌握 NLP 核心技术。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'NLP 术语',
          words: [
            { term: 'Tokenization', phonetic: '', meaning: '分词', example: '将文本切分为词或子词。' },
            { term: 'Word Embedding', phonetic: '', meaning: '词嵌入', example: 'Word2Vec 将词映射为向量。' },
            { term: 'Transformer', phonetic: '', meaning: 'Transformer 架构', example: '基于自注意力机制。' },
            { term: 'Fine-tuning', phonetic: '', meaning: '微调', example: '在预训练模型基础上适配下游任务。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '注意力机制',
          question: 'Transformer 的核心机制是？',
          options: ['CNN', 'RNN', 'Self-Attention', 'LSTM'], answer: 2,
          explain: '自注意力机制是 Transformer 的核心。'
        },
        {
          id: 'm3', type: 'case', title: '案例：智能客服机器人',
          content: `<p>基于 BERT 微调的智能客服，意图识别准确率 96%。</p>
            <h4>流程</h4>
            <p>用户输入 → 分词 → BERT 编码 → 意图分类 → 匹配回复模板 / 转人工。</p>
            <h4>效果</h4>
            <p>70% 的常见问题可自动应答，客服人力成本降低 40%。</p>`
        },
      ]
    },

    // ========== AI 工具：Stable Diffusion ==========
    {
      id: 'ai-tools-sd', disc: 'ai-tools', title: 'Stable Diffusion 绘画实战', level: 1,
      icon: '🖼️', color: 'ai', duration: '15小时', lessons: 12, students: 7890,
      desc: '本地部署 SD、LoRA 训练、ControlNet 控制出图。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'SD 核心概念',
          words: [
            { term: 'Checkpoint', phonetic: '', meaning: '主模型', example: 'SD 1.5 / SDXL 等基础模型。' },
            { term: 'LoRA', phonetic: '', meaning: '低秩适配', example: '轻量级风格微调模型。' },
            { term: 'ControlNet', phonetic: '', meaning: '控制网络', example: '用线稿/深度图控制构图。' },
            { term: 'Sampler', phonetic: '', meaning: '采样器', example: 'DPM++ 等去噪算法。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '出图参数',
          question: '想要更精细的画面细节，应调整哪个参数？',
          options: ['降低 Steps', '提高 CFG Scale', '使用更低分辨率', '减少采样步数'], answer: 1,
          explain: '适度提高 CFG Scale 可让画面更贴合提示词。'
        },
        {
          id: 'm3', type: 'practice', title: 'SD Workflow 设计',
          prompt: '请设计一个 Stable Diffusion 出图工作流：输入一张人物线稿，输出赛博朋克风格上色图。需要用到哪些模型和插件？',
          placeholder: '工作流：\n1. 输入：人物线稿\n2. ControlNet (Canny) 控制构图\n3. SDXL 主模型 + 赛博朋克 LoRA\n...'
        },
      ]
    },

    // ========== AI 工具：办公自动化 ==========
    {
      id: 'ai-tools-office', disc: 'ai-tools', title: 'AI 办公自动化', level: 1,
      icon: '⚙️', color: 'ai', duration: '12小时', lessons: 10, students: 14500,
      desc: '用 AI 工具批量处理文档、表格、PPT，提升办公效率。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'AI 办公工具',
          words: [
            { term: 'WPS AI', phonetic: '', meaning: '金山办公 AI', example: '文档/表格智能助手。' },
            { term: 'Copilot', phonetic: '', meaning: '微软办公 AI', example: 'Office 全家桶 AI 助手。' },
            { term: 'Notion AI', phonetic: '', meaning: 'Notion 智能写作', example: '知识库与写作辅助。' },
            { term: 'Gamma', phonetic: '', meaning: 'AI 生成 PPT', example: '一键生成演示文稿。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '工具选择',
          question: '需要快速生成一份 20 页产品发布会 PPT，最适合的工具是？',
          options: ['ChatGPT', 'Gamma', 'Midjourney', 'Stable Diffusion'], answer: 1,
          explain: 'Gamma 专为 PPT 生成设计。'
        },
        {
          id: 'm3', type: 'case', title: '案例：周报自动化',
          content: `<p>某团队用 AI 将每日工作记录自动汇总为周报。</p>
            <h4>流程</h4>
            <p>每日在飞书写工作要点 → 周末用 AI 自动提取关键成果、问题、下周计划 → 生成结构化周报。</p>
            <h4>效果</h4>
            <p>周报撰写时间从 2 小时缩短至 15 分钟，且内容更结构化。</p>`
        },
      ]
    },

    // ========== AI 工具：Claude ==========
    {
      id: 'ai-tools-claude', disc: 'ai-tools', title: 'Claude 深度应用', level: 1,
      icon: '📎', color: 'ai', duration: '10小时', lessons: 8, students: 6320,
      desc: 'Claude 的长文档处理、代码生成与多模态能力实战。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: 'Claude 特性',
          words: [
            { term: 'Context Window', phonetic: '', meaning: '上下文窗口', example: 'Claude 3 支持 200K tokens。' },
            { term: 'Claude Code', phonetic: '', meaning: '编程助手', example: '终端中的 AI 编程伙伴。' },
            { term: 'Artifacts', phonetic: '', meaning: '产物面板', example: '可直接渲染代码输出。' },
            { term: 'Vision', phonetic: '', meaning: '视觉能力', example: '分析图片与图表。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '长文档处理',
          question: '处理一份 50 页的合同并提取关键条款，最适合用 Claude 的哪项能力？',
          options: ['图像生成', '长上下文理解', '语音合成', '视频编辑'], answer: 1,
          explain: 'Claude 的长上下文窗口适合处理长文档。'
        },
        {
          id: 'm3', type: 'practice', title: 'Claude Prompt 设计',
          prompt: '请设计一个 Prompt，让 Claude 帮你审阅一份劳动合同，列出其中对劳动者不利的条款并给出修改建议。',
          placeholder: '你是一位资深劳动法律师，请审阅以下劳动合同，重点关注：1. 试用期约定 2. 竞业限制条款 3. 违约金...'
        },
      ]
    },

    // ========== 风水：八字命理 ==========
    {
      id: 'feng-bazi', disc: 'fengshui', title: '八字命理基础', level: 1,
      icon: '🔮', color: 'feng', duration: '30小时', lessons: 18, students: 5670,
      desc: '天干地支、五行生克、八字排盘入门。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '八字基础',
          words: [
            { term: '天干', phonetic: '', meaning: '甲乙丙丁戊己庚辛壬癸', example: '十天干。' },
            { term: '地支', phonetic: '', meaning: '子丑寅卯辰巳午未申酉戌亥', example: '十二地支。' },
            { term: '日主', phonetic: '', meaning: '出生日的天干', example: '代表命主自身。' },
            { term: '十神', phonetic: '', meaning: '正官、七杀等十种关系', example: '描述日主与其他天干关系。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '五行相生',
          question: '五行中「金」生什么？',
          options: ['木', '火', '土', '水'], answer: 3,
          explain: '金生水，水生木，木生火，火生土，土生金。'
        },
        {
          id: 'm3', type: 'case', title: '案例：八字分析',
          content: `<p>某命主出生于 1990 年 5 月 10 日午时，八字排盘为庚午年辛巳月乙亥日壬午时。</p>
            <h4>日主分析</h4>
            <p>日主乙木生于巳月（火旺），木泄气，需水来生木、金来制衡。</p>
            <h4>喜用神</h4>
            <p>喜水（印星生身）、忌火（食伤泄身过重）。宜从事与水相关行业。</p>
            <blockquote>八字分析需综合全局，不可仅凭单点论断。</blockquote>`
        },
      ]
    },

    // ========== 风水：办公风水 ==========
    {
      id: 'feng-office', disc: 'fengshui', title: '办公风水布局', level: 1,
      icon: '🪑', color: 'feng', duration: '18小时', lessons: 12, students: 4890,
      desc: '办公室座位、办公区、会议室的风水优化与化解。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '办公风水术语',
          words: [
            { term: '坐山朝向', phonetic: '', meaning: '座位背后与前方方位', example: '宜坐实朝空。' },
            { term: '横梁压顶', phonetic: '', meaning: '座位上方有横梁', example: '不利事业发展。' },
            { term: '背后无靠', phonetic: '', meaning: '座位背后是过道或空', example: '缺乏贵人运。' },
            { term: '财位', phonetic: '', meaning: '办公室聚财位', example: '宜放置绿植或聚宝盆。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '座位选择',
          question: '以下哪种座位布局最不利？',
          options: ['背后靠墙', '面对门口', '背靠过道', '侧对窗户'], answer: 2,
          explain: '背靠过道使人缺乏安全感，且气流扰动不利专注。'
        },
        {
          id: 'm3', type: 'practice', title: '办公桌布置',
          prompt: '请描述你目前的办公桌布置（座位朝向、桌面物品、周围环境），并用所学知识分析优缺点，提出 3 条改进建议。',
          placeholder: '我的座位朝向：...\n桌面物品：...\n改进建议：1. ...'
        },
      ]
    },

    // ========== 风水：罗盘使用 ==========
    {
      id: 'feng-luopan', disc: 'fengshui', title: '风水罗盘使用', level: 2,
      icon: '🧭', color: 'feng', duration: '22小时', lessons: 14, students: 2340,
      desc: '罗盘圈层解读、立极定向、二十四山精确定位。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '罗盘术语',
          words: [
            { term: '天池', phonetic: '', meaning: '罗盘中央指南针', example: '罗盘核心部件。' },
            { term: '二十四山', phonetic: '', meaning: '24 个方位', example: '每山 15 度。' },
            { term: '立极', phonetic: '', meaning: '确定宅之中心点', example: '测量方位的基准。' },
            { term: '纳甲', phonetic: '', meaning: '天干纳于八卦', example: '罗盘重要圈层。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '方位测量',
          question: '罗盘测量时，指针指向的红色一端代表？',
          options: ['南方', '北方', '东方', '西方'], answer: 1,
          explain: '指南针红色一端指向北方。'
        },
        {
          id: 'm3', type: 'case', title: '案例：住宅立极定向',
          content: `<p>为一套坐北朝南的住宅进行罗盘测量。</p>
            <h4>测量步骤</h4>
            <p>1. 在住宅中心点（立极点）持罗盘；2. 使罗盘水平，让天池指针稳定；3. 读取大门朝向对应的二十四山方位。</p>
            <h4>注意事项</h4>
            <p>远离金属物品与电器，避免磁场干扰。多次测量取平均值。</p>`
        },
      ]
    },

    // ========== 房地产：商业地产 ==========
    {
      id: 're-commercial', disc: 'realestate', title: '商业地产开发', level: 2,
      icon: '🛒', color: 'real', duration: '55小时', lessons: 26, students: 2870,
      desc: '购物中心、写字楼、酒店等商业业态开发运营。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '商业地产术语',
          words: [
            { term: '业态', phonetic: '', meaning: '商业经营形态', example: '零售、餐饮、娱乐。' },
            { term: '坪效', phonetic: '', meaning: '每平米销售额', example: '衡量商业运营效率。' },
            { term: '租金回报率', phonetic: '', meaning: '年租金/总投资', example: '商业投资核心指标。' },
            { term: '招商', phonetic: '', meaning: '引入品牌商户', example: '商业项目成败关键。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '商业定位',
          question: '社区型商业中心最适合的主力店是？',
          options: ['奢侈品旗舰店', '大型超市+影院', '汽车 4S 店', '批发市场'], answer: 1,
          explain: '社区商业以生活服务为主，超市+影院组合最佳。'
        },
        {
          id: 'm3', type: 'case', title: '案例：社区商业招商',
          content: `<p>某 5 万方社区商业中心，定位「邻里生活中心」。</p>
            <h4>业态配比</h4>
            <p>零售 40%、餐饮 30%、亲子 15%、生活服务 15%。</p>
            <h4>招商策略</h4>
            <p>引入区域首店品牌做主力店，给予 3-6 个月免租期；其余商铺按 70% 出租率开业，后续逐步满租。</p>
            <blockquote>商业地产的核心是「运营」而非单纯「开发」。</blockquote>`
        },
        {
          id: 'm4', type: 'vocab', title: '商业动线与招商',
          words: [
            { term: '主动线', phonetic: '', meaning: '引导顾客流动的主通道', example: '应清晰顺畅无死角。' },
            { term: '主力店', phonetic: '', meaning: '带动客流的核心商户', example: '超市、影院、百货。' },
            { term: '次主力店', phonetic: '', meaning: '辅助主力店的中型商户', example: '快时尚、健身。' },
            { term: '租金递增', phonetic: '', meaning: '合同期内租金逐年上涨', example: '常见每年递增 3-5%。' },
          ]
        },
        {
          id: 'm5', type: 'case', title: '案例：购物中心动线设计',
          content: `<p>某 10 万方购物中心开业后客流分布不均，首层东侧商铺大量空置。</p>
            <h4>问题诊断</h4>
            <p>主动线设计存在「断头路」，东侧缺乏主力店引流，顾客不愿绕行。</p>
            <h4>改造方案</h4>
            <p>1. 在东侧引入大型亲子乐园作为次主力店；2. 调整扶梯位置形成「回」字形动线；3. 在动线转角设置网红打卡点与休息区。</p>
            <h4>改造成效</h4>
            <p>东侧客流提升 60%，空置商铺全部租出，整体租金上调 15%。</p>
            <blockquote>动线是商业的「血管」，决定了客流的分布与消费转化。</blockquote>`
        },
        {
          id: 'm6', type: 'practice', title: '招商谈判模拟',
          prompt: '你是某购物中心招商经理，某连锁咖啡品牌希望入驻。对方提出：租金 80 元/㎡/月、免租期 6 个月、物业由甲方负责。你的底线是租金 100 元、免租期 3 个月。请设计谈判策略，列出至少 3 个让步交换条件。',
          placeholder: '谈判策略：\n1. 开场报价：...\n2. 让步交换条件：...\n3. 促成签约的筹码：...'
        },
      ]
    },

    // ========== 房地产：物业运营 ==========
    {
      id: 're-property', disc: 'realestate', title: '物业运营管理', level: 1,
      icon: '🏘️', color: 'real', duration: '35小时', lessons: 20, students: 3650,
      desc: '物业管理体系、客户服务、设施设备维护、智慧物业。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '物业术语',
          words: [
            { term: '物业费', phonetic: '', meaning: '业主缴纳的管理费用', example: '按建筑面积收取。' },
            { term: '公共区域', phonetic: '', meaning: '业主共用部分', example: '楼道、电梯、花园。' },
            { term: '维保', phonetic: '', meaning: '维护保养', example: '设施设备定期维保。' },
            { term: '业主满意度', phonetic: '', meaning: '物业服务评价指标', example: '物业核心 KPI。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '物业费使用',
          question: '物业费主要不用于以下哪项？',
          options: ['公共区域保洁', '电梯维保', '业主室内装修', '小区安保'], answer: 2,
          explain: '业主室内装修由业主自行承担。'
        },
        {
          id: 'm3', type: 'case', title: '案例：智慧社区建设',
          content: `<p>某小区引入智慧物业管理系统，提升服务效率。</p>
            <h4>系统功能</h4>
            <p>人脸识别门禁、在线报修、智能停车、能耗监测、社区电商。</p>
            <h4>成效</h4>
            <p>报修响应时间从 4 小时缩短至 30 分钟，业主满意度提升至 92%。</p>`
        },
        {
          id: 'm4', type: 'vocab', title: '物业进阶术语',
          words: [
            { term: '前期介入', phonetic: '', meaning: '物业在施工阶段提前参与', example: '便于后期运营维护。' },
            { term: '业委会', phonetic: '', meaning: '业主委员会', example: '代表业主监督物业。' },
            { term: '公共维修基金', phonetic: '', meaning: '用于公共部位大修的专项资金', example: '业主购房时缴纳。' },
            { term: '酬金制', phonetic: '', meaning: '物业公司按比例提取酬金', example: '结余归全体业主。' },
          ]
        },
        {
          id: 'm5', type: 'case', title: '案例：物业费收缴纠纷',
          content: `<p>某小区物业费收缴率仅 65%，物业公司入不敷出，服务质量下降，业主更加不满，形成恶性循环。</p>
            <h4>矛盾根源</h4>
            <p>1. 部分业主对服务质量不满意拒交；2. 房屋漏水等开发商遗留问题被迁怒于物业；3. 缺乏有效沟通机制。</p>
            <h4>解决路径</h4>
            <p>1. 联合业委会建立「服务清单+考核标准」公开机制；2. 对历史遗留问题牵头协调开发商解决；3. 对恶意欠费业主启动法律程序；4. 引入第三方满意度调查并公示结果。</p>
            <blockquote>物业纠纷的本质是「服务质量」与「付费意愿」的博弈。</blockquote>
            <h4>结果</h4>
            <p>6 个月后收缴率提升至 90%，业主满意度从 45 分回升至 82 分。</p>`
        },
        {
          id: 'm6', type: 'practice', title: '物业服务方案设计',
          prompt: '请为一个 2000 户的高层住宅小区设计物业服务方案，至少包含：人员配置、服务标准、收费标准、品质监督机制四个方面。',
          placeholder: '物业服务方案：\n1. 人员配置：...\n2. 服务标准：...\n3. 收费标准：...\n4. 品质监督：...'
        },
      ]
    },

    // ========== 房地产：投资分析 ==========
    {
      id: 're-investment', disc: 'realestate', title: '房地产投资分析', level: 2,
      icon: '📊', color: 'real', duration: '40小时', lessons: 22, students: 3120,
      desc: '投资测算、现金流分析、风险评估与投资决策。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '投资术语',
          words: [
            { term: 'IRR', phonetic: '', meaning: '内部收益率', example: '投资回报核心指标。' },
            { term: 'NPV', phonetic: '', meaning: '净现值', example: '未来现金流折现。' },
            { term: 'Cap Rate', phonetic: '', meaning: '资本化率', example: '年净收益/物业价值。' },
            { term: 'LTV', phonetic: '', meaning: '贷款价值比', example: '贷款额/物业估值。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '投资决策',
          question: '当 NPV > 0 时，投资项目？',
          options: ['应拒绝', '可以接受', '无法判断', '一定亏损'], answer: 1,
          explain: 'NPV 大于 0 表示项目能创造正价值，可以接受。'
        },
        {
          id: 'm3', type: 'practice', title: '投资测算',
          prompt: '某商铺售价 500 万，年租金净收益 25 万，预计 5 年后以 600 万售出。请计算该投资的年化收益率（简单估算），并判断是否值得投资。',
          placeholder: '年化收益率 = (年均收益 + 年均增值) / 初始投资 × 100%\n...'
        },
        {
          id: 'm4', type: 'case', title: '案例：写字楼投资',
          content: `<p>投资者以 8000 万购入一栋写字楼，年租金净收入 640 万。</p>
            <h4>收益分析</h4>
            <p>Cap Rate = 640/8000 = 8%，高于银行贷款利率，具备投资价值。</p>
            <h4>风险提示</h4>
            <p>需关注空置率风险、租户集中度风险与市场利率变化。</p>`
        },
        {
          id: 'm5', type: 'vocab', title: '投资进阶术语',
          words: [
            { term: '折现率', phonetic: '', meaning: '将未来现金流折算为现值的比率', example: '反映资金时间价值与风险。' },
            { term: '现金流', phonetic: '', meaning: '投资期内的资金流入流出', example: '租金收入为正现金流。' },
            { term: '杠杆', phonetic: '', meaning: '利用贷款放大投资收益', example: '高杠杆高风险高回报。' },
            { term: '空置率', phonetic: '', meaning: '空置面积占总面积比例', example: '直接影响租金收益。' },
          ]
        },
        {
          id: 'm6', type: 'grammar', title: '杠杆效应',
          question: '当投资收益率高于贷款利率时，提高杠杆比例会？',
          options: ['降低自有资金收益率', '提高自有资金收益率', '不影响收益', '必然亏损'], answer: 1,
          explain: '正杠杆效应：借款成本低于投资收益时，杠杆放大自有资金回报。'
        },
        {
          id: 'm7', type: 'case', title: '案例：公寓投资现金流分析',
          content: `<p>投资者以 200 万购入一套公寓，首付 60 万，贷款 140 万（利率 5%，30 年等额本息，月供约 7515 元）。</p>
            <h4>收益测算</h4>
            <p>月租金 8000 元，年租金收入 9.6 万；年还贷 9.02 万；年净现金流约 0.58 万。</p>
            <h4>敏感性分析</h4>
            <p>若租金下跌 10% 至 7200 元/月，年租金 8.64 万，不足以覆盖贷款，出现负现金流。</p>
            <blockquote>投资决策不能只看 Cap Rate，必须做现金流压力测试。</blockquote>
            <h4>风险对冲</h4>
            <p>建议预留 6 个月月供作为风险准备金，并购买租金保障保险。</p>`
        },
        {
          id: 'm8', type: 'practice', title: '投资组合配置',
          prompt: '某投资者有 1000 万可投资资金，希望配置房地产资产。请设计一个包含住宅、商业、REITs 的投资组合，说明配置比例与风险分散逻辑。',
          placeholder: '投资组合：\n1. 住宅：__ 万，占比 __%\n2. 商业：__ 万，占比 __%\n3. REITs：__ 万，占比 __%\n配置逻辑：...'
        },
      ]
    },

    // ========== 房地产：合同实务 ==========
    {
      id: 're-contract', disc: 'realestate', title: '房地产合同实务', level: 2,
      icon: '📜', color: 'real', duration: '38小时', lessons: 20, students: 3980,
      desc: '商品房买卖合同、土地出让合同、租赁合同核心条款与风险防范。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '合同核心术语',
          words: [
            { term: '要约', phonetic: '', meaning: '希望订立合同的意思表示', example: '开发商发布的销售广告。' },
            { term: '承诺', phonetic: '', meaning: '同意要约的意思表示', example: '购房者签字认购。' },
            { term: '定金', phonetic: '', meaning: '履约担保金，违约双倍返还', example: '不超过合同标的 20%。' },
            { term: '不可抗力', phonetic: '', meaning: '不能预见不能避免的客观情况', example: '地震、政府征收。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '定金与订金',
          question: '「定金」与「订金」的法律区别是？',
          options: ['无区别', '定金可退，订金不退', '定金不退且违约双倍，订金可退', '都不能退'], answer: 2,
          explain: '定金具有担保性质，给付方违约不退，收受方违约双倍返还；订金仅为预付款可退。'
        },
        {
          id: 'm3', type: 'case', title: '案例：商品房交付纠纷',
          content: `<p>某楼盘合同约定 2024 年 6 月交付，实际 2024 年 12 月才交付，业主要求开发商支付违约金。</p>
            <h4>合同条款</h4>
            <p>合同约定逾期交房按已付房款日万分之三支付违约金。</p>
            <h4>争议点</h4>
            <p>开发商主张因疫情属不可抗力应免责 3 个月；业主认为疫情影响早已结束，不应免责。</p>
            <h4>法院判决</h4>
            <p>法院认定疫情影响期为 2 个月，其余 4 个月开发商应支付违约金：已付房款 200 万 × 0.03% × 120 天 = 7.2 万元。</p>
            <blockquote>合同条款的明确约定是解决纠纷的核心依据。</blockquote>`
        },
        {
          id: 'm4', type: 'vocab', title: '租赁合同条款',
          words: [
            { term: '转租', phonetic: '', meaning: '承租人将房屋再租给第三方', example: '一般需出租人同意。' },
            { term: '优先购买权', phonetic: '', meaning: '承租人在同等条件下优先购买', example: '出租人出卖房屋时。' },
            { term: '买卖不破租赁', phonetic: '', meaning: '房屋买卖不影响租赁合同', example: '新房东须继续履行租约。' },
            { term: '押金', phonetic: '', meaning: '履约保证金', example: '常见押一付三。' },
          ]
        },
        {
          id: 'm5', type: 'practice', title: '合同条款审查',
          prompt: '请审查以下商品房买卖合同条款，指出其中对买方不利的 3 个条款并提出修改建议：\n1. 面积误差比绝对值超出 3% 时，买方不得退房；\n2. 逾期交房违约金上限为已付房款的 1%；\n3. 配套设施以最终交付为准，宣传资料不构成要约。',
          placeholder: '不利条款分析：\n1. 面积误差条款：...\n修改建议：...'
        },
      ]
    },

    // ========== 房地产：金融融资 ==========
    {
      id: 're-finance', disc: 'realestate', title: '房地产金融与融资', level: 2,
      icon: '💰', color: 'real', duration: '42小时', lessons: 22, students: 2760,
      desc: '开发贷、按揭贷款、REITs、债券等多元融资工具与资本运作。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '融资工具术语',
          words: [
            { term: '开发贷', phonetic: '', meaning: '房地产开发贷款', example: '用于项目建设资金。' },
            { term: '按揭贷款', phonetic: '', meaning: '购房者住房抵押贷款', example: '商业/公积金组合贷款。' },
            { term: 'REITs', phonetic: '', meaning: '不动产投资信托基金', example: '持有运营型物业的证券化产品。' },
            { term: '房企债', phonetic: '', meaning: '房地产企业发行的债券', example: '包括公司债、中票等。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '融资方式选择',
          question: '以下哪种融资方式的资金成本最低？',
          options: ['股权融资', '信托融资', '银行开发贷', '民间借贷'], answer: 2,
          explain: '银行开发贷利率通常最低，但要求四证齐全等条件。'
        },
        {
          id: 'm3', type: 'case', title: '案例：某房企融资组合',
          content: `<p>某房企开发一个 50 亿的综合体项目，自有资金 15 亿，需外部融资 35 亿。</p>
            <h4>融资方案</h4>
            <p>1. 银行开发贷 20 亿（利率 5.5%，期限 3 年）；2. 信托融资 8 亿（利率 8%，期限 2 年）；3. 供应链 ABS 4 亿（利率 4.5%）；4. 引入战略投资者股权融资 3 亿。</p>
            <h4>加权平均成本</h4>
            <p>WACC = (20×5.5% + 8×8% + 4×4.5%) / 32 ≈ 6.06%</p>
            <blockquote>多元化融资可降低成本并分散到期风险。</blockquote>
            <h4>风险提示</h4>
            <p>需注意信托与开发贷的到期错配，避免集中兑付风险。</p>`
        },
        {
          id: 'm4', type: 'vocab', title: 'REITs 与证券化',
          words: [
            { term: '公募 REITs', phonetic: '', meaning: '公开募集的不动产信托', example: '基础设施 REITs 已开闸。' },
            { term: 'CMBS', phonetic: '', meaning: '商业抵押贷款支持证券', example: '以商业物业抵押贷款为底层。' },
            { term: '资产证券化', phonetic: '', meaning: '将资产转化为证券流通', example: '盘活存量资产。' },
            { term: '底层资产', phonetic: '', meaning: '证券化的基础资产', example: '如租金收益权。' },
          ]
        },
        {
          id: 'm5', type: 'practice', title: '按揭月供计算',
          prompt: '某购房者贷款 200 万，期限 30 年，年利率 4.2%，采用等额本息还款。请计算：1) 月供金额；2) 还款总额；3) 利息总额。（等额本息月供公式：M = P×r×(1+r)^n / [(1+r)^n - 1]）',
          placeholder: '已知：P=200万，r=4.2%/12=0.35%，n=360\n月供 M = ...'
        },
      ]
    },

    // ========== 房地产：政策法规 ==========
    {
      id: 're-policy', disc: 'realestate', title: '房地产政策法规', level: 1,
      icon: '⚖️', color: 'real', duration: '32小时', lessons: 18, students: 4150,
      desc: '土地管理法、限购限售政策、房产税、预售监管等法规解读。',
      modules: [
        {
          id: 'm1', type: 'vocab', title: '政策术语',
          words: [
            { term: '限购', phonetic: '', meaning: '限制购房套数', example: '按户籍/社保认定资格。' },
            { term: '限售', phonetic: '', meaning: '限制新购住房转让', example: '常见限售 2-5 年。' },
            { term: '限贷', phonetic: '', meaning: '限制贷款首付与利率', example: '二套房首付比例上调。' },
            { term: '房产税', phonetic: '', meaning: '对房产持有环节征税', example: '上海、重庆试点。' },
          ]
        },
        {
          id: 'm2', type: 'grammar', title: '土地使用权年限',
          question: '居住用地的土地使用权最高年限是？',
          options: ['40 年', '50 年', '70 年', '永久'], answer: 2,
          explain: '居住用地 70 年，商业 40 年，工业/综合 50 年。'
        },
        {
          id: 'm3', type: 'case', title: '案例：预售资金监管',
          content: `<p>某城市一楼盘开发商挪用预售资金导致项目停工，业主集体维权。</p>
            <h4>监管背景</h4>
            <p>根据《城市商品房预售管理办法》，预售资金应全部存入监管账户，专款用于工程建设。</p>
            <h4>问题成因</h4>
            <p>1. 监管账户资金被违规挪用至其他项目；2. 银行与监管部门审核流于形式；3. 工程进度与资金拨付不匹配。</p>
            <h4>政策完善</h4>
            <p>各地收紧预售资金监管：1. 按工程节点拨付；2. 引入银行保函替代部分监管资金；3. 建立信息公开平台接受业主监督。</p>
            <blockquote>预售资金监管是「保交付」的核心防线。</blockquote>`
        },
        {
          id: 'm4', type: 'vocab', title: '土地制度',
          words: [
            { term: '集体土地', phonetic: '', meaning: '农村集体经济组织所有', example: '宅基地、耕地。' },
            { term: '国有土地', phonetic: '', meaning: '国家所有的土地', example: '城市市区土地。' },
            { term: '土地征收', phonetic: '', meaning: '将集体土地转为国有', example: '需依法补偿安置。' },
            { term: '永久基本农田', phonetic: '', meaning: '严格保护的耕地', example: '不得擅自占用。' },
          ]
        },
        {
          id: 'm5', type: 'practice', title: '购房资格自查',
          prompt: '假设你是一位外地户籍单身人士，在某限购城市工作 3 年（社保连续缴纳），名下无房。请分析你在以下场景下的购房资格与贷款政策：1) 购买首套普通住宅；2) 购买第二套房（已有一套）；3) 购买商业公寓。',
          placeholder: '购房资格分析：\n1. 首套普通住宅：...\n2. 第二套房：...\n3. 商业公寓：...'
        },
      ]
    },
  ];

  // 成就徽章
  const badges = [
    { id: 'b1', icon: '🌱', name: '初出茅庐', desc: '完成首次学习', condition: (u) => u.totalLessons >= 1 },
    { id: 'b2', icon: '📖', name: '勤学不辍', desc: '累计学习 10 节课', condition: (u) => u.totalLessons >= 10 },
    { id: 'b3', icon: '🔥', name: '七日坚持', desc: '连续学习 7 天', condition: (u) => u.streak >= 7 },
    { id: 'b4', icon: '💯', name: '满分达人', desc: '习题得分 100 分', condition: (u) => (u.bestScore || 0) >= 100 },
    { id: 'b5', icon: '🌍', name: '博学多才', desc: '学习 3 个不同学科', condition: (u) => u.discCount >= 3 },
    { id: 'b6', icon: '🏆', name: '知航之星', desc: '经验值达到 1000', condition: (u) => u.exp >= 1000 },
  ];

  // 社区帖子（示例）
  const posts = [
    { id: 'p1', user: '小林', avatar: '林', time: '2小时前', tags: ['英语', '经验'], body: '坚持每日背 30 个单词半年了，阅读速度明显提升！分享一个心得：把单词放进句子里记比孤立记效果好 3 倍。', likes: 128, comments: 24, liked: false },
    { id: 'p2', user: 'AI探索者', avatar: 'A', time: '5小时前', tags: ['AI工具'], body: '用 ChatGPT 做代码审查真香！把 PR diff 贴进去，让它按 SOLID 原则给出改进建议，质量提升明显。', likes: 89, comments: 12, liked: false },
    { id: 'p3', user: '风水爱好者', avatar: '风', time: '1天前', tags: ['风水'], body: '最近把书桌从背对门改成面对门，工作效率真的提高了。可能是心理作用，但「坐北朝南、背有靠山」确实让人更安心。', likes: 56, comments: 18, liked: false },
    { id: 'p4', user: '地产老兵', avatar: '地', time: '1天前', tags: ['房地产'], body: '刚做完一个一级开发项目的测算，分享一下：七通一平成本现在大概 35-45 万/亩，大家所在城市什么水平？', likes: 42, comments: 31, liked: false },
    { id: 'p5', user: '日语小白', avatar: '日', time: '2天前', tags: ['日语'], body: '五十音终于背完了！接下来准备开始学简单会话，有没有一起打卡的小伙伴？', likes: 73, comments: 9, liked: false },
  ];

  // 排行榜
  const ranking = [
    { name: '学习达人', exp: 2840 },
    { name: 'AI研究员', exp: 2310 },
    { name: '多语种学霸', exp: 1980 },
    { name: '地产小王', exp: 1650 },
    { name: '风水师', exp: 1420 },
    { name: 'KoreanFan', exp: 1280 },
    { name: '坚持者', exp: 1050 },
    { name: '萌新上路', exp: 820 },
  ];

  return { disciplines, levels, courses, badges, posts, ranking };
})();
