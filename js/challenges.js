// ============================================================
//  SmallTalkLab — Challenges (challenges.js)
// ============================================================

const CHALLENGES = [
  {
    id: 'introduce',
    emoji: '👋',
    title: 'Introduce Yourself',
    description: 'Speak for 60 seconds about who you are, where you\'re from, and what you do.',
    prompt: 'Hello! Tell us who you are. Include your name, where you come from, your occupation or studies, and one interesting fact about yourself. Make it engaging and natural!',
    hint: 'Start with: "Hello, my name is... I am from... I work as / I study... One interesting thing about me is..."',
    duration: 60,
    difficulty: 'beginner',
    category: 'social',
    points: 50,
    tags: ['introduction', 'personal', 'beginner']
  },
  {
    id: 'describe-day',
    emoji: '☀️',
    title: 'Describe Your Day',
    description: 'Talk about what you did today — morning to evening. Use past tense!',
    prompt: 'Walk us through your day from when you woke up to right now. What did you do? What did you eat? Who did you meet? Use past tense verbs and connecting words like "then", "after", "next".',
    hint: 'I woke up at... Then I had breakfast... After that I... In the afternoon I... Finally, I...',
    duration: 60,
    difficulty: 'beginner',
    category: 'social',
    points: 50,
    tags: ['daily life', 'past tense', 'beginner']
  },
  {
    id: 'mock-interview',
    emoji: '💼',
    title: 'Mock Job Interview',
    description: 'Answer "Tell me about yourself" as if in a real job interview.',
    prompt: 'You\'re in a job interview. The interviewer asks: "Tell me about yourself, your experience, your strengths, and why you\'re interested in this position." Give a confident, professional response!',
    hint: 'Structure: 1) Brief background → 2) Key experience/skills → 3) Strengths → 4) Why this role/company. Keep it to 90 seconds.',
    duration: 90,
    difficulty: 'intermediate',
    category: 'interview',
    points: 100,
    tags: ['interview', 'professional', 'career']
  },
  {
    id: 'opinion-speech',
    emoji: '🗣️',
    title: 'Express Your Opinion',
    description: 'Share your opinion on "Is social media good or bad for society?"',
    prompt: 'Give a structured opinion speech: Do you think social media has been more beneficial or harmful to society? Support your view with at least 2 specific reasons or examples.',
    hint: 'Structure: "In my opinion... / I believe that... First, ... Second, ... However, some may argue... In conclusion..."',
    duration: 90,
    difficulty: 'intermediate',
    category: 'social',
    points: 100,
    tags: ['opinion', 'debate', 'intermediate']
  },
  {
    id: 'news-report',
    emoji: '📰',
    title: 'Mini News Report',
    description: 'Pretend you\'re a news anchor reading a story. Speak clearly and professionally.',
    prompt: 'You are a news anchor. Report on this story: "Scientists have discovered a new species of deep-sea fish that can glow in the dark and survive at extreme depths. Researchers believe it could lead to breakthroughs in medical research." Present it professionally!',
    hint: 'Use formal language: "Scientists have reportedly discovered... According to researchers... This discovery is significant because..."',
    duration: 60,
    difficulty: 'intermediate',
    category: 'social',
    points: 75,
    tags: ['news', 'formal', 'intermediate']
  },
  {
    id: 'tongue-twister',
    emoji: '🌀',
    title: 'Tongue Twister Sprint',
    description: 'Repeat this tongue twister as many times as you can in 30 seconds!',
    prompt: 'Say this as many times as possible in 30 seconds: "She sells seashells by the seashore. The shells she sells are surely seashells." Focus on clarity first, then speed!',
    hint: 'Tip: Start slowly to get the sounds right, then gradually increase your speed. Don\'t sacrifice clarity for speed!',
    duration: 30,
    difficulty: 'beginner',
    category: 'social',
    points: 60,
    tags: ['pronunciation', 'fun', 'beginner']
  },
  {
    id: 'describe-dream',
    emoji: '🌟',
    title: 'Describe Your Dream Vacation',
    description: 'Talk about your ideal vacation destination in detail.',
    prompt: 'Describe your dream vacation! Where would you go? What would you do there? Who would you go with? What makes this destination special? Use vivid descriptive language!',
    hint: 'Use descriptive adjectives: beautiful, breathtaking, serene, vibrant... Use future tense: "I would visit... I would spend time..."',
    duration: 60,
    difficulty: 'beginner',
    category: 'social',
    points: 50,
    tags: ['travel', 'descriptive', 'future tense']
  },
  {
    id: 'debate-technology',
    emoji: '🤖',
    title: 'Debate: AI in the Workplace',
    description: 'Argue both sides of whether AI will replace human workers.',
    prompt: 'Present BOTH sides of this debate: "Artificial Intelligence will replace most human jobs in the next 20 years." First argue FOR this claim (30 seconds), then AGAINST it (30 seconds). Be specific!',
    hint: 'For: "AI is already replacing... jobs in... For example..." Against: "However, humans still excel at... AI cannot replicate..."',
    duration: 90,
    difficulty: 'advanced',
    category: 'social',
    points: 150,
    tags: ['debate', 'technology', 'advanced']
  },
  {
    id: 'salary-negotiation',
    emoji: '💰',
    title: 'Salary Negotiation',
    description: 'Practice negotiating a salary increase professionally.',
    prompt: 'Your manager has offered you a 5% raise. You want 15%. Role-play how you would professionally negotiate for a higher salary. Include your justification based on your performance and market rates.',
    hint: 'Start: "I appreciate the offer, however I was hoping to discuss... Based on my contributions... and market research showing..."',
    duration: 90,
    difficulty: 'advanced',
    category: 'interview',
    points: 150,
    tags: ['negotiation', 'professional', 'advanced']
  },
  {
    id: 'customer-service',
    emoji: '📞',
    title: 'Handle a Customer Complaint',
    description: 'Play a customer service rep handling an angry customer professionally.',
    prompt: 'You are a customer service agent. A customer calls saying they received the wrong product and want a refund. They are frustrated and upset. Handle the situation professionally, empathetically, and resolve the issue.',
    hint: 'Key phrases: "I completely understand your frustration... I sincerely apologize... Let me resolve this immediately... What I can do for you is..."',
    duration: 90,
    difficulty: 'intermediate',
    category: 'interview',
    points: 100,
    tags: ['customer service', 'professional', 'empathy']
  },
  {
    id: 'storytelling',
    emoji: '📖',
    title: 'Tell a Story',
    description: 'Tell an interesting story from your life (real or made up).',
    prompt: 'Tell us a story! It can be a funny moment, an embarrassing experience, an adventure, or a lesson learned. Use storytelling techniques: set the scene, build suspense, and give a conclusion.',
    hint: 'Structure: "It was a [adjective] day when... Suddenly... I couldn\'t believe... In the end, I learned that..."',
    duration: 90,
    difficulty: 'intermediate',
    category: 'social',
    points: 100,
    tags: ['storytelling', 'narrative', 'past tense']
  },
  {
    id: 'presentation',
    emoji: '📊',
    title: 'Mini Presentation',
    description: 'Present a topic of your choice for 2 minutes professionally.',
    prompt: 'Give a short presentation on any topic you\'re passionate about (e.g., your hobby, a skill you\'ve learned, something you\'re curious about). Use presentation language and structure your points clearly.',
    hint: 'Open: "Today I\'d like to talk about... I\'ll cover three main points: First... Second... Third... In conclusion..."',
    duration: 120,
    difficulty: 'advanced',
    category: 'interview',
    points: 200,
    tags: ['presentation', 'professional', 'structure']
  }
];

