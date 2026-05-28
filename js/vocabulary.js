// ============================================================
//  SmallTalkLab — Vocabulary Builder (vocabulary.js)
// ============================================================

const WORDS = [
  { word: "Eloquent", phonetic: "/ˈel.ə.kwənt/", type: "adjective", definition: "Fluent or persuasive in speaking or writing; well-expressed.", example: "She gave an eloquent speech that moved the entire audience to tears.", synonyms: ["articulate", "fluent", "persuasive", "expressive"] },
  { word: "Perseverance", phonetic: "/ˌpɜː.sɪˈvɪər.əns/", type: "noun", definition: "Continued effort to do or achieve something despite difficulty or failure.", example: "His perseverance paid off when he finally passed the exam on his third attempt.", synonyms: ["persistence", "determination", "tenacity", "grit"] },
  { word: "Ambiguous", phonetic: "/æmˈbɪɡ.ju.əs/", type: "adjective", definition: "Open to more than one interpretation; not clear or decided.", example: "The politician gave an ambiguous answer that satisfied no one.", synonyms: ["unclear", "vague", "uncertain", "equivocal"] },
  { word: "Meticulous", phonetic: "/mɪˈtɪk.jʊ.ləs/", type: "adjective", definition: "Showing great attention to detail; very careful and precise.", example: "She was meticulous in her research, checking every fact twice.", synonyms: ["thorough", "precise", "careful", "detailed"] },
  { word: "Pragmatic", phonetic: "/præɡˈmæt.ɪk/", type: "adjective", definition: "Dealing with things sensibly and realistically based on practical considerations.", example: "We need a pragmatic approach to solve this budget problem.", synonyms: ["practical", "realistic", "sensible", "rational"] },
  { word: "Ephemeral", phonetic: "/ɪˈfem.ər.əl/", type: "adjective", definition: "Lasting for a very short time; transitory.", example: "Social media trends are often ephemeral, disappearing as quickly as they arise.", synonyms: ["fleeting", "transient", "momentary", "brief"] },
  { word: "Benevolent", phonetic: "/bɪˈnev.ə.lənt/", type: "adjective", definition: "Well-meaning and kindly; generous in giving to others.", example: "The benevolent donor funded an entire school library.", synonyms: ["kind", "generous", "charitable", "altruistic"] },
  { word: "Tenacious", phonetic: "/tɪˈneɪ.ʃəs/", type: "adjective", definition: "Holding firmly to something; not giving up easily.", example: "Her tenacious pursuit of excellence made her the top student.", synonyms: ["persistent", "stubborn", "resolute", "determined"] },
  { word: "Conundrum", phonetic: "/kəˈnʌn.drəm/", type: "noun", definition: "A confusing and difficult problem or question.", example: "How to reduce costs without losing staff is the manager's conundrum.", synonyms: ["puzzle", "dilemma", "mystery", "enigma"] },
  { word: "Lucid", phonetic: "/ˈluː.sɪd/", type: "adjective", definition: "Expressed clearly; easy to understand; rational and clear-minded.", example: "His lucid explanation made a complex topic easy to understand.", synonyms: ["clear", "coherent", "comprehensible", "rational"] },
  { word: "Diligent", phonetic: "/ˈdɪl.ɪ.dʒənt/", type: "adjective", definition: "Having or showing care and effort in your work or duties.", example: "A diligent student always reviews their notes after every class.", synonyms: ["hardworking", "industrious", "conscientious", "dedicated"] },
  { word: "Profound", phonetic: "/prəˈfaʊnd/", type: "adjective", definition: "Very great or intense; having deep meaning or insight.", example: "The documentary had a profound impact on my understanding of climate change.", synonyms: ["deep", "intense", "significant", "insightful"] },
  { word: "Articulate", phonetic: "/ɑːˈtɪk.jʊ.lɪt/", type: "adjective", definition: "Able to express thoughts and feelings clearly and effectively.", example: "She was so articulate that everyone understood her proposal immediately.", synonyms: ["eloquent", "fluent", "expressive", "clear"] },
  { word: "Resilient", phonetic: "/rɪˈzɪl.i.ənt/", type: "adjective", definition: "Able to recover quickly from difficult conditions or setbacks.", example: "Children are often more resilient than adults give them credit for.", synonyms: ["tough", "adaptable", "buoyant", "strong"] },
  { word: "Empathy", phonetic: "/ˈem.pə.θi/", type: "noun", definition: "The ability to understand and share the feelings of another person.", example: "A good therapist must have genuine empathy for their clients.", synonyms: ["compassion", "understanding", "sensitivity", "sympathy"] },
  { word: "Versatile", phonetic: "/ˈvɜː.sə.taɪl/", type: "adjective", definition: "Able to adapt or be adapted to many different functions or activities.", example: "A versatile employee is an asset to any organization.", synonyms: ["adaptable", "flexible", "multi-skilled", "all-round"] },
  { word: "Inevitable", phonetic: "/ɪˈnev.ɪ.tə.bəl/", type: "adjective", definition: "Certain to happen; unavoidable.", example: "Change is inevitable — the key is how we adapt to it.", synonyms: ["unavoidable", "certain", "inescapable", "destined"] },
  { word: "Innovative", phonetic: "/ˈɪn.ə.veɪ.tɪv/", type: "adjective", definition: "Featuring new methods; advanced and original.", example: "The startup had an innovative solution to an age-old problem.", synonyms: ["creative", "original", "groundbreaking", "pioneering"] },
  { word: "Exacerbate", phonetic: "/ɪɡˈzæs.ə.beɪt/", type: "verb", definition: "To make a problem, bad situation, or negative feeling worse.", example: "Lack of sleep can exacerbate feelings of stress and anxiety.", synonyms: ["worsen", "aggravate", "intensify", "compound"] },
  { word: "Candid", phonetic: "/ˈkæn.dɪd/", type: "adjective", definition: "Truthful and straightforward; frank and honest.", example: "I appreciate your candid feedback — it helped me improve.", synonyms: ["frank", "honest", "direct", "open"] }
];

