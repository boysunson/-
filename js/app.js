/* ============================================================
   知航 · 主应用
   ============================================================ */
(function () {
  const D = window.APP_DATA;
  const A = window.Auth;

  /* ---------- 工具函数 ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $all = (sel, root = document) => [...root.querySelectorAll(sel)];
  const el = (tag, attrs = {}, children = []) => {
    const e = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    });
    children.forEach(c => e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return e;
  };

  function toast(msg, type = '') {
    const stack = $('#toast-stack');
    const t = el('div', { class: 'toast ' + type }, [msg]);
    stack.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; setTimeout(() => t.remove(), 300); }, 2600);
  }

  function colorOf(color) {
    return { lang: 'var(--c-lang)', ai: 'var(--c-ai)', feng: 'var(--c-feng)', real: 'var(--c-real)' }[color] || 'var(--c-primary)';
  }

  /* ---------- 路由 ---------- */
  function parseHash() {
    const h = location.hash.slice(1) || '/';
    const [path, query] = h.split('?');
    const params = {};
    if (query) query.split('&').forEach(p => { const [k, v] = p.split('='); params[k] = decodeURIComponent(v); });
    return { path, params };
  }

  function route() {
    const { path, params } = parseHash();
    const user = A.getCurrentUser();
    const parts = path.split('/').filter(Boolean);

    // 需要登录的路由
    if (['dashboard'].includes(parts[0]) && !user) {
      location.hash = '#/auth';
      toast('请先登录', 'accent');
      return;
    }

    renderNav(user);
    const view = $('#view');
    view.innerHTML = '';

    if (!parts.length || parts[0] === '') renderHome(view, user);
    else if (parts[0] === 'courses') renderCourses(view, user, params);
    else if (parts[0] === 'learn') renderLearn(view, user, params.id);
    else if (parts[0] === 'dashboard') renderDashboard(view, user);
    else if (parts[0] === 'community') renderCommunity(view, user);
    else if (parts[0] === 'auth') renderAuth(view);
    else renderHome(view, user);

    // 激活导航项
    $all('.nav__links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + path ||
        (path.startsWith('/courses') && a.getAttribute('href') === '#/courses'));
    });
    window.scrollTo(0, 0);
  }

  /* ---------- 导航 ---------- */
  function renderNav(user) {
    const actions = $('#nav-actions');
    actions.innerHTML = '';
    if (user) {
      const chip = el('div', { class: 'user-chip', id: 'user-chip' }, [
        el('div', { class: 'user-chip__avatar' }, [user.username.charAt(0).toUpperCase()]),
        document.createTextNode(user.username),
        el('span', { style: 'color:var(--c-text-3);font-size:11px' }, ['▾'])
      ]);
      chip.onclick = (e) => {
        e.stopPropagation();
        $('.user-menu')?.classList.toggle('open');
      };
      actions.appendChild(chip);

      const menu = el('div', { class: 'user-menu', id: 'user-menu' }, [
        el('div', { style: 'padding:8px 12px;font-size:12px;color:var(--c-text-3)' }, [user.email]),
        el('div', { class: 'user-menu__divider' }),
        el('a', { href: '#/dashboard', 'data-route': '' }, ['学习中心']),
        el('a', { href: '#/community', 'data-route': '' }, ['社区']),
        el('div', { class: 'user-menu__divider' }),
        el('a', { href: '#/', onclick: (e) => { e.preventDefault(); A.logout(); location.hash = '#/'; toast('已退出登录'); } }, ['退出登录'])
      ]);
      actions.appendChild(menu);
    } else {
      actions.appendChild(el('a', { class: 'btn btn--ghost btn--sm', href: '#/auth', 'data-route': '' }, ['登录']));
      actions.appendChild(el('a', { class: 'btn btn--primary btn--sm', href: '#/auth?tab=register', 'data-route': '' }, ['免费注册']));
    }
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-chip') && !e.target.closest('.user-menu')) {
      $('.user-menu')?.classList.remove('open');
    }
  });

  $('#nav-toggle').onclick = () => $('.nav__links').classList.toggle('open');

  /* ---------- 首页 ---------- */
  function renderHome(view, user) {
    const hero = el('section', { class: 'hero' });
    hero.innerHTML = `
      <div class="hero__inner">
        <div>
          <div class="hero__eyebrow">✨ 多语种 · 多学科 · 沉浸式学习</div>
          <h1>开启你的<span class="grad">终身学习</span><br/>航行之旅</h1>
          <p class="hero__lead">从英语、日语、韩语到 AI 人工智能、风水学、房地产开发——知航为你打造分级课程与互动学习体验，让每一分努力都看得见。</p>
          <div class="hero__cta">
            ${user
              ? `<a class="btn btn--primary btn--lg" href="#/courses">探索课程</a>
                 <a class="btn btn--ghost btn--lg" href="#/dashboard">继续学习</a>`
              : `<a class="btn btn--primary btn--lg" href="#/auth?tab=register">免费开始学习</a>
                 <a class="btn btn--ghost btn--lg" href="#/courses">浏览课程</a>`}
          </div>
          <div class="hero__stats">
            <div class="hero__stat"><div class="num">${D.courses.length}+</div><div class="label">精品课程</div></div>
            <div class="hero__stat"><div class="num">12万+</div><div class="label">活跃学员</div></div>
            <div class="hero__stat"><div class="num">6</div><div class="label">大学科方向</div></div>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero__card"><span class="dot" style="background:var(--c-lang)"></span><h4>英语 · 雅思进阶</h4><p>完成 8/24 课</p><div class="lvl-pill current" style="margin-top:10px;height:6px;border-radius:3px;background:var(--c-accent);width:60%"></div></div>
          <div class="hero__card"><span class="dot" style="background:var(--c-ai)"></span><h4>AI 工具实战</h4><p>Prompt 工程</p><div style="margin-top:10px;font-size:22px">🤖</div></div>
          <div class="hero__card"><span class="dot" style="background:var(--c-feng)"></span><h4>风水学基础</h4><p>阴阳五行</p><div style="margin-top:10px;font-size:22px">☯️</div></div>
        </div>
      </div>`;
    view.appendChild(hero);

    // 学科分类
    const sec = el('section', { class: 'disciplines' });
    sec.innerHTML = `<div class="container">
      <h2 class="section-title">按学科探索</h2>
      <p class="section-sub">选择你感兴趣的领域，开启定制化学习路径</p>
      <div class="disc-grid">
        ${D.disciplines.map(d => `
          <div class="disc-card disc-card--${d.color}" data-disc="${d.id}">
            <div class="disc-card__icon">${d.icon}</div>
            <div class="disc-card__name">${d.name}</div>
            <div class="disc-card__desc">${d.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>`;
    view.appendChild(sec);
    $all('.disc-card', sec).forEach(c => c.onclick = () => location.hash = `#/courses?disc=${c.dataset.disc}`);

    // 推荐课程
    const rec = recommendedCourses(user);
    const cs = el('section', { class: 'courses-section' });
    cs.innerHTML = `<div class="container">
      <h2 class="section-title">${user ? '为你推荐' : '热门课程'}</h2>
      <p class="section-sub">${user ? '基于你的兴趣与学习记录智能推荐' : '学员好评最多的精品课程'}</p>
      <div class="course-grid" id="home-courses"></div>
    </div>`;
    view.appendChild(cs);
    $('#home-courses', cs).innerHTML = rec.map(courseCardHTML).join('');
    bindCourseCards(cs);
  }

  function recommendedCourses(user) {
    let list = D.courses;
    if (user && user.interests?.length) {
      const interested = list.filter(c => user.interests.includes(c.disc));
      if (interested.length >= 3) list = interested;
    }
    return [...list].sort(() => Math.random() - 0.5).slice(0, 6);
  }

  function courseCardHTML(c) {
    const user = A.getCurrentUser();
    const prog = user?.progress?.[c.id] || {};
    const done = Object.keys(prog).filter(k => prog[k]?.status === 'done').length;
    const total = c.modules.length;
    const pct = total ? Math.round(done / total * 100) : 0;
    return `
      <div class="card course-card" data-course="${c.id}">
        <div class="course-card__head">
          <div class="course-card__icon" style="background:${colorOf(c.color)}22">${c.icon}</div>
          <span class="tag tag--primary">${D.levels[c.level]}</span>
        </div>
        <div class="course-card__title">${c.title}</div>
        <div class="course-card__meta">${c.duration} · ${c.lessons}课 · ${c.students.toLocaleString()}人在学</div>
        <div class="course-card__levels">
          ${[...Array(5)].map((_, i) => `<div class="lvl-pill ${i < c.level ? 'done' : ''} ${i === c.level ? 'current' : ''}"></div>`).join('')}
        </div>
        <div class="course-card__foot">
          <span>${done > 0 ? `进度 ${pct}%` : c.desc.slice(0, 20) + '...'}</span>
          <div class="progress-ring" style="--p:${pct}"><span>${pct}%</span></div>
        </div>
      </div>`;
  }

  function bindCourseCards(root) {
    $all('.course-card', root).forEach(card => card.onclick = () => location.hash = `#/learn?id=${card.dataset.course}`);
  }

  /* ---------- 课程列表 ---------- */
  function renderCourses(view, user, params) {
    const discFilter = params.disc || 'all';
    const discs = [{ id: 'all', name: '全部', icon: '📚' }, ...D.disciplines];
    const filtered = discFilter === 'all' ? D.courses : D.courses.filter(c => c.disc === discFilter);

    view.innerHTML = `
      <div class="container" style="padding-top:var(--space-10);padding-bottom:var(--space-12)">
        <h1 class="section-title">课程中心</h1>
        <p class="section-sub">共 ${filtered.length} 门课程 · 分级体系助你稳步进阶</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:var(--space-8)" id="disc-filters">
          ${discs.map(d => `<button class="btn ${discFilter === d.id ? 'btn--primary' : 'btn--ghost'} btn--sm" data-disc="${d.id}">${d.icon} ${d.name}</button>`).join('')}
        </div>
        <div class="course-grid" id="course-list">${filtered.map(courseCardHTML).join('')}</div>
        ${filtered.length === 0 ? '<div class="empty"><div class="emoji">📭</div>该学科暂无课程</div>' : ''}
      </div>`;
    $all('#disc-filters button', view).forEach(b => b.onclick = () => location.hash = `#/courses?disc=${b.dataset.disc}`);
    bindCourseCards(view);
  }

  /* ---------- 学习视图 ---------- */
  function renderLearn(view, user, courseId) {
    if (!courseId) { location.hash = '#/courses'; return; }
    const course = D.courses.find(c => c.id === courseId);
    if (!course) { location.hash = '#/courses'; return; }

    view.innerHTML = `<div class="learn-page">
      <aside class="learn-sidebar">
        <div style="margin-bottom:var(--space-5)">
          <div style="font-size:28px;margin-bottom:8px">${course.icon}</div>
          <div style="font-weight:700">${course.title}</div>
          <div style="font-size:12px;color:var(--c-text-3);margin-top:4px">${D.levels[course.level]} · ${course.duration}</div>
        </div>
        <h3>学习模块</h3>
        <div class="module-list" id="module-list">
          ${course.modules.map((m, i) => {
            const done = user?.progress?.[course.id]?.[m.id]?.status === 'done';
            return `<div class="module-item ${done ? 'done' : ''}" data-idx="${i}">
              <div class="m-title">${i + 1}. ${m.title}</div>
              <div class="m-sub">${moduleTypeLabel(m.type)}</div>
            </div>`;
          }).join('')}
        </div>
      </aside>
      <div class="learn-content" id="learn-content"></div>
    </div>`;

    let currentIdx = 0;
    $all('.module-item', view).forEach((item) => {
      item.onclick = () => { currentIdx = +item.dataset.idx; renderModule(); };
    });

    function renderModule() {
      const m = course.modules[currentIdx];
      $all('.module-item', view).forEach((it, i) => it.classList.toggle('active', i === currentIdx));
      const content = $('#learn-content', view);
      content.innerHTML = `
        <div class="lesson-breadcrumb">${course.title} / ${m.title}</div>
        <h1 class="lesson-title">${m.title}</h1>
        <p class="lesson-desc">${moduleTypeLabel(m.type)} · 互动学习模块</p>
        <div id="module-body"></div>
        <div style="display:flex;justify-content:space-between;margin-top:var(--space-8)">
          <button class="btn btn--ghost" id="prev-btn" ${currentIdx === 0 ? 'disabled style=opacity:.4' : ''}>← 上一课</button>
          <button class="btn btn--primary" id="next-btn">${currentIdx === course.modules.length - 1 ? '完成课程 🎉' : '下一课 →'}</button>
        </div>`;
      $('#prev-btn', content).onclick = () => { if (currentIdx > 0) { currentIdx--; renderModule(); } };
      $('#next-btn', content).onclick = () => {
        if (currentIdx < course.modules.length - 1) { currentIdx++; renderModule(); }
        else { toast('恭喜完成本课程全部模块！', 'success'); location.hash = '#/dashboard'; }
      };
      renderModuleBody($('#module-body', content), course, m, user);
    }
    renderModule();
  }

  function moduleTypeLabel(type) {
    return { vocab: '单词记忆', grammar: '语法练习', speak: '口语跟读', listen: '听力训练', case: '案例学习', practice: '实操练习' }[type] || '学习';
  }

  /* ---------- 模块渲染器 ---------- */
  function renderModuleBody(container, course, m, user) {
    container.innerHTML = '';
    switch (m.type) {
      case 'vocab': renderVocab(container, m, course); break;
      case 'grammar': renderGrammar(container, m, course); break;
      case 'speak': renderSpeak(container, m, course); break;
      case 'listen': renderListen(container, m, course); break;
      case 'case': renderCase(container, m, course); break;
      case 'practice': renderPractice(container, m, course); break;
    }
  }

  // 单词记忆
  function renderVocab(container, m, course) {
    let idx = 0;
    const words = m.words;
    const card = el('div', { class: 'module-panel' });
    card.innerHTML = `<h3>📝 单词记忆</h3>
      <div id="word-area"></div>
      <div style="text-align:center;color:var(--c-text-3);font-size:var(--fs-xs);margin-top:var(--space-3)" id="word-progress">${idx + 1} / ${words.length}</div>`;
    container.appendChild(card);

    function show() {
      const w = words[idx];
      $('#word-area', card).innerHTML = `
        <div class="word-card">
          <div class="term">${w.term}</div>
          ${w.phonetic ? `<div class="phonetic">${w.phonetic}</div>` : ''}
          <div class="meaning">${w.meaning}</div>
          ${w.example ? `<div class="example">"${w.example}"</div>` : ''}
          <button class="btn btn--ghost btn--sm" style="margin-top:var(--space-4)" onclick="speakText('${w.term}')">🔊 朗读</button>
        </div>`;
      $('#word-progress', card).textContent = `${idx + 1} / ${words.length}`;
    }
    show();

    const actions = el('div', { class: 'word-actions' }, [
      el('button', { class: 'btn btn--ghost', onclick: () => { if (idx > 0) { idx--; show(); } } }, ['← 上一个']),
      el('button', { class: 'btn btn--primary', onclick: () => {
        if (idx < words.length - 1) { idx++; show(); }
        else { completeModule(course, m, 100); }
      } }, [idx === words.length - 1 ? '完成 ✓' : '下一个 →']),
    ]);
    container.appendChild(actions);
  }

  // 语法练习
  function renderGrammar(container, m, course) {
    const panel = el('div', { class: 'module-panel' });
    panel.innerHTML = `<h3>✏️ 语法练习</h3>
      <div style="font-size:var(--fs-md);font-weight:600;margin-bottom:var(--space-5);padding:var(--space-5);background:var(--c-surface-2);border-radius:var(--r-md)">${m.question}</div>
      <div id="quiz-options">${m.options.map((o, i) => `<button class="quiz-option" data-i="${i}">${String.fromCharCode(65 + i)}. ${o}</button>`).join('')}</div>
      <div id="quiz-feedback" style="margin-top:var(--space-4);padding:var(--space-4);border-radius:var(--r-sm);display:none"></div>`;
    container.appendChild(panel);

    let answered = false;
    $all('.quiz-option', panel).forEach(opt => opt.onclick = () => {
      if (answered) return;
      answered = true;
      const i = +opt.dataset.i;
      const correct = i === m.answer;
      $all('.quiz-option', panel).forEach(o => {
        o.classList.remove('selected');
        const oi = +o.dataset.i;
        if (oi === m.answer) o.classList.add('correct');
        if (oi === i && !correct) o.classList.add('wrong');
      });
      const fb = $('#quiz-feedback', panel);
      fb.style.display = 'block';
      fb.style.background = correct ? '#D1FAE5' : '#FEE2E2';
      fb.innerHTML = `<strong>${correct ? '✅ 回答正确！' : '❌ 回答错误'}</strong><br/><span style="font-size:var(--fs-sm);color:var(--c-text-2)">${m.explain}</span>`;
      setTimeout(() => completeModule(course, m, correct ? 100 : 60), 800);
    });
  }

  // 口语跟读
  function renderSpeak(container, m, course) {
    const panel = el('div', { class: 'module-panel' });
    panel.innerHTML = `<h3>🎤 口语跟读</h3>
      <div class="speak-card">
        <button class="btn btn--ghost btn--sm" onclick="speakText('${m.phrase.replace(/'/g, "\\'")}')" style="margin-bottom:var(--space-4)">🔊 听示范</button>
        <div class="phrase">${m.phrase}</div>
        <div class="translation">${m.translation}</div>
        <button class="record-btn" id="record-btn">🎙️</button>
        <div id="speak-hint" style="margin-top:var(--space-4);font-size:var(--fs-sm);color:var(--c-text-3)">点击麦克风开始跟读</div>
      </div>`;
    container.appendChild(panel);

    let recording = false;
    $('#record-btn', panel).onclick = () => {
      recording = !recording;
      const btn = $('#record-btn', panel);
      btn.classList.toggle('recording', recording);
      btn.textContent = recording ? '⏹️' : '🎙️';
      $('#speak-hint', panel).textContent = recording ? '正在录音... 请朗读句子' : '录音完成！';
      if (!recording) {
        setTimeout(() => { toast('跟读练习完成！继续保持 👏', 'success'); completeModule(course, m, 80); }, 600);
      }
    };
  }

  // 听力训练
  function renderListen(container, m, course) {
    const panel = el('div', { class: 'module-panel' });
    panel.innerHTML = `<h3>🎧 听力训练</h3>
      <div class="listen-player">
        <button class="play-btn" id="play-btn">▶</button>
        <div class="wave" id="wave">${[...Array(40)].map(() => '<span style="height:' + (20 + Math.random() * 80) + '%"></span>').join('')}</div>
      </div>
      <div style="margin-bottom:var(--space-5)">
        <button class="btn btn--ghost btn--sm" id="toggle-transcript">显示原文</button>
        <div id="transcript" style="display:none;margin-top:var(--space-3);padding:var(--space-4);background:var(--c-surface-2);border-radius:var(--r-sm);font-size:var(--fs-sm);color:var(--c-text-2);line-height:1.8">${m.transcript}</div>
      </div>
      <div style="font-weight:600;margin-bottom:var(--space-3)">${m.question}</div>
      <div id="listen-options">${m.options.map((o, i) => `<button class="quiz-option" data-i="${i}">${String.fromCharCode(65 + i)}. ${o}</button>`).join('')}</div>
      <div id="listen-feedback" style="margin-top:var(--space-4);padding:var(--space-4);border-radius:var(--r-sm);display:none"></div>`;
    container.appendChild(panel);

    let playing = false;
    $('#play-btn', panel).onclick = () => {
      playing = !playing;
      $('#play-btn', panel).textContent = playing ? '⏸' : '▶';
      $('#wave', panel).classList.toggle('playing', playing);
      if (playing) speakText(m.transcript);
    };
    $('#toggle-transcript', panel).onclick = () => {
      const t = $('#transcript', panel);
      t.style.display = t.style.display === 'none' ? 'block' : 'none';
      $('#toggle-transcript', panel).textContent = t.style.display === 'none' ? '显示原文' : '隐藏原文';
    };
    let answered = false;
    $all('#listen-options .quiz-option', panel).forEach(opt => opt.onclick = () => {
      if (answered) return;
      answered = true;
      const i = +opt.dataset.i;
      const correct = i === m.answer;
      $all('#listen-options .quiz-option', panel).forEach(o => {
        const oi = +o.dataset.i;
        if (oi === m.answer) o.classList.add('correct');
        if (oi === i && !correct) o.classList.add('wrong');
      });
      const fb = $('#listen-feedback', panel);
      fb.style.display = 'block';
      fb.style.background = correct ? '#D1FAE5' : '#FEE2E2';
      fb.innerHTML = `<strong>${correct ? '✅ 正确！' : '❌ 错误'}</strong> ${correct ? '你的听力很棒！' : '再听一遍试试。'}`;
      setTimeout(() => completeModule(course, m, correct ? 100 : 60), 800);
    });
  }

  // 案例学习
  function renderCase(container, m, course) {
    const panel = el('div', { class: 'module-panel' });
    panel.innerHTML = `<h3>📖 案例学习</h3><div class="case-study">${m.content}</div>`;
    container.appendChild(panel);
    const btn = el('button', { class: 'btn btn--primary', onclick: () => completeModule(course, m, 90) }, ['已认真阅读并思考 ✓']);
    container.appendChild(btn);
  }

  // 实操练习
  function renderPractice(container, m, course) {
    const panel = el('div', { class: 'module-panel' });
    panel.innerHTML = `<h3>💪 实操练习</h3>
      <div class="practice-task">
        <div style="font-weight:600;margin-bottom:var(--space-3)">${m.prompt}</div>
        <textarea placeholder="${m.placeholder}" id="practice-input" style="font-family:monospace"></textarea>
      </div>`;
    container.appendChild(panel);
    const btn = el('button', { class: 'btn btn--primary', onclick: () => {
      const val = $('#practice-input', panel).value.trim();
      if (val.length < 10) { toast('请认真完成练习内容', 'error'); return; }
      toast('练习已提交，太棒了！', 'success');
      completeModule(course, m, 85);
    } }, ['提交练习']);
    container.appendChild(btn);
  }

  // 完成模块
  function completeModule(course, m, score) {
    const user = A.getCurrentUser();
    if (!user) {
      toast('请先登录以记录学习进度', 'accent');
      setTimeout(() => location.hash = '#/auth', 1000);
      return;
    }
    const updated = A.recordActivity({ courseId: course.id, moduleId: m.id, duration: 5, score, disc: course.disc });
    // 检查徽章
    checkBadges(updated);
    toast(`模块完成！+${10 + score} 经验值`, 'success');
    // 刷新侧边栏状态
    setTimeout(() => {
      const items = $all('.module-item');
      const idx = course.modules.findIndex(mm => mm.id === m.id);
      if (items[idx]) items[idx].classList.add('done');
    }, 200);
  }

  function checkBadges(user) {
    if (!user) return;
    D.badges.forEach(b => {
      if (!user.achievements.includes(b.id) && b.condition(user)) {
        A.unlockBadge(b.id);
        setTimeout(() => toast(`🏆 解锁成就：${b.name}！`, 'accent'), 500);
      }
    });
  }

  // 语音朗读
  window.speakText = function (text) {
    if (!('speechSynthesis' in window)) { toast('当前浏览器不支持语音朗读', 'error'); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  /* ---------- 仪表盘 ---------- */
  function renderDashboard(view, user) {
    const progress = user.progress || {};
    const totalModules = Object.values(progress).reduce((s, c) => s + Object.keys(c).filter(k => c[k]?.status === 'done').length, 0);
    const courseCount = Object.keys(progress).length;

    // 学习路径推荐
    const recPath = generatePath(user);

    // 近7天 streak
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const isToday = i === 0;
      const done = isToday ? true : (i < (user.streak || 0));
      days.push({ label: ['日', '一', '二', '三', '四', '五', '六'][d.getDay()], done, isToday });
    }

    view.innerHTML = `
      <div class="dash">
        <div class="dash__head">
          <div>
            <h1>你好，${user.username} 👋</h1>
            <p>今日也要保持学习的热情哦</p>
          </div>
          <div style="text-align:right">
            <div style="font-size:var(--fs-xs);color:var(--c-text-3)">连续学习</div>
            <div style="font-family:'Noto Serif SC',serif;font-size:var(--fs-2xl);font-weight:700;color:var(--c-accent)">${user.streak || 0} 天 🔥</div>
          </div>
        </div>

        <div class="stat-grid">
          <div class="card stat-card"><div class="label">已学课时</div><div class="value">${totalModules}</div><div class="delta">↑ 持续累积</div></div>
          <div class="card stat-card"><div class="label">学习课程</div><div class="value">${courseCount}</div><div class="delta">${courseCount > 0 ? '已涉足' : '开始第一课吧'}</div></div>
          <div class="card stat-card"><div class="label">学习时长</div><div class="value">${user.totalMinutes || 0}<span style="font-size:var(--fs-sm);color:var(--c-text-3)"> 分钟</span></div><div class="delta">累计投入</div></div>
          <div class="card stat-card"><div class="label">经验值</div><div class="value">${user.exp || 0}</div><div class="delta">LV ${Math.floor((user.exp || 0) / 100) + 1}</div></div>
        </div>

        <div class="dash-grid">
          <div>
            <div class="card panel" style="margin-bottom:var(--space-6)">
              <h3>📅 本周学习</h3>
              <div class="streak">${days.map(d => `<div class="streak-dot ${d.done ? 'done' : ''} ${d.isToday ? 'today' : ''}" title="${d.label}">${d.label}</div>`).join('')}</div>
              <p style="margin-top:var(--space-4);font-size:var(--fs-xs);color:var(--c-text-3)">连续学习可获得额外经验加成，坚持就是胜利！</p>
            </div>

            <div class="card panel">
              <h3>🎯 个性化学习路径推荐</h3>
              <p style="font-size:var(--fs-sm);color:var(--c-text-2);margin-bottom:var(--space-5)">基于你的兴趣与进度，知航为你规划了以下学习路径：</p>
              <div style="display:flex;flex-direction:column;gap:var(--space-3)">
                ${recPath.map((c, i) => `
                  <div class="practice-task" style="display:flex;align-items:center;gap:var(--space-4);margin:0;cursor:pointer" data-course="${c.id}">
                    <div style="width:40px;height:40px;border-radius:10px;background:${colorOf(c.color)}22;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${c.icon}</div>
                    <div style="flex:1">
                      <div style="font-weight:600;font-size:var(--fs-sm)">第 ${i + 1} 步 · ${c.title}</div>
                      <div style="font-size:var(--fs-xs);color:var(--c-text-3)">${D.levels[c.level]} · ${c.duration}</div>
                    </div>
                    <span class="tag tag--primary">开始 →</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div>
            <div class="card panel" style="margin-bottom:var(--space-6)">
              <h3>🏆 成就徽章</h3>
              <div class="badge-grid">
                ${D.badges.map(b => `<div class="badge ${user.achievements.includes(b.id) ? 'unlocked' : ''}" title="${b.desc}">
                  <div class="icon">${b.icon}</div>
                  <div class="name">${b.name}</div>
                  <div class="desc">${b.desc}</div>
                </div>`).join('')}
              </div>
            </div>

            <div class="card panel">
              <h3>🔥 学员排行榜</h3>
              <div class="rank-list">
                ${[...D.ranking].sort((a, b) => b.exp - a.exp).map((r, i) => `
                  <div class="rank-item">
                    <div class="rank-no">${i + 1}</div>
                    <div class="rank-avatar">${r.name.charAt(0)}</div>
                    <div class="rank-name">${r.name}</div>
                    <div class="rank-exp">${r.exp} EXP</div>
                  </div>
                `).join('')}
                <div class="rank-item" style="background:linear-gradient(90deg,var(--c-primary-100),transparent);font-weight:700">
                  <div class="rank-no">·</div>
                  <div class="rank-avatar" style="background:var(--c-accent)">${user.username.charAt(0)}</div>
                  <div class="rank-name">${user.username}（我）</div>
                  <div class="rank-exp">${user.exp || 0} EXP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    $all('[data-course]', view).forEach(el => el.onclick = () => location.hash = `#/learn?id=${el.dataset.course}`);
  }

  function generatePath(user) {
    const interests = user.interests || [];
    let pool = interests.length ? D.courses.filter(c => interests.includes(c.disc)) : D.courses;
    if (pool.length < 3) pool = D.courses;
    // 按等级排序：先入门再进阶
    return [...pool].sort((a, b) => a.level - b.level).slice(0, 4);
  }

  /* ---------- 社区 ---------- */
  function renderCommunity(view, user) {
    const posts = [...D.posts];
    view.innerHTML = `
      <div class="community">
        <h1 class="section-title">学习社区</h1>
        <p class="section-sub">与 ${(80000 + Math.floor(Math.random() * 5000)).toLocaleString()} 位学员交流学习心得</p>
        <div class="comm-layout">
          <div>
            ${user ? `<div class="card" style="padding:var(--space-5);margin-bottom:var(--space-5)">
              <textarea id="post-input" placeholder="分享你的学习心得、提问或经验..." style="width:100%;min-height:80px;padding:12px;border:1px solid var(--c-border);border-radius:var(--r-sm);resize:vertical"></textarea>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:var(--space-3)">
                <div class="post-tags"><span class="tag tag--primary">分享</span><span class="tag tag--accent">提问</span><span class="tag" style="background:var(--c-surface-2)">心得</span></div>
                <button class="btn btn--primary btn--sm" id="post-submit">发布</button>
              </div>
            </div>` : `<div class="card" style="padding:var(--space-5);margin-bottom:var(--space-5);text-align:center;color:var(--c-text-2)">
              <a href="#/auth" class="btn btn--primary btn--sm">登录后即可发布帖子</a>
            </div>`}
            <div id="post-list">${posts.map(postHTML).join('')}</div>
          </div>
          <div>
            <div class="card panel" style="margin-bottom:var(--space-5)">
              <h3>🔥 热门讨论</h3>
              <ul style="display:flex;flex-direction:column;gap:var(--space-3)">
                <li style="font-size:var(--fs-sm);cursor:pointer" class="hot-topic">#雅思备考经验分享</li>
                <li style="font-size:var(--fs-sm);cursor:pointer" class="hot-topic">#AI绘画作品展示</li>
                <li style="font-size:var(--fs-sm);cursor:pointer" class="hot-topic">#房地产市场分析</li>
                <li style="font-size:var(--fs-sm);cursor:pointer" class="hot-topic">#每日打卡挑战</li>
              </ul>
            </div>
            <div class="card panel">
              <h3>📚 活跃学科</h3>
              ${D.disciplines.map(d => {
                const count = D.courses.filter(c => c.disc === d.id).length;
                return `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--c-border);font-size:var(--fs-sm)">
                  <span>${d.icon} ${d.name}</span><span style="color:var(--c-text-3)">${count} 门课</span>
                </div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>`;
    bindPosts(view, posts);
    if (user) {
      $('#post-submit', view).onclick = () => {
        const input = $('#post-input', view);
        const text = input.value.trim();
        if (!text) { toast('请输入内容', 'error'); return; }
        const newPost = { id: 'p' + Date.now(), user: user.username, avatar: user.username.charAt(0), time: '刚刚', tags: ['分享'], body: text, likes: 0, comments: 0, liked: false };
        posts.unshift(newPost);
        $('#post-list', view).innerHTML = posts.map(postHTML).join('');
        bindPosts(view, posts);
        input.value = '';
        toast('发布成功！', 'success');
      };
    }
  }

  function postHTML(p) {
    return `<div class="card post-card" data-id="${p.id}">
      <div class="post-head">
        <div class="post-avatar">${p.avatar}</div>
        <div class="post-meta"><div class="name">${p.user}</div><div class="time">${p.time}</div></div>
      </div>
      <div class="post-body">${p.body}</div>
      <div class="post-tags">${p.tags.map(t => `<span class="tag tag--primary">#${t}</span>`).join('')}</div>
      <div class="post-actions">
        <button class="${p.liked ? 'liked' : ''}" data-action="like">❤ ${p.likes}</button>
        <button data-action="comment">💬 ${p.comments}</button>
        <button data-action="share">↗ 分享</button>
      </div>
    </div>`;
  }

  function bindPosts(root, posts) {
    $all('.post-card', root).forEach(card => {
      const id = card.dataset.id;
      const p = posts.find(x => x.id === id);
      if (!p) return;
      card.querySelector('[data-action="like"]').onclick = () => {
        p.liked = !p.liked;
        p.likes += p.liked ? 1 : -1;
        card.outerHTML = postHTML(p);
        bindPosts(root, posts);
      };
      card.querySelector('[data-action="comment"]').onclick = () => toast('评论功能开发中，敬请期待', 'accent');
      card.querySelector('[data-action="share"]').onclick = () => toast('已复制分享链接', 'success');
    });
  }

  /* ---------- 认证页 ---------- */
  function renderAuth(view) {
    const { params } = parseHash();
    const tab = params.tab === 'register' ? 'register' : 'login';
    view.innerHTML = `
      <div class="auth-page">
        <div class="auth-card">
          <h2>欢迎来到知航</h2>
          <p class="sub">开启你的多语种多学科学习之旅</p>
          <div class="tabs">
            <button class="${tab === 'login' ? 'active' : ''}" data-tab="login">登录</button>
            <button class="${tab === 'register' ? 'active' : ''}" data-tab="register">注册</button>
          </div>
          <div id="auth-form"></div>
        </div>
      </div>`;
    $all('.tabs button', view).forEach(b => b.onclick = () => { location.hash = `#/auth?tab=${b.dataset.tab}`; });
    renderAuthForm(view, tab);
  }

  function renderAuthForm(view, tab) {
    const form = $('#auth-form', view);
    if (tab === 'login') {
      form.innerHTML = `
        <div class="field"><label>邮箱</label><input type="email" id="login-email" placeholder="your@email.com" /></div>
        <div class="field"><label>密码</label><input type="password" id="login-password" placeholder="至少 6 位" /></div>
        <button class="btn btn--primary btn--lg" id="login-submit">登 录</button>
        <div class="auth-foot">还没有账号？<a href="#/auth?tab=register" data-route>立即注册</a></div>
        <div style="margin-top:var(--space-4);padding:var(--space-3);background:var(--c-surface-2);border-radius:var(--r-sm);font-size:var(--fs-xs);color:var(--c-text-3)">
          💡 演示账号：可直接注册一个新账号体验全部功能
        </div>`;
      $('#login-submit', form).onclick = () => {
        const email = $('#login-email', form).value.trim();
        const password = $('#login-password', form).value;
        if (!email || !password) { toast('请填写完整信息', 'error'); return; }
        const r = A.login({ email, password });
        if (!r.ok) { toast(r.error, 'error'); return; }
        toast(`欢迎回来，${r.user.username}！`, 'success');
        setTimeout(() => location.hash = '#/dashboard', 600);
      };
    } else {
      form.innerHTML = `
        <div class="field"><label>用户名</label><input type="text" id="reg-name" placeholder="2-20 个字符" /></div>
        <div class="field"><label>邮箱</label><input type="email" id="reg-email" placeholder="your@email.com" /></div>
        <div class="field"><label>密码</label><input type="password" id="reg-password" placeholder="至少 6 位" /></div>
        <div class="field">
          <label>感兴趣的学科（可多选）</label>
          <div class="interest-grid" id="interests">
            ${D.disciplines.map(d => `<div class="interest-item" data-id="${d.id}"><div class="check">✓</div><span>${d.icon} ${d.name}</span></div>`).join('')}
          </div>
        </div>
        <button class="btn btn--primary btn--lg" id="reg-submit">注 册 并 开 始 学 习</button>
        <div class="auth-foot">已有账号？<a href="#/auth?tab=login" data-route>直接登录</a></div>`;
      $all('.interest-item', form).forEach(it => it.onclick = () => it.classList.toggle('selected'));
      $('#reg-submit', form).onclick = () => {
        const username = $('#reg-name', form).value.trim();
        const email = $('#reg-email', form).value.trim();
        const password = $('#reg-password', form).value;
        const interests = $all('.interest-item.selected', form).map(i => i.dataset.id);
        if (username.length < 2) { toast('用户名至少 2 个字符', 'error'); return; }
        if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) { toast('请输入有效邮箱', 'error'); return; }
        if (password.length < 6) { toast('密码至少 6 位', 'error'); return; }
        const r = A.register({ username, email, password, interests });
        if (!r.ok) { toast(r.error, 'error'); return; }
        toast(`注册成功，欢迎 ${username}！`, 'success');
        setTimeout(() => location.hash = '#/dashboard', 800);
      };
    }
  }

  /* ---------- 启动 ---------- */
  window.addEventListener('hashchange', route);
  window.addEventListener('load', route);
  if (location.hash) route();
})();