let completedChallenges = [];
let totalPoints = 0;
let todayCount = 0;
let currentChallenge = null;
let timerInterval = null;
let timerSeconds = 0;
let isChallengeRecording = false;
let challengeRecognition = null;
let currentFilter = 'all';

// ── Init ──
function init() {
  loadStats();
  renderChallenges(CHALLENGES);
  setupFilters();
  setupModal();
  updateStreakDisplay();
}

// ── Load / Save Stats ──
function loadStats() {
  const saved = Store.get('challenges', { completed: [], points: 0, today: [], streak: 0 });
  completedChallenges = saved.completed || [];
  totalPoints = saved.points || 0;

  // Check today
  const today = new Date().toISOString().split('T')[0];
  if (saved.todayDate === today) {
    todayCount = (saved.today || []).length;
  } else {
    todayCount = 0;
    saved.today = [];
    saved.todayDate = today;
    Store.set('challenges', saved);
  }
}

function saveStats() {
  const today = new Date().toISOString().split('T')[0];
  Store.update('challenges', (data) => {
    data = data || {};
    data.completed = completedChallenges;
    data.points = totalPoints;
    data.todayDate = today;
    data.today = data.today || [];
    if (!data.today.includes(currentChallenge?.id)) {
      data.today.push(currentChallenge?.id);
    }
    return data;
  });
}