let currentCardIndex = 0;
let isFlipped = false;
let wodIndex = 0;
let quizCorrect = 0;
let quizWrong = 0;
let quizTotal = 0;
let quizAnswered = false;
let currentQuizWordIndex = 0;

// ── Init ──
function init() {
  setupWordOfDay();
  setupTabs();
  renderFlashcard();
  renderQuiz();
  renderWordGrid(WORDS);
  setupSearch();
  setupFlashcardControls();
}

// ── Word of Day ──
function setupWordOfDay() {
  displayWod(WORDS[wodIndex]);
  document.getElementById('nextWodBtn').addEventListener('click', () => {
    wodIndex = (wodIndex + 1) % WORDS.length;
    displayWod(WORDS[wodIndex]);
    showToast(`New word: ${WORDS[wodIndex].word}!`, 'info');
  });
}

function displayWod(w) {
  document.getElementById('wodWord').textContent = w.word;
  document.getElementById('wodPhonetic').textContent = w.phonetic;
  document.getElementById('wodType').textContent = w.type;
  document.getElementById('wodDef').textContent = w.definition;
  document.getElementById('wodExample').textContent = `"${w.example}"`;
}

// ── Tabs ──
function setupTabs() {
  document.querySelectorAll('.vocab-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.vocab-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.dataset.tab;
      document.getElementById('tabFlashcard').classList.toggle('hidden', tabName !== 'flashcard');
      document.getElementById('tabQuiz').classList.toggle('hidden', tabName !== 'quiz');
      document.getElementById('tabWordlist').classList.toggle('hidden', tabName !== 'wordlist');
    });
  });
}

// ── Flashcard ──
function renderFlashcard() {
  const w = WORDS[currentCardIndex];
  document.getElementById('fcWord').textContent = w.word;
  document.getElementById('fcPhonetic').textContent = w.phonetic;
  document.getElementById('fcType').textContent = w.type;
  document.getElementById('fcDef').textContent = w.definition;
  document.getElementById('fcExample').textContent = `"${w.example}"`;
  document.getElementById('fcSyns').innerHTML = w.synonyms.map(s => `<span class="fc-syn">${s}</span>`).join('');
  document.getElementById('fcCounter').textContent = `${currentCardIndex + 1} / ${WORDS.length}`;

  // Reset flip
  isFlipped = false;
  document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
  isFlipped = !isFlipped;
  document.getElementById('flashcard').classList.toggle('flipped', isFlipped);
}

function setupFlashcardControls() {
  document.getElementById('fcPrev').addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + WORDS.length) % WORDS.length;
    renderFlashcard();
  });

  document.getElementById('fcNext').addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % WORDS.length;
    renderFlashcard();
  });

  document.getElementById('fcHard').addEventListener('click', () => {
    showToast(`"${WORDS[currentCardIndex].word}" marked for extra practice! 💪`, 'info');
    currentCardIndex = (currentCardIndex + 1) % WORDS.length;
    renderFlashcard();
  });

  document.getElementById('fcEasy').addEventListener('click', () => {
    showToast(`Great! "${WORDS[currentCardIndex].word}" mastered! ⭐`, 'success');
    updateStats('vocab_learned', 1);
    currentCardIndex = (currentCardIndex + 1) % WORDS.length;
    renderFlashcard();
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.vocab-tab.active').dataset.tab !== 'flashcard') return;
    if (e.key === 'ArrowRight') document.getElementById('fcNext').click();
    if (e.key === 'ArrowLeft') document.getElementById('fcPrev').click();
    if (e.key === ' ') { e.preventDefault(); flipCard(); }
  });
}

