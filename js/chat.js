// ============================================================
//  SmallTalkLab — AI Chat (chat.js)
// ============================================================

let msgCount = 0;
let corrCount = 0;
let isTyping = false;
let currentTopic = null;
let voiceListening = false;
let chatRecognition = null;

// ── Aria's Knowledge Base ──
const RESPONSES = {
  greeting: [
    "Hello there! I'm Aria, your AI English coach. How are you feeling today?",
    "Great to see you! What would you like to practice today?",
    "Hi! I'm here to help you improve your English. Shall we start with a conversation?"
  ],
  greeting_reply: [
    "That's wonderful to hear! Let's make the most of our practice session.",
    "I'm glad you're here! Consistent practice is the key to fluency.",
    "Perfect attitude! Now, tell me a bit about yourself."
  ],
  default: [
    "That's an interesting point! Can you elaborate a bit more?",
    "I understand! Let me help you express that more naturally.",
    "Good attempt! You're making great progress. Keep going!",
    "Excellent! Your English is improving with every sentence.",
    "That's correct! Now let's try something a little more challenging."
  ],
  interview: [
    "Great answer! In interviews, confidence is key. Try starting with 'I believe...' or 'In my experience...'",
    "Good response! You could also add specific examples to strengthen your answer.",
    "Well done! Remember to maintain eye contact and speak at a measured pace."
  ],
  travel: [
    "Perfect phrase for traveling! Another useful one is 'Could you point me in the right direction?'",
    "Great question for a tourist! You might also ask 'Is this within walking distance?'",
    "That's very polite and clear! Locals will appreciate your courteous English."
  ],
  shopping: [
    "Great shopping phrase! You could also say 'Do you have this in a different size/color?'",
    "Perfect! When negotiating, try 'Is there any discount available?'",
    "Excellent! Remember, being polite always gets better service."
  ],
  grammar_corrections: {
    "i am go": "I am going",
    "he don't": "he doesn't",
    "she don't": "she doesn't",
    "they is": "they are",
    "i goed": "I went",
    "more better": "better",
    "i have went": "I have gone",
    "i buyed": "I bought",
    "very much good": "very good",
    "i am agree": "I agree",
    "irregardless": "regardless",
    "could of": "could have",
    "would of": "would have",
    "should of": "should have",
    "alot": "a lot",
    "its a": "it's a",
    "your welcome": "you're welcome"
  }
};

const SUGGESTIONS = {
  default: [
    "How do I improve my accent?",
    "Give me a grammar tip",
    "Let's practice small talk",
    "Help me with pronunciation"
  ],
  interview: [
    "Tell me about yourself",
    "What are your strengths?",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?"
  ],
  travel: [
    "How do I get to the airport?",
    "Where is the nearest hotel?",
    "Can you recommend a restaurant?",
    "I need to exchange currency"
  ],
  shopping: [
    "How much does this cost?",
    "Do you have a bigger size?",
    "Can I try this on?",
    "Is there a sale going on?"
  ],
  greeting: [
    "Good morning!",
    "How are you doing?",
    "Nice to meet you!",
    "What a lovely day!"
  ],
  restaurant: [
    "I'd like to make a reservation",
    "What do you recommend?",
    "Can I see the menu, please?",
    "The food was delicious!"
  ],
  debate: [
    "I strongly believe that...",
    "In my opinion...",
    "I disagree because...",
    "That's a valid point, but..."
  ],
  medical: [
    "I have a headache",
    "I need to see a doctor",
    "What are the symptoms?",
    "Please prescribe medication"
  ],
  phone: [
    "Hello, may I speak to...?",
    "Could you call me back?",
    "I'm calling regarding...",
    "Could you speak up please?"
  ]
};

const TOPIC_STARTERS = {
  greeting: "Great! Let's practice everyday greetings. Start by greeting me like you would greet a colleague in the morning!",
  interview: "Perfect! Let's simulate a job interview. I'll be the interviewer. Ready? Here's the first question: **Tell me about yourself and your experience.**",
  travel: "Wonderful choice! Imagine you just arrived at a foreign airport. You need to find your hotel. Ask me for help!",
  shopping: "Let's role-play a shopping scenario! You're in a clothing store looking for a gift. What would you say to the shop assistant?",
  restaurant: "Excellent! You've just entered a fancy restaurant. I'm the waiter. How would you ask for a table?",
  debate: "Interesting! Let's practice expressing opinions. Here's a topic: **Social media has done more harm than good.** What do you think?",
  medical: "I'll play the role of a doctor. You're not feeling well. Tell me what symptoms you're experiencing.",
  phone: "Let's practice phone English! You're calling a company to inquire about a job opening. Go ahead and start the call!"
};