function updateStreakDisplay() {
  const stats = Store.get('stats', {});
  document.getElementById('streakCount').textContent = stats.streak || 0;
  document.getElementById('completedCount').textContent = completedChallenges.length;
  document.getElementById('pointsCount').textContent = totalPoints;
  document.getElementById('todayCount').textContent = todayCount;
}

// ── Render Challenges ──
function renderChallenges(challenges) {
  const grid = document.getElementById('challengeGrid');
  grid.innerHTML = challenges.map(ch => {
    const done = completedChallenges.includes(ch.id);
    const diffColors = { beginner: 'badge-green', intermediate: 'badge-amber', advanced: 'badge-pink' };
    return `
      <div class="card challenge-card fade-in" data-id="${ch.id}">
        <div class="challenge-card-header">
          <span class="challenge-emoji">${ch.emoji}</span>
          <span class="challenge-difficulty badge ${diffColors[ch.difficulty]}">${ch.difficulty}</span>
          <h3 class="challenge-title">${ch.title}</h3>
          <p class="challenge-desc">${ch.description}</p>
          <div class="challenge-meta">
            <span>⏱️ ${ch.duration}s</span>
            <span>⭐ ${ch.points} pts</span>
            <span>${ch.tags.slice(0, 2).map(t => `#${t}`).join(' ')}</span>
          </div>
        </div>
        <div class="challenge-card-footer">
          ${done ? '<div class="challenge-completed">✅ Completed</div>' : '<div style="font-size:0.82rem;color:var(--text-muted);">Not started</div>'}
          <button class="btn ${done ? 'btn-ghost' : 'btn-primary'} btn-sm">${done ? '🔄 Redo' : '▶️ Start'}</button>
        </div>
      </div>
    `;
  }).join('');

  // Click to open
  grid.querySelectorAll('.challenge-card').forEach(card => {
    card.addEventListener('click', () => {
      const ch = CHALLENGES.find(c => c.id === card.dataset.id);
      if (ch) openModal(ch);
    });
  });

  // Observe fade-in
  grid.querySelectorAll('.fade-in').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    obs.observe(el);
  });
}

// ── Filters ──
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      const filtered = currentFilter === 'all'
        ? CHALLENGES
        : CHALLENGES.filter(c => c.difficulty === currentFilter || c.category === currentFilter);
      renderChallenges(filtered);
    });
  });
}

// ── Modal ──
function openModal(challenge) {
  currentChallenge = challenge;
  document.getElementById('modalEmoji').textContent = challenge.emoji;
  document.getElementById('modalTitle').textContent = challenge.title;
  document.getElementById('modalPrompt').textContent = challenge.prompt;
  document.getElementById('modalTranscript').textContent = 'Your speech will appear here...';
  document.getElementById('modalTranscript').style.fontStyle = 'italic';
  document.getElementById('hintBox').style.display = 'none';
  document.getElementById('completeBtn').style.display = 'none';
  document.getElementById('modalMicBtn').textContent = '🎤 Start Speaking';
  document.getElementById('modalMicBtn').className = 'btn btn-primary';
  resetTimer(challenge.duration);
  document.getElementById('modalOverlay').classList.add('open');
  isChallengeRecording = false;
}

function setupModal() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  document.getElementById('modalMicBtn').addEventListener('click', toggleChallengeRecording);

  document.getElementById('modalHintBtn').addEventListener('click', () => {
    const hintBox = document.getElementById('hintBox');
    const isHidden = hintBox.style.display === 'none';
    hintBox.style.display = isHidden ? 'block' : 'none';
    if (isHidden) document.getElementById('hintText').textContent = currentChallenge?.hint;
  });

  document.getElementById('completeBtn').addEventListener('click', markComplete);
}

function closeModal() {
  if (isChallengeRecording) { challengeRecognition?.stop(); isChallengeRecording = false; }
  clearInterval(timerInterval);
  document.getElementById('modalOverlay').classList.remove('open');
}

// ── Timer ──
function resetTimer(seconds) {
  clearInterval(timerInterval);
  timerSeconds = seconds;
  updateTimerDisplay(seconds, seconds);
}

function startTimer(duration) {
  let remaining = duration;
  const circumference = 351.86;

  timerInterval = setInterval(() => {
    remaining--;
    updateTimerDisplay(remaining, duration);
    if (remaining <= 0) {
      clearInterval(timerInterval);
      if (isChallengeRecording) toggleChallengeRecording();
      showToast('Time\'s up! Great work! ⏰', 'info');
      document.getElementById('completeBtn').style.display = 'inline-flex';
    }
  }, 1000);
}

function updateTimerDisplay(remaining, total) {
  const ring = document.getElementById('timerRing');
  const circumference = 351.86;
  const offset = circumference * (1 - remaining / total);
  ring.style.strokeDashoffset = offset;
  document.getElementById('timerNumber').textContent = remaining;
  if (remaining <= 10) ring.style.stroke = '#ef4444';
  else ring.style.stroke = 'url(#timerGrad)';
}

// ── Recording in Modal ──
function toggleChallengeRecording() {
  if (isChallengeRecording) {
    stopChallengeRecording();
  } else {
    startChallengeRecording();
  }
}

function startChallengeRecording() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('Speech recognition requires Chrome or Edge!', 'error');
    return;
  }

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  challengeRecognition = new SpeechRec();
  challengeRecognition.lang = 'en-US';
  challengeRecognition.continuous = true;
  challengeRecognition.interimResults = true;

  challengeRecognition.onstart = () => {
    isChallengeRecording = true;
    document.getElementById('modalMicBtn').textContent = '⏹ Stop Recording';
    document.getElementById('modalMicBtn').className = 'btn btn-danger';
    document.getElementById('modalTranscript').style.fontStyle = 'normal';
    startTimer(currentChallenge.duration);
    updateStats('practice_time', 1);
  };

  challengeRecognition.onresult = (e) => {
    let text = '';
    for (let i = 0; i < e.results.length; i++) {
      text += e.results[i][0].transcript + ' ';
    }
    document.getElementById('modalTranscript').textContent = text;
    if (text.trim().length > 10) {
      document.getElementById('completeBtn').style.display = 'inline-flex';
    }
  };

  challengeRecognition.onerror = () => {
    showToast('Recording error. Try again.', 'error');
    stopChallengeRecording();
  };

  challengeRecognition.start();
}

function stopChallengeRecording() {
  isChallengeRecording = false;
  challengeRecognition?.stop();
  challengeRecognition = null;
  clearInterval(timerInterval);
  document.getElementById('modalMicBtn').textContent = '🎤 Start Again';
  document.getElementById('modalMicBtn').className = 'btn btn-ghost';
  document.getElementById('completeBtn').style.display = 'inline-flex';
}

function markComplete() {
  if (!currentChallenge) return;
  if (!completedChallenges.includes(currentChallenge.id)) {
    completedChallenges.push(currentChallenge.id);
    totalPoints += currentChallenge.points;
    todayCount++;
    saveStats();
    updateStats('challenges_done', 1);
    updateStreakDisplay();
    showToast(`🎉 Challenge complete! +${currentChallenge.points} points earned!`, 'success');
  } else {
    showToast('Challenge already completed! Try a new one!', 'info');
  }
  closeModal();
  // Re-render current filter
  const filtered = currentFilter === 'all'
    ? CHALLENGES
    : CHALLENGES.filter(c => c.difficulty === currentFilter || c.category === currentFilter);
  renderChallenges(filtered);
}

document.addEventListener('DOMContentLoaded', init);
