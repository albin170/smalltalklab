// ============================================================
//  SmallTalkLab — Grammar Checker (grammar.js)
// ============================================================

const GRAMMAR_RULES = [
  {
    pattern: /\bi am go\b/gi,
    fix: "I am going",
    reason: "Use 'am going' (present continuous) not 'am go'"
  },
  {
    pattern: /\bhe don't\b/gi,
    fix: "he doesn't",
    reason: "Third person singular uses 'doesn't' not 'don't'"
  },
  {
    pattern: /\bshe don't\b/gi,
    fix: "she doesn't",
    reason: "Third person singular uses 'doesn't' not 'don't'"
  },
  {
    pattern: /\bit don't\b/gi,
    fix: "it doesn't",
    reason: "Third person singular uses 'doesn't' not 'don't'"
  },
  {
    pattern: /\bthey is\b/gi,
    fix: "they are",
    reason: "Plural subject 'they' takes 'are' not 'is'"
  },
  {
    pattern: /\bwe is\b/gi,
    fix: "we are",
    reason: "Plural subject 'we' takes 'are' not 'is'"
  },
  {
    pattern: /\bi goed\b/gi,
    fix: "I went",
    reason: "'Go' has an irregular past tense: 'went'"
  },
  {
    pattern: /\bi buyed\b/gi,
    fix: "I bought",
    reason: "'Buy' has an irregular past tense: 'bought'"
  },
  {
    pattern: /\bi eated\b/gi,
    fix: "I ate",
    reason: "'Eat' has an irregular past tense: 'ate'"
  },
  {
    pattern: /\bmore better\b/gi,
    fix: "better",
    reason: "'Better' is already a comparative. Don't use 'more' before it."
  },
  {
    pattern: /\bmost best\b/gi,
    fix: "best",
    reason: "'Best' is already a superlative. Don't use 'most' before it."
  },
  {
    pattern: /\bi have went\b/gi,
    fix: "I have gone",
    reason: "Use past participle 'gone' with 'have', not 'went'"
  },
  {
    pattern: /\balot\b/gi,
    fix: "a lot",
    reason: "'A lot' is always two words"
  },
  {
    pattern: /\birregardless\b/gi,
    fix: "regardless",
    reason: "'Irregardless' is not standard English; use 'regardless'"
  },
  {
    pattern: /\bcould of\b/gi,
    fix: "could have",
    reason: "The correct phrase is 'could have', not 'could of'"
  },
  {
    pattern: /\bwould of\b/gi,
    fix: "would have",
    reason: "The correct phrase is 'would have', not 'would of'"
  },
  {
    pattern: /\bshould of\b/gi,
    fix: "should have",
    reason: "The correct phrase is 'should have', not 'should of'"
  },
  {
    pattern: /\byour welcome\b/gi,
    fix: "you're welcome",
    reason: "'You're' = 'you are'. 'Your' shows possession."
  },
  {
    pattern: /\bits a\b/gi,
    fix: "it's a",
    reason: "'It's' = 'it is'. 'Its' shows possession."
  },
  {
    pattern: /\btheir is\b/gi,
    fix: "there is",
    reason: "'There is' indicates location. 'Their' shows possession."
  },
  {
    pattern: /\bhe have\b/gi,
    fix: "he has",
    reason: "Third person singular uses 'has' not 'have'"
  },
  {
    pattern: /\bshe have\b/gi,
    fix: "she has",
    reason: "Third person singular uses 'has' not 'have'"
  },
  {
    pattern: /\bit have\b/gi,
    fix: "it has",
    reason: "Third person singular uses 'has' not 'have'"
  },
  {
    pattern: /\bi am agree\b/gi,
    fix: "I agree",
    reason: "'Agree' is a verb, not an adjective. Don't use 'am' before it."
  },
  {
    pattern: /\bvery much good\b/gi,
    fix: "very good",
    reason: "'Very good' is the natural phrase, not 'very much good'"
  },
  {
    pattern: /\ba ([aeiou])/gi,
    fix: "an $1",
    reason: "Use 'an' before words starting with a vowel sound (a, e, i, o, u)"
  },
  {
    pattern: /\bdon't never\b/gi,
    fix: "never",
    reason: "Avoid double negatives. Use 'never' alone or 'don't ever'."
  },
  {
    pattern: /\bdoesn't no\b/gi,
    fix: "doesn't know",
    reason: "Double negative detected. Use 'doesn't know'."
  },
  {
    pattern: /\bI seen\b/gi,
    fix: "I saw / I have seen",
    reason: "'Seen' needs a helper verb: 'I have seen'. Or use simple past: 'I saw'."
  },
  {
    pattern: /\bI done\b/gi,
    fix: "I did / I have done",
    reason: "'Done' needs a helper verb: 'I have done'. Or use 'I did'."
  }
];

const SAMPLES = [
  "I am go to the store yesterday and I buyed alot of things.",
  "She don't likes coffee but he have a good taste for tea.",
  "We is happy to announce that they is joining the team.",
  "Its a beautiful day, your welcome to join us outside.",
  "I could of went to the party but I was more better off at home.",
  "He have no idea that their is a problem with the plan."
];

let checksCount = 0;
let fixedTotal = 0;
let currentErrors = [];
let correctedText = '';

// ── Init ──
function init() {
  setupEventListeners();
  updateCharCount();
}