// ── Init ──
function init() {
  addMessage('ai', "Hello! I'm **Aria**, your personal AI English coach. 🌟\n\nI can help you:\n• Practice natural conversations\n• Correct grammar mistakes\n• Improve your vocabulary\n• Prepare for interviews\n\nWhat would you like to practice today? Choose a topic from the sidebar or just start chatting!");
  renderSuggestions('default');
  setupEventListeners();
  updateCounters();
}

// ── Event Listeners ──
function setupEventListeners() {
  document.getElementById('sendBtn').addEventListener('click', sendMessage);

  document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  document.getElementById('chatInput').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });

  document.getElementById('clearChatBtn').addEventListener('click', () => {
    document.getElementById('chatMessages').innerHTML = '';
    msgCount = 0; corrCount = 0;
    updateCounters();
    init();
  });

  document.getElementById('voiceInputBtn').addEventListener('click', toggleVoiceInput);

  document.getElementById('topicsList').addEventListener('click', (e) => {
    const btn = e.target.closest('.topic-btn');
    if (!btn) return;
    document.querySelectorAll('.topic-btn').forEach(b => b.style.background = '');
    btn.style.background = 'rgba(79, 142, 247, 0.15)';
    btn.style.borderColor = 'var(--accent-blue)';
    btn.style.color = 'var(--accent-blue)';
    currentTopic = btn.dataset.topic;
    renderSuggestions(currentTopic);
    const starter = TOPIC_STARTERS[currentTopic];
    if (starter) {
      setTimeout(() => addMessage('ai', starter), 300);
    }
  });
}

// ── Send Message ──
function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text || isTyping) return;

  input.value = '';
  input.style.height = 'auto';
  msgCount++;

  // Check for grammar errors
  const { corrected, errors } = checkGrammar(text);
  addMessage('user', text, errors.length > 0 ? { original: text, corrected, errors } : null);

  if (errors.length > 0) corrCount++;
  updateCounters();

  // AI response
  showTypingIndicator();
  const delay = 800 + Math.random() * 1200;
  setTimeout(() => {
    hideTypingIndicator();
    const response = generateResponse(text, corrected);
    addMessage('ai', response);
    renderSuggestions(currentTopic || 'default');
    updateStats('chat_messages', 1);
  }, delay);
}

// ── Grammar Check ──
function checkGrammar(text) {
  const lower = text.toLowerCase();
  const errors = [];
  let corrected = text;

  Object.entries(RESPONSES.grammar_corrections).forEach(([wrong, right]) => {
    if (lower.includes(wrong)) {
      errors.push({ wrong, right });
      const regex = new RegExp(wrong, 'gi');
      corrected = corrected.replace(regex, right);
    }
  });

  // Check a/an
  const anPattern = /\ba ([aeiou])/gi;
  if (anPattern.test(text)) {
    errors.push({ wrong: 'a + vowel', right: 'an + vowel' });
    corrected = corrected.replace(/\ba ([aeiou])/gi, 'an $1');
  }

  return { corrected, errors };
}

// ── Generate AI Response ──
function generateResponse(text, corrected) {
  const lower = text.toLowerCase();

  // Detect intent
  if (lower.match(/\b(hi|hello|hey|good morning|good evening|good afternoon)\b/)) {
    return pickRandom(RESPONSES.greeting_reply);
  }

  if (lower.match(/\b(thank|thanks|thank you)\b/)) {
    return "You're welcome! 😊 That's what I'm here for. Keep up the great work — your English is improving!";
  }

  if (lower.match(/\b(help|how|what|why|when|where|can you)\b/)) {
    return generateHelpResponse(lower);
  }

  if (lower.match(/\b(good|great|fine|well|excellent|wonderful|amazing)\b/) && lower.includes('?') === false) {
    return "That's a great positive expression! Expanding your vocabulary of positive words makes you sound more fluent. Try: **fantastic**, **splendid**, **terrific**, or **outstanding**!";
  }

  if (currentTopic && RESPONSES[currentTopic]) {
    return pickRandom(RESPONSES[currentTopic]);
  }

  return pickRandom(RESPONSES.default) + ' ' + getEncouragement();
}

