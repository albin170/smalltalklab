// ============================================================
//  SmallTalkLab — Dashboard (dashboard.js)
// ============================================================

// ── Demo Data ──
const DEMO_DATA = {
  stats: {
    streak: 7,
    lastStreakDate: new Date().toISOString().split('T')[0],
    practice_time: 145,
    accuracy: 3240,
    accuracy_count: 42,
    chat_messages: 89,
    vocab_learned: 34,
    grammar_checks: 23,
    quiz_correct: 67,
    challenges_done: 8
  },
  challenges: {
    completed: ['introduce', 'describe-day', 'tongue-twister', 'opinion-speech', 'storytelling', 'describe-dream', 'mock-interview', 'news-report'],
    points: 685,
    today: ['introduce'],
    todayDate: new Date().toISOString().split('T')[0]
  },
  daily_practice: {
    Mon: 18, Tue: 25, Wed: 12, Thu: 30, Fri: 22, Sat: 15, Sun: 8
  },
  active_days: generateActiveDays()
};

function generateActiveDays() {
  const days = {};
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split('T')[0];
    if (Math.random() > 0.35) {
      days[key] = Math.random() > 0.5 ? 'high' : 'normal';
    }
  }
  // Always mark today
  days[today.toISOString().split('T')[0]] = 'normal';
  return days;
}

// ── Init ──
function init() {
  loadAndRender();
  setupButtons();
}

function loadAndRender() {
  const stats = Store.get('stats', {});
  const challenges = Store.get('challenges', {});
  const dailyPractice = Store.get('daily_practice', {});
  const activeDays = Store.get('active_days', {});

  renderOverviewCards(stats, challenges);
  renderBarChart(dailyPractice);
  renderDonutChart(stats);
  renderStreakCalendar(activeDays);
  renderActivityFeed(stats);
  renderProgressBars(stats, challenges);
}

// ── Overview Cards ──
function renderOverviewCards(stats, challenges) {
  const streak = stats.streak || 0;
  const practiceTime = stats.practice_time || 0;
  const totalAccuracy = stats.accuracy || 0;
  const accuracyCount = stats.accuracy_count || 1;
  const avgAccuracy = Math.round(totalAccuracy / accuracyCount);
  const totalActivities = (stats.practice_time || 0) +
    (stats.chat_messages || 0) +
    (stats.vocab_learned || 0) +
    (challenges.completed?.length || 0);

  animateValue('statStreak', streak);
  animateValue('statTime', practiceTime);
  animateValue('statAccuracy', isNaN(avgAccuracy) ? 0 : avgAccuracy);
  animateValue('statLessons', totalActivities);

  document.getElementById('streakChange').textContent = streak > 0 ? `🔥 ${streak} day${streak !== 1 ? 's' : ''} in a row!` : 'Start your streak today!';
  document.getElementById('accuracyChange').textContent = avgAccuracy > 75 ? '↑ Above average!' : avgAccuracy > 0 ? 'Keep practicing!' : 'No data yet';
}

function animateValue(id, target) {
  let n = 0;
  const interval = setInterval(() => {
    n = Math.min(n + Math.ceil(target / 40), target);
    document.getElementById(id).textContent = n;
    if (n >= target) clearInterval(interval);
  }, 30);
}

// ── Bar Chart ──
function renderBarChart(dailyPractice) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = days.map(d => dailyPractice[d] || 0);
  const maxVal = Math.max(...values, 1);

  const chart = document.getElementById('barChart');
  const labels = document.getElementById('barLabels');

  chart.innerHTML = days.map((day, i) => {
    const pct = (values[i] / maxVal) * 100;
    return `
      <div class="bar-wrap">
        <div class="bar" data-value="${values[i]}" style="height: 0%;"
          title="${values[i]} minutes on ${day}"></div>
      </div>
    `;
  }).join('');

  labels.innerHTML = `<div class="bar-chart" style="height:20px;padding:0;">
    ${days.map(d => `<div class="bar-wrap"><span class="bar-label">${d}</span></div>`).join('')}
  </div>`;

  // Animate bars
  setTimeout(() => {
    chart.querySelectorAll('.bar').forEach((bar, i) => {
      const pct = (values[i] / maxVal) * 100;
      bar.style.height = `${pct}%`;
    });
  }, 200);

  const total = values.reduce((a, b) => a + b, 0);
  document.getElementById('weeklyTotal').textContent = `${total} min this week`;
}