function setupEventListeners() {
  const input = document.getElementById('grammarInput');
  const checkBtn = document.getElementById('checkBtn');
  const clearBtn = document.getElementById('clearBtn');
  const sampleBtn = document.getElementById('sampleBtn');
  const copyFixed = document.getElementById('copyFixed');

  input.addEventListener('input', updateCharCount);

  checkBtn.addEventListener('click', checkGrammar);

  clearBtn.addEventListener('click', () => {
    input.value = '';
    updateCharCount();
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('grammarScore').textContent = '—';
    document.getElementById('errorCount').textContent = '0';
    document.getElementById('wordCount').textContent = '0';
    document.getElementById('grammarRing').style.strokeDashoffset = '188.5';
  });

  sampleBtn.addEventListener('click', () => {
    const sample = SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
    input.value = sample;
    updateCharCount();
    checkGrammar();
  });

  copyFixed.addEventListener('click', () => {
    if (correctedText) {
      navigator.clipboard.writeText(correctedText).then(() => {
        showToast('Corrected text copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Could not copy. Please select text manually.', 'error');
      });
    }
  });
}

function updateCharCount() {
  const text = document.getElementById('grammarInput').value;
  document.getElementById('charCount').textContent = `${text.length} / 500`;
  document.getElementById('wordCount').textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
}

// ── Grammar Check ──
function checkGrammar() {
  const text = document.getElementById('grammarInput').value.trim();
  if (!text) { showToast('Please enter some text first!', 'warning'); return; }

  checksCount++;
  document.getElementById('checksCount').textContent = checksCount;

  currentErrors = [];
  correctedText = text;

  // Find all errors
  GRAMMAR_RULES.forEach(rule => {
    let match;
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags.replace('g', '') + 'g');
    while ((match = regex.exec(text)) !== null) {
      currentErrors.push({
        original: match[0],
        fix: rule.fix.replace('$1', match[1] || ''),
        reason: rule.reason,
        index: match.index,
        length: match[0].length
      });
    }
    correctedText = correctedText.replace(rule.pattern, rule.fix);
  });

  // Remove duplicate errors (same index)
  const uniqueErrors = currentErrors.filter((err, idx, self) =>
    idx === self.findIndex(e => e.index === err.index)
  );
  currentErrors = uniqueErrors;

  // Score
  const wordCount = text.trim().split(/\s+/).length;
  const errorRate = currentErrors.length / Math.max(wordCount, 1);
  const score = Math.max(0, Math.round(100 - errorRate * 50));

  displayResults(text, currentErrors, score);
  updateStats('grammar_checks', 1);
}

function displayResults(text, errors, score) {
  const section = document.getElementById('resultSection');
  section.style.display = 'block';

  // Animate score
  document.getElementById('errorCount').textContent = errors.length;
  fixedTotal += errors.length;
  document.getElementById('fixedCount').textContent = fixedTotal;
  animateGrammarScore(score);

  // Highlighted text
  let highlighted = escapeHtml(text);
  // Sort errors by index descending to replace from back
  const sorted = [...errors].sort((a, b) => b.index - a.index);
  sorted.forEach(err => {
    const escaped = escapeHtml(err.original);
    highlighted = highlighted.replace(
      new RegExp(escapeRegex(escaped), 'i'),
      `<span class="error-word" title="${err.reason}">${escaped}</span>`
    );
  });
  document.getElementById('resultDisplay').innerHTML = highlighted;

  // Error list
  const errorList = document.getElementById('errorList');
  if (errors.length === 0) {
    errorList.innerHTML = '<div class="feedback-item success"><span>🌟</span><span><strong>Excellent!</strong> No grammar errors found. Your English is great!</span></div>';
    document.getElementById('betterSentence').style.display = 'none';
  } else {
    errorList.innerHTML = errors.map((err, i) => `
      <div class="error-item" id="errItem${i}">
        <span class="error-icon">❌</span>
        <div class="error-detail">
          <div class="original">${err.original}</div>
          <div class="fix">→ ${err.fix}</div>
          <div class="reason">${err.reason}</div>
        </div>
        <button class="btn btn-success btn-sm apply-fix" data-index="${i}">Fix</button>
      </div>
    `).join('');

    // Apply individual fix buttons
    errorList.querySelectorAll('.apply-fix').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        const err = errors[idx];
        const input = document.getElementById('grammarInput');
        input.value = input.value.replace(new RegExp(escapeRegex(err.original), 'i'), err.fix);
        btn.closest('.error-item').style.opacity = '0.4';
        btn.disabled = true;
        btn.textContent = '✅';
        updateCharCount();
        showToast(`Fixed: "${err.original}" → "${err.fix}"`, 'success');
      });
    });

    // Better version
    if (correctedText !== text) {
      document.getElementById('betterSentence').style.display = 'block';
      document.getElementById('betterText').innerHTML =
        `<span class="corrected-word">${escapeHtml(correctedText)}</span>`;
    }
  }

  if (errors.length > 0) showToast(`Found ${errors.length} error${errors.length > 1 ? 's' : ''}. Check the suggestions below!`, 'info');
  else showToast('No errors found! Great writing! 🌟', 'success');

  section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function animateGrammarScore(score) {
  const ring = document.getElementById('grammarRing');
  const scoreEl = document.getElementById('grammarScore');
  const circumference = 188.5;
  const offset = circumference - (score / 100) * circumference;

  setTimeout(() => {
    ring.style.strokeDashoffset = offset;
    if (score >= 80) ring.style.stroke = '#10b981';
    else if (score >= 60) ring.style.stroke = '#f59e0b';
    else ring.style.stroke = '#ef4444';
  }, 100);

  let n = 0;
  const interval = setInterval(() => {
    n = Math.min(n + 2, score);
    scoreEl.textContent = n;
    if (n >= score) clearInterval(interval);
  }, 20);
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

document.addEventListener('DOMContentLoaded', init);