function generateHelpResponse(text) {
  if (text.includes('accent') || text.includes('pronunciation')) {
    return "Great question! To improve your accent:\n\n1. **Listen actively** — Watch English movies without subtitles\n2. **Shadow speaking** — Repeat after native speakers\n3. **Record yourself** — Compare to native speech\n4. **Focus on stress** — English emphasizes certain syllables\n\nWould you like to practice any specific sounds?";
  }
  if (text.includes('grammar')) {
    return "Here's a key grammar tip! 💡\n\n**The Present Perfect Tense**\nUse 'have/has + past participle' for experiences or recent past.\n\n✅ Correct: 'I have visited London.'\n❌ Wrong: 'I visited London already.'\n\nCan you make a sentence using the present perfect?";
  }
  if (text.includes('vocabulary') || text.includes('word')) {
    return "Building vocabulary takes consistency! Here's my strategy:\n\n📚 Learn **5 new words per day** (use the Vocabulary section!)\n🔄 Use new words in **3 different sentences**\n🃏 Use **flashcards** for spaced repetition\n📖 Read English articles daily\n\nWant me to give you today's vocabulary challenge?";
  }
  return pickRandom(RESPONSES.default);
}

function getEncouragement() {
  const encouragements = [
    "You're doing really well! 🌟",
    "Keep it up — practice makes perfect!",
    "Every conversation makes you better! 💪",
    "Your English is improving every day! 🚀",
    "That was a great attempt!"
  ];
  return pickRandom(encouragements);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Render Messages ──
function addMessage(role, text, correction = null) {
  const container = document.getElementById('chatMessages');
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const div = document.createElement('div');
  div.className = `message ${role}`;

  // Parse **bold** markdown
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  let correctionHTML = '';
  if (correction) {
    correctionHTML = `
      <div class="msg-correction">
        ✏️ <strong>Grammar tip:</strong> Instead of "<em>${correction.original}</em>", try: "<strong>${correction.corrected}</strong>"
      </div>`;
  }

  div.innerHTML = `
    <div class="msg-avatar">${role === 'ai' ? '🤖' : '👤'}</div>
    <div>
      <div class="msg-bubble">${formattedText}${correctionHTML}</div>
      <div class="msg-time">${now}</div>
    </div>`;

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// ── Typing Indicator ──
function showTypingIndicator() {
  isTyping = true;
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'message ai typing-indicator';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="typing-dots">
      <span></span><span></span><span></span>
    </div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
  isTyping = false;
  const indicator = document.getElementById('typingIndicator');
  if (indicator) indicator.remove();
}

// ── Suggestions ──
function renderSuggestions(topic) {
  const chips = SUGGESTIONS[topic] || SUGGESTIONS.default;
  const container = document.getElementById('suggestions');
  container.innerHTML = chips.map(s =>
    `<button class="suggestion-chip">${s}</button>`
  ).join('');
  container.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('chatInput').value = chip.textContent;
      sendMessage();
    });
  });
}

// ── Voice Input ──
function toggleVoiceInput() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('Voice input requires Chrome or Edge!', 'error');
    return;
  }

  if (voiceListening) {
    chatRecognition?.stop();
    voiceListening = false;
    document.getElementById('voiceInputBtn').classList.remove('listening');
    document.getElementById('voiceInputBtn').textContent = '🎤';
    return;
  }

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  chatRecognition = new SpeechRec();
  chatRecognition.lang = 'en-US';
  chatRecognition.interimResults = false;

  chatRecognition.onstart = () => {
    voiceListening = true;
    document.getElementById('voiceInputBtn').classList.add('listening');
    document.getElementById('voiceInputBtn').textContent = '🔴';
    showToast('Listening... speak now', 'info');
  };

  chatRecognition.onresult = (e) => {
    const text = e.results[0][0].transcript;
    document.getElementById('chatInput').value = text;
    voiceListening = false;
    document.getElementById('voiceInputBtn').classList.remove('listening');
    document.getElementById('voiceInputBtn').textContent = '🎤';
    sendMessage();
  };

  chatRecognition.onerror = () => {
    voiceListening = false;
    document.getElementById('voiceInputBtn').classList.remove('listening');
    document.getElementById('voiceInputBtn').textContent = '🎤';
    showToast('Voice input failed. Try again.', 'error');
  };

  chatRecognition.start();
}

// ── Counters ──
function updateCounters() {
  document.getElementById('msgCount').textContent = msgCount;
  document.getElementById('corrCount').textContent = corrCount;
}

// ── Start ──
document.addEventListener('DOMContentLoaded', init);
