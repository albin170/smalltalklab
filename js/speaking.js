// ============================================================
//  SmallTalkLab — Speaking Practice (speaking.js)
// ============================================================

const PHRASES = {
  daily: [
    "Good morning! How are you doing today?",
    "I would like to order a coffee, please.",
    "Can you help me find the nearest pharmacy?",
    "What time does the store close tonight?",
    "I am really enjoying learning English.",
    "Could you please speak more slowly?",
    "I appreciate your help very much.",
    "The weather is beautiful today, isn't it?",
    "I need to reschedule our appointment.",
    "Thank you so much for your kindness."
  ],
  business: [
    "Let's schedule a meeting for next Tuesday.",
    "I wanted to follow up on our previous discussion.",
    "Could you please send me the report by Friday?",
    "I think we need to reconsider our strategy.",
    "This proposal looks very promising.",
    "We exceeded our quarterly targets this year.",
    "I appreciate your valuable feedback.",
    "Let me clarify the key points of this project.",
    "We should prioritize customer satisfaction.",
    "The deadline for this project is end of month."
  ],
  travel: [
    "Where is the nearest bus stop?",
    "I would like a window seat, please.",
    "Can you recommend a good restaurant nearby?",
    "How long does it take to get to the airport?",
    "I am looking for a comfortable hotel room.",
    "Could you help me with my luggage?",
    "What are the must-see attractions here?",
    "I need to exchange some currency.",
    "Is there a shuttle service to the hotel?",
    "My flight has been delayed by two hours."
  ],
  interview: [
    "I am a highly motivated and dedicated professional.",
    "My greatest strength is my ability to solve complex problems.",
    "I thrive in collaborative team environments.",
    "I am passionate about continuous learning and growth.",
    "In my previous role, I led a team of ten engineers.",
    "I would describe myself as results-oriented and detail-focused.",
    "I am excited about the opportunity to contribute to your company.",
    "I have five years of experience in software development.",
    "I am comfortable working under pressure and meeting tight deadlines.",
    "My long-term goal is to become a senior leader in my field."
  ],
  tongue: [
    "She sells seashells by the seashore.",
    "Peter Piper picked a peck of pickled peppers.",
    "How much wood would a woodchuck chuck?",
    "Betty Botter bought some butter but the butter was bitter.",
    "Red lorry, yellow lorry, red lorry, yellow lorry.",
    "Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair.",
    "The sixth sick sheik's sixth sheep's sick.",
    "I scream, you scream, we all scream for ice cream.",
    "Unique New York, you know you need unique New York.",
    "Whether the weather be fine, or whether the weather be not."
  ]
};

let currentCategory = 'daily';
let currentPhrase = '';
let isRecording = false;
let recognition = null;
let transcript = '';
let sessionAttempts = 0;
let sessionBest = 0;
let sessionTotal = 0;
let audioCtx = null;
let analyser = null;
let animFrameId = null;

// ── Init ──
function init() {
  renderPhraseList(currentCategory);
  setupCategoryPills();
  setupMicBtn();
  setupWaveform();

  document.getElementById('newPhraseBtn').addEventListener('click', selectRandomPhrase);
  document.getElementById('listenBtn').addEventListener('click', listenPhrase);
  document.getElementById('checkBtn').addEventListener('click', checkScore);
}

// ── Category Pills ──
function setupCategoryPills() {
  document.getElementById('categoryPills').addEventListener('click', e => {
    const pill = e.target.closest('.category-pill');
    if (!pill) return;
    document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentCategory = pill.dataset.cat;
    renderPhraseList(currentCategory);
  });
}

function renderPhraseList(cat) {
  const list = document.getElementById('phraseList');
  list.innerHTML = PHRASES[cat].map((phrase, i) =>
    `<div class="phrase-item" data-phrase="${phrase}" data-index="${i}">${phrase}</div>`
  ).join('');

  list.querySelectorAll('.phrase-item').forEach(item => {
    item.addEventListener('click', () => {
      list.querySelectorAll('.phrase-item').forEach(p => p.classList.remove('selected'));
      item.classList.add('selected');
      setPhrase(item.dataset.phrase);
    });
  });
}

// ── Phrase Selection ──
function selectRandomPhrase() {
  const phrases = PHRASES[currentCategory];
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  setPhrase(phrase);
  // Highlight in list
  document.querySelectorAll('.phrase-item').forEach(item => {
    item.classList.toggle('selected', item.dataset.phrase === phrase);
  });
}

