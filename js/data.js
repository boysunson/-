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
