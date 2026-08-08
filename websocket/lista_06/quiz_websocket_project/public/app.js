document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const connectionStatus = document.getElementById('connection-status');
  const statusText = document.getElementById('status-text');
  const userBadge = document.getElementById('user-badge');
  const userDisplayName = document.getElementById('user-display-name');
  
  const joinSection = document.getElementById('join-section');
  const joinForm = document.getElementById('join-form');
  const usernameInput = document.getElementById('username-input');
  const joinBtn = document.getElementById('join-btn');
  const joinError = document.getElementById('join-error');
  
  const quizSection = document.getElementById('quiz-section');
  const questionForm = document.getElementById('question-form');
  const questionInput = document.getElementById('question-input');
  const charCounter = document.getElementById('char-counter');
  const createQuestionBtn = document.getElementById('create-question-btn');
  
  const questionCountBadge = document.getElementById('question-count-badge');
  const emptyState = document.getElementById('empty-state');
  const questionsList = document.getElementById('questions-list');

  // Application State
  let ws = null;
  let currentUser = null;
  const questionsMap = new Map(); // questionId -> question object

  // Setup WebSocket Connection
  function connectWebSocket() {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${location.host}/ws`;

    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
      updateConnectionStatus(true);
    };

    ws.onclose = () => {
      console.log('Conexão WebSocket fechada');
      updateConnectionStatus(false);
      // Attempt reconnect after 3 seconds if disconnected unexpectedly
      setTimeout(() => {
        if (!ws || ws.readyState === WebSocket.CLOSED) {
          connectWebSocket();
        }
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
      updateConnectionStatus(false);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        handleServerMessage(message);
      } catch (err) {
        console.error('Erro ao interpretar mensagem do servidor:', err);
      }
    };
  }

  function updateConnectionStatus(isConnected) {
    if (isConnected) {
      connectionStatus.classList.remove('disconnected');
      connectionStatus.classList.add('connected');
      statusText.textContent = 'Conectado';
    } else {
      connectionStatus.classList.remove('connected');
      connectionStatus.classList.add('disconnected');
      statusText.textContent = 'Desconectado';
    }
  }

  // Handle Server Messages
  function handleServerMessage(message) {
    const { type, payload } = message;

    switch (type) {
      case 'user:joined':
        onUserJoined(payload);
        break;
      case 'questions:history':
        onQuestionsHistory(payload);
        break;
      case 'question:created':
        onQuestionCreated(payload);
        break;
      case 'question:voted':
        onQuestionVoted(payload);
        break;
      case 'error':
        onErrorReceived(payload);
        break;
      default:
        console.warn('Tipo de mensagem desconhecido recebido:', type);
    }
  }

  // Server event handlers
  function onUserJoined(payload) {
    currentUser = payload.username;
    userDisplayName.textContent = currentUser;
    userBadge.classList.remove('hidden');
    
    // Hide join section, show quiz section
    joinSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    joinError.classList.add('hidden');
  }

  function onQuestionsHistory(payload) {
    questionsMap.clear();
    const questions = payload.questions || [];
    
    questions.forEach(q => {
      questionsMap.set(q.id, q);
    });

    renderAllQuestions();
  }

  function onQuestionCreated(payload) {
    const question = payload.question;
    if (!question || !question.id) return;

    questionsMap.set(question.id, question);
    renderQuestionCard(question, true);
    updateFeedState();
  }

  function onQuestionVoted(payload) {
    const { questionId, votes } = payload;
    const question = questionsMap.get(questionId);
    
    if (question) {
      question.votes = votes;
      updateQuestionVoteUI(questionId, votes);
    }
  }

  function onErrorReceived(payload) {
    const { code, message } = payload;
    console.error(`Erro do servidor [${code}]:`, message);

    if (code === 'USERNAME_IN_USE' || code === 'INVALID_USERNAME') {
      joinError.textContent = message;
      joinError.classList.remove('hidden');
      alert(message);
    } else {
      alert(`Erro: ${message}`);
    }
  }

  // User Action Handlers
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();

    if (!username) return;

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      alert('Conexão com o servidor não está ativa. Aguarde...');
      return;
    }

    sendWSMessage('user:join', { username });
  });

  questionInput.addEventListener('input', () => {
    const len = questionInput.value.length;
    charCounter.textContent = `${len} / 300`;
  });

  questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = questionInput.value.trim();

    if (!text) return;

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      alert('Conexão com o servidor não está ativa.');
      return;
    }

    sendWSMessage('question:create', { text });
    questionInput.value = '';
    charCounter.textContent = '0 / 300';
  });

  function sendWSMessage(type, payload) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type, payload }));
    }
  }

  // UI Rendering & Updates
  function updateFeedState() {
    const count = questionsMap.size;
    questionCountBadge.textContent = count;
    
    if (count === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
    }
  }

  function renderAllQuestions() {
    questionsList.innerHTML = '';
    
    // Sort by createdAt ascending or descending
    const sortedQuestions = Array.from(questionsMap.values()).sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    sortedQuestions.forEach(q => renderQuestionCard(q, false));
    updateFeedState();
  }

  function renderQuestionCard(question, prepend = false) {
    // Check if element already exists
    if (document.getElementById(`question-card-${question.id}`)) {
      return;
    }

    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `question-card-${question.id}`;

    const dateStr = formatDate(question.createdAt);
    const yesVotes = question.votes?.yes || 0;
    const noVotes = question.votes?.no || 0;
    const totalVotes = yesVotes + noVotes;
    
    const yesPercent = totalVotes > 0 ? ((yesVotes / totalVotes) * 100).toFixed(1) : 0;
    const noPercent = totalVotes > 0 ? ((noVotes / totalVotes) * 100).toFixed(1) : 0;

    card.innerHTML = `
      <div class="question-meta">
        <span class="author-tag">👤 ${escapeHTML(question.author)}</span>
        <span class="date-tag">${dateStr}</span>
      </div>
      <div class="question-text">${escapeHTML(question.text)}</div>
      <div class="vote-section">
        <div class="vote-buttons">
          <button id="vote-yes-${question.id}" class="btn-vote btn-vote-yes" data-id="${question.id}" data-answer="yes">
            <span>👍 Sim</span>
            <span id="vote-count-yes-${question.id}" class="vote-count-badge">${yesVotes}</span>
          </button>
          <button id="vote-no-${question.id}" class="btn-vote btn-vote-no" data-id="${question.id}" data-answer="no">
            <span>👎 Não</span>
            <span id="vote-count-no-${question.id}" class="vote-count-badge">${noVotes}</span>
          </button>
        </div>
        <div class="vote-progress-container">
          <div id="progress-yes-${question.id}" class="progress-bar-yes" style="width: ${totalVotes > 0 ? yesPercent : 50}%"></div>
          <div id="progress-no-${question.id}" class="progress-bar-no" style="width: ${totalVotes > 0 ? noPercent : 50}%"></div>
        </div>
        <div class="vote-stats">
          <span id="total-votes-${question.id}">Total de votos: ${totalVotes}</span>
          <span id="percentages-${question.id}">${totalVotes > 0 ? `Sim ${yesPercent}% | Não ${noPercent}%` : 'Nenhum voto ainda'}</span>
        </div>
      </div>
    `;

    // Add event listeners for vote buttons
    const yesBtn = card.querySelector(`#vote-yes-${question.id}`);
    const noBtn = card.querySelector(`#vote-no-${question.id}`);

    yesBtn.addEventListener('click', () => handleVote(question.id, 'yes'));
    noBtn.addEventListener('click', () => handleVote(question.id, 'no'));

    if (prepend && questionsList.firstChild) {
      questionsList.insertBefore(card, questionsList.firstChild);
    } else {
      questionsList.appendChild(card);
    }
  }

  function handleVote(questionId, answer) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      alert('Conexão indisponível');
      return;
    }
    sendWSMessage('question:vote', { questionId, answer });
  }

  function updateQuestionVoteUI(questionId, votes) {
    const yesVotes = votes.yes || 0;
    const noVotes = votes.no || 0;
    const totalVotes = yesVotes + noVotes;

    const yesCountEl = document.getElementById(`vote-count-yes-${questionId}`);
    const noCountEl = document.getElementById(`vote-count-no-${questionId}`);
    const progressYesEl = document.getElementById(`progress-yes-${questionId}`);
    const progressNoEl = document.getElementById(`progress-no-${questionId}`);
    const totalVotesEl = document.getElementById(`total-votes-${questionId}`);
    const percentagesEl = document.getElementById(`percentages-${questionId}`);

    if (yesCountEl) yesCountEl.textContent = yesVotes;
    if (noCountEl) noCountEl.textContent = noVotes;
    if (totalVotesEl) totalVotesEl.textContent = `Total de votos: ${totalVotes}`;

    const yesPercent = totalVotes > 0 ? ((yesVotes / totalVotes) * 100).toFixed(1) : 0;
    const noPercent = totalVotes > 0 ? ((noVotes / totalVotes) * 100).toFixed(1) : 0;

    if (progressYesEl) progressYesEl.style.width = `${totalVotes > 0 ? yesPercent : 50}%`;
    if (progressNoEl) progressNoEl.style.width = `${totalVotes > 0 ? noPercent : 50}%`;
    if (percentagesEl) {
      percentagesEl.textContent = totalVotes > 0 ? `Sim ${yesPercent}% | Não ${noPercent}%` : 'Nenhum voto ainda';
    }
  }

  // Helpers
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatDate(isoString) {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  }

  // Initialize
  connectWebSocket();
});