function setPhrase(phrase) {
  currentPhrase = phrase;
  const display = document.getElementById('phraseDisplay');
  display.innerHTML = phrase.split(' ').map(w =>
    `<span class="phrase-word">${w}</span>`
  ).join(' ');
  resetScore();
  document.getElementById('transcriptBox').textContent = 'Your speech will appear here as you speak...';
  document.getElementById('transcriptBox').style.fontStyle = 'italic';
  document.getElementById('checkBtn').style.display = 'none';
  showToast('Phrase selected! Press the mic and speak.', 'info');
}

// ── Text-to-Speech ──
function listenPhrase() {
  if (!currentPhrase) { showToast('Please select a phrase first.', 'warning'); return; }
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(currentPhrase);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    utter.pitch = 1;
    // Try to find a good English voice
    const voices = speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
      || voices.find(v => v.lang.startsWith('en'));
    if (enVoice) utter.voice = enVoice;
    speechSynthesis.speak(utter);
    showToast('🔊 Playing pronunciation...', 'info');
  } else {
    showToast('Text-to-speech not supported in this browser.', 'error');
  }
}

// ── Mic Button ──
function setupMicBtn() {
  const btn = document.getElementById('micBtn');
  btn.addEventListener('click', toggleRecording);
}

function toggleRecording() {
  if (!currentPhrase) {
    showToast('Please select a phrase first!', 'warning');
    return;
  }
  isRecording ? stopRecording() : startRecording();
}

function startRecording() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('Speech recognition requires Chrome or Edge browser!', 'error');
    return;
  }

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRec();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = true;

  transcript = '';

  recognition.onstart = () => {
    isRecording = true;
    const btn = document.getElementById('micBtn');
    btn.classList.add('recording');
    btn.textContent = '⏹';
    document.getElementById('micStatus').textContent = '🔴 Recording... speak now';
    document.getElementById('micStatus').classList.add('active');
    document.getElementById('transcriptBox').style.fontStyle = 'normal';
    startWaveAnimation();
    updateStats('practice_time', 1);
  };

  recognition.onresult = (e) => {
    let interim = '';
    let final = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) {
        final += e.results[i][0].transcript;
      } else {
        interim += e.results[i][0].transcript;
      }
    }
    transcript = final || interim;
    const box = document.getElementById('transcriptBox');
    box.textContent = transcript || '(listening...)';
    if (transcript) {
      highlightWords(transcript);
      document.getElementById('checkBtn').style.display = 'inline-flex';
    }
  };

  recognition.onerror = (e) => {
    let msg = 'Microphone error. Please try again.';
    if (e.error === 'not-allowed') msg = '❌ Microphone access denied. Please allow mic access.';
    else if (e.error === 'network') msg = '❌ Network error. Please check your connection.';
    else if (e.error === 'no-speech') msg = '⚠️ No speech detected. Try again.';
    showToast(msg, 'error');
    stopRecording();
  };

  recognition.onend = () => {
    if (isRecording) stopRecording();
  };

  recognition.start();
}

function stopRecording() {
  isRecording = false;
  if (recognition) { recognition.stop(); recognition = null; }
  const btn = document.getElementById('micBtn');
  btn.classList.remove('recording');
  btn.textContent = '🎤';
  document.getElementById('micStatus').textContent = 'Click the mic to start recording';
  document.getElementById('micStatus').classList.remove('active');
  stopWaveAnimation();
  if (transcript) checkScore();
}

// ── Word Highlight ──
function highlightWords(spokenText) {
  if (!currentPhrase) return;
  const targetWords = currentPhrase.toLowerCase().replace(/[^a-z\s]/g, '').split(' ');
  const spokenWords = spokenText.toLowerCase().replace(/[^a-z\s]/g, '').split(' ');

  const spans = document.querySelectorAll('.phrase-word');
  spans.forEach((span, i) => {
    span.classList.remove('correct', 'incorrect', 'current');
    const word = targetWords[i];
    if (spokenWords.includes(word)) {
      span.classList.add('correct');
    } else if (i < spokenWords.length) {
      span.classList.add('incorrect');
    }
  });
}

// ── Score Calculation ──
function checkScore() {
  if (!transcript || !currentPhrase) return;

  const targetWords = currentPhrase.toLowerCase().replace(/[^a-z\s]/g, '').split(' ').filter(Boolean);
  const spokenWords = transcript.toLowerCase().replace(/[^a-z\s]/g, '').split(' ').filter(Boolean);

  let matches = 0;
  const targetCopy = [...targetWords];
  spokenWords.forEach(word => {
    const idx = targetCopy.indexOf(word);
    if (idx !== -1) { matches++; targetCopy.splice(idx, 1); }
  });

  // Calculate score with multiple factors
  const wordAccuracy = matches / targetWords.length;
  const lengthPenalty = Math.abs(targetWords.length - spokenWords.length) / targetWords.length;
  const score = Math.min(100, Math.round((wordAccuracy - lengthPenalty * 0.3) * 100));
  const finalScore = Math.max(0, score);

  displayScore(finalScore);
  generateFeedback(finalScore, targetWords, spokenWords, matches);

  sessionAttempts++;
  sessionTotal += finalScore;
  if (finalScore > sessionBest) sessionBest = finalScore;
  updateSessionStats();
  updateStats('accuracy', finalScore);
}