// ── Quiz ──
function renderQuiz() {
  quizAnswered = false;
  document.getElementById('quizResult').textContent = '';

  const word = WORDS[currentQuizWordIndex];
  const wrongWords = WORDS.filter((_, i) => i !== currentQuizWordIndex)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  const allOptions = [...wrongWords, word].sort(() => Math.random() - 0.5);

  document.getElementById('quizWord').textContent = word.word;
  document.getElementById('quizPrompt').textContent = `What does "${word.word}" mean?`;

  const opts = document.getElementById('quizOptions');
  opts.innerHTML = allOptions.map((w, i) =>
    `<button class="quiz-option" data-index="${i}" data-correct="${w.word === word.word}">${w.definition}</button>`
  ).join('');

  opts.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', handleQuizAnswer);
  });

  document.getElementById('nextQuizBtn').addEventListener('click', nextQuizQuestion, { once: true });
}

function handleQuizAnswer(e) {
  if (quizAnswered) return;
  quizAnswered = true;
  quizTotal++;

  const btn = e.currentTarget;
  const isCorrect = btn.dataset.correct === 'true';

  document.querySelectorAll('.quiz-option').forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === 'true') b.classList.add('correct');
    else if (b === btn && !isCorrect) b.classList.add('wrong');
  });

  if (isCorrect) {
    quizCorrect++;
    document.getElementById('quizResult').innerHTML = '<span style="color:var(--accent-green);">✅ Correct! Well done!</span>';
    showToast('Correct! 🎉', 'success');
    updateStats('quiz_correct', 1);
  } else {
    quizWrong++;
    const word = WORDS[currentQuizWordIndex];
    document.getElementById('quizResult').innerHTML = `<span style="color:#ef4444;">❌ The answer is: <strong>${word.definition}</strong></span>`;
    showToast('Not quite — keep practicing!', 'info');
  }

  document.getElementById('quizCorrect').textContent = quizCorrect;
  document.getElementById('quizWrong').textContent = quizWrong;
  document.getElementById('quizTotal').textContent = quizTotal;
}

function nextQuizQuestion() {
  if (!quizAnswered) {
    showToast('Please answer the current question first!', 'warning');
    return;
  }
  currentQuizWordIndex = (currentQuizWordIndex + 1) % WORDS.length;
  renderQuiz();
  // Re-attach next button listener
  document.getElementById('nextQuizBtn').addEventListener('click', nextQuizQuestion, { once: true });
}

// ── Word List ──
function renderWordGrid(words) {
  document.getElementById('wordGrid').innerHTML = words.map(w => `
    <div class="card word-card">
      <div class="word-card-top">
        <div>
          <div class="word-card-word">${w.word}</div>
          <div class="word-card-phonetic">${w.phonetic}</div>
        </div>
        <div style="display:flex;gap:0.5rem;align-items:flex-start;">
          <span class="badge badge-blue">${w.type}</span>
          <button class="btn btn-ghost btn-sm btn-icon" onclick="speakWord('${w.word}')" title="Pronounce">🔊</button>
        </div>
      </div>
      <div class="word-card-def">${w.definition}</div>
      <div style="margin-top:0.75rem;font-size:0.82rem;font-style:italic;color:var(--text-muted);">"${w.example}"</div>
      <div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.75rem;">
        ${w.synonyms.map(s => `<span class="fc-syn">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function setupSearch() {
  document.getElementById('wordSearch').addEventListener('input', function() {
    const q = this.value.toLowerCase();
    const filtered = WORDS.filter(w =>
      w.word.toLowerCase().includes(q) ||
      w.definition.toLowerCase().includes(q) ||
      w.synonyms.some(s => s.toLowerCase().includes(q))
    );
    renderWordGrid(filtered);
  });
}

// ── TTS ──
function speakWord(word) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    const voices = speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en'));
    if (enVoice) utter.voice = enVoice;
    speechSynthesis.speak(utter);
  }
}
window.speakWord = speakWord;

document.addEventListener('DOMContentLoaded', init);