// ── Donut Chart ──
function renderDonutChart(stats) {
  const speaking = stats.practice_time || 0;
  const chat = stats.chat_messages || 0;
  const vocab = stats.vocab_learned || 0;
  const challenges = stats.challenges_done || 0;
  const total = speaking + chat + vocab + challenges || 1;

  const pct = {
    speak: speaking / total,
    chat: chat / total,
    vocab: vocab / total,
    challenge: challenges / total
  };

  const circumference = 264;
  const donut1 = document.getElementById('donut1');
  const donut2 = document.getElementById('donut2');
  const donut3 = document.getElementById('donut3');
  const donut4 = document.getElementById('donut4');

  const seg1 = circumference * pct.speak;
  const seg2 = circumference * pct.chat;
  const seg3 = circumference * pct.vocab;
  const seg4 = circumference * pct.challenge;

  const gap = 2;
  const off1 = circumference - seg1 + gap;
  const off2 = circumference - seg2 + gap;
  const off3 = circumference - seg3 + gap;
  const off4 = circumference - seg4 + gap;

  const rot1 = 0;
  const rot2 = (seg1 / circumference) * 360;
  const rot3 = rot2 + (seg2 / circumference) * 360;
  const rot4 = rot3 + (seg3 / circumference) * 360;

  setTimeout(() => {
    donut1.style.strokeDashoffset = off1;
    donut1.style.transform = `rotate(${rot1}deg)`;
    donut1.style.transformOrigin = 'center';

    donut2.style.strokeDashoffset = off2;
    donut2.style.transform = `rotate(${rot2}deg)`;
    donut2.style.transformOrigin = 'center';

    donut3.style.strokeDashoffset = off3;
    donut3.style.transform = `rotate(${rot3}deg)`;
    donut3.style.transformOrigin = 'center';

    donut4.style.strokeDashoffset = off4;
    donut4.style.transform = `rotate(${rot4}deg)`;
    donut4.style.transformOrigin = 'center';
  }, 300);

  document.getElementById('legendSpeak').textContent = Math.round(pct.speak * 100) + '%';
  document.getElementById('legendChat').textContent = Math.round(pct.chat * 100) + '%';
  document.getElementById('legendVocab').textContent = Math.round(pct.vocab * 100) + '%';
  document.getElementById('legendChallenge').textContent = Math.round(pct.challenge * 100) + '%';
}

// ── Streak Calendar ──
function renderStreakCalendar(activeDays) {
  const cal = document.getElementById('streakCalendar');
  const today = new Date();
  const cells = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const isToday = i === 0;
    const activity = activeDays[key];

    let cls = 'streak-day';
    if (activity === 'high') cls += ' done-high';
    else if (activity) cls += ' done';
    if (isToday) cls += ' today';

    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    cells.push(`<div class="${cls}" title="${label}: ${activity ? 'Active' : 'No activity'}"></div>`);
  }

  // Pad to full weeks
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - 29);
  const startOffset = firstDay.getDay();
  for (let i = 0; i < startOffset; i++) {
    cells.unshift('<div></div>');
  }

  cal.innerHTML = cells.join('');
}

// ── Activity Feed ──
function renderActivityFeed(stats) {
  const feed = document.getElementById('activityFeed');
  const activities = [];

  if (stats.practice_time > 0) activities.push({ icon: '🎤', color: 'rgba(79,142,247,0.2)', name: 'Speaking Practice', time: 'Recent', score: `${stats.practice_time} min` });
  if (stats.chat_messages > 0) activities.push({ icon: '🤖', color: 'rgba(139,92,246,0.2)', name: 'AI Chat Session', time: 'Recent', score: `${stats.chat_messages} msgs` });
  if (stats.vocab_learned > 0) activities.push({ icon: '📚', color: 'rgba(34,211,238,0.2)', name: 'Vocabulary Quiz', time: 'Recent', score: `${stats.vocab_learned} words` });
  if (stats.grammar_checks > 0) activities.push({ icon: '✏️', color: 'rgba(16,185,129,0.2)', name: 'Grammar Check', time: 'Recent', score: `${stats.grammar_checks} checks` });
  if (stats.challenges_done > 0) activities.push({ icon: '🏆', color: 'rgba(245,158,11,0.2)', name: 'Challenges Done', time: 'Recent', score: `${stats.challenges_done} done` });

  if (activities.length === 0) {
    feed.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-muted);">No activity yet.<br><br><a href="speaking.html" class="btn btn-primary btn-sm">Start Practicing!</a></div>';
    return;
  }

  feed.innerHTML = activities.slice(0, 5).map(a => `
    <div class="activity-item">
      <div class="activity-icon" style="background:${a.color};">${a.icon}</div>
      <div class="activity-info">
        <div class="activity-name">${a.name}</div>
        <div class="activity-time">${a.time}</div>
      </div>
      <div class="activity-score text-gradient">${a.score}</div>
    </div>
  `).join('');
}

// ── Progress Bars ──
function renderProgressBars(stats, challenges) {
  const practiceScore = Math.min(100, (stats.practice_time || 0) * 2);
  const vocabScore = Math.min(100, (stats.vocab_learned || 0) * 3);
  const grammarScore = Math.min(100, (stats.grammar_checks || 0) * 5);
  const challengeScore = Math.min(100, ((challenges.completed?.length || 0) / 12) * 100);

  setTimeout(() => {
    setProgress('progSpeak', 'progSpeakBar', practiceScore);
    setProgress('progVocab', 'progVocabBar', vocabScore);
    setProgress('progGrammar', 'progGrammarBar', grammarScore);
    setProgress('progChallenge', 'progChallengeBar', Math.round(challengeScore));
  }, 400);
}

function setProgress(labelId, barId, value) {
  const v = Math.round(value);
  document.getElementById(labelId).textContent = v + '%';
  document.getElementById(barId).style.width = v + '%';
}

// ── Buttons ──
function setupButtons() {
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Reset ALL progress data? This cannot be undone.')) {
      ['stats', 'challenges', 'daily_practice', 'active_days'].forEach(k => localStorage.removeItem(`speakup_${k}`));
      showToast('All data cleared.', 'info');
      loadAndRender();
    }
  });

  document.getElementById('demoBtn').addEventListener('click', () => {
    Store.set('stats', DEMO_DATA.stats);
    Store.set('challenges', DEMO_DATA.challenges);
    Store.set('daily_practice', DEMO_DATA.daily_practice);
    Store.set('active_days', DEMO_DATA.active_days);
    showToast('Demo data loaded! 🎉', 'success');
    loadAndRender();
  });
}

document.addEventListener('DOMContentLoaded', init);