function displayScore(score) {
  const ring = document.getElementById('scoreRing');
  const number = document.getElementById('scoreNumber');
  const circumference = 351.86;
  const offset = circumference - (score / 100) * circumference;

  setTimeout(() => {
    ring.style.strokeDashoffset = offset;
    // Color based on score
    if (score >= 80) ring.style.stroke = '#10b981';
    else if (score >= 60) ring.style.stroke = '#f59e0b';
    else ring.style.stroke = '#ef4444';
  }, 100);

  let displayed = 0;
  const interval = setInterval(() => {
    displayed = Math.min(displayed + 2, score);
    number.textContent = displayed;
    if (displayed >= score) clearInterval(interval);
  }, 20);
}

function generateFeedback(score, targetWords, spokenWords, matches) {
  const panel = document.getElementById('feedbackPanel');
  const missed = targetWords.filter(w => !spokenWords.includes(w));
  const extra = spokenWords.filter(w => !targetWords.includes(w));

  let html = '';

  if (score >= 90) {
    html += feedbackItem('success', '🌟', 'Excellent pronunciation! You sound almost like a native speaker.');
  } else if (score >= 75) {
    html += feedbackItem('success', '👍', 'Great job! Your pronunciation is clear and understandable.');
  } else if (score >= 55) {
    html += feedbackItem('warning', '📈', 'Good effort! A few words need more practice.');
  } else {
    html += feedbackItem('error', '💪', 'Keep practicing! Focus on the highlighted words.');
  }

  if (missed.length > 0 && missed.length <= 5) {
    html += feedbackItem('warning', '🔴', `Words to practice: <strong>${missed.join(', ')}</strong>`);
  }

  if (extra.length > 0) {
    html += feedbackItem('warning', '📝', `You added extra words: <em>${extra.join(', ')}</em> — try to match the phrase exactly.`);
  }

  html += feedbackItem('success', '💡', `You said ${matches} out of ${targetWords.length} words correctly.`);

  if (score < 70) {
    html += feedbackItem('warning', '🔊', 'Press "Hear It" to listen to the correct pronunciation, then try again.');
  }

  panel.innerHTML = html;
}

function feedbackItem(type, icon, text) {
  return `<div class="feedback-item ${type}"><span>${icon}</span><span>${text}</span></div>`;
}

function updateSessionStats() {
  const avg = sessionAttempts > 0 ? Math.round(sessionTotal / sessionAttempts) : 0;
  document.getElementById('sessionAccuracy').textContent = avg + '%';
  document.getElementById('accuracyBar').style.width = avg + '%';
  document.getElementById('attemptsCount').textContent = sessionAttempts;
  document.getElementById('bestScore').textContent = sessionBest;
}

function resetScore() {
  document.getElementById('scoreRing').style.strokeDashoffset = '351.86';
  document.getElementById('scoreNumber').textContent = '—';
  document.getElementById('feedbackPanel').innerHTML = feedbackItem('success', '💡', 'Press Record and speak the target phrase to get your score.');
}

// ── Waveform Animation ──
let waveAnimFrame = null;
let wavePhase = 0;

function setupWaveform() {
  const canvas = document.getElementById('waveCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  drawFlatWave(ctx, canvas);
}

function drawFlatWave(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.strokeStyle = 'rgba(79, 142, 247, 0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function startWaveAnimation() {
  const canvas = document.getElementById('waveCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  function animate() {
    waveAnimFrame = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height / 2 +
        Math.sin(x * 0.02 + wavePhase) * 12 +
        Math.sin(x * 0.05 + wavePhase * 1.3) * 8 +
        Math.sin(x * 0.01 + wavePhase * 0.7) * 6;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(79, 142, 247, 0.8)';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(79, 142, 247, 0.5)';
    ctx.stroke();
    wavePhase += 0.08;
  }
  animate();
}

function stopWaveAnimation() {
  if (waveAnimFrame) {
    cancelAnimationFrame(waveAnimFrame);
    waveAnimFrame = null;
  }
  const canvas = document.getElementById('waveCanvas');
  const ctx = canvas.getContext('2d');
  drawFlatWave(ctx, canvas);
}

// ── Start ──
document.addEventListener('DOMContentLoaded', init);
