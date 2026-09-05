/* ============================================================
   知航 · 用户认证模块
   ============================================================ */
window.Auth = (function () {
  const USERS_KEY = 'zh_users';
  const SESSION_KEY = 'zh_session';

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch { return []; }
  }
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getCurrentUser() {
    try {
      const id = localStorage.getItem(SESSION_KEY);
      if (!id) return null;
      return getUsers().find(u => u.id === id) || null;
    } catch { return null; }
  }

  function register({ username, email, password, interests }) {
    const users = getUsers();
    if (users.some(u => u.email === email)) {
      return { ok: false, error: '该邮箱已注册' };
    }
    if (users.some(u => u.username === username)) {
      return { ok: false, error: '该用户名已被使用' };
    }
    const user = {
      id: 'u_' + Date.now() + Math.random().toString(36).slice(2, 7),
      username,
      email,
      password, // 演示用明文；生产环境须哈希
      interests: interests || [],
      createdAt: Date.now(),
      exp: 0,
      streak: 0,
      lastStudy: null,
      totalLessons: 0,
      totalMinutes: 0,
      bestScore: 0,
      discCount: 0,
      progress: {}, // { courseId: { moduleId: status, score } }
      achievements: [],
    };
    users.push(user);
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, user.id);
    return { ok: true, user };
  }

  function login({ email, password }) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, error: '邮箱或密码错误' };
    localStorage.setItem(SESSION_KEY, user.id);
    return { ok: true, user };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function updateUser(patch) {
    const users = getUsers();
    const user = getCurrentUser();
    if (!user) return null;
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...patch };
    saveUsers(users);
    return users[idx];
  }

  // 记录学习活动
  function recordActivity({ courseId, moduleId, duration = 5, score = 0, disc = '' }) {
    const user = getCurrentUser();
    if (!user) return null;
    const today = new Date().toDateString();
    const lastStudy = user.lastStudy ? new Date(user.lastStudy).toDateString() : null;
    let streak = user.streak || 0;
    if (lastStudy !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      streak = lastStudy === yesterday ? streak + 1 : 1;
    }
    const progress = { ...(user.progress || {}) };
    if (!progress[courseId]) progress[courseId] = {};
    progress[courseId][moduleId] = { status: 'done', score, ts: Date.now() };

    const discSet = new Set();
    Object.keys(progress).forEach(cid => {
      const c = window.APP_DATA.courses.find(c => c.id === cid);
      if (c) discSet.add(c.disc);
    });
    if (disc) discSet.add(disc);

    return updateUser({
      progress,
      totalLessons: (user.totalLessons || 0) + 1,
      totalMinutes: (user.totalMinutes || 0) + duration,
      exp: (user.exp || 0) + 10 + score,
      streak,
      lastStudy: Date.now(),
      bestScore: Math.max(user.bestScore || 0, score),
      discCount: discSet.size,
    });
  }

  function unlockBadge(badgeId) {
    const user = getCurrentUser();
    if (!user) return null;
    const achievements = user.achievements || [];
    if (achievements.includes(badgeId)) return user;
    return updateUser({ achievements: [...achievements, badgeId] });
  }

  return {
    getCurrentUser, register, login, logout, updateUser,
    recordActivity, unlockBadge,
  };
})();
